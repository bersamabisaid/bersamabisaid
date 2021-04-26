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
        :title="programData.title"
        :caption="extractTextFromHTML(programData.description)"
        :url="programData.URL"
        :loading="isDataLoading"
        :img-url="programThumbnailSrc"
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
              :rules="[minRule(10000, true)]"
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
                hint="*opsional"
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
                  hint="*opsional"
                  required
                />
              </div>

              <q-input
                v-model="message"
                name="message"
                label="Pesan"
                type="textarea"
                hint="*opsional"
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
                <div class="flex flex-col items-center gap-y-10">
                  <div
                    v-if="paymentRedirectURL"
                    class="px-5 py-3 bg-blue-gray-300 rounded-xl flex flex-col items-center gap-y-3"
                  >
                    <span class="font-semibold text-center text-primary">
                      Anda akan otomatis dialihkan ke halaman pembayaran dalam {{ redirectCounter }}
                    </span>

                    <span class="text-sm">atau klik tombol dibawah berikut jika tidak teralihkan otomatis</span>

                    <q-btn
                      label="Menuju ke halaman pembayaran"
                      icon-right="open_in_new"
                      type="a"
                      :href="paymentRedirectURL"
                      target="_blank"
                      :disable="!!redirectCounter"
                      unelevated
                      no-caps
                      class="mt-2 bg-positive text-white rounded-lg"
                    />
                  </div>

                  <span class="font-medium">Menunggu Pembayaran</span>

                  <q-circular-progress
                    size="lg"
                    indeterminate
                    class="text-accent"
                  />
                </div>

                <div
                  v-if="donationData"
                  class="mt-10 flex flex-col items-center gap-y-1"
                >
                  <span class="mt-4 font-medium text-sm text-primary text-opacity-60">Silahkan salin URL berikut untuk kembali ke halaman ini</span>

                  <div class="select-all truncate w-60 px-2 py-1 bg-blue-gray-300 rounded-xl">
                    <q-btn
                      icon="content_copy"
                      size="sm"
                      flat
                      round
                      class="mr-1"
                      @click="copyURL(paymentURL)"
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
              <h5
                v-if="paymentStatus === 'accepted'"
                class="font-extrabold text-3xl text-accent"
              >
                {{ finishMessage[paymentStatus] }}
              </h5>

              <template
                v-else
                class="p-4 flex flex-col items-center"
              >
                <h5 class="font-extrabold text-2xl text-negative">
                  {{ finishMessage[paymentStatus] }}
                </h5>

                <div class="py-2 flex gap-x-2">
                  <q-btn
                    v-if="['fail', 'expire'].includes(paymentStatus)"
                    label="Laporkan kesalahan"
                    unelevated
                    no-caps
                    class="text-primary rounded-lg"
                  />
                  <q-btn
                    label="Ulangi transaksi"
                    unelevated
                    no-caps
                    class="bg-secondary text-white rounded-lg"
                  />
                </div>
              </template>

              <social-share :shared-url="programFullURL">
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
                  v-if="step > 1 && !donationData && step < 4"
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

          <q-inner-loading :showing="isDataLoading" />
        </q-stepper>
      </q-form>
    </q-page>
  </minimalist-layout>
</template>

<script lang="ts">
import {
  defineComponent, watch, ref, computed,
} from '@vue/composition-api';
import { copyToClipboard } from 'quasar';
import { Money } from 'v-money';
import MinimalistLayout from 'layouts/MinimalistLayout.vue';
import CardProgram from 'components/CardProgram.vue';
import SocialShare from 'components/SocialShare.vue';
import { storageRef } from 'src/services/firebaseService';
import firestoreCollection, { isSnapshotExists } from 'src/firestoreCollection';
import { getProgramByURL } from 'src/firestoreApis';
import { payDonation } from 'src/firebaseFunctions';
import { programDataRepo } from 'src/dataRepositories';
import { getStorageFile } from 'src/composables/useStorage';
import { notifyError } from 'src/composables/useNotification';
import { requiredRule, minRule } from 'src/composables/useInputRules';
import useCountdown from 'src/composables/useCountdown';
import useDocumentRealtime from 'src/composables/useDocumentRealtime';
import { toIdr } from 'shared/utils/formatter';
import { extractTextFromHTML } from 'shared/utils/dom';
import {
  Donation, ProgramDonation, isProgramDonation, PaymentStatus,
} from 'shared/types/modelData';
import type { Route } from 'vue-router';
import type { QStepper, QField, QForm } from 'quasar';
import type { ModelInObject, Model } from 'shared/types/model';

interface Choice {
  title: string;
  amount: number;
}

type PossiblePageQuery = Route['query'] & {
  programId?: string;
  donationId?: string;
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

const finishMessage: Record<PaymentStatus['status'], string> = {
  accepted: 'Terimakasih! ❤',
  fail: 'Mohon maaf, transaksi gagal! 🙏',
  pending: 'Menunggu transaksi...',
  cancel: 'Transaksi dibatalkan 😥',
  expire: 'Transaksi hangus ☹',
  need_action: 'Butuh penindakan ⚠',
  refund: 'Transaksi dikembalikan 😔 ',
};

export default defineComponent({
  name: 'PageDonate',
  setup(props, { root }) {
    const pageQuery = computed(() => root.$route.query as PossiblePageQuery);
    const donationId = computed({
      get: () => pageQuery.value.donationId,
      set: (val) => root.$router.replace({ query: { ...root.$route.query, donationId: val } })
        .catch((err) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (err?.name !== 'NavigationDuplicated') {
            notifyError(err);
          }
        }),
    });
    const programRef = computed(() => firestoreCollection.Programs.doc(pageQuery.value.programId));
    const programData = ref<ModelInObject<ProgramDonation>>({ ...programDataRepo.defaultDonationModelData(), _uid: '' });
    const donationData = ref<ModelInObject<Donation>>();
    const transactionRef = computed(() => donationData.value?.transaction || firestoreCollection.Transactions.doc());
    const [transactionData] = useDocumentRealtime(transactionRef);
    const isDataLoading = ref(true);
    const programThumbnailSrc = ref('');
    const paymentRedirectURL = ref('');
    const [redirectCounter, redirectCounterStart] = useCountdown();

    const updateProgramData = async (id: string) => {
      const programSnapshot = await getProgramByURL(id) || await programRef.value.get();

      if (programSnapshot && isSnapshotExists(programSnapshot)) {
        programData.value = { ...programSnapshot.data() as Model<ProgramDonation>, _uid: programSnapshot.id };
      }
    };
    const updateDonationData = async (id: string) => {
      const donationSnapshot = await firestoreCollection.Donations(programRef.value)
        .doc(id).get();

      if (isSnapshotExists(donationSnapshot)) {
        donationData.value = { ...donationSnapshot.data(), _uid: donationSnapshot.id };

        await updateProgramData(donationData.value.program.id);
      }
    };

    watch(pageQuery, async (newVal, oldVal) => {
      isDataLoading.value = true;

      try {
        // prior to get data from donationId then watch the diff
        if ((newVal.donationId !== oldVal?.donationId) && newVal.donationId) {
          await updateDonationData(newVal.donationId);
        } else if ((newVal.programId !== oldVal?.programId) && newVal.programId) {
          await updateProgramData(newVal.programId);
        }
      } catch (err) {
        notifyError(err);
      } finally {
        isDataLoading.value = false;
        // if programData is exists
        if (!(isProgramDonation(programData.value) && programData.value._uid)) {
          root.$router.push({ name: '404' })
            .finally(() => notifyError('invalid arguments!'));
        }
      }
    }, { immediate: true });

    watch(programData, async ({ image }) => {
      if (image) {
        const { URL } = await getStorageFile(storageRef.root.child(image));

        programThumbnailSrc.value = URL;
      } else {
        programThumbnailSrc.value = '';
      }
    }, { immediate: true });

    watch(donationId, () => donationId.value && updateDonationData(donationId.value));

    return {
      donationId,
      programData,
      donationData,
      transactionData,
      isDataLoading,
      programThumbnailSrc,
      paymentRedirectURL,
      paymentStatus: computed(() => transactionData.value?.paymentStatus?.status || 'pending'),

      finishMessage,
      redirectCounter,
      redirectCounterStart,

      amountChoices,
      requiredRule,
      minRule,
      toIdr,
      extractTextFromHTML,
    };
  },
  data() {
    return {
      amount: 0,
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
  computed: {
    programFullURL() {
      // eslint-disable-next-line no-restricted-globals
      const url = new URL(location?.href || 'http://localhost');
      if (this.programData.URL) {
        const { href } = this.$router.resolve({
          name: 'Program',
          params: { programURL: this.programData.URL },
        });

        url.pathname = href;
      }
      return url.toString();
    },
    paymentURL() {
      // eslint-disable-next-line no-restricted-globals
      const url = new URL(location?.href || 'http://localhost');
      const { href } = this.$router.resolve({ name: 'Payment' });

      url.searchParams.forEach((v, k) => url
        .searchParams.delete(k));

      url.pathname = href;

      if (this.donationData) {
        url.searchParams.append('donationId', this.donationData._uid);
      }

      return url.toString();
    },
  },
  methods: {
    async nextStep() {
      const next = () => (this.$refs.stepper as QStepper).next();

      switch (this.step) {
        case 1:
          return await (this.$refs.inputAmount as QField).validate() && next();

        case 2:
          return await (this.$refs.form as QForm).validate() && next();

        case 4:
          return this.$router.push({ name: 'ProgramList' });

        default:
          return next();
      }
    },
    previousStep() {
      return (this.$refs.stepper as QStepper).previous();
    },
    getPaymentRedirectURL() {
      return payDonation({
        programId: this.programData._uid,
        programName: this.programData.title,
        amount: this.amount,
        message: this.message,
        donator: {
          fullName: this.fullName,
          email: this.email,
          phoneNumber: this.phoneNumber,
          address: {
            country: 'Indonesia',
            province: this.province,
            city: this.city,
            streetAddress: '',
            zipCode: 0,
          },
        },
        hideDonator: this.hidden,
        finishPaymentRedirectURL: this.paymentURL,
      });
    },
    async pay() {
      this.isWaitingPayment = true;

      try {
        if (!this.donationData && !this.paymentRedirectURL) {
          const { data: { redirectURL, donationId } } = await this.getPaymentRedirectURL();
          this.paymentRedirectURL = redirectURL;
          this.donationId = donationId;
        }

        this.redirectCounterStart(3000)
          .finally(() => {
            this.redirectCounter = 0;
            window.open(this.paymentRedirectURL, '_self');
          });
      } catch (err) {
        notifyError(err);
        this.isWaitingPayment = false;
      }
    },
    syncDonationData() {
      if (this.donationData) {
        this.amount = this.donationData.amount;
        // this.fullName = this.donationData.
        this.message = this.donationData.message;
        this.hidden = this.donationData.hideDonator;
        this.donationId = this.donationData._uid;

        this.isWaitingPayment = true;
        this.step = 3;
      }
    },
    copyURL(text: string) {
      return copyToClipboard(text)
        .then(() => alert?.('copied to clipboard!'));
    },
  },
  watch: {
    donationData: {
      handler() {
        this.syncDonationData();
      },
      immediate: true,
    },
    paymentStatus: {
      handler() {
        switch (this.paymentStatus) {
          case 'accepted':
            this.isWaitingPayment = false;
            this.isDisableFinish = false;

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.nextStep();
            break;

          case 'fail':
            this.isWaitingPayment = false;
            this.isDisableFinish = false;

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.nextStep();
            break;

          default:
            break;
        }
      },
      immediate: true,
    },
  },
  components: {
    MinimalistLayout,
    CardProgram,
    Money,
    SocialShare,
  },
});
</script>
