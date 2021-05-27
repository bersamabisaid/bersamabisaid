<template>
  <q-page
    padding
    class="page-program"
  >
    <q-card
      tag="article"
      flat
      class="lg:mr-32 w-full max-w-3xl rounded-3xl !shadow-lg"
    >
      <q-img
        :src="imgUrl"
        :ratio="16/9"
        class="bg-blue-gray-100"
      >
        <template #loading>
          <q-skeleton class="w-full h-full" />
        </template>
      </q-img>

      <q-card-section>
        <div class="mt-2 mb-3 lg:m-2 pl-4 lg:pl-6 py-2 border-l-4 border-positive">
          <div
            v-if="isLoading"
            class="w-full max-w-md"
          >
            <q-skeleton class="h-9" />
            <q-skeleton
              type="text"
              class="max-w-sm"
            />
          </div>
          <template v-else>
            <h1 class="font-extrabold text-4xl !text-primary">
              {{ data.title }}
            </h1>
            <div class="text-xs text-blue-gray-300">
              <span>Penanggung jawab: </span>
              <router-link
                :to="{name: 'ProgramList', query: {organizer: data.organizer}}"
                class="font-bold text-blue-gray-400 hover:underline"
              >
                {{ data.organizer }}
              </router-link>
            </div>
          </template>
        </div>

        <div
          v-if="data.donation"
          class="w-full px-4 pt-3 lg:pt-2 flex flex-col"
        >
          <div class="pb-2 flex justify-between">
            <div>
              <span class="font-bold text-positive">{{ toIdr(data._ui.progress.value, 0) }}</span>
              <span class="font-normal"> terkumpul</span>
            </div>
            <span
              v-if="data.target"
              class="font-bold text-positive"
            >
              {{ toIdr(data.target, 0) }}
            </span>
          </div>

          <div
            v-if="data.target"
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
      </q-card-section>

      <q-card-section>
        <q-tabs
          v-model="tab"
          dense
          indicator-color="accent"
          align="justify"
          mobile-arrows
        >
          <q-tab
            name="tentang"
            label="Tentang"
          />
          <q-tab
            name="berita"
            label="Berita"
          />
          <q-tab
            v-if="data.donation"
            name="donatur"
            :label="`Donatur (${data._ui.numOfDonations.value})`"
          />
        </q-tabs>

        <q-tab-panels
          v-model="tab"
          keep-alive
          animated
          class="py-4 px-2 md:p-6 bg-blue-gray-200 bg-opacity-60 rounded-b-xl"
        >
          <q-tab-panel
            name="tentang"
            class="bg-white rounded-xl shadow-sm"
          >
            <div
              v-if="isLoading"
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
              v-html="data.description"
            />
            <!-- eslint-enable vue/no-v-html -->
          </q-tab-panel>

          <q-tab-panel name="berita">
            <ListNews
              :data="[]"
              :loading="isLoading"
            />
          </q-tab-panel>

          <q-tab-panel
            v-if="data.donation"
            name="donatur"
            class="flex flex-col items-stretch gap-y-4"
          >
            <ListDonation
              :program-name="data.title"
              :donate-url="donateActionURL"
              :program-ref="data._uid"
            />
          </q-tab-panel>
        </q-tab-panels>
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
          v-if="data.donation"
          label="Donasi sekarang"
          :to="donateActionURL"
          flat
          class="flex-grow bg-positive font-semibold text-xl lg:text-xl text-white rounded-none lg:shadow-sm"
          :disable="isExpired"
        />

        <small
          v-if="isExpired"
          class="text-xs text-red-500 italic"
        >
          *Program ini telah selesai
        </small>

        <SocialShare
          :shared-url="url"
          class="hidden lg:!flex"
        />
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { date } from 'quasar';
import SocialShare from 'components/SocialShare.vue';
import ListNews from 'components/ui/Program/ListNews.vue';
import ListDonation from 'components/ui/Program/ListDonation.vue';
import { storageClient } from 'src/firebaseClientService';
import { getProgramByUrl, programDataDefaults } from 'src/firestoreFactories';
import { getStorageFile } from 'shared/firebase/storageClient';
import { isProgramDonation } from 'shared/types/schema';
import { toIdr } from 'shared/utils/browser/formatter';
import type { RouteLocationRaw } from 'vue-router';

export default defineComponent({
  name: 'PageProgram',
  components: {
    SocialShare,
    ListNews,
    ListDonation,
  },
  setup() {
    const route = useRoute();
    const [data, isLoading] = getProgramByUrl.hooks(
      route.params.programUrl as string,
      programDataDefaults.commonModelData(),
    );
    const imgUrl = ref('');

    watch(data, async ({ image }) => {
      const { URL } = await getStorageFile(storageClient.storage.ref(image));

      imgUrl.value = URL;
    });

    return {
      data,
      isLoading,
      imgUrl,

      toIdr,
    };
  },
  data() {
    return {
      tab: 'tentang',
    };
  },
  computed: {
    programURL(): string {
      return this.$route.params.programUrl as string;
    },
    url(): string {
      // eslint-disable-next-line no-restricted-globals
      const url = new URL(location?.href || 'http://localhost');
      url.pathname = this.$route.fullPath;
      return url.toString();
    },
    donateActionURL(): RouteLocationRaw {
      return {
        name: 'Payment',
        query: {
          programId: this.programURL,
        },
      };
    },
    dayRemaining(): number {
      if (isProgramDonation(this.data) && this.data.deadline) {
        const deadlineDate = this.data.deadline.toDate();
        const diff = date.getDateDiff(deadlineDate, new Date(), 'days');

        return diff;
      }

      return Infinity;
    },
    isExpired(): boolean {
      return this.dayRemaining < 0;
    },
    dayRemainingMessage(): string {
      return this.isExpired
        ? 'Yaah, kesempatan untuk berdonasi telah usai 😁🙏'
        : `tersisa ${this.dayRemaining === Infinity ? '∞' : this.dayRemaining} hari lagi`;
    },
    progressPercentage(): number {
      if (isProgramDonation(this.data)) {
        const progress = this.data._ui.progress.value || this.data.target || 0;
        const target = this.data.target || 1;

        return (progress / target);
      }

      return 0;
    },
  },
});
</script>

<style lang="sass" scoped>
.page-program
  @apply pb-32 flex flex-col items-center

  .q-skeleton
    @apply rounded-xl

  .q-tab
    @apply text-opacity-90
    &:first-child
      @apply rounded-tl-xl
    &:last-child
      @apply rounded-tr-xl

  .q-tab__label
    @apply py-2

    @screen md
      @apply text-lg

  .q-tabs
    &__arrow
      @apply text-blue-600

  .quick-action
    @apply w-screen max-w-screen-sm m-2 flex justify-end gap-x-1

    @screen lg
      @apply w-auto p-4 bg-white border border-blue-gray-300 rounded-md shadow-sm flex-col items-end gap-y-4

    @screen xl
      @apply px-8 py-10
</style>
