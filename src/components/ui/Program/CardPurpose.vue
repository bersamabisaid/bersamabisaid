<template>
  <q-card
    flat
    bordered
    class="my-card bg-grey-1"
  >
    <q-card-section class="bg-blue-400">
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">
            {{ title }}
          </div>
        </div>

        <div class="col-auto">
          <q-btn
            color="grey-7"
            round
            flat
            icon="arrow_forward"
            class="text-dark"
          >
            <q-menu
              cover
              auto-close
            >
              <q-list>
                <q-item clickable>
                  <q-item-section>Remove Card</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Send Feedback</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Share</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      {{ description }}
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'CardPurpose',
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
});
</script>
