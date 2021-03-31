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
            <div class="text-white text-center justify-center flex flex-wrap">
              <div class="q-gutter-y-md">
                <span class="font-medium text-4xl">
                  #HADIR UNTUK KEBAIKAN
                </span>

                <h1 class="font-extrabold text-7xl">
                  BERSAMABISA.ID
                </h1>

                <div class="font-medium text-2xl">
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
          <section class="h-auto bg-white">
            <div class="container mx-auto px-4">
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
                >
                  <vue-glide-slide
                    v-for="(event, i) in events"
                    :key="i"
                  >
                    <card-program
                      v-bind="event"
                    />
                  </vue-glide-slide>
                  <template
                    slot="control"
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
                >
                  <vue-glide-slide
                    v-for="(event, i) in events"
                    :key="i"
                  >
                    <card-program
                      v-bind="event"
                    />
                  </vue-glide-slide>
                  <template
                    slot="control"
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
import { defineComponent } from '@vue/composition-api';
import BaseNavbar from 'components/BaseNavbar.vue';
import BaseFooter from 'components/BaseFooter.vue';
import CardProgram, { CardProgramProps } from 'components/CardProgram.vue';
import { Glide, GlideSlide } from 'vue-glide-js';

const events: CardProgramProps[] = [
  {
    title: 'Card Title (1)',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    url: 'pray-for-uyghur',
  },
  {
    title: 'Card Title (2)',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    url: 'pray-for-uyghur',
  },
  {
    title: 'Card Title (3)',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    url: 'pray-for-uyghur',
  },
  {
    title: 'Card Title (4)',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    url: 'pray-for-uyghur',
  },
  {
    title: 'Card Title (5)',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    url: 'pray-for-uyghur',
  },
];

export default defineComponent({
  name: 'PageHome',
  setup() {
    return {
      events,
      slide: '1',
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
// @import 'node_modules/@glidejs/glide/src/assets/sass/glide.core';
@import '~@glidejs/glide/src/assets/sass/glide.theme';
@import '~vue-glide-js/dist/vue-glide.css';

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
