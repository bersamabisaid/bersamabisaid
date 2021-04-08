<template>
  <q-page
    padding
    class="pb-32 flex flex-col justify-center items-center"
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
      />

      <q-card-section>
        <h1 class="mt-2 mb-3 lg:m-2 pl-4 lg:pl-6 py-2 font-extrabold text-4xl text-primary border-l-4 border-positive">
          {{ eventData.title }}
        </h1>

        <div
          v-if="eventData.donation"
          class="w-full px-4 pt-3 lg:pt-2 flex flex-col"
        >
          <div class="pb-2 flex justify-between">
            <div>
              <span class="font-bold text-positive">{{ toIdr(eventData._ui.progress.value, 0) }}</span>
              <span class="font-normal"> terkumpul</span>
            </div>
            <span class="font-bold text-positive">{{ eventData.target ? toIdr(eventData.target, 0) : '∞' }}</span>
          </div>

          <div class="flex flex-nowrap items-center gap-x-2">
            <q-linear-progress
              v-if="eventData.target"
              :value="progressPercentage"
              class="flex-grow"
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
              <!-- eslint-disable-next-line vue/no-v-html -->
              <article v-html="eventData.description" />
            </q-tab-panel>

            <q-tab-panel name="berita">
              <article>
                <q-timeline color="secondary">
                  <q-timeline-entry
                    v-for="(el, i) in news"
                    :key="`${i}-${el.title}`"
                    :title="el.title"
                    :subtitle="el.timestamp.toDate().toLocaleString()"
                  >
                    <news-item v-bind="el" />
                  </q-timeline-entry>

                  <q-timeline-entry heading>
                    November, 2017
                  </q-timeline-entry>
                </q-timeline>
              </article>
            </q-tab-panel>

            <q-tab-panel
              v-if="eventData.donation"
              name="donatur"
            >
              <q-list class="flex flex-col gap-y-4">
                <donation-item
                  v-for="(el, i) in donaturList"
                  :key="`${i}-${el.name}`"
                  v-bind="el"
                />
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </section>
      </q-card-section>

      <q-inner-loading :showing="isDataLoading" />
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
import firestoreCollection from 'src/firestoreCollection';
import { eventDataRepo } from 'src/dataRepositories';
import fbs, { storageRef } from 'src/services/firebaseService';
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

const getEventByURL = async (programURL: string) => {
  const query = firestoreCollection.Events.where('URL', '==', programURL).limit(1);
  const { docs: [eventDoc] } = await query.get();

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
    const eventData = await getEventByURL(programURL);

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

const news: EventNews[] = Array.from(Array(10), () => ({
  title: 'Event Title',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  timestamp: fbs.firestore.Timestamp.now(),
  ...(Math.random() > 0.5 ? { imgURL: 'https://picsum.photos/300' } : null),
}));

const donaturList: DonationItemProps[] = [
  {
    name: 'Djarwo',
    amount: 1_000_000,
    message: 'Lorem ipsum dolor sit amet',
    timestamp: fbs.firestore.Timestamp.now(),
  },
];

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
  preFetch: preFetch<Store<StateInterface>>(async ({ currentRoute, redirect }) => {
    Loading.show();
    const eventId = currentRoute.params.programURL;
    const isInitialized = await setupData.value.syncData(eventId);

    Loading.hide();

    return isInitialized ? undefined : redirect({ name: '404' });
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

  .q-timeline {
    &__title {
      @apply mb-2 font-semibold text-primary;
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

  // quasar override
  .q-timeline {
    &__content {
      @apply mb-4 py-4 px-6 bg-white rounded-2xl shadow-sm;
    }
  }
}
</style>
