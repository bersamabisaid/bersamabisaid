<template>
  <q-page
    padding
    class="page-program pb-32 flex flex-col justify-center items-center"
  >
    <q-card
      tag="article"
      flat
      class="w-full max-w-4xl mr-32 border-b-8 border-r-2 border-info rounded-3xl shadow"
    >
      <q-img
        :src="imgURL"
        :ratio="16/9"
        class="bg-blue-gray-200"
      >
        <template #loading>
          <q-skeleton class="w-full h-full" />
        </template>
      </q-img>

      <q-card-section>
        <div class="mt-2 mb-3 lg:m-2 pl-4 lg:pl-6 py-2 border-l-4 border-positive">
          <div
            v-if="isDataLoading"
            class="w-full max-w-md"
          >
            <q-skeleton class="h-9" />
            <q-skeleton
              type="text"
              class="max-w-sm"
            />
          </div>
          <template v-else>
            <h1 class="font-extrabold text-4xl text-primary">
              {{ programData.title }}
            </h1>
            <div class="text-xs text-blue-gray-300">
              <span>Penanggung jawab: </span>
              <router-link
                :to="{name: 'ProgramList', query: {organizer: programData.organizer}}"
                class="font-bold text-blue-gray-400 hover:underline"
              >
                {{ programData.organizer }}
              </router-link>
            </div>
          </template>
        </div>

        <div
          v-if="programData.donation"
          class="w-full px-4 pt-3 lg:pt-2 flex flex-col"
        >
          <div class="pb-2 flex justify-between">
            <div>
              <span class="font-bold text-positive">{{ toIdr(programData._ui.progress.value, 0) }}</span>
              <span class="font-normal"> terkumpul</span>
            </div>
            <span
              v-if="programData.target"
              class="font-bold text-positive"
            >
              {{ toIdr(programData.target, 0) }}
            </span>
          </div>

          <div
            v-if="programData.target"
            class="flex flex-nowrap items-center gap-x-2"
          >
            <q-linear-progress
              :value="progressPercentage"
              rounded
              class="w-full flex-grow"
            />
            <q-icon
              name="check_circle"
              size="xs"
              :class="[progressPercentage >= 100 ? 'text-positive' : 'text-blue-gray-300']"
            />
          </div>

          <span class="self-end mt-1.5 text-sm text-dark text-opacity-60">{{ dayRemainingMessage }}</span>
        </div>

        <section class="lg:px-2 pt-4 lg:pt-6 pb-10">
          <q-tabs
            v-model="tab"
            dense
            active-color="white"
            active-bg-color="warning"
            indicator-color="accent"
            align="justify"
            mobile-arrows
            class="program__tabs"
          >
            <q-tab
              name="tentang"
              label="Tentang"
              class="program__tab"
            />
            <q-tab
              name="berita"
              label="Berita"
              class="program__tab"
            />
            <q-tab
              v-if="programData.donation"
              name="donatur"
              :label="`Donatur (${programData._ui.numOfDonations.value})`"
              class="program__tab"
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels
            v-model="tab"
            keep-alive
            animated
            class="py-4 px-2 md:p-6 bg-secondary bg-opacity-70 rounded-b-xl"
          >
            <q-tab-panel
              name="tentang"
              class="bg-white rounded-xl shadow-sm"
            >
              <div
                v-if="isDataLoading"
                class="flex flex-col gap-y-2"
              >
                <q-skeleton type="rect" />
                <q-skeleton type="rect" />
                <q-skeleton
                  type="rect"
                  class="max-w-xs"
                />
              </div>
              <!-- eslint-disable vue/no-v-html -->
              <article
                v-else
                v-html="programData.description"
              />
              <!-- eslint-enable vue/no-v-html -->
            </q-tab-panel>

            <q-tab-panel name="berita">
              <article>
                <q-timeline color="secondary">
                  <template v-if="isDataLoading">
                    <q-timeline-entry
                      v-for="i in 3"
                      :key="i"
                    >
                      <div class="flex gap-x-3">
                        <q-skeleton
                          type="rect"
                          class="w-20 h-20"
                        />
                        <div class="flex-grow flex flex-col">
                          <q-skeleton type="rect" />
                          <q-skeleton type="text" />
                          <q-skeleton
                            type="text"
                            class="max-w-xs"
                          />
                        </div>
                      </div>
                    </q-timeline-entry>
                  </template>

                  <template v-else>
                    <template v-if="news.length">
                      <q-timeline-entry
                        v-for="(el, i) in news"
                        :key="`${i}-${el.title}`"
                        :title="el.title"
                        :subtitle="el.timestamp.toDate().toLocaleString()"
                      >
                        <news-item v-bind="el" />
                      </q-timeline-entry>
                    </template>

                    <div
                      v-else
                      class="p-4 bg-white text-center text-gray-400 rounded-xl"
                    >
                      Tidak ada berita untuk program ini
                    </div>
                  </template>
                </q-timeline>
              </article>
            </q-tab-panel>

            <q-tab-panel
              v-if="programData.donation"
              name="donatur"
              class="flex flex-col items-stretch gap-y-4"
            >
              <q-list class="flex flex-col gap-y-4">
                <template v-if="donationList.length">
                  <donation-item
                    v-for="(el, i) in donationList"
                    :key="`${i}-${el.name}`"
                    v-bind="el"
                  />
                </template>

                <div
                  v-else
                  class="p-4 bg-white text-center rounded-xl flex flex-col gap-y-2"
                >
                  <span class="text-gray-400">Belum ada donatur untuk sementara ini,</span>
                  <span class="text-gray-400">Jadilah yang pertama sebagai donatur</span>
                  <b class="text-lg text-primary">{{ programData.title }}</b>
                  <q-btn
                    label="donasi sekarang"
                    :to="donateActionURL"
                    flat
                    class="self-center bg-positive text-white rounded-lg"
                  />
                </div>
              </q-list>

              <q-btn
                v-if="!isMaximumReachedDonationList"
                label="Lihat lebih banyak"
                unelevated
                class="self-center bg-primary text-white rounded-lg"
                @click="onLoadMoreDonatur"
              />

              <q-inner-loading :showing="donationLoading" />
            </q-tab-panel>
          </q-tab-panels>
        </section>
      </q-card-section>
    </q-card>

    <q-page-sticky :position="$q.screen.width > $q.screen.sizes.md ? 'top-right' : 'bottom'">
      <div class="quick-action">
        <q-btn
          label="Bagikan"
          icon-right="share"
          flat
          no-caps
          class="lg:hidden bg-info font-semibold text-xl text-white rounded-none"
        />

        <q-btn
          v-if="programData.donation"
          label="Donasi sekarang"
          :to="donateActionURL"
          flat
          class="flex-grow bg-positive font-semibold text-xl lg:text-xl text-white rounded-none lg:shadow-sm"
        />

        <social-share
          :shared-url="url"
          class="hidden lg:flex"
        />
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent, ref, onMounted, computed, watch,
} from '@vue/composition-api';
import { date } from 'quasar';
import { preFetch } from 'quasar/wrappers';
import { mdiFacebook, mdiWhatsapp, mdiTwitter } from '@quasar/extras/mdi-v5';
import SocialShare from 'components/SocialShare.vue';
import DonationItem from 'components/ui/Program/DonationItem.vue';
import NewsItem from 'components/ui/Program/NewsItem.vue';
import firestoreCollection, { modelToObject } from 'src/firestoreCollection';
import { getProgramByURL } from 'src/firestoreApis';
import { programDataRepo } from 'src/dataRepositories';
import { storageRef } from 'src/services/firebaseService';
import { getStorageFile } from 'src/composables/useStorage';
import useCollectionPaginated from 'src/composables/useCollectionPaginated';
import { Singleton } from 'shared/utils/pattern';
import { toIdr } from 'shared/utils/formatter';
import {
  Program, ProgramDonation, ProgramNews, isProgramDonation, DonationUI,
} from 'shared/types/modelData';
import type { RawLocation } from 'vue-router';
import type { Store } from 'vuex';
import type { StateInterface } from 'src/store';
import type { Model, ModelInObject } from 'shared/types/model';

const getProgram = async (programURL: string) => {
  const programSnapshot = await getProgramByURL(programURL);

  if (programSnapshot) {
    const docData = modelToObject(programSnapshot);
    const { URL } = await getStorageFile(storageRef.root.child(docData.image));

    return {
      data: docData,
      imgURL: URL,
    };
  }

  return undefined;
};

const setupData = new Singleton(() => {
  const called = ref(false);
  const data = ref<ModelInObject<Model<Program>>>({ ...programDataRepo.defaultCommonModelData(), _uid: '' });
  const imgURL = ref('');

  /**
   * Return true if there's data update
   */
  const syncData = async (programURL: string) => {
    called.value = true;
    const programData = await getProgram(programURL);

    if (programData) {
      data.value = programData.data;
      imgURL.value = programData.imgURL;

      return true;
    }
    return false;
  };

  return {
    data,
    imgURL,
    syncData,
    called: computed(() => called.value),
  };
});

const news: ProgramNews[] = [];

export default defineComponent({
  name: 'PageProgramDetail',
  setup(props, { root }) {
    const {
      data, imgURL, syncData, called,
    } = setupData.value;
    const isDataLoading = ref(true);
    const programRef = computed(() => firestoreCollection.Programs.doc(data.value._uid || undefined));
    const donationList = ref<DonationUI[]>([]);
    const donationCollectionRef = computed(() => firestoreCollection.Donations(programRef.value));
    const [
      { data: donationDataList },
      { isLoading: donationLoading, done: isMaximumReachedDonationList },
      { next },
    ] = useCollectionPaginated(donationCollectionRef, {
      orderBy: '_created',
      perPage: 5,
      mapper(el) {
        const {
          _ui, amount, message, _created,
        } = el.data();
        return {
          name: _ui.donatorName.value.data,
          amount,
          message,
          timestamp: _created,
        } as DonationUI;
      },
    });

    onMounted(async () => {
      isDataLoading.value = true;
      if (!called.value) {
        const { programURL } = root.$route.params;
        const isInitialized = await syncData(programURL);

        if (!isInitialized) {
          await root.$router.push({ name: '404' });
        }
      }
      isDataLoading.value = false;
    });

    watch(donationDataList, (newVal) => donationList.value.push(...newVal));

    return {
      programData: data,
      imgURL,
      news,
      donationList,
      donationLoading,
      isMaximumReachedDonationList,
      isDataLoading,
      loadMoreDonaturList: next,

      toIdr,

      mdiFacebook,
      mdiWhatsapp,
      mdiTwitter,
    };
  },
  preFetch: preFetch<Store<StateInterface>>(async ({ currentRoute, ssrContext, redirect }) => {
    if (ssrContext) {
      const programId = currentRoute.params.programURL;
      const isInitialized = await setupData.value.syncData(programId);

      return isInitialized ? undefined : redirect({ name: '404' });
    }

    return undefined;
  }),
  data() {
    return {
      tab: 'tentang',
    };
  },
  computed: {
    programURL(): string {
      return this.$route.params.programURL;
    },
    url(): string {
      // eslint-disable-next-line no-restricted-globals
      const url = new URL(location?.href || 'http://localhost');
      url.pathname = this.$route.fullPath;
      return url.toString();
    },
    donateActionURL(): RawLocation {
      return {
        name: 'Payment',
        query: {
          programId: this.programURL,
        },
      };
    },
    dayRemaining(): number {
      if ((this.programData as ProgramDonation).deadline) {
        const deadlineDate = (this.programData as ProgramDonation).deadline!.toDate();
        const diff = date.getDateDiff(deadlineDate, new Date(), 'days');

        return diff;
      }

      return Infinity;
    },
    dayRemainingMessage(): string {
      return this.dayRemaining === Infinity
        ? '-'
        : `tersisa ${this.dayRemaining} hari lagi`;
    },
    progressPercentage(): number {
      if (isProgramDonation(this.programData)) {
        const progress = this.programData._ui.progress.value || this.programData.target || 0;
        const target = this.programData.target || 1;

        return (progress / target);
      }

      return 0;
    },
  },
  meta(this: Vue & {programData: Model<Program>, imgURL: string}) {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    const appTitle = this.programData?.title || 'Program Bersamabisa.ID';
    const appDesc = this.programData?.description || 'Program Bersamabisa.ID';
    const appKeywords = ['Donasi', 'Berbagi', 'Bersamabisa', appTitle].join();
    const appThumbnail = this.imgURL;

    return {
      title: appTitle,
      titleTemplate: (title: string) => `${title} | Program BersamaBisa.ID`,
      meta: {
        title: { name: 'title', content: appTitle },
        description: { name: 'description', content: appDesc },
        keywords: { name: 'keywords', content: appKeywords },
        // Open Graph / Facebook
        ogTitle: { name: 'og:title', content: appTitle },
        ogDesc: { name: 'og:description', content: appDesc },
        ogUrl: { name: 'og:url', content: this.$route.fullPath },
        ogImg: { name: 'og:image', content: appThumbnail },
        // Twitter
        twtCard: { name: 'twitter:card', content: 'summary_large_image' },
        twtTitle: { name: 'twitter:title', content: appTitle },
        twtDesc: { name: 'twitter:description', content: appDesc },
        twtUrl: { name: 'twitter:url', content: this.$route.fullPath },
        twtImg: { name: 'twitter:image', content: appThumbnail },
      },
    };
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  },
  methods: {
    onLoadMoreDonatur() {
      this.loadMoreDonaturList();
    },
  },
  mounted() {
    if (this.$route.query.tab) {
      this.tab = this.$route.query.tab as string;
    }
  },
  beforeRouteLeave(to, from, next) {
    setupData.reset();
    next();
  },
  components: {
    SocialShare,
    DonationItem,
    NewsItem,
  },
});

</script>

<style lang="scss">
@layer components {
  .program {
    &__tab {
      @apply bg-warning bg-opacity-60 text-primary text-opacity-90;

      &:first-child {
        @apply rounded-tl-xl;
      }
      &:last-child {
        @apply rounded-tr-xl;
      }

      // quasar override
      .q-tab__label {
        @apply py-2 md:text-lg;
      }
    }

    &__tabs {
      // quasar override
      .q-tabs__arrow {
        @apply text-blue-600;
      }
    }

  }

  .quick-action {
    @apply w-screen max-w-screen-sm mx-2 px-4 pt-3 pb-1 bg-white flex justify-end gap-x-1;
    @apply border-t-2 border-l border-r border-blue-gray-300 rounded-t-xl shadow-2xl;

    @screen lg {
      @apply w-auto p-4 flex-col items-end border-none rounded-none gap-y-4;
    }

    @screen xl {
      @apply px-8 py-10;
    }
  }

  // scoping quasar override
  .page-program {
    .q-tab-panel {
      min-height: theme('height.52');
    }

    .q-timeline {
      &__title {
        @apply mb-2 font-semibold text-primary;
      }

      &__content {
        @apply mb-4 py-4 px-6 bg-white rounded-2xl shadow-sm;
      }
    }

    .q-skeleton {
      @apply rounded-xl;
    }
  }
}
</style>
