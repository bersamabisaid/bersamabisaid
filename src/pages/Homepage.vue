<template>
  <q-page>
    <header class="relative w-full h-screen flex content-center items-center justify-center">
      <img
        src="~assets/images/homepagePicture.png"
        class="absolute w-full h-screen object-cover"
      >
      <div
        class="absolute w-full h-screen"
        style="background: linear-gradient(180deg, rgba(26, 41, 128, 0.79) 0%, rgba(38, 208, 206, 0.79) 100%);"
      />

      <nav class="absolute top-0 right-0 w-full p-8 flex gap-x-4">
        <div class="container flex justify-between">
          <div class="q-gutter-md">
            <q-img
              :src="require('assets/logo/Bbid-logo-only-white.png')"
              width="60px"
            />
            <q-img
              :src="require('assets/logo/Bbid-text.png')"
              height="18px"
              width="200px"
            />
          </div>
          <div>
            <navbar-component
              v-for="link in navbarCustom"
              :key="link.id"
              v-bind="link"
            />
          </div>
        </div>
      </nav>
      <div class="container relative mx-auto">
        <div class="text-white text-center justify-center flex flex-wrap">
          <div class="q-gutter-y-md">
            <span class="text-4xl">#HADIR UNTUK KEBAIKAN</span>
            <h1 class="font-bold text-7xl">
              BersamabisaID
            </h1>
            <div class="text-2xl">
              <p>BERSAMA HADIRKAN KEBAIKAN UNTUK</p>
              <p>INDONESIA YANG LEBIH BERDAYA</p>
            </div>
            <q-btn
              color="green"
              label="GET STARTED"
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
          <div class="flex justify-center q-py-lg">
            <div class="q-pa-md row items-start q-gutter-lg">
              <program-card
                v-for="link in cardCustom"
                :key="link.id"
                v-bind="link"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="h-auto">
        <img
          :src="require('assets/images/donasiPicture.png')"
          class="absolute w-full h-screen"
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
          <div class="flex justify-center q-py-lg">
            <div class="q-pa-md row items-start q-gutter-lg rounded-borders">
              <program-card
                v-for="link in cardCustom"
                :key="link.id"
                v-bind="link"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer-component />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { uid } from 'quasar';
import NavbarComponent from 'components/ui/Homepage/Navbar.vue';
import FooterComponent from 'components/ui/Homepage/Footer.vue';
import ProgramCard from 'components/ProgramCard.vue';

export default defineComponent({
  name: 'Homepage',
  data() {
    return {
      navbarCustom: [
        {
          id: uid(),
          caption: 'HOME',
          link: '/#',
        },
        {
          id: uid(),
          caption: 'PROGRAM',
          link: '/#',
        },
        {
          id: uid(),
          caption: 'DONASI',
          link: '/#',
        },
        {
          id: uid(),
          caption: 'PROFIL',
          link: '/#',
        },
        {
          id: uid(),
          caption: 'KONTAK',
          link: '/#',
        },
      ],
      cardCustom: [
        {
          id: uid(),
          title: 'Card Title',
          caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          link: '/#',
        },
        {
          id: uid(),
          title: 'Card Title',
          caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          link: '/#',
        },
        {
          id: uid(),
          title: 'Card Title',
          caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          link: '/#',
        },
        {
          id: uid(),
          title: 'Card Title',
          caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          link: '/#',
        },
      ],
    };
  },
  components: {
    FooterComponent,
    NavbarComponent,
    ProgramCard,
  },
});
</script>

<style lang="scss">
  .my-card {
    width: 100%;
    max-width: 250px;
    // height: 100%;
    // max-height: 436px;
  }
</style>
