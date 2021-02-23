<template>
  <q-page class="column items-center justify-evenly">
    <header>
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        arrows
        navigation
        autoplay
        control-color="primary"
        class="rounded-borders"
      >
        <q-carousel-slide
          name="style"
          class="column no-wrap flex-center"
        >
          <q-icon
            name="style"
            color="primary"
            size="56px"
          />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="tv"
          class="column no-wrap flex-center"
        >
          <q-icon
            name="live_tv"
            color="primary"
            size="56px"
          />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="layers"
          class="column no-wrap flex-center"
        >
          <q-icon
            name="layers"
            color="primary"
            size="56px"
          />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="map"
          class="column no-wrap flex-center"
        >
          <q-icon
            name="terrain"
            color="primary"
            size="56px"
          />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
      </q-carousel>
    </header>

    <main>
      <section class="window-height">
        <h2>Section</h2>
      </section>

      <section class="window-height">
        <h2>Section</h2>
      </section>

      <section class="window-height">
        <h2>Section</h2>
      </section>

      <section class="window-height">
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
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?',

    };
  },
});
</script>
