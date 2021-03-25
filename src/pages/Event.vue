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
        src="https://picsum.photos/600"
        :ratio="16/9"
      />

      <q-card-section>
        <h1 class="m-2 pl-6 py-2 font-extrabold text-4xl text-primary border-l-4 border-positive">
          Pray for Uyghur
        </h1>

        <div class="w-full px-4 pt-2 flex flex-col">
          <div class="flex justify-between">
            <div>
              <span class="font-bold text-positive">Rp 1000 0000</span>
              <span class="font-normal"> terkumpul</span>
            </div>
            <span class="font-bold text-positive">Rp 2000 0000</span>
          </div>

          <q-linear-progress :value=".6" />

          <span class="self-end font-dark">tersisa 7 hari lagi</span>
        </div>

        <section class="px-2 pt-6 pb-10">
          <q-tabs
            v-model="tab"
            dense
            class="text-white"
            active-color="white"
            active-bg-color="warning"
            indicator-color="accent"
            align="justify"
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
              name="donatur"
              label="Donatur (2313)"
              class="program__tab"
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels
            v-model="tab"
            animated
            class="p-6 bg-secondary bg-opacity-70 rounded-b-xl"
          >
            <q-tab-panel name="tentang">
              <article>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque obcaecati corporis commodi ipsa unde ad perspiciatis, rem corrupti, nulla amet est non laborum libero nobis totam dolorum! Blanditiis, doloribus!
              </article>
            </q-tab-panel>

            <q-tab-panel name="berita">
              <article>
                <q-timeline color="secondary">
                  <q-timeline-entry
                    title="Event Title"
                    subtitle="February 22, 1986"
                  >
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    title="Event Title"
                    subtitle="February 21, 1986"
                  >
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry heading>
                    November, 2017
                  </q-timeline-entry>

                  <q-timeline-entry
                    title="Event Title"
                    subtitle="February 22, 1986"
                  >
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    title="Event Title"
                    subtitle="February 22, 1986"
                  >
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    title="Event Title"
                    subtitle="February 22, 1986"
                    color="orange"
                  >
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    title="Event Title"
                    subtitle="February 22, 1986"
                  >
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    title="Event Title"
                    subtitle="February 22, 1986"
                  >
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </article>
            </q-tab-panel>

            <q-tab-panel name="donatur">
              <q-list class="flex flex-col gap-y-4">
                <q-item class="p-4 bg-white rounded-xl">
                  <q-item-section avatar>
                    <q-avatar
                      color="secondary"
                      text-color="white"
                    >
                      A
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>
                      <span class="font-medium">Djarwo</span>
                      <span class="ml-4 font-light text-xs text-gray-400 italic">2 min ago</span>
                    </q-item-label>
                    <q-item-label caption>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos laudantium, similique sed ab aliquid deserunt ipsa eveniet accusamus. Est, earum eligendi. Natus perferendis quis vel ad velit dolore. Temporibus, voluptates!
                      </p>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section
                    side
                    top
                    class="font-bold text-primary"
                  >
                    Rp 1000.0000
                  </q-item-section>
                </q-item>

                <q-item class="p-4 bg-white rounded-xl">
                  <q-item-section avatar>
                    <q-avatar
                      color="secondary"
                      text-color="white"
                    >
                      A
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>
                      <span class="font-medium">Djarwo</span>
                      <span class="ml-4 font-light text-xs text-gray-400 italic">10 Agustus 2001</span>
                    </q-item-label>
                    <q-item-label caption>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos laudantium, similique sed ab aliquid deserunt ipsa eveniet accusamus. Est, earum eligendi. Natus perferendis quis vel ad velit dolore. Temporibus, voluptates!
                      </p>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section
                    side
                    top
                    class="font-bold text-primary"
                  >
                    Rp 1000.0000
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </section>
      </q-card-section>
    </q-card>

    <q-page-sticky position="top-right">
      <div class="p-10 flex flex-col items-end gap-y-4">
        <q-btn
          label="Donasi sekarang"
          flat
          class="bg-positive font-semibold text-xl text-white rounded-none shadow-sm"
        />

        <div class="p-4 bg-info shadow-sm flex flex-col items-end gap-y-2">
          <div class="font-semibold text-xl text-white flex flex-row items-center gap-x-2">
            <q-icon name="share" />
            <span>Bagikan</span>
          </div>

          <div class="select-all truncate w-56 pl-2 pr-3 py-1 bg-blue-gray-200 font-light text-xs text-gray-700 rounded-xl">
            <q-btn
              icon="content_copy"
              size="xs"
              flat
              round
              class="mr-1"
              @click="shareToClipboard"
            />
            <span>{{ url }}</span>
          </div>

          <div class="w-full flex flex-row justify-center gap-x-2">
            <q-btn
              :icon="mdiWhatsapp"
              round
              flat
              class="text-white"
              @click="shareToWhatsapp"
            />
            <q-btn
              :icon="mdiFacebook"
              round
              flat
              class="text-white"
              @click="shareToFacebook"
            />
            <q-btn
              :icon="mdiTwitter"
              round
              flat
              class="text-white"
              @click="shareToTwitter"
            />
          </div>
        </div>
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { copyToClipboard } from 'quasar';
import { mdiFacebook, mdiWhatsapp, mdiTwitter } from '@quasar/extras/mdi-v5';

export default defineComponent({
  name: 'PageEventDetail',
  setup() {
    return {
      mdiFacebook,
      mdiWhatsapp,
      mdiTwitter,
    };
  },
  data() {
    return {
      tab: 'tentang',
    };
  },
  computed: {
    programUrl(): string {
      return this.$route.params.programUrl;
    },
    url(): string {
      // eslint-disable-next-line no-restricted-globals
      const url = new URL(location?.href || 'http://localhost');
      url.pathname = this.$route.fullPath;
      return url.toString();
    },
  },
  methods: {
    shareToClipboard() {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      copyToClipboard(this.url)
        .then(() => alert?.('copied to clipboard'));
    },
    shareToWhatsapp() {
      //
    },
    shareToFacebook() {
      //
    },
    shareToTwitter() {
      //
    },
  },
  mounted() {
    if (this.$route.query.tab) {
      this.tab = this.$route.query.tab as string;
    }
  },
});
</script>

<style lang="scss">
@layer components {
  .program {
    &__tab {
      @apply  bg-warning bg-opacity-60;

      &:first-child {
        @apply rounded-tl-xl;
      }
      &:last-child {
        @apply rounded-tr-xl;
      }

      // quasar override
      .q-tab__label {
        @apply py-2 text-lg;
      }
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
