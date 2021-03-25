<template>
  <q-page
    padding
    class="pt-5 pb-20 bg-secondary flex flex-col items-center gap-y-6"
  >
    <h3 class="font-medium text-xl text-center text-white">
      Anda akan berdonasi untuk program
    </h3>

    <card-program
      title="Pray for Uyghur"
      caption="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus, voluptas."
      no-action
    />

    <q-form class="w-full max-w-screen-md">
      <q-stepper
        ref="stepper"
        v-model="step"
        color="primary"
        animated
        vertical
        active-icon="loop"
        class="w-full rounded-xl"
      >
        <q-step
          :name="1"
          title="Nominal Donasi"
          :done="step > 1"
        >
          <q-list padding>
            <q-item
              v-for="choice in amountChoices"
              :key="choice.title"
              v-ripple
              tag="label"
            >
              <q-item-section avatar>
                <q-radio
                  v-model="amount"
                  :val="choice.amount"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label class="font-bold text-lg text-primary">
                  {{ choice.amount.toLocaleString('id', { style: 'currency', currency: 'idr' }) }}
                </q-item-label>
                <q-item-label caption>
                  {{ choice.title }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <q-field
            v-model="amount"
            filled
            label="Nominal lainnya"
            :rules="[v => (v > 0) || 'Nominal harus diatas 0']"
          >
            <template #control="{ id, floatingLabel, value, emitValue }">
              <money
                v-show="floatingLabel"
                :id="id"
                :value="value"
                v-bind="moneyFormat"
                class="q-field__input font-bold text-lg text-right text-primary"
                @input="emitValue"
              />
            </template>
          </q-field>
        </q-step>

        <q-step
          :name="2"
          title="Masukkan identitas"
          :done="step > 2"
        >
          <div class="max-w-prose mx-auto my-4 px-6 py-4 border border-blue-gray-300 rounded-xl flex flex-col gap-y-4">
            <q-input
              v-model="fullName"
              name="fullname"
              label="Nama Lengkap"
            />

            <q-input
              v-model="nickName"
              name="nickname"
              label="Nama Panggilan (Opsional)"
            />

            <q-input
              v-model="email"
              name="email"
              label="Alamat email"
              type="email"
            />

            <q-input
              v-model="phoneNumber"
              name="phoneNumber"
              label="Nomor Telfon"
              type="tel"
              prefix="(+62)"
              mask="###-####-####"
              unmasked-value
            />

            <div class="grid grid-cols-2 gap-x-4">
              <q-input
                v-model="province"
                name="province"
                label="Provinsi"
              />

              <q-input
                v-model="zipCode"
                name="postal code"
                label="Kode pos"
              />
            </div>

            <q-input
              v-model="city"
              name="city"
              label="Kota"
            />

            <q-input
              v-model="streetAddress"
              name="street address"
              label="Alamat"
            />

            <q-checkbox
              v-model="hidden"
              name="hide my info"
              label="Sembunyikan identitas"
              class="inline-flex"
            />
          </div>
        </q-step>

        <q-separator spaced />

        <template #navigation>
          <q-stepper-navigation>
            <div class="flex flex-row justify-end gap-x-4">
              <q-btn
                v-if="step > 1"
                label="Sebelumnya"
                color="primary"
                flat
                class="rounded-lg"
                @click="previousStep()"
              />

              <q-btn
                :label="step === 3 ? 'Selesai' : 'Selanjutnya'"
                color="primary"
                unelevated
                class="rounded-lg"
                @click="nextStep()"
              />
            </div>
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import CardProgram from 'components/CardProgram.vue';
import type { QStepper } from 'quasar';

interface Choice {
  title: string;
  amount: number;
}

const amountChoices: Choice[] = [
  {
    title: 'Semua bisa sedekah',
    amount: 50_000,
  },
  {
    title: 'Sedekah pilihan',
    amount: 100_000,
  },
  {
    title: 'Sedekah terbaik',
    amount: 250_000,
  },
  {
    title: 'Sedekah berkah',
    amount: 500_000,
  },
  {
    title: 'Sedekah spesial',
    amount: 1000_000,
  },
];

export default defineComponent({
  name: 'PageDonate',
  setup() {
    return {
      amountChoices,
    };
  },
  data() {
    return {
      amount: 0,
      nickName: '',
      fullName: '',
      email: '',
      streetAddress: '',
      zipCode: 0,
      city: '',
      province: '',
      phoneNumber: '',
      hidden: false,

      step: 1,
      moneyFormat: {
        decimal: ',',
        thousands: '.',
        prefix: 'Rp ',
        precision: 0,
        masked: false,
      },
    };
  },
  components: {
    CardProgram,
  },
  methods: {
    nextStep() {
      (this.$refs.stepper as QStepper).next();
    },
    previousStep() {
      (this.$refs.stepper as QStepper).previous();
    },
  },
});
</script>
