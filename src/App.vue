<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

/* eslint-disable max-len */
const appTitle = 'BersamaBisa.ID Community Official Website';
const appDesc = 'Menghadirkan Kebaikan tidaklah sulit, kita bisa bersama membuka jalan kebaikan untuk mereka yang membutuhkan, mari bersama menjadi pengarah kebaikan untuk Indonesia yang lebih berdaya';
const appKeywords = 'Komunitas Bersamabisa.ID';
// eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
const appBrandLogoPath = require('assets/logo/Bbid-logo.png') as string;
/* eslint-enable max-len */

export default defineComponent({
  name: 'App',
  meta() {
    return {
      title: appTitle,
      meta: {
        title: { name: 'title', content: appTitle },
        description: { name: 'description', content: appDesc },
        keywords: { name: 'keywords', content: appKeywords },
        // Open Graph / Facebook
        ogTitle: { name: 'og:title', content: appTitle },
        ogDesc: { name: 'og:description', content: appDesc },
        ogUrl: { name: 'og:url', content: this.$route.fullPath },
        ogImg: { name: 'og:image', content: appBrandLogoPath },
        // Twitter
        twtCard: { name: 'twitter:card', content: 'summary_large_image' },
        twtTitle: { name: 'twitter:title', content: appTitle },
        twtDesc: { name: 'twitter:description', content: appDesc },
        twtUrl: { name: 'twitter:url', content: this.$route.fullPath },
        twtImg: { name: 'twitter:image', content: appBrandLogoPath },
      },
    };
  },
});
</script>
