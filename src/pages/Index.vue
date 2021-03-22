<template>
  <q-page class="column items-center justify-evenly">
    <header class="relative w-full h-screen bg-light-blue-600 bg-gradient-to-t from-gray-900 via-transparent border-b-8 border-gray-600">
      <div class="absolute w-full h-full bg-gradient-to-br from-gray-900 to-transparent" />

      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        navigation
        autoplay
        dark
        control-color="primary"
        class="absolute bottom-16 right-0 w-full max-w-4xl h-4/5"
      >
        <template #navigation-icon="{ active, onClick }">
          <button
            v-ripple
            :class="[
              'mx-1 w-8 h-2.5 transition-all duration-500 transform scale-y-50',
              'hover:bg-light-blue-300 hover:scale-y-100 focus:outline-none',
              active ? 'bg-light-blue-600 scale-y-100' : 'bg-gray-50',
            ]"
            @click="onClick"
          />
        </template>

        <q-carousel-slide
          name="style"
          class="column no-wrap flex-center"
        >
          <img
            src="https://picsum.photos/500/300"
            alt=""
          >
        </q-carousel-slide>

        <q-carousel-slide
          name="tv"
          class="column no-wrap flex-center"
        >
          <img
            src="https://picsum.photos/500/300"
            alt=""
          >
        </q-carousel-slide>

        <q-carousel-slide
          name="layers"
          class="column no-wrap flex-center"
        >
          <img
            src="https://picsum.photos/500/300"
            alt=""
          >
        </q-carousel-slide>

        <q-carousel-slide
          name="map"
          class="column no-wrap flex-center"
        >
          <img
            src="https://picsum.photos/500/300"
            alt=""
          >
        </q-carousel-slide>
      </q-carousel>

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
        <q-btn
          label="Blog and News"
          flat
          rounded
          padding="sm lg"
          class="text-white"
        />

        <q-btn
          label="Event Gallery"
          flat
          rounded
          padding="sm lg"
          class="text-white"
        />

        <q-input
          v-model="search"
          label="Cari sesuatu disini..."
          dark
          standout
          rounded
          dense
          class="w-full max-w-sm"
        >
          <q-btn
            slot="append"
            round
            flat
            icon="search"
          />
        </q-input>
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
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PageIndex',

  data() {
    return {
      slide: 'style',

      search: '',
    };
  },
});
</script>
