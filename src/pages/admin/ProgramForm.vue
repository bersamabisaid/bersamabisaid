<template>
  <q-page
    padding
    class="program-form bg-blue-50 flex flex-col flex-wrap gap-y-4"
  >
    <div class="text-dark flex items-center gap-x-4">
      <q-btn
        v-go-back="{ name: 'AdminProgramIndex' }"
        icon="arrow_back"
        round
        flat
        class="bg-white shadow"
      />

      <h4 class="px-2 pb-1 font-semibold text-xl tracking-tight border-b-2 border-primary">
        {{ formTitle }}
      </h4>
    </div>

    <q-form
      ref="formProgram"
      :class="[
        'self-center flex-grow relative w-full max-w-prose bg-white border-b-4 border-primary rounded-lg ring-1 ring-gray-200 shadow-md',
        'flex flex-col gap-y-4'
      ]"
      @submit="save"
      @reset="onFormReset"
    >
      <q-img
        :src="programThumbnail"
        :ratio="16/9"
        class="bg-blue-gray-200 rounded-t-lg"
      >
        <div class="w-full h-full bg-transparent text-dark flex flex-col justify-center items-center">
          <q-btn
            label="upload thumbnail"
            icon="upload"
            rounded
            flat
            class="bg-info bg-opacity-70 text-white shadow-lg"
            @click="() => vFileInput.click()"
          />
        </div>
      </q-img>

      <div class="px-6 pb-4 flex flex-col gap-y-4">
        <q-input
          v-model="programTitle"
          label="Nama program"
          dense
          :rules="[requiredRule]"
        />

        <q-input
          v-model="programOrganizer"
          label="Nama penyelenggara"
          dense
          :rules="[requiredRule]"
        />

        <q-input
          v-model="maskedProgramURL"
          label="Link program"
          :hint="finalProgramURL"
          dense
        />

        <q-editor
          v-model="programDescription"
          placeholder="Deskripsi program..."
          :toolbar="[]"
          class="mt-2"
        />

        <template v-if="donation">
          <q-separator spaced />

          <q-field
            ref="inputAmount"
            v-model="donationTarget"
            label="Target donasi"
            hint="*opsional"
          >
            <template #control="{ id, floatingLabel, value, emitValue }">
              <money
                v-show="floatingLabel"
                :id="id"
                :value="value"
                v-bind="moneyFormat"
                class="q-field__input"
                @input="emitValue"
              />
            </template>
          </q-field>

          <span class="program-form__input-label mt-2">Batas waktu (opsional)</span>

          <q-date
            v-model="donationDeadline"
            mask="DD/MM/YYYY"
            minimal
          />
        </template>

        <div class="mt-auto flex justify-end gap-x-2">
          <q-btn
            label="Simpan"
            type="submit"
            unelevated
            rounded
            class="bg-primary text-white"
          />
        </div>
      </div>

      <q-inner-loading :showing="isLoading">
        <div class="flex flex-col items-center gap-y-3">
          <q-spinner
            size="lg"
            color="accent"
          />
          <span>{{ !!uploadQueue.length ? 'Uploading image...' : 'Processing...' }}</span>
        </div>
      </q-inner-loading>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent, computed,
} from '@vue/composition-api';
import { QForm } from 'quasar';
import { Money } from 'v-money';
import _kebabCase from 'lodash/kebabCase';
import { requiredRule } from 'src/composables/useInputRules';
import fbs, { storageRef } from 'src/services/firebaseService';
import firestoreCollection, { modelUiDataFactory, createAttrs, updateAttrs } from 'src/firestoreCollection';
import { programDataRepo } from 'src/dataRepositories';
import useStorageUpload from 'src/composables/useStorageUpload';
import useDocument from 'src/composables/useDocument';
import { notifyError, notifySuccess } from 'src/composables/useNotification';
import { getStorageFile } from 'src/composables/useStorage';
import { dateToDateString, dateStringToDate } from 'shared/utils/formatter';
import type { Program, IBaseProgram } from 'shared/types/modelData';
import useGuardAuth from 'src/composables/useGuardAuth';

const createFileInput = (accept = '*') => {
  const el = document.createElement('input');
  el.type = 'file';
  el.accept = accept;

  return el;
};

export default defineComponent({
  name: 'PageAdminProgramForm',
  props: {
    donation: {
      default: false,
    },
    formTitle: {
      type: String,
      required: true,
    },
  },
  setup(props, { root }) {
    useGuardAuth();

    const { tasks, state, upload } = useStorageUpload(storageRef.Programs);
    const docId = computed<string | undefined>(() => root.$route.params.programURL);
    const docRef = computed(() => firestoreCollection.Programs.doc(docId.value));
    const [dbData, isLoading] = useDocument(docRef, props.donation
      ? programDataRepo.defaultDonationModelData()
      : programDataRepo.defaultCommonModelData());
    const isNewDoc = computed(() => !docId.value);

    return {
      uploadQueue: tasks,
      processState: state,
      uploadFile: upload,
      requiredRule,
      docRef,
      dbData,
      isLoading,
      isNewDoc,
    };
  },
  data() {
    return {
      programTitle: '',
      programOrganizer: '',
      programDescription: '',
      programThumbnail: '',
      programURL: '',
      donationTarget: 0,
      donationDeadline: dateToDateString(Date.now()),

      vFileInput: createFileInput('image/*'),
      fileSelected: null as File | null,
      moneyFormat: {
        decimal: ',',
        thousands: '.',
        prefix: 'Rp ',
        precision: 0,
        masked: false,
      },
    };
  },
  computed: {
    maskedProgramURL: {
      get(): string {
        return this.programURL || _kebabCase(this.programTitle).toLowerCase();
      },
      set(val: string) {
        this.programURL = _kebabCase(val).toString();
      },
    },
    finalProgramURL(): string {
      if (this.maskedProgramURL) {
        const { href } = this.$router.resolve({
          name: 'Program',
          params: { programURL: this.maskedProgramURL },
        });

        return href;
      }

      return '*opsional';
    },
  },
  methods: {
    async save() {
      this.isLoading = true;

      try {
        if (this.isNewDoc) await this.create();
        else await this.update();

        this.isLoading = false;
        notifySuccess(this.isNewDoc ? 'Berhasil ditambahkan!' : 'Berhasil diperbarui!');
        (this.$refs.formProgram as QForm).reset();
        this.$router.back();
      } catch (err) {
        this.isLoading = false;
        notifyError(err);
      }
    },
    async update() {
      const newFilePathRef = this.fileSelected && await this.uploadFile(this.fileSelected, this.docRef.id);

      const baseProgramData: Partial<IBaseProgram> = {
        title: this.programTitle,
        description: this.programDescription,
        organizer: this.programOrganizer,
        URL: this.maskedProgramURL,
        ...(newFilePathRef && { image: newFilePathRef }),
      };

      const data: Partial<Program> = this.donation ? {
        ...baseProgramData,
        target: this.donationTarget || null,
        deadline: fbs.firestore.Timestamp.fromDate(dateStringToDate(this.donationDeadline)),
      } : {
        ...baseProgramData,
      };

      await this.docRef.set({ ...data, ...updateAttrs() }, { merge: true });
    },
    async create() {
      if (this.fileSelected) {
        const filePathRef = await this.uploadFile(this.fileSelected, this.docRef.id);

        const baseProgramData: IBaseProgram = {
          title: this.programTitle,
          image: filePathRef,
          description: this.programDescription,
          organizer: this.programOrganizer,
          URL: this.maskedProgramURL,
        };

        const data: Program = this.donation ? {
          ...baseProgramData,
          donation: this.donation,
          target: this.donationTarget || null,
          deadline: fbs.firestore.Timestamp.fromDate(dateStringToDate(this.donationDeadline)),
          _ui: {
            progress: modelUiDataFactory(0),
            numOfDonations: modelUiDataFactory(0),
          },
        } : {
          ...baseProgramData,
          donation: this.donation,
        };

        await this.docRef.set({ ...data, ...createAttrs() });
      } else {
        throw new Error('No image selected!');
      }
    },
    syncForm() {
      this.isLoading = true;
      this.programTitle = this.dbData.title;
      this.programOrganizer = this.dbData.organizer;
      this.programDescription = this.dbData.description;
      this.programThumbnail = this.dbData.image;
      this.programURL = this.dbData.URL;

      if (this.dbData.donation) {
        this.donationTarget = this.dbData.target || 0;
        this.donationDeadline = dateToDateString(this.dbData.deadline?.toMillis() || Date.now());
      }

      const thumbnailPathRef = storageRef.root.child(this.dbData.image);

      getStorageFile(thumbnailPathRef)
        .then(({ URL }) => {
          this.programThumbnail = URL;
        }).finally(() => {
          this.isLoading = false;
        });
    },
    onFormReset() {
      this.programTitle = '';
      this.programOrganizer = '';
      this.programDescription = '';
      this.programThumbnail = '';
      this.programURL = '';
      this.donationTarget = 0;
      this.donationDeadline = dateToDateString(Date.now());
      this.fileSelected = null;
    },
    onFileInputChange() {
      const [file] = Array.from(this.vFileInput.files || []);

      this.fileSelected = file || null;
      this.programThumbnail = URL.createObjectURL(this.fileSelected);
    },
  },
  created() {
    this.vFileInput.addEventListener('change', () => this.onFileInputChange());
  },
  watch: {
    dbData() {
      this.syncForm();
    },
  },
  components: {
    Money,
  },
});
</script>

<style lang="scss">
@layer components {
  .program-form {
    $root: &;

    &__input-label {
      @apply font-medium text-base text-dark text-opacity-50 tracking-tight;
    }

    .q-field {
      &__label {
        @extend #{$root}__input-label;
      }
    }
  }
}
</style>
