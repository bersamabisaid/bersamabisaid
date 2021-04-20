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
                  v-if="!isLoading"
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
                    v-for="(el, i) in eventCommonData"
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
                  v-if="!isLoading"
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
                    v-for="(el, i) in eventDonationData"
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
import { extractTextFromHTML } from 'shared/utils/dom';
import { Singleton } from 'shared/utils/pattern';
import { StorageFileMetadata } from 'src/composables/useStorage';
import type { ModelInObject } from 'shared/types/model';
import type { EventDonation, EventCommon } from 'shared/types/modelData';
import { resolveEventCollectionImage } from 'src/firestoreApis';

type TeventCommonDataOri = ModelInObject<EventCommon>;
type TeventDonationDataOri = ModelInObject<EventDonation>;

interface IeventCommonData extends Omit<TeventCommonDataOri, 'image'> {
  image: {
    URL: string;
    metadata: StorageFileMetadata;
  }
}

interface IeventDonationData extends Omit<TeventDonationDataOri, 'image'> {
  image: {
    URL: string;
    metadata: StorageFileMetadata;
  }
}

const setupData = new Singleton(() => {
  const eventCommonData = ref<IeventCommonData[]>([]);
  const eventDonationData = ref<IeventDonationData[]>([]);
  const isLoading = ref(true);
  const toggleLoading = (load = !isLoading.value) => {
    isLoading.value = load;
  };
  const eventCommonQuery = firestoreCollection.Events;
  const eventDonationQuery = firestoreCollection.Events.where('donation', '==', true);

  const syncData = async () => {
    toggleLoading(true);
    const [commonData, donationData] = await Promise.all([eventCommonQuery.get(), eventDonationQuery.get()]);
    const commonDataInObj = commonData.docs.map(modelToObject) as TeventCommonDataOri[];
    const donationDataInObj = donationData.docs.map(modelToObject) as TeventDonationDataOri[];
    eventCommonData.value = await resolveEventCollectionImage(commonDataInObj);
    eventDonationData.value = await resolveEventCollectionImage(donationDataInObj);
    toggleLoading(false);
  };

  return {
    eventCommonData,
    eventDonationData,
    isLoading,
    syncData,
  };
});

export default defineComponent({
  name: 'PageHome',
  setup() {
    const {
      eventCommonData, eventDonationData, isLoading, syncData,
    } = setupData.value;

    onMounted(() => syncData());

    return {
      eventCommonData,
      eventDonationData,
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
