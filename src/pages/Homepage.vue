<template>
  <q-layout view="lHh lpr lff">
    <q-page-container>
      <q-page class="row items-center justify-evenly">
        <header class="relative w-full h-screen flex content-center items-center justify-center">
          <img
            :src="require('assets/images/homepagePicture.png')"
            class="absolute w-full h-screen object-cover"
          >
          <div
            class="absolute w-full h-screen"
            style="background: linear-gradient(180deg, rgba(26, 41, 128, 0.79) 0%, rgba(38, 208, 206, 0.79) 100%);"
          />

          <div class="container relative mx-auto">
            <div class="text-white text-center justify-center">
              <div class="flex flex-col gap-y-2 mx-2 md:z-0">
                <span class="font-semibold text-2xl md:text-4xl tracking-tighter">
                  #HADIR UNTUK KEBAIKAN
                </span>

                <h1 class="font-extrabold text-4xl sm:text-5xl break-words md:text-7xl">
                  BERSAMABISA.ID
                </h1>

                <div class="font-medium text-xl md:text-2xl tracking-tighter">
                  <p>Bersama hadirkan kebaikan untuk</p>
                  <p>Indonesia yang lebih berdaya</p>
                </div>
              </div>

              <q-btn
                label="Lihat program kami"
                unelevated
                class="mt-8 bg-positive rounded-lg shadow"
                :to="{hash: '#programListSection'}"
                @click="() => scrollToElement($refs.programListSection)"
              />
            </div>
          </div>

          <nav class="absolute top-0 right-0 w-full">
            <base-navbar transparent />
          </nav>
        </header>

        <example-component
          title="Example component"
          active
          :todos="todos"
          :meta="meta"
        />
      </q-page>
    </q-page-container>

    <base-footer />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { scroll } from 'quasar';
import BaseNavbar from 'components/BaseNavbar.vue';
import BaseFooter from 'components/BaseFooter.vue';
import ExampleComponent from 'components/CompositionComponent.vue';
import type { Todo, Meta } from 'components/models';

const scrollToElement = (el: HTMLElement, duration = 350) => {
  const target = scroll.getScrollTarget(el);
  const offset = el.offsetTop;
  scroll.setVerticalScrollPosition(target, offset, duration);
};

export default defineComponent({
  name: 'PageIndex',
  components: { ExampleComponent, BaseNavbar, BaseFooter },
  setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1',
      },
      {
        id: 2,
        content: 'ct2',
      },
      {
        id: 3,
        content: 'ct3',
      },
      {
        id: 4,
        content: 'ct4',
      },
      {
        id: 5,
        content: 'ct5',
      },
    ]);
    const meta = ref<Meta>({
      totalCount: 1200,
    });

    return {
      todos,
      meta,
      scrollToElement,
    };
  },
});
</script>
