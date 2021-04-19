<template>
  <q-page
    padding
    class="page-event pb-32 flex flex-col justify-center items-center"
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
              {{ eventData.title }}
            </h1>
            <div class="text-xs text-blue-gray-300">
              <span>Penanggung jawab: </span>
              <router-link
                :to="{name: 'ProgramList', query: {organizer: eventData.organizer}}"
                class="font-bold text-blue-gray-400 hover:underline"
              >
                {{ eventData.organizer }}
              </router-link>
            </div>
          </template>
        </div>

        <div
          v-if="eventData.donation"
          class="w-full px-4 pt-3 lg:pt-2 flex flex-col"
        >
          <div class="pb-2 flex justify-between">
            <div>
              <span class="font-bold text-positive">{{ toIdr(eventData._ui.progress.value, 0) }}</span>
              <span class="font-normal"> terkumpul</span>
            </div>
            <span
              v-if="eventData.target"
              class="font-bold text-positive"
            >
              {{ toIdr(eventData.target, 0) }}
            </span>
          </div>

          <div
            v-if="eventData.target"
            class="flex flex-nowrap items-center gap-x-2"
          >
            <q-linear-progress
              :value="progressPercentage"
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
              v-if="eventData.donation"
              name="donatur"
              :label="`Donatur (${donaturList.length})`"
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
                v-html="eventData.description"
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
              v-if="eventData.donation"
              name="donatur"
            >
              <q-list class="flex flex-col gap-y-4">
                <template v-if="donaturList.length">
                  <donation-item
                    v-for="(el, i) in donaturList"
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
                  <b class="text-lg text-primary">{{ eventData.title }}</b>
                  <q-btn
                    label="donasi sekarang"
                    :to="donateActionURL"
                    flat
                    class="self-center bg-positive text-white rounded-lg"
                  />
                </div>
              </q-list>
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
  defineComponent, ref, onMounted, computed,
} from '@vue/composition-api';
import { Loading, date } from 'quasar';
import { preFetch } from 'quasar/wrappers';
import { mdiFacebook, mdiWhatsapp, mdiTwitter } from '@quasar/extras/mdi-v5';
import SocialShare from 'components/SocialShare.vue';
import DonationItem, { DonationItemProps } from 'components/ui/Event/DonationItem.vue';
import NewsItem from 'components/ui/Event/NewsItem.vue';
import { eventDataRepo } from 'src/dataRepositories';
import { getEventByURL } from 'src/firestoreApis';
import { storageRef } from 'src/services/firebaseService';
import { getStorageFile } from 'src/composables/useStorage';
import { Singleton } from 'shared/utils/pattern';
import { toIdr } from 'shared/utils/formatter';
import {
  Event, EventDonation, EventNews, isEventDonation,
} from 'shared/types/modelData';
import type { RawLocation } from 'vue-router';
import type { Store } from 'vuex';
import type { StateInterface } from 'src/store';
import type { Model } from 'shared/types/model';

const getEvent = async (programURL: string) => {
  const eventDoc = await getEventByURL(programURL);

  if (eventDoc) {
    const docData = eventDoc.data();
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
  const data = ref<Model<Event>>(eventDataRepo.defaultCommonModelData());
  const imgURL = ref('');

  /**
   * Return true if there's data update
   */
  const syncData = async (programURL: string) => {
    called.value = true;
    const eventData = await getEvent(programURL);

    if (eventData) {
      data.value = eventData.data;
      imgURL.value = eventData.imgURL;

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

const news: EventNews[] = [];

const donaturList: DonationItemProps[] = [];

export default defineComponent({
  name: 'PageEventDetail',
  setup(props, { root }) {
    const {
      data, imgURL, syncData, called,
    } = setupData.value;
    const isDataLoading = ref(true);

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

    return {
      eventData: data,
      imgURL,
      toIdr,
      news,
      donaturList,
      isDataLoading,

      mdiFacebook,
      mdiWhatsapp,
      mdiTwitter,
    };
  },
  preFetch: preFetch<Store<StateInterface>>(async ({ currentRoute, ssrContext, redirect }) => {
    if (ssrContext) {
      Loading.show();
      const eventId = currentRoute.params.programURL;
      const isInitialized = await setupData.value.syncData(eventId);

      Loading.hide();

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
          eventId: this.programURL,
        },
      };
    },
    dayRemaining(): number {
      if ((this.eventData as EventDonation).deadline) {
        const deadlineDate = (this.eventData as EventDonation).deadline!.toDate();
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
      if (isEventDonation(this.eventData)) {
        const progress = this.eventData._ui.progress.value || this.eventData.target || 0;
        const target = this.eventData.target || 1;

        return (progress / target) * 100;
      }

      return 0;
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
    @apply w-screen max-w-screen-sm mx-2 px-4 pt-3 pb-1 bg-white flex gap-x-1;
    @apply border-t-2 border-l border-r border-blue-gray-300 rounded-t-xl shadow-2xl;

    @screen lg {
      @apply w-auto p-4 flex-col items-end border-none rounded-none gap-y-4;
    }

    @screen xl {
      @apply px-8 py-10;
    }
  }

  // scoping quasar override
  .page-event {
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
