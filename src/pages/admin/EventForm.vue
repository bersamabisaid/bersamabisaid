<template>
  <q-page
    padding
    class="event-form bg-blue-50 flex flex-col flex-wrap gap-y-4"
  >
    <div class="text-dark flex items-center gap-x-4">
      <q-btn
        icon="arrow_back"
        round
        flat
        class="bg-white shadow"
        @click="() => $router.back()"
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
        <q-spinner
          size="lg"
          color="accent"
        />
      </q-inner-loading>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { date } from 'quasar';
import { Money } from 'v-money';
import { requiredRule } from 'src/composables/useInputRules';
import fbs from 'src/services/firebaseService';
import { modelUiDataFactory } from 'src/firestoreCollection';
import type { Event } from 'shared/types/modelData';

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
    return {
      requiredRule,
    };
  },
  data() {
    return {
      eventTitle: '',
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
        await this.uploadImg();
        const baseEventData: Omit<Event, 'donation'> = {
          title: this.eventTitle,
          description: this.eventDescription,
          url: this.eventURL || this.eventTitle,
          image: this.eventThumbnail,
        };

        const data: Event = this.donation ? {
          ...baseEventData,
          donation: this.donation,
          target: this.donationTarget,
          deadline: fbs.firestore.Timestamp.fromDate(
            date.extractDate(this.donationDeadline, 'DD/MM/YYYY'),
          ),
          __ui__: {
            progress: modelUiDataFactory(0),
            recentDonations: modelUiDataFactory([]),
          },
        } : {
          ...baseEventData,
          donation: this.donation,
        };

        console.log(data);

        this.isLoading = false;
      } catch (err) {
        console.log(err);

        this.isLoading = false;
      }
    },
    uploadImg() {
      return new Promise((resolve, reject) => {
        setTimeout(() => (
          this.fileSelected
            ? resolve()
            : reject('image is empty')
        ), 3000);
      });
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
