<template>
  <q-page>
    <main class="w-full">
      <section class="bg-blue-300">
        <div class="container px-6 py-8 mx-auto">
          <div class="items-center lg:flex">
            <div class="lg:w-1/2">
              <h2 class="text-5xl font-bold text-grey-800 dark:text-gray-100">
                Mengapa Kami Harus Hadir ?
              </h2>

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
            <card-purpose
              v-for="(purpose, i) in purposes"
              :key="i"
              v-bind="purpose"
            />
          </div>
        </div>
      </section>
      <section class="flex items-center justify-center w-screen h-screen m-auto mb-12 bg-fixed bg-center bg-cover custom-img">
        <div
          class="absolute w-screen h-screen m-auto bg-fixed bg-center bg-cover bg-black opacity-60"
        />
        <div class="container px-6 py-8 mx-auto">
          <div class="items-center lg:flex">
            <div class="lg:w-1/2">
              <h2 class="text-5xl font-bold text-dark">
                Tujuan Besar Kita
              </h2>

              <p class="text-xl mt-4 text-dark lg:max-w-md">
                {{ bigPurpose }}
              </p>
            </div>

            <div class="mt-8 lg:mt-0 lg:w-1/2">
              <div class="flex items-center justify-center lg:justify-end">
                <ul class="list-none grid gap-4 sm:mt-8">
                  <li v-for="button in btnPurpose">
                    <div class="flex flex-nowrap items-center gap-5">
                      <q-btn
                        class="bg-yellow-400 col-start rounded-2xl"
                        padding="md"
                        :icon="button.icon"
                        size="lg"
                      />
                      <div class="flex flex-wrap text-lg max-w-md">
                        {{ button.caption }}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- </q-parallax> -->
      </section>
      <section class="relative pt-8 pb-10">
        <div class="container relative mx-auto px-4 flex flex-col">
          <div class="flex justify-center pt-8">
            <h6 class="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Tim Yang Kita Miliki
            </h6>
          </div>
          <div class="py-9 flex justify-center gap-5">
            <card-team
              v-for="(team, i) in teams"
              :key="i"
              v-bind="team"
            />
          </div>
        </div>
      </section>
      <section class="relative pt-2 pb-10 py-5">
        <div class="container relative mx-auto px-4 flex flex-col">
          <div class="flex justify-center pt-8">
            <q-card class="rounded-2xl flex items-center justify-center w-auto h-full m-auto mb-12 bg-fixed bg-center bg-cover custom-img-children">
              <!-- <img
                :src="require('assets/images/children.jpg')"
                class="absolute rounded-2xl h-full object-cover bg-scroll"
              > -->
              <div
                class="absolute w-full h-full rounded-2xl bg-black opacity-60"
              />
              <q-card-section class="m-8 text-white">
                <h6 class="text-3xl font-bold mb-10">
                  Atas apa yang telah kita lakukan bersama, kita berharap...
                </h6>
                <div class="text-lg grid gap-3">
                  <ul>
                    <li>
                      1. Meningkatnya angka orientasi pendidikan masyarakat
                      kurang mampu
                    </li>
                  </ul>
                  <ul>
                    <li>
                      2. Meningkatnya akses belajar melalui program yang dilaksanakan
                    </li>
                  </ul>
                  <ul>
                    <li>
                      3. Tersedianya fasilitas belajar untuk daerah yang membutuhkan
                      dan prioritas
                    </li>
                  </ul>
                  <ul>
                    <li>
                      4. Masyarakat kurang mampu tidak khawatir dengan pendidikan anaknya
                    </li>
                  </ul>
                </div>
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
import CardTeam from 'components/ui/Profile/CardTeam.vue';
import CardPurpose from 'components/ui/Profile/CardPurpose.vue';

const teams = [
  {
    title: 'SOCIAL EDUCATION DEVELOPMENT',
    description: 'Melaksanakan program dalam ranah sosial dan pendidikan',
  },
  {
    title: 'HUMAN RESOURCE DEVELOPMENT',
    description: 'Melaksanakan program internal dalam rangka menjaga soliditas dan juga kualitas SDM',
  },
  {
    title: 'PUBLIC RELATION',
    description: 'Memiliki peran penting dalam melakukan hubungan dengan pihak lain dalam menjalankan program',
  },
  {
    title: 'FINANCIAL MANAGEMENT',
    description: 'Memiliki tim yang fokus dalam agenda fundrising dan juga pengalokasian dana',
  },
  {
    title: 'TECHNOLOGY DEVELOPMENT',
    description: 'Memiliki wewenang dalam pengembangan desain informasi di media sosial',
  },
];

const purposes = [
  {
    title: 'Melihat Kondisi Masyarakat',
    description: 'Pendidikan menjadi isu yang terus hadir di masyarakat, mulai dari akses pendidikan, fasilitas pendidikan, dan kualitas kurikulum pendidikan',
  },
  {
    title: 'Melihat Potensi Generasi Muda',
    description: 'Generasi muda punya potensi untuk menggarap serius isu pendidikan dengan peningkatan kualitas pendidikan di masyarakat ',
  },
  {
    title: 'Melihat Harapan Masa Depan',
    description: 'Harapan tentang pembangunan generasi bangsa secara sistematis dilakukan melalui wadah yang kolektif untuk bergerak',
  },
];

export default defineComponent({
  name: 'PageProfile',
  data: () => ({
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    bigPurpose: 'Menciptakan sumber daya manusia Indonesia yang lebih berpendidikan melalui usaha yang berkelanjutan',
    btnPurpose: [
      {
        caption: 'Manusia Indonesia yang beradab dan berpendidikan',
        icon: 'menu_book',
      },
      {
        caption: 'Program yang berkelanjutan',
        icon: 'brush',
      },
      {
        caption: 'Memberikan resonansi kebaikan',
        icon: 'settings_input_antenna',
      },
    ],
  }),
  setup() {
    return {
      mdiInstagram,
      mdiTwitter,
      purposes,
      teams,
    };
  },
  components: {
    CardTeam,
    CardPurpose,
  },
});
</script>

<style lang="scss">
@layer components {
  .my-card {
    @apply w-full max-w-xs;
  }
  .custom-img {
    background-image: url("https://cdn.quasar.dev/img/parallax2.jpg");
  }
  .custom-img-children {
    background-image: url("../assets/images/children.jpg");
  }
}
</style>
