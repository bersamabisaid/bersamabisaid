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

          <nav class="absolute top-0 right-0 w-full">
            <base-navbar transparent />
          </nav>

          <div class="container relative mx-auto">
            <div class="text-white text-center justify-center">
              <div class="q-gutter-y-md mx-2">
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

                <q-btn
                  label="GET STARTED"
                  color="positive"
                  class="rounded-lg shadow"
                  unelevated
                />
              </div>
            </div>
          </div>
        </header>

        <main class="w-full">
          <section class="h-auto">
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
                  type="carousel"
                  per-view="4"
                  class="px-2"
                  :breakpoints="{
                    640: { perView: 1 },
                    1023: { perView: 2 },
                    1280: { perView: 3 }
                  }"
                >
                  <vue-glide-slide
                    v-for="(el, i) in events"
                    :key="`${i}-${el.title}`"
                  >
                    <card-program
                      :title="el.title"
                      :caption="extractTextFromHTML(el.description)"
                      :url="el.URL"
                      v-bind="el"
                      action-label="Lihat detail"
                    />
                  </vue-glide-slide>
                  <template
                    #control
                    class="glide__arrows grid justify-items-stretch"
                  >
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

          <section class="h-auto">
            <img
              :src="require('assets/images/donasiPicture.png')"
              class="absolute w-full h-screen object-cover"
            >
            <div
              class="absolute w-full h-screen"
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
                  type="carousel"
                  per-view="4"
                  class="px-2"
                  focus-at="center"
                  :breakpoints="{
                    640: { perView: 1 },
                    1023: { perView: 2 },
                    1280: { perView: 3 }
                  }"
                >
                  <vue-glide-slide
                    v-for="(el, i) in events"
                    :key="`${i}-${el.title}`"
                  >
                    <card-program
                      :title="el.title"
                      :caption="extractTextFromHTML(el.description)"
                      :url="el.URL"
                      v-bind="el"
                      action-label="Lihat detail"
                    />
                  </vue-glide-slide>
                  <template
                    #control
                    class="glide__arrows grid justify-items-stretch"
                  >
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
import { defineComponent, computed } from '@vue/composition-api';
import BaseNavbar from 'components/BaseNavbar.vue';
import BaseFooter from 'components/BaseFooter.vue';
// import CardProgram, { CardProgramProps } from 'components/CardProgram.vue';
import CardProgram from 'components/CardProgram.vue';
import { Glide, GlideSlide } from 'vue-glide-js';
import 'vue-glide-js/dist/vue-glide.css';
import firestoreCollection from 'src/firestoreCollection';
import useCollection from 'src/composables/useCollection';

// const events: CardProgramProps[] = [
//   {
//     title: 'Card Title (1)',
//     caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
//     url: 'pray-for-uyghur',
//   },
//   {
//     title: 'Card Title (2)',
//     caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
//     url: 'pray-for-uyghur',
//   },
//   {
//     title: 'Card Title (3)',
//     caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
//     url: 'pray-for-uyghur',
//   },
//   {
//     title: 'Card Title (4)',
//     caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
//     url: 'pray-for-uyghur',
//   },
//   {
//     title: 'Card Title (5)',
//     caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
//     url: 'pray-for-uyghur',
//   },
// ];

const extractTextFromHTML = (input: string | HTMLElement) => {
  const isElement = input instanceof HTMLElement;
  const vElement = isElement ? (input as HTMLElement) : document.createElement('div');

  if (!isElement) {
    vElement.innerHTML = input as string;
  }

  return vElement.textContent;
};

export default defineComponent({
  name: 'PageHome',
  setup(props, { root }) {
    const isDonation = computed(() => root.$route.query.category === 'donasi');
    const query = computed(() => (isDonation.value
      ? firestoreCollection.Events.where('donation', '==', true)
      : firestoreCollection.Events));
    const [events, isDataLoading] = useCollection(query);

    return {
      events,
      slide: '1',
      isDataLoading,
      extractTextFromHTML,
    };
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
@import "node_modules/@glidejs/glide/src/assets/sass/glide.core";
@import "node_modules/@glidejs/glide/src/assets/sass/glide.theme";

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
