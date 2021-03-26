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
        <h1 class="mt-2 mb-3 lg:m-2 pl-4 lg:pl-6 py-2 font-extrabold text-4xl text-primary border-l-4 border-positive">
          Pray for Uyghur
        </h1>

        <div class="w-full px-4 pt-3 lg:pt-2 flex flex-col">
          <div class="pb-2 flex justify-between">
            <div>
              <span class="font-bold text-positive">Rp 1000 0000</span>
              <span class="font-normal"> terkumpul</span>
            </div>
            <span class="font-bold text-positive">Rp 2000 0000</span>
          </div>

          <q-linear-progress :value=".6" />

          <span class="self-end mt-1.5 text-sm lg:text-base text-dark text-opacity-60">tersisa 7 hari lagi</span>
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
              name="donatur"
              label="Donatur (2313)"
              class="program__tab"
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels
            v-model="tab"
            animated
            class="py-4 px-2 md:p-6 bg-secondary bg-opacity-70 rounded-b-xl"
          >
            <q-tab-panel name="tentang">
              <article>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
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
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    title="Event Title"
                    subtitle="February 21, 1986"
                  >
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
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
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    title="Event Title"
                    subtitle="February 22, 1986"
                  >
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    title="Event Title"
                    subtitle="February 22, 1986"
                    color="orange"
                  >
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    title="Event Title"
                    subtitle="February 22, 1986"
                  >
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    title="Event Title"
                    subtitle="February 22, 1986"
                  >
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
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
import { defineComponent } from '@vue/composition-api';
import { mdiFacebook, mdiWhatsapp, mdiTwitter } from '@quasar/extras/mdi-v5';
import SocialShare from 'components/SocialShare.vue';
import type { RawLocation } from 'vue-router';

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
    donateActionURL(): RawLocation {
      return {
        name: 'Payment',
        query: {
          eventId: this.programUrl,
        },
      };
    },
  },
  mounted() {
    if (this.$route.query.tab) {
      this.tab = this.$route.query.tab as string;
    }
  },
  components: {
    SocialShare,
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

  // quasar override
  .q-timeline {
    &__content {
      @apply mb-4 py-4 px-6 bg-white rounded-2xl shadow-sm;
    }
  }
}
</style>
