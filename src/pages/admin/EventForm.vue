<template>
  <q-page
    padding
    class="event-form bg-blue-50 flex flex-col flex-wrap gap-y-4"
  >
    <div class="text-dark flex items-center gap-x-4">
      <q-btn
        v-go-back="{ name: 'AdminEventIndex' }"
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
      ref="formEvent"
      :class="[
        'self-center flex-grow relative w-full max-w-prose bg-white border-b-4 border-primary rounded-lg ring-1 ring-gray-200 shadow-md',
        'flex flex-col gap-y-4'
      ]"
      @submit="save"
      @reset="onFormReset"
    >
      <q-img
        :src="eventThumbnail"
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
          v-model="eventTitle"
          label="Nama program"
          dense
          :rules="[requiredRule]"
        />

        <q-input
          v-model="eventOrganizer"
          label="Nama penyelenggara"
          dense
          :rules="[requiredRule]"
        />

        <q-input
          v-model="eventURL"
          label="Link program"
          :hint="finalEventURL"
          dense
        />

        <q-editor
          v-model="eventDescription"
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

          <span class="event-form__input-label mt-2">Batas waktu (opsional)</span>

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
          <span>{{ !!uploadQueue.length ? 'Uploading image...' : 'Saving...' }}</span>
        </div>
      </q-inner-loading>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { date, QForm } from 'quasar';
import { Money } from 'v-money';
import { requiredRule } from 'src/composables/useInputRules';
import fbs, { storageRef } from 'src/services/firebaseService';
import firestoreCollection, { modelUiDataFactory, createAttrs } from 'src/firestoreCollection';
import useStorageUpload from 'src/composables/useStorageUpload';
import { notifyError, notifySuccess } from 'src/composables/useNotification';
import type { Event, IBaseEvent } from 'shared/types/modelData';

const createFileInput = (accept = '*') => {
  const el = document.createElement('input');
  el.type = 'file';
  el.accept = accept;

  return el;
};

export default defineComponent({
  name: 'PageAdminEventForm',
  props: {
    donation: {
      default: false,
    },
    formTitle: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { tasks, state, upload } = useStorageUpload(storageRef.Events);

    return {
      uploadQueue: tasks,
      processState: state,
      uploadFile: upload,
      requiredRule,
    };
  },
  data() {
    return {
      eventTitle: '',
      eventOrganizer: '',
      eventDescription: '',
      eventThumbnail: '',
      eventURL: '',
      donationTarget: 0,
      donationDeadline: date.formatDate(Date.now(), 'DD/MM/YYYY'),

      vFileInput: createFileInput('image/*'),
      fileSelected: null as File | null,
      isLoading: false,
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
    finalEventURL(): string {
      if (this.eventURL || this.eventTitle) {
        const { href } = this.$router.resolve({
          name: 'Program',
          params: { programUrl: (this.eventURL || this.eventTitle) },
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
        if (this.fileSelected) {
          const doc = firestoreCollection.Events.doc();
          const filePathRef = await this.uploadFile(this.fileSelected, doc.id);

          const baseEventData: IBaseEvent = {
            title: this.eventTitle,
            image: filePathRef,
            description: this.eventDescription,
            organizer: this.eventOrganizer,
            URL: this.eventURL || this.eventTitle,
          };

          const data: Event = this.donation ? {
            ...baseEventData,
            donation: this.donation,
            target: this.donationTarget,
            deadline: fbs.firestore.Timestamp.fromDate(
              date.extractDate(this.donationDeadline, 'DD/MM/YYYY'),
            ),
            _ui: {
              progress: modelUiDataFactory(0),
              recentDonations: modelUiDataFactory([]),
            },
          } : {
            ...baseEventData,
            donation: this.donation,
          };

          await doc.set({ ...data, ...createAttrs() });
        } else {
          throw new Error('No image selected!');
        }

        this.isLoading = false;
        notifySuccess('Berhasil ditambahkan!');
        (this.$refs.formEvent as QForm).reset();
        this.$router.back();
      } catch (err) {
        this.isLoading = false;
        notifyError(err);
      }
    },
    onFormReset() {
      this.eventTitle = '';
      this.eventOrganizer = '';
      this.eventDescription = '';
      this.eventThumbnail = '';
      this.eventURL = '';
      this.donationTarget = 0;
      this.donationDeadline = date.formatDate(Date.now(), 'DD/MM/YYYY');
      this.fileSelected = null;
    },
    onFileInputChange() {
      const [file] = Array.from(this.vFileInput.files || []);

      this.fileSelected = file || null;
      this.eventThumbnail = URL.createObjectURL(this.fileSelected);
    },
  },
  created() {
    this.vFileInput.addEventListener('change', () => this.onFileInputChange());
  },
  components: {
    Money,
  },
});
</script>

<style lang="scss">
@layer components {
  .event-form {
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
