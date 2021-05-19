<template>
  <q-toolbar class="px-0 pt-8 column border-t-4 shadow-2xl">
    <div class="container py-10 px-4 column gap-y-8">
      <div class="flex flex-wrap md:pb-4">
        <div class="w-full md:w-3/12 px-4 flex items-center justify-center mb-8">
          <img
            :src="require('assets/logo/Bbid-logo.png')"
            alt="logo bersamabisa.id"
            class="w-52"
          >
        </div>

        <q-separator
          spaced
          class="md:hidden w-full border-gray-400"
        />

        <div class="w-full md:w-9/12 px-4 py-4 md:py-2 flex flex-col items-center md:items-start gap-y-2">
          <h5 class="my-4 md:my-0 font-extrabold text-3xl text-primary tracking-tight">
            PROFIL SINGKAT
          </h5>

          <p class="max-w-prose text-dark">
            <router-link to="/">
              Bersamabisa.id
            </router-link> merupakan platform inovasi yang memiliki tujuan untuk mengembangkan kapasitas diri,
            melakukan pemberdayaan sosial, dan berusaha untuk meningkatkan kualitas pendidikan secara menyeluruh dan
            berkelanjutan melalui pendekatan kolektivitas.
          </p>
        </div>
      </div>

      <q-separator
        spaced
        class="w-full border-gray-400"
      />

      <div
        id="contact"
        class="col-12 py-2 flex flex-col items-center"
      >
        <h5 class="font-extrabold text-3xl text-primary tracking-tight">
          HUBUNGI KAMI
        </h5>

        <div class="py-6 flex gap-x-6">
          <a
            href="https://www.instagram.com/bersamabisa.id/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              :src="require('assets/logo/Instagram-logo.png')"
              class="w-12"
            >
          </a>

          <a
            href="https://wa.me/6283106122642"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              :src="require('assets/logo/Whatsapp-logo.png')"
              class="w-12"
            >
          </a>
        </div>
      </div>
    </div>

    <div
      class="w-full flex flex-row flex-wrap justify-center"
      style="background: linear-gradient(180deg, rgba(38, 208, 206, 0.8) -40.34%, rgba(16, 53, 91, 0.8) 132.95%);"
    >
      <div class="text-sm text-white font-semibold py-1 my-3">
        &copy; {{ new Date().getFullYear() }} BersamaBisaID. All rights reserved
      </div>
    </div>
  </q-toolbar>
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
