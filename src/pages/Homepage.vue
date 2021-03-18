<template>
  <q-page>
    <header class="relative w-full h-screen bg-light-blue-600 bg-gradient-to-t from-gray-900 via-transparent border-b-8 border-gray-600">
      <div class="absolute w-full h-full bg-gradient-to-br from-gray-900 to-transparent" />

      <div class="absolute mx-8 mt-24 text-white">
        <h1 class="my-10 font-inter font-bold text-9xl">
          <span class="block mb-10">BersamabisaID</span>
          <span class="block mt-10">Community</span>
        </h1>

        <blockquote class="mx-8 max-w-2xl font-light text-lg">
          <span class="text-yellow-300">Halo sobat!</span> kita punya beberapa program untuk donasi nih.
        </blockquote>

        <div class="p-6">
          <q-btn
            label="Donasi sekarang"
            rounded
            unelevated
            class="bg-yellow-500"
          />
        </div>
      </div>
      <nav class="absolute top-0 right-0 w-full p-8 flex justify-end gap-x-4">
        <navbar-component
          v-for="link in navbarCustom"
          :key="link.id"
          v-bind="link"
        />
      </nav>
    </header>

    <main class="w-full bg-gray-900">
      <section class="h-screen text-white">
        <h2>Section</h2>
      </section>

      <section class="h-screen text-white">
        <h2>Section</h2>
      </section>

      <section class="h-screen text-white">
        <h2>Section</h2>
      </section>

      <section class="h-screen text-white">
        <h2>Section</h2>
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
    };
  },
  components: {
    FooterComponent,
    NavbarComponent,
  },
});
</script>
