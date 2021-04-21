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
              <div class="grid gap-y-4 mx-2 md:z-0">
                <span class="font-medium text-3xl md:text-4xl">
                  #HADIR UNTUK KEBAIKAN
                </span>

                <div>
                  <h1 class="font-extrabold text-4xl break-words md:text-7xl">
                    BERSAMABISA.ID
                  </h1>
                </div>

                <div class="font-medium text-xl md:text-2xl">
                  <p>BERSAMA HADIRKAN KEBAIKAN UNTUK</p>
                  <p>INDONESIA YANG LEBIH BERDAYA</p>
                </div>
              </div>
              <q-btn
                label="GET STARTED"
                color="positive"
                class="rounded-lg shadow mt-4"
                unelevated
              />
            </div>
          </div>

          <nav class="absolute top-0 right-0 w-full">
            <base-navbar transparent />
          </nav>
        </header>

        <main class="w-full">
          <section class="py-4">
            <div class="absolute w-full h-screen bg-transparent" />
            <div class="container relative mx-auto px-4">
              <div class="flex justify-center q-pa-md">
                <div class="text-center">
                  <h6 class="text-4xl font-bold text-blue-900">
                    PROGRAM KAMI
                  </h6>
                  <span class="text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </span>
                </div>
              </div>

              <div class="py-8 flex justify-center">
                <vue-glide
                  v-if="!isLoading && programCommonData.length"
                  type="carousel"
                  :per-view="4"
                  :breakpoints="{
                    640: { perView: 1 },
                    1023: { perView: 2 },
                    1280: { perView: 3 }
                  }"
                  class="px-2"
                >
                  <vue-glide-slide
                    v-for="(el, i) in programCommonData"
                    :key="`${i}-${el.title}`"
                  >
                    <card-program
                      :title="el.title"
                      :caption="extractTextFromHTML(el.description)"
                      :url="el.URL"
                      :img-url="el.image.URL"
                      v-bind="el"
                      action-label="Lihat detail"
                    />
                  </vue-glide-slide>

                  <template #control>
                    <button
                      data-glide-dir="<"
                      class="glide__arrow glide__arrow--left justify-self-start"
                    >
                      <q-icon
                        name="keyboard_arrow_left"
                        size="lg"
                        color="white"
                      />
                    </button>
                    <button
                      data-glide-dir=">"
                      class="glide__arrow glide__arrow--right"
                    >
                      <q-icon
                        name="keyboard_arrow_right"
                        size="lg"
                        color="white"
                      />
                    </button>
                  </template>
                </vue-glide>
              </div>
            </div>
          </section>

          <section class="relative py-4">
            <img
              :src="require('assets/images/donasiPicture.png')"
              class="absolute top-0 w-full h-full object-cover"
            >
            <div
              class="absolute top-0 w-full h-full"
              style="background: linear-gradient(111.05deg, rgba(26, 41, 128, 0.79) -5.69%, rgba(38, 208, 206, 0.79) 97.93%);"
            />

            <div class="container relative mx-auto px-4">
              <div class="flex justify-center q-pa-md">
                <div class="text-center">
                  <h6 class="text-4xl text-white font-bold">
                    DONASI
                  </h6>
                  <span class="text-lg text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </span>
                </div>
              </div>
              <div class="py-8 flex justify-center">
                <vue-glide
                  v-if="!isLoading && programDonationData.length"
                  type="carousel"
                  :per-view="4"
                  :breakpoints="{
                    640: { perView: 1 },
                    1023: { perView: 2 },
                    1280: { perView: 3 }
                  }"
                  class="px-2"
                >
                  <vue-glide-slide
                    v-for="(el, i) in programDonationData"
                    :key="`${i}-${el.title}`"
                  >
                    <card-program
                      :title="el.title"
                      :caption="extractTextFromHTML(el.description)"
                      :url="el.URL"
                      :img-url="el.image.URL"
                      v-bind="el"
                      action-label="Lihat detail"
                    />
                  </vue-glide-slide>

                  <template #control>
                    <button
                      data-glide-dir="<"
                      class="glide__arrow glide__arrow--left justify-self-start"
                    >
                      <q-icon
                        name="keyboard_arrow_left"
                        size="lg"
                        color="white"
                      />
                    </button>
                    <button
                      data-glide-dir=">"
                      class="glide__arrow glide__arrow--right"
                    >
                      <q-icon
                        name="keyboard_arrow_right"
                        size="lg"
                        color="white"
                      />
                    </button>
                  </template>
                </vue-glide>
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
  defineComponent, ref, onMounted,
} from '@vue/composition-api';
import { Glide, GlideSlide } from 'vue-glide-js';
import BaseNavbar from 'components/BaseNavbar.vue';
import BaseFooter from 'components/BaseFooter.vue';
import CardProgram from 'components/CardProgram.vue';
import firestoreCollection, { modelToObject } from 'src/firestoreCollection';
import { resolveProgramCollectionImage } from 'src/firestoreApis';
import { StorageFileMetadata } from 'src/composables/useStorage';
import { extractTextFromHTML } from 'shared/utils/dom';
import { Singleton } from 'shared/utils/pattern';
import type { ModelInObject } from 'shared/types/model';
import type { ProgramDonation, ProgramCommon } from 'shared/types/modelData';

type TprogramCommonDataOri = ModelInObject<ProgramCommon>;
type TprogramDonationDataOri = ModelInObject<ProgramDonation>;

interface IprogramCommonData extends Omit<TprogramCommonDataOri, 'image'> {
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
  const programCommonData = ref<IprogramCommonData[]>([]);
  const programDonationData = ref<IprogramDonationData[]>([]);
  const isLoading = ref(true);
  const toggleLoading = (load = !isLoading.value) => {
    isLoading.value = load;
  };
  const programCommonQuery = firestoreCollection.Programs;
  const programDonationQuery = firestoreCollection.Programs.where('donation', '==', true);

  const syncData = async () => {
    toggleLoading(true);
    const [commonData, donationData] = await Promise.all([programCommonQuery.get(), programDonationQuery.get()]);
    const commonDataInObj = commonData.docs.map(modelToObject) as TprogramCommonDataOri[];
    const donationDataInObj = donationData.docs.map(modelToObject) as TprogramDonationDataOri[];
    programCommonData.value = await resolveProgramCollectionImage(commonDataInObj);
    programDonationData.value = await resolveProgramCollectionImage(donationDataInObj);
    toggleLoading(false);
  };

  return {
    programCommonData,
    programDonationData,
    isLoading,
    syncData,
  };
});

export default defineComponent({
  name: 'PageHome',
  setup() {
    const {
      programCommonData, programDonationData, isLoading, syncData,
    } = setupData.value;

    onMounted(() => syncData());

    return {
      programCommonData,
      programDonationData,
      isLoading,
      extractTextFromHTML,
    };
  },
  preFetch() {
    setupData.value.syncData()
      .finally(null);
  },
  components: {
    BaseFooter,
    BaseNavbar,
    CardProgram,
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
  },
});
</script>

<style lang="scss">
@import '~@glidejs/glide/src/assets/sass/glide.core';
@import '~@glidejs/glide/src/assets/sass/glide.theme';

@layer components {
  .card-program__grid {
    @apply flex grid-flow-col auto-cols-min object-contain gap-0;

    > div:not(:first-child) {
      @apply -ml-32;
    }

    @screen sm {
      @apply gap-5;

      > div:not(:first-child) {
        @apply m-0;
      }
    }
  }
}
</style>
