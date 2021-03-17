<template>
  <footer class="relative bg-white pt-8 pb-6">
    <div class="container mx-auto px-4">
      <!-- <div class="flex flex-wrap">
        <div>
          <h4 class="text-3xl font-semibold">
            Let's keep in touch!
          </h4>
          <h5 class="text-lg mt-0 mb-2 text-gray-700">
            Find us on any of these platforms, we respond 1-2 business days.
          </h5>
          <div class="mt-6">
            <button
              class="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center
               justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
              type="button"
              v-for="n in 4"
              :key="n"
            >
              <i class="flex fab fa-twitter" />
            </button>
          </div>
        </div>
      </div> -->
      <div class="flex flex-wrap">
        <img
          src="~assets/logo/BersamabisaLogo.png"
          width="250px"
        >
      </div>
      <hr class="my-6 border-gray-400">
      <div
        class="flex flex-wrap items-center md:justify-between justify-center"
      >
        <div class="w-full md:w-4/12 px-4 mx-auto text-center">
          <div class="text-sm text-gray-600 font-semibold py-1">
            Copyright (C) Bersama Bisa
          </div>
        </div>
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
