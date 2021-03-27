<template>
  <minimalist-layout>
    <q-page
      padding
      class="pt-5 pb-20 bg-secondary flex flex-col items-center gap-y-6"
    >
      <h3 class="font-medium text-xl text-center text-white">
        Anda akan berdonasi untuk program
      </h3>

      <card-program
        caption="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus, voluptas."
        no-action
      />

      <q-form
        ref="form"
        class="w-full max-w-screen-md"
      >
        <q-stepper
          ref="stepper"
          v-model="step"
          color="primary"
          animated
          vertical
          class="w-full rounded-xl"
        >
          <q-step
            :name="1"
            title="Nominal Donasi"
            icon="attach_money"
            active-icon="attach_money"
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
                    {{ toIdr(choice.amount) }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ choice.title }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <span class="mx-4 font-semibold">
              Nominal Lainnya
            </span>

            <q-field
              ref="inputAmount"
              v-model="amount"
              label="Masukkan nominal"
              filled
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
            icon="person"
            active-icon="person"
            :done="step > 2"
          >
            <div class="max-w-prose mx-auto my-4 px-6 py-4 border border-blue-gray-300 rounded-xl flex flex-col gap-y-4">
              <q-input
                v-model="fullName"
                name="fullname"
                label="Nama Lengkap"
                required
                :rules="[requiredRule]"
              />

              <q-input
                v-model="email"
                name="email"
                label="Alamat email"
                type="email"
                required
                :rules="[requiredRule]"
              />

              <q-input
                v-model="phoneNumber"
                name="phoneNumber"
                label="Nomor Telfon"
                type="tel"
                mask="(+62) ###-####-####"
                fill-mask
                hint="opsional"
                unmasked-value
              />

              <div class="grid grid-cols-2 gap-x-4">
                <q-input
                  v-model="province"
                  name="province"
                  label="Provinsi"
                  required
                  :rules="[requiredRule]"
                />

                <q-input
                  v-model="city"
                  name="city"
                  label="Kota"
                  hint="opsional"
                  required
                />
              </div>

              <q-input
                v-model="message"
                name="message"
                label="Pesan"
                type="textarea"
                hint="opsional"
                filled
                required
                autogrow
              />

              <q-checkbox
                v-model="hidden"
                name="hide my info"
                label="Sembunyikan identitas"
                class="inline-flex"
              />
            </div>
          </q-step>

          <q-step
            :name="3"
            title="Pembayaran"
            icon="loop"
            active-icon="loop"
            :done="step > 3"
          >
            <div class="w-full max-w-prose mx-auto p-6 flex flex-col justify-center items-center">
              <template v-if="isWaitingPayment && isDisableFinish">
                <div class="flex flex-col items-center gap-y-6">
                  <span class="font-medium">Menunggu Pembayaran</span>

                  <q-circular-progress
                    size="lg"
                    indeterminate
                    class="text-accent"
                  />
                </div>

                <div class="mt-20 flex flex-col items-center gap-y-1">
                  <span class="mt-4 font-medium text-sm text-primary text-opacity-60">Silahkan copy URL berikut untuk kembali ke halaman ini</span>

                  <div class="select-all truncate w-60 px-2 py-1 bg-blue-gray-300 rounded-xl">
                    <q-btn
                      icon="content_copy"
                      size="sm"
                      flat
                      round
                      class="mr-1"
                      @click="copyPaymentURL"
                    />
                    <span class="font-light text-xs">
                      {{ paymentURL }}
                    </span>
                  </div>
                </div>
              </template>

              <div
                v-else-if="isWaitingPayment || isDisableFinish"
                class="px-8 py-4 bg-blue-gray-300 rounded-xl flex flex-col items-center gap-y-2"
              >
                <span class="font-medium text-lg text-primary">
                  Total bayar
                </span>

                <span class="font-extrabold text-2xl text-accent">
                  {{ toIdr(amount) }}
                </span>

                <q-btn
                  label="bayar"
                  unelevated
                  class="mt-4 bg-secondary text-white rounded-lg shadow-sm"
                  @click="pay"
                />
              </div>
            </div>
          </q-step>

          <q-step
            :name="4"
            title="Terimakasih"
            icon="favorite"
            active-icon="favorite"
            :done="step > 4"
          >
            <div class="py-8 flex flex-col items-center gap-y-10">
              <h3 class="font-extrabold text-3xl text-accent">
                Terimakasih! ❤
              </h3>

              <social-share :shared-url="paymentURL">
                <template #title>
                  <span class="mb-1 font-semibold text text-white">Ayo bagikan program ini ke yang lain!</span>
                </template>
              </social-share>
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
                  :disable="isWaitingPayment"
                  flat
                  class="rounded-lg"
                  @click="previousStep()"
                />

                <q-btn
                  :label="step > 2 ? 'Selesai' : 'Selanjutnya'"
                  color="primary"
                  :disable="step > 2 && isDisableFinish"
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
  </minimalist-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { copyToClipboard } from 'quasar';
import { Money } from 'v-money';
import MinimalistLayout from 'layouts/MinimalistLayout.vue';
import CardProgram from 'components/CardProgram.vue';
import SocialShare from 'components/SocialShare.vue';
import { requiredRule } from 'src/composables/useInputRules';
import type { QStepper, QField, QForm } from 'quasar';

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
      requiredRule,
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
      message: '',

      step: 1,
      isWaitingPayment: false,
      isDisableFinish: true,
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
    MinimalistLayout,
    CardProgram,
    Money,
    SocialShare,
  },
  computed: {
    paymentURL() {
      if (this.isWaitingPayment) {
        // eslint-disable-next-line no-restricted-globals
        const url = new URL(location?.href || 'http://localhost');
        url.pathname = this.$route.fullPath;
        return url.toString();
      }

      return '';
    },
  },
  methods: {
    async nextStep() {
      const next = () => (this.$refs.stepper as QStepper).next();

      switch (this.step) {
        case 1:
          return (this.$refs.inputAmount as QField).validate() && next();

        case 2:
          return await (this.$refs.form as QForm).validate() && next();

        case 4:
          return this.$router.push({ name: 'ProgramList' });

        default:
          return next();
      }
    },
    previousStep() {
      (this.$refs.stepper as QStepper).previous();
    },
    simulatePayment() {
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 3000);
      });
    },
    pay() {
      this.isWaitingPayment = true;
      // send data to api here...
      return this.simulatePayment()
        .then(() => {
          this.isWaitingPayment = false;
          this.isDisableFinish = false;
          return this.nextStep();
        });
    },
    copyPaymentURL() {
      return copyToClipboard(this.paymentURL)
        .then(() => alert?.('copied to clipboard!'));
    },
    toIdr(n: number) {
      return n.toLocaleString('id', { style: 'currency', currency: 'idr', maximumFractionDigits: 0 });
    },
  },
});
</script>
