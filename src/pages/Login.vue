<template>
  <minimalist-layout>
    <q-page
      padding
      class="pt-5 pb-20 bg-secondary flex flex-col justify-center items-center gap-y-6"
    >
      <q-form
        ref="loginForm"
        class="w-full max-w-sm"
        @submit="onSubmit"
        @reset="onReset"
      >
        <q-card class="w-full">
          <q-card-section>
            <q-input
              v-model="email"
              label="Email"
              :rules="[requiredRule]"
            />
            <q-input
              v-model="password"
              label="Password"
              :type="hidePassword ? 'password' : 'text'"
              :rules="[requiredRule]"
            >
              <template #append>
                <q-icon
                  :name="hidePassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="hidePassword = !hidePassword"
                />
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              label="Login"
              type="submit"
              flat
              rounded
              class="bg-primary text-white"
            />
          </q-card-actions>
        </q-card>
      </q-form>
    </q-page>
  </minimalist-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import MinimalistLayout from 'layouts/MinimalistLayout.vue';
import { auth } from 'src/services/firebaseService';
import type { QForm } from 'quasar';
import { requiredRule } from 'src/composables/useInputRules';
import useAuth from 'src/composables/useAuth';
import useGuardGuestOnly from 'src/composables/useGuardGuestOnly';

export default defineComponent({
  name: 'PageLogin',
  setup() {
    useGuardGuestOnly();

    return {
      ...useAuth(),
      requiredRule,
    };
  },
  data() {
    return {
      email: '',
      password: '',

      hidePassword: true,
    };
  },
  methods: {
    async onSubmit() {
      await this.login();
    },
    onReset() {
      this.email = '';
      this.password = '';
    },
    async login() {
      const credential = await auth.signInWithEmailAndPassword(this.email, this.password);

      if (credential.user) {
        await this.$router.push({ name: 'Home' });
      } else {
        (this.$refs.loginForm as QForm).reset();
      }
    },
  },
  components: {
    MinimalistLayout,
  },
});
</script>
