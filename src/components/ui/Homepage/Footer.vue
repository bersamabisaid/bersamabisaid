<template>
  <footer class="relative bg-white pt-8">
    <div class="container mx-auto px-4">
      <div class="row items-center my-10">
        <div class="col-3">
          <img
            src="~assets/logo/Bbid-logo.png"
            width="250px"
          >
        </div>
        <div class="col-8">
          <span class="text-h4 font-bold text-blue-900">PROFIL</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
      <hr class="my-6 border-gray-400">
      <div class="flex justify-center text-center">
        <div class="mb-6">
          <span class="text-h4 font-bold text-blue-900">HUBUNGI KAMI</span>
          <div class="q-gutter-lg my-1">
            <q-img
              :src="require('assets/logo/Instagram-logo.png')"
              width="60px"
            />
            <q-img
              :src="require('assets/logo/Whatsapp-logo.png')"
              width="60px"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-wrap justify-center "
      style="background: linear-gradient(180deg, rgba(38, 208, 206, 0.8) -40.34%, rgba(16, 53, 91, 0.8) 132.95%);"
    >
      <div class="text-base text-white font-semibold py-1 my-3">
        Copyright (C) Bersama Bisa
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
};
</script>
