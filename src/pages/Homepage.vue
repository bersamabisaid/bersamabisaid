<template>
  <q-layout view="lHh lpr lff">
    <q-page-container>
      <q-page>
        <header class="relative w-full h-screen flex content-center items-center justify-center">
          <img
            :src="require('assets/images/homepagePicture.png')"
            class="absolute w-full h-screen object-cover"
          >
          <div
            class="absolute w-full h-screen"
            style="background: linear-gradient(180deg, rgba(26, 41, 128, 0.79) 0%, rgba(38, 208, 206, 0.79) 100%);"
          />

          <div class="container relative mx-auto">
            <div class="text-white text-center justify-center">
              <div class="flex flex-col gap-y-2 mx-2 md:z-0">
                <span class="font-semibold text-2xl md:text-4xl tracking-tighter">
                  #HADIR UNTUK KEBAIKAN
                </span>

                <h1 class="font-extrabold text-4xl sm:text-5xl break-words md:text-7xl">
                  BERSAMABISA.ID
                </h1>

                <div class="font-medium text-xl md:text-2xl tracking-tighter">
                  <p>Bersama hadirkan kebaikan untuk</p>
                  <p>Indonesia yang lebih berdaya</p>
                </div>
              </div>

              <q-btn
                label="Lihat program kami"
                unelevated
                class="mt-8 bg-positive rounded-lg shadow"
                :to="{hash: '#programListSection'}"
                @click="() => scrollToElement($refs.programListSection)"
              />
            </div>
          </div>

          <nav class="absolute top-0 right-0 w-full">
            <base-navbar transparent />
          </nav>
        </header>

        <main class="w-full">
          <section
            id="programListSection"
            ref="programListSection"
            class="pt-8 pb-10"
          >
            <div class="absolute w-full h-screen bg-transparent" />
            <div class="container relative mx-auto px-4 flex flex-col">
              <div class="flex justify-center pt-8">
                <h6 class="text-4xl font-bold text-blue-900">
                  PROGRAM KAMI
                </h6>
              </div>

              <div class="py-8 flex justify-center">
                <q-scroll-area
                  v-if="isLoading || allProgramData.length"
                  horizontal
                  class="card-program__grid__scroll-area"
                >
                  <div class="card-program__grid">
                    <template v-if="isLoading">
                      <card-program
                        v-for="i in 8"
                        :key="i"
                        loading
                      />
                    </template>

                    <template v-else>
                      <card-program
                        v-for="(el, i) in allProgramData"
                        :key="`${i}-${el.title}`"
                        :title="el.title"
                        :caption="extractTextFromHTML(el.description)"
                        :url="el.URL"
                        :img-url="el.image.URL"
                        :action-label="el.donation ? 'Donasi sekarang' : 'Selengkapnya'"
                      />

                      <q-card
                        v-ripple
                        class="card-program--more"
                      >
                        <router-link
                          :to="{name: 'ProgramList'}"
                          class="h-full flex flex-col justify-center items-center"
                        >
                          <q-btn
                            label="Lihat program lainnya"
                            flat
                            :ripple="false"
                            class="text-primary rounded-lg"
                          />
                        </router-link>
                      </q-card>
                    </template>
                  </div>
                </q-scroll-area>

                <div
                  v-else
                  class="w-full h-48 border-2 rounded-xl flex flex-col justify-center items-center"
                >
                  <span class="font-medium text-dark">TIDAK DAPAT MENAMPILKAN DAFTAR 😥</span>
                  <q-btn
                    label="laporkan kesalahan"
                    flat
                    size="xs"
                    class="text-primary"
                    @click="reportUnloadedProgramList"
                  />
                </div>
              </div>
            </div>
          </section>

          <section
            id="donationProgramListSection"
            class="relative pt-8 pb-10"
          >
            <img
              :src="require('assets/images/donasiPicture.png')"
              class="absolute top-0 w-full h-full object-cover"
            >
            <div
              class="absolute top-0 w-full h-full"
              style="background: linear-gradient(111.05deg, rgba(26, 41, 128, 0.79) -5.69%, rgba(38, 208, 206, 0.79) 97.93%);"
            />

            <div class="container relative mx-auto px-4 flex flex-col">
              <div class="flex justify-center pt-8">
                <h6 class="text-4xl text-white font-bold">
                  MARI BERDONASI!
                </h6>
              </div>

              <div class="py-9 flex justify-center">
                <q-scroll-area
                  v-if="isLoading || programDonationData.length"
                  horizontal
                  class="card-program__grid__scroll-area"
                >
                  <div class="card-program__grid">
                    <template v-if="isLoading">
                      <card-program
                        v-for="i in 8"
                        :key="i"
                        loading
                      />
                    </template>

                    <template v-else>
                      <card-program
                        v-for="(el, i) in programDonationData"
                        :key="`${i}-${el.title}`"
                        :title="el.title"
                        :caption="extractTextFromHTML(el.description)"
                        :url="el.URL"
                        :img-url="el.image.URL"
                        action-label="Donasi sekarang"
                      />
                    </template>

                    <q-card
                      v-ripple
                      class="card-program--more border-t-0"
                    >
                      <router-link
                        :to="{name: 'ProgramList', query: { category: 'donasi' } }"
                        class="h-full flex flex-col justify-center items-center"
                      >
                        <q-btn
                          label="Lihat program donasi lainnya"
                          outline
                          :ripple="false"
                          class="w-3/5 text-white rounded-lg"
                        />
                      </router-link>
                    </q-card>
                  </div>
                </q-scroll-area>

                <div
                  v-else
                  class="w-full h-48 bg-white bg-opacity-30 border-2 rounded-xl backdrop-filter backdrop-blur-md flex flex-col justify-center items-center"
                >
                  <span class="font-medium text-red-500">TIDAK DAPAT MENAMPILKAN DAFTAR 😥</span>
                  <q-btn
                    label="laporkan kesalahan"
                    flat
                    size="xs"
                    class="text-primary"
                    @click="reportUnloadedProgramList"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </q-page>
    </q-page-container>

    <base-footer />
  </q-layout>
</template>

<script lang="ts">
import {
  defineComponent, ref, computed, watch,
} from '@vue/composition-api';
import { scroll } from 'quasar';
import BaseNavbar from 'components/BaseNavbar.vue';
import BaseFooter from 'components/BaseFooter.vue';
import CardProgram from 'components/CardProgram.vue';
import firestoreCollection, { modelToObject } from 'src/firestoreCollection';
import { resolveProgramCollectionImage } from 'src/firestoreApis';
import useCollection from 'src/composables/useCollection';
import { extractTextFromHTML } from 'shared/utils/dom';
import { Singleton } from 'shared/utils/pattern';
import type { StorageFileMetadata } from 'src/composables/useStorage';
import type { ModelInObject } from 'shared/types/model';
import type { ProgramDonation, Program } from 'shared/types/modelData';

type TallProgramDataOri = ModelInObject<Program>;
type TprogramDonationDataOri = ModelInObject<ProgramDonation>;

interface IallProgramData extends Omit<TallProgramDataOri, 'image'> {
  image: {
    URL: string;
    metadata: StorageFileMetadata;
  }
}

interface IprogramDonationData extends Omit<TprogramDonationDataOri, 'image'> {
  image: {
    URL: string;
    metadata: StorageFileMetadata;
  }
}

const setupData = new Singleton(() => {
  const [programData, isLoading, , updateProgramData] = useCollection(
    firestoreCollection.Programs
      .where('_deleted', '==', null)
      .limit(8),
    { mapper: modelToObject },
  );
  const allProgramData = ref<IallProgramData[]>([]);
  const programDonationData = computed(() => allProgramData.value
    .filter(({ donation }) => donation) as IprogramDonationData[]);
  const toggleLoading = (load = !isLoading.value) => {
    isLoading.value = load;
  };
  const getUpdatedImage = async () => {
    toggleLoading(true);
    allProgramData.value = await resolveProgramCollectionImage(programData.value);
    toggleLoading(false);
  };

  watch(programData, () => getUpdatedImage());

  return {
    allProgramData,
    programDonationData,
    isLoading,
    updateProgramData,
  };
});

const scrollToElement = (el: HTMLElement, duration = 350) => {
  const target = scroll.getScrollTarget(el);
  const offset = el.offsetTop;
  scroll.setScrollPosition(target, offset, duration);
};

export default defineComponent({
  name: 'PageHome',
  setup() {
    const {
      allProgramData, programDonationData, isLoading,
    } = setupData.value;

    return {
      allProgramData,
      programDonationData,
      isLoading,

      extractTextFromHTML,
      scrollToElement,
    };
  },
  preFetch({ ssrContext }) {
    if (ssrContext) {
      return setupData.value.updateProgramData();
    }

    return undefined;
  },
  methods: {
    reportUnloadedProgramList() {
      window.open('http://wa.me/6285156348055');
    },
  },
  components: {
    BaseFooter,
    BaseNavbar,
    CardProgram,
  },
});
</script>

<style lang="scss">
@layer components {
  .card-program__grid {
    @apply px-8 py-8 flex grid-flow-col auto-cols-min object-contain gap-x-8;

    &__scroll-area {
      @apply w-full max-w-screen-xl;
      height: theme('maxWidth.lg');
    }

    @screen sm {
      @apply pr-8 gap-x-14;

      > div.card-program {
        @apply shadow-lg;
      }

      > div.card-program:not(:first-child) {
        @apply m-0;
      }
    }
  }

  .card-program--more {
    @apply w-72 bg-white bg-opacity-25 rounded-2xl border-t border-gray-100 shadow-lg flex flex-col transition-shadow;
    @apply backdrop-filter backdrop-blur-md;

    &:hover {
      @apply shadow-2xl;
    }
  }
}
</style>
