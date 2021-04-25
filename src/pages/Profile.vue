<template>
  <q-page>
    <main class="w-full">
      <section class="bg-gray-300">
        <div class="container px-6 py-8 mx-auto">
          <div class="items-center lg:flex">
            <div class="lg:w-1/2">
              <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Mengapa Kami Harus Hadir ?
              </h2>

              <p class="mt-4 text-gray-500 dark:text-gray-400 lg:max-w-md">
                Hi this is BERSAMABISA, {{ lorem }}
              </p>

              <div class="flex items-center mt-6 gap-x-2">
                <q-btn
                  type="a"
                  :icon="mdiTwitter"
                  href="https://twitter.com/bersamabisaid"
                  target="_blank"
                  round
                  flat
                  class="text-gray-700 hover:text-gray-600"
                />

                <q-btn
                  type="a"
                  :icon="mdiInstagram"
                  href="https://www.instagram.com/bersamabisa.id/"
                  target="_blank"
                  round
                  flat
                  class="text-gray-700 hover:text-gray-600"
                />
              </div>
            </div>

            <div class="mt-8 lg:mt-0 lg:w-1/2">
              <div class="flex items-center justify-center lg:justify-end">
                <div class="w-full max-w-lg">
                  <!-- eslint-disable max-len -->
                  <q-img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                    class="object-cover object-center w-full h-64 rounded-md shadow"
                  />
                  <!-- eslint-enable max-len -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="relative pt-8 pb-10">
        <div class="container relative mx-auto px-4 flex flex-col">
          <div class="py-9 flex justify-center gap-16">
            <q-card
              v-for="i in 3"
              :key="i"
              flat
              bordered
              class="my-card bg-grey-1"
            >
              <q-card-section class="bg-blue-400">
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-h6">
                      Our Planet
                    </div>
                    <div class="text-subtitle2">
                      by John Doe
                    </div>
                  </div>

                  <div class="col-auto">
                    <q-btn
                      color="grey-7"
                      round
                      flat
                      icon="arrow_forward"
                      class="text-dark"
                    >
                      <q-menu
                        cover
                        auto-close
                      >
                        <q-list>
                          <q-item clickable>
                            <q-item-section>Remove Card</q-item-section>
                          </q-item>
                          <q-item clickable>
                            <q-item-section>Send Feedback</q-item-section>
                          </q-item>
                          <q-item clickable>
                            <q-item-section>Share</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </div>
              </q-card-section>

              <q-card-section>
                {{ lorem }}
              </q-card-section>
            </q-card>
          </div>
        </div>
      </section>
      <section class="bg-gray-300">
        <div class="container px-6 py-8 mx-auto">
          <div class="items-center lg:flex">
            <div class="lg:w-1/2">
              <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Tujuan Besar Kita
              </h2>

              <p class="mt-4 text-gray-500 dark:text-gray-400 lg:max-w-md">
                Hi this is BERSAMABISA, {{ lorem }}
              </p>

              <div class="flex items-center mt-6 gap-x-2">
                <q-btn
                  type="a"
                  :icon="mdiTwitter"
                  href="https://twitter.com/bersamabisaid"
                  target="_blank"
                  round
                  flat
                  class="text-gray-700 hover:text-gray-600"
                />

                <q-btn
                  type="a"
                  :icon="mdiInstagram"
                  href="https://www.instagram.com/bersamabisa.id/"
                  target="_blank"
                  round
                  flat
                  class="text-gray-700 hover:text-gray-600"
                />
              </div>
            </div>

            <div class="mt-8 lg:mt-0 lg:w-1/2">
              <div class="flex items-center justify-center lg:justify-end">
                <ul class="list-none grid gap-4">
                  <li
                    v-for="i in 3"
                    :key="i"
                  >
                    <q-btn
                      class="bg-blue-400 col-start"
                      padding="lg"
                      icon="eco"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="relative pt-8 pb-10">
        <div class="container relative mx-auto px-4 flex flex-col">
          <div class="flex justify-center pt-8">
            <h6 class="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Tim Yang Kita Miliki
            </h6>
          </div>
          <div class="py-9 flex justify-center gap-8">
            <!-- <q-card
              v-for="i in 5"
              :key="i"
              flat
              bordered
              class="my-card bg-grey-1 outline-none"
            >
              <q-card-section class="bg-blue-400">
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-h6">
                      Our Planet
                    </div>
                    <div class="text-subtitle2">
                      by John Doe
                    </div>
                  </div>

                  <div class="col-auto">
                    <q-btn
                      color="grey-7"
                      round
                      flat
                      icon="arrow_forward"
                      class="text-dark"
                    >
                      <q-menu
                        cover
                        auto-close
                      >
                        <q-list>
                          <q-item clickable>
                            <q-item-section>Remove Card</q-item-section>
                          </q-item>
                          <q-item clickable>
                            <q-item-section>Send Feedback</q-item-section>
                          </q-item>
                          <q-item clickable>
                            <q-item-section>Share</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </div>
              </q-card-section>

              <q-card-section>
                {{ lorem }}
              </q-card-section>
            </q-card> -->
            <div
              v-for="i in 5"
              :key="i"
              class="max-w-xs mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800 mt-20"
            >
              <div class="flex justify-center -mt-16 md:justify-end">
                <img
                  class="object-cover w-20 h-20 border-2 border-indigo-500 rounded-full dark:border-indigo-400"
                  alt="Testimonial avatar"
                  src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                >
              </div>
              <div class="px-4 py-2">
                <h1 class="text-3xl font-bold text-gray-800 uppercase dark:text-white">
                  SOCIAL EDUCATION DEVELOPMENT
                </h1>
              </div>

              <div class="px-4 py-2">
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {{ lorem }}
                </p>
              </div>

              <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
                <h1 class="text-lg font-bold text-white">
                  Lorem aja
                </h1>
                <button class="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-200 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
                  Lorem lagi
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="relative pt-4 pb-10">
        <div class="container relative mx-auto px-4 flex flex-col">
          <div class="flex justify-center pt-8">
            <q-card class="bg-grey rounded-2xl">
              <q-card-section class="m-8">
                <h6 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                  Atas apa yang telah kita lakukan bersama, kita berharap
                </h6>
                <p>
                  1. Meningkatnya angka orientasi pendidikan masyarakat
                  kurang mampu
                </p>
                <p>
                  2. Meningkatnya akses belajar melalui program yang dilaksanakan
                </p>
                <p>
                  3. Tersedianya fasilitas belajar untuk daerah yang membutuhkan
                  dan prioritas
                </p>
                <p>
                  4. Masyarakat kurang mampu tidak khawatir dengan pendidikan anaknya
                </p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </section>
    </main>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { mdiInstagram, mdiTwitter } from '@quasar/extras/mdi-v5';

export default defineComponent({
  name: 'PageProfile',
  data() {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    };
  },
  setup() {
    return {
      mdiInstagram,
      mdiTwitter,
    };
  },
});
</script>

<style lang="scss">
@layer components {
  .my-card {
    @apply w-full max-w-xs;
  }
}
</style>
