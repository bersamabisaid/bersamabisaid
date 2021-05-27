<template>
  <MinimalistLayout>
    <q-page
      padding
      class="pt-5 pb-20 bg-secondary flex flex-col items-center gap-y-6"
    >
      <div class="sticky top-10 flex flex-col items-center">
        <h3 class="font-medium text-xl text-center text-white">
          Anda akan berdonasi untuk program
        </h3>

        <CardProgram
          :title="data.program.title"
          :caption="extractTextFromHTML(data.program.description)"
          :url="data.program.URL"
          :loading="isLoading"
          :img-url="data.programThumbnailSrc"
          no-action
        />
      </div>

      <q-stepper
        ref="stepper"
        v-model="step"
        color="primary"
        animated
        vertical
        class="sticky top-10 w-full max-w-screen-md rounded-xl"
      >
        <q-step
          :name="1"
          title="Nominal Donasi"
          icon="attach_money"
          active-icon="attach_money"
          :done="step > 1"
        >
          <FormAmount />
        </q-step>

        <q-separator spaced />

        <template #navigation>
          <q-stepper-navigation>
            <div class="flex flex-row justify-end gap-x-4">
              <q-btn
                v-if="step > 1 && !data.donation && step < 4"
                label="Sebelumnya"
                :disable="isWaitingPayment"
                flat
                class="!bg-primary text-white rounded-lg"
                @click="previousStep"
              />

              <q-btn
                :label="step > 2 ? 'Selesai' : 'Selanjutnya'"
                :disable="step > 2 && isDisableFinish"
                unelevated
                class="!bg-primary text-white rounded-lg"
                @click="nextStep"
              />
            </div>
          </q-stepper-navigation>
        </template>

        <q-inner-loading :showing="isLoading" />
      </q-stepper>
    </q-page>
  </MinimalistLayout>
</template>

<script lang="ts">
import {
  defineComponent, reactive, watch, computed, toRefs,
} from 'vue';
import { useRoute, useRouter, isNavigationFailure } from 'vue-router';
import { Notify, copyToClipboard } from 'quasar';
import MinimalistLayout from 'layouts/MinimalistLayout.vue';
import CardProgram from 'components/CardProgram.vue';
import FormAmount from 'components/ui/Pay/FormAmount.vue';
import { getProgramByUrl, programDataDefaults } from 'src/firestoreFactories';
import { firestoreClient, storageClient } from 'src/firebaseClientService';
import useCountdown from 'composables/useCountdown';
import { getStorageFile } from 'shared/firebase/storageClient';
import { isProgramDonation } from 'shared/types/schema';
import { extractTextFromHTML } from 'shared/utils/browser/dom';
import type { LocationQuery } from 'vue-router';
import type { QForm, QField, QStepper } from 'quasar';
import type { Model, ModelInObject } from 'shared/types/model';
import type { Donation, ProgramDonation, PaymentStatus } from 'shared/types/schema';
import type { Snapshot } from 'shared/firebase/firestoreCollection';

interface PossiblePageQuery extends LocationQuery {
  programId: string;
  donationId: string;
}

// eslint-disable-next-line no-unused-vars
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
  name: 'PagePay',
  components: {
    MinimalistLayout,
    CardProgram,
    FormAmount,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const pageQuery = computed(() => route.query as PossiblePageQuery);
    const donationId = computed({
      get: () => pageQuery.value.donationId,
      set: (val) => router.replace({ query: { ...pageQuery.value, donationId: val } })
        .catch((err) => Notify.create({
          message: isNavigationFailure(err) ? err.message : String(err),
          type: 'negative',
        })),
    });
    const programRef = computed(() => firestoreClient.collections.Programs.doc(pageQuery.value.programId));
    const data = reactive({
      program: { ...programDataDefaults.donationModelData(), _uid: '' } as ModelInObject<Model<ProgramDonation>>,
      donation: null as (ModelInObject<Model<Donation>> | null),
      programThumbnailSrc: '',
    });
    const state = reactive({
      isLoading: true,
      isWaitingPayment: true,
      isDisableFinish: true,
    });
    const [redirectCounter, redirectCounterStart] = useCountdown();

    const updateProgramData = async (id: string) => {
      try {
        const snapshot = await getProgramByUrl(id) || await programRef.value.get();

        if (snapshot && firestoreClient.utils.isSnapshotExists(snapshot)) {
          data.program = firestoreClient.utils.modelToObject(snapshot as Snapshot.ProgramDonationModel);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    };

    const updateDonationData = async () => {
      try {
        const snapshot = await firestoreClient.collections
          .Donations(programRef.value)
          .doc(donationId.value).get();

        if (firestoreClient.utils.isSnapshotExists(snapshot)) {
          data.donation = firestoreClient.utils.modelToObject(snapshot);

          await updateProgramData(data.donation.program.id);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    };

    watch(pageQuery, async (newVal, oldVal) => {
      state.isLoading = true;

      try {
        // prior to get data from donationId then watch the diff
        if ((newVal.donationId !== oldVal?.donationId) && newVal.donationId) {
          await updateDonationData();
        } else if ((newVal.programId !== oldVal?.programId) && newVal.programId) {
          await updateProgramData(newVal.programId);
        }
      } catch (err) {
        Notify.create({ message: String(err) });
      } finally {
        state.isLoading = false;
        // if programData is exists
        if (!(isProgramDonation(data.program) && data.program._uid)) {
          router.push({ name: '404' })
            .finally(() => Notify.create('invalid arguments!'));
        }
      }
    }, { immediate: true });

    watch(() => data.program, async ({ image }) => {
      if (image) {
        const { URL } = await getStorageFile(storageClient.storage.ref(image));

        data.programThumbnailSrc = URL;
      } else {
        data.programThumbnailSrc = '';
      }
    }, { immediate: true });

    return {
      data,
      ...toRefs(state),
      redirectCounter,
      redirectCounterStart,

      extractTextFromHTML,
    };
  },
  data() {
    return {
      step: 1,
    };
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
      // return payDonation({
      //   programId: this.programData._uid,
      //   programName: this.programData.title,
      //   amount: this.amount,
      //   message: this.message,
      //   donator: {
      //     fullName: this.fullName,
      //     email: this.email,
      //     phoneNumber: this.phoneNumber,
      //     address: {
      //       country: 'Indonesia',
      //       province: this.province,
      //       city: this.city,
      //       streetAddress: '',
      //       zipCode: 0,
      //     },
      //   },
      //   hideDonator: this.hidden,
      //   finishPaymentRedirectURL: this.paymentURL,
      // });
    },
    // async pay() {
    pay() {
      this.isWaitingPayment = true;
      // try {
      //   if (!this.donationData && !this.paymentRedirectURL) {
      //     const { data: { redirectURL, donationId } } = await this.getPaymentRedirectURL();
      //     this.paymentRedirectURL = redirectURL;
      //     this.donationId = donationId;
      //   }

      //   this.redirectCounterStart(3000)
      //     .finally(() => {
      //       this.redirectCounter = 0;
      //       window.open(this.paymentRedirectURL, '_self');
      //     });
      // } catch (err) {
      //   Notify.create(err);
      //   this.isWaitingPayment = false;
      // }
    },
    syncDonationData() {
      // if (this.donationData) {
      //   this.amount = this.donationData.amount;
      //   // this.fullName = this.donationData.
      //   this.message = this.donationData.message;
      //   this.hidden = this.donationData.hideDonator;
      //   this.donationId = this.donationData._uid;

      //   this.isWaitingPayment = true;
      //   this.step = 3;
      // }
    },
    copyURL(text: string) {
      return copyToClipboard(text)
        .then(() => alert?.('copied to clipboard!'));
    },
  },
});
</script>
