<template>
  <q-footer
    elevated
    class="bg-white"
  >
    <q-toolbar class="px-0 pt-8 column">
      <div class="container py-10 column gap-y-12">
        <div class="col-12 row">
          <div class="col-3 flex justify-center items-center">
            <img
              :src="require('assets/logo/Bbid-logo.png')"
              alt="logo bersamabisa.id"
              class="w-64"
            >
          </div>

          <div class="col px-8 py-4 flex flex-col justify-center">
            <h5 class="font-extrabold text-4xl text-primary">
              PROFIL
            </h5>

            <p class=" text-dark">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Cum, in reiciendis! Cupiditate eveniet provident hic non, id quidem explicabo quod mollitia quam.
              Tempora voluptates ipsum asperiores alias, quam sequi exercitationem.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Cum, in reiciendis! Cupiditate eveniet provident hic non, id quidem explicabo quod mollitia quam.
              Tempora voluptates ipsum asperiores alias, quam sequi exercitationem.
            </p>
          </div>
        </div>

        <q-separator
          spaced
          color="gray-400"
          class="w-full"
        />

        <div class="col-12 flex flex-col items-center">
          <h5 class="font-extrabold text-4xl text-primary">
            HUBUNGI KAMI
          </h5>

          <div class="py-6 flex gap-x-6">
            <img
              :src="require('assets/logo/Instagram-logo.png')"
              class="w-12"
            >
            <img
              :src="require('assets/logo/Whatsapp-logo.png')"
              class="w-12"
            >
          </div>
        </div>
      </div>

      <div
        class="w-full flex flex-row flex-wrap justify-center"
        style="background: linear-gradient(180deg, rgba(38, 208, 206, 0.8) -40.34%, rgba(16, 53, 91, 0.8) 132.95%);"
      >
        <div class="text-base text-white font-semibold py-1 my-3">
          Copyright (C) Bersama Bisa
        </div>
      </div>
    </q-toolbar>
  </q-footer>
</template>

<script>
export default {
  name: 'BaseFooter',
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
};
</script>
