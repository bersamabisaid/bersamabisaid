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
            <card-purpose
              v-for="(purpose, i) in purposes"
              :key="i"
              v-bind="purpose"
            />
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
          <div class="py-9 flex justify-center gap-5">
            <card-team
              v-for="(team, i) in teams"
              :key="i"
              v-bind="team"
            />
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
import CardTeam from 'components/ui/Program/CardTeam.vue';
import CardPurpose from 'components/ui/Program/CardPurpose.vue';

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
  data() {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    };
  },
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
}
</style>
