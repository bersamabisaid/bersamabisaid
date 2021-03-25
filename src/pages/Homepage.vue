<template>
  <q-layout view="lHh lpr lff">
    <q-page-container>
      <q-page>
        <header class="relative w-full h-screen flex content-center items-center justify-center">
          <q-parallax
            :src="require('assets/images/homepagePicture.png')"
            :height="$q.screen.height"
            :speed="2.5"
            class="absolute"
          />

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
                <q-scroll-area
                  horizontal
                  class="card-program__grid__scroll-area"
                >
                  <div class="card-program__grid">
                    <div
                      v-for="link in cardCustom"
                      :key="link.id"
                      class="col-3"
                    >
                      <card-program v-bind="link" />
                    </div>
                  </div>
                </q-scroll-area>
              </div>
            </div>
          </section>

          <section class="h-auto">
            <q-parallax
              :src="require('assets/images/donasiPicture.png')"
              :height="$q.screen.height"
              class="absolute w-full"
            />

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
              <div class="flex justify-center q-py-lg">
                <q-scroll-area
                  horizontal
                  class="card-program__grid__scroll-area"
                >
                  <div class="card-program__grid">
                    <div
                      v-for="link in cardCustom"
                      :key="link.id"
                      class="col-3"
                    >
                      <card-program v-bind="link" />
                    </div>
                  </div>
                </q-scroll-area>
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
import { uid } from 'quasar';
import BaseNavbar from 'components/BaseNavbar.vue';
import BaseFooter from 'components/BaseFooter.vue';
import CardProgram from 'components/CardProgram.vue';

export default defineComponent({
  name: 'PageHome',
  data() {
    return {
      cardCustom: [
        {
          id: uid(),
          title: 'Card Title',
          caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          to: '/#',
        },
        {
          id: uid(),
          title: 'Card Title',
          caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          to: '/#',
        },
        {
          id: uid(),
          title: 'Card Title',
          caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          to: '/#',
        },
        {
          id: uid(),
          title: 'Card Title',
          caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          to: '/#',
        },
        {
          id: uid(),
          title: 'Card Title',
          caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          to: '/#',
        },
      ],
    };
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
  .q-parallax {
    &__media {
      > img {
        @apply object-fill;
      }
    }
  }

  .card-program__grid {
    @apply  px-12 py-8 flex grid-flow-col auto-cols-min items-center gap-0;

    > div:not(:first-child) {
      @apply -ml-32;
    }

    @screen sm {
      @apply grid gap-10;

      > div:not(:first-child) {
        @apply m-0;
      }
    }

    &__scroll-area {
      @apply w-full;
      height: theme('maxWidth.xl');
    }
  }
}
</style>
