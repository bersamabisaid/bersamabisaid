<template>
  <q-page>
    <main class="w-full">
      <section class="w-full h-screen xl:h-96 m-auto mb-12 bg-fixed bg-bottom bg-cover custom-img-sujud">
        <div
          class="absolute w-full h-screen xl:h-96 m-auto bg-fixed bg-center bg-cover bg-black opacity-60"
        />
        <div class="absolute container px-8 py-8 xl:mt-10">
          <div class="flex md:flex-row gap-x-12 items-center justify-center">
            <div>
              <h2 class="text-5xl font-bold text-white">
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
                  class="text-white"
                />

                <q-btn
                  type="a"
                  :icon="mdiInstagram"
                  href="https://www.instagram.com/bersamabisa.id/"
                  target="_blank"
                  round
                  flat
                  class="text-white"
                />
              </div>
            </div>
            <q-img
              :src="require('assets/images/bersamabisa_profil_santunan anak yatim 1.jpg')"
              class="flex w-full md:w-3/4 xl:w-96 h-64 rounded-2xl mt-8 xl:mt-0"
            />
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
      <section class="flex items-center justify-center w-full h-screen m-auto mb-12 bg-fixed bg-bottom bg-cover custom-img">
        <div
          class="absolute w-full h-screen m-auto bg-fixed bg-center bg-cover bg-black opacity-60"
        />
        <div class="absolute container px-6 py-8 mx-auto">
          <div class="items-center lg:flex">
            <div class="lg:w-1/2 text-white">
              <h2 class="text-5xl font-bold">
                Tujuan Besar Kita
              </h2>

              <p class="text-xl mt-4 lg:max-w-md">
                {{ bigPurpose }}
              </p>
            </div>

            <div class="mt-8 lg:mt-0 lg:w-1/2">
              <div class="flex items-center justify-center lg:justify-end">
                <ul class="list-none grid gap-4 sm:mt-8">
                  <li
                    v-for="(button, i) in btnPurpose"
                    :key="i"
                  >
                    <div class="flex flex-nowrap items-center gap-5">
                      <q-btn
                        class="bg-yellow-400 col-start rounded-2xl"
                        padding="md"
                        :icon="button.icon"
                        size="lg"
                      />
                      <div class="flex flex-wrap text-lg max-w-md text-white">
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

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const teams = [
  {
    title: 'SOCIAL EDUCATION DEVELOPMENT',
    description: 'Melaksanakan program dalam ranah sosial dan pendidikan',
    icon: 'volunteer_activism',
  },
  {
    title: 'HUMAN RESOURCE DEVELOPMENT',
    description: 'Melaksanakan program internal dalam rangka menjaga soliditas dan juga kualitas SDM',
    icon: 'self_improvement',
  },
  {
    title: 'PUBLIC RELATION',
    description: 'Memiliki peran penting dalam melakukan hubungan dengan pihak lain dalam menjalankan program',
    icon: 'public',
  },
  {
    title: 'FINANCIAL MANAGEMENT',
    description: 'Memiliki tim yang fokus dalam agenda fundrising dan juga pengalokasian dana',
    icon: 'request_quote',
  },
  {
    title: 'TECHNOLOGY DEVELOPMENT',
    description: 'Memiliki wewenang dalam pengembangan desain informasi di media sosial',
    icon: 'biotech',
  },
];

const bigPurpose = 'Menciptakan sumber daya manusia Indonesia yang lebih berpendidikan melalui usaha yang berkelanjutan';

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

const btnPurpose = [
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
];

export default defineComponent({
  name: 'PageProfile',
  setup() {
    return {
      mdiInstagram,
      mdiTwitter,
      lorem,
      purposes,
      bigPurpose,
      btnPurpose,
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
.custom-img {
  background-image: url("../assets/images/bersamabisa_profil_berbagi ekspedisi banten.jpg");
}
.custom-img-children {
  background-image: url("../assets/images/bersamabisa_profil_santunan anak yatim 2.jpg");
}
.custom-img-sujud {
  background-image: url("../assets/images/bersamabisa_profil_berbagi bersama aksiberbagi.jpg");
}
</style>
