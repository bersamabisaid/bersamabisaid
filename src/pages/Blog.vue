<template>
  <q-page>
    <main class="w-full">
      <div class="flex items-center justify-center">
        <span class="text-2xl font-bold mt-10">Artikel Terbaru</span>
        <div class="flex flex-col my-10 justify-center items-center">
          <div class="flex flex-row justify-center gap-x-6 gap-y-10">
            <q-card
              v-for="n in 7"
              :key="n"
              v-ripple
              class="blog-card"
            >
              <router-link to="/">
                <img src="https://cdn.quasar.dev/img/parallax2.jpg">

                <q-item>
                  <q-item-section>
                    <div class="flex flex-col gap-3 my-3">
                      <q-item-label class="text-xl font-semibold">
                        Title
                      </q-item-label>
                      <q-item-label
                        class="text-base font-medium"
                        caption
                      >
                        Subheads
                      </q-item-label>
                    </div>
                  </q-item-section>
                </q-item>
              </router-link>
            </q-card>
          </div>
        </div>
      </div>
    </main>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Blog',
  setup() {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur ',
    };
  },
});
</script>

<style lang="scss">
.blog-card {
  width: 370px;
}
</style>
