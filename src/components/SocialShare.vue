<template>
  <div class="p-4 bg-secondary shadow-sm flex flex-col items-center gap-y-2">
    <slot name="title">
      <div class="self-end font-semibold text-xl text-white flex flex-row items-center gap-x-2">
        <q-icon name="share" />
        <span>Bagikan</span>
      </div>
    </slot>

    <div class="select-all truncate w-56 pl-2 pr-3 py-1 bg-blue-gray-200 font-light text-xs text-gray-700 rounded-xl">
      <q-btn
        icon="content_copy"
        size="xs"
        flat
        round
        class="mr-1"
        @click="shareToClipboard"
      />
      <span>{{ sharedUrl }}</span>
    </div>

    <div class="w-full flex flex-row justify-center gap-x-2">
      <share-network
        network="whatsapp"
        :url="sharedUrl"
        :title="sharedTitle"
      >
        <q-btn
          :icon="mdiWhatsapp"
          round
          flat
          class="text-white"
        />
      </share-network>

      <share-network
        network="facebook"
        :url="sharedUrl"
        :title="sharedTitle"
      >
        <q-btn
          :icon="mdiFacebook"
          round
          flat
          class="text-white"
        />
      </share-network>

      <share-network
        network="twitter"
        :url="sharedUrl"
        :title="sharedTitle"
      >
        <q-btn
          :icon="mdiTwitter"
          round
          flat
          class="text-white"
        />
      </share-network>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { copyToClipboard } from 'quasar';
import { mdiFacebook, mdiWhatsapp, mdiTwitter } from '@quasar/extras/mdi-v5';

export default defineComponent({
  name: 'SocialShare',
  props: {
    sharedUrl: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {
      mdiFacebook,
      mdiWhatsapp,
      mdiTwitter,
    };
  },
  computed: {
    sharedTitle(): string {
      return document.title;
    },
  },
  methods: {
    shareToClipboard() {
      return copyToClipboard(this.sharedUrl)
        .then(() => alert?.('copied to clipboard!'));
    },
  },
});
</script>
