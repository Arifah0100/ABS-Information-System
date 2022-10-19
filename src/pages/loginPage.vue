<template>
  <q-card class="q-ma-xl">
    <div class="row">
      <div class="col-0 col-sm-5 bg-primary rounded-left-borders xs-hide">
        <div
          class="row full-width q-px-xl q-pb-xl full-height flex flex-center"
        >
          <div class="">
            <div
              class="text-h4 text-uppercase text-white flex flex-center"
              style="min-width: 220px"
            >
              Welcome
            </div>
            <div class="text-white q-my-sm text-subtitle1 flex flex-center">
              ABS Information System
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-7">
        <div class="row q-ml-sm q-mt-sm sm-and-up-hide">
          <div class="col-12 text-subtitle1">
            <router-link
              class="text-primary"
              style="text-decoration: none"
              to="/"
            >
              System Name
            </router-link>
          </div>
        </div>
        <div class="row q-pa-sm-sm q-pa-md">
          <div class="col-12">
            <q-card-section>
              <div class="q-mb-xl">
                <div class="flex justify-center">
                  <div
                    class="
                      text-h4 text-uppercase
                      q-my-none
                      text-weight-bold text-primary
                    "
                  >
                    Login
                  </div>
                </div>
              </div>
              <q-form class="q-gutter-md" @submit="login()">
                <q-input
                  autofocus
                  v-model="username"
                  label="Username"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Input your Username',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="people" />
                  </template>
                </q-input>
                <q-input
                  v-model="password"
                  label="Password"
                  :type="isPwd ? 'password' : 'text'"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Input your password',
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
                <div>
                  <q-btn
                    class="full-width"
                    label="Login"
                    color="blue"
                    size="md"
                    type="submit"
                  />
                  <div class="q-mt-lg">
                    <div class="q-mt-sm">
                      Create an account?
                      <router-link class="text-primary" to="/login">
                        Sign Up
                      </router-link>
                    </div>
                  </div>
                </div>
              </q-form>
            </q-card-section>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from 'src/stores/auth';

const authStore = useAuthStore();
export default defineComponent({
  data() {
    return {
      authStore,
      loading: false,
      isShowPass: false,
      check: false,
      loginForm: {
        userName: '',
        password: '',
      },
      error1: false,
      submitState: false,
    };
  },
  methods: {
    async login() {
      this.submitState = true;
      try {
        await authStore.loginUser(
          this.loginForm.userName,
          this.loginForm.password
        );
        this.$router.push({ name: 'dashboard' });
      } catch (e) {
        const status = String((e as { message: string }).message || e)
          .replace(/error|:|failed/gi, '')
          .trim();
        switch (status) {
          case 'pending':
            this.$q.notify({
              type: 'negative',
              message: 'Your account is still pending.',
              caption:
                'Please contact your administrator to activate your account.',
              color: 'warning',
              position: 'bottom',
            });
            break;

          case 'expired':
            this.$q.notify({
              type: 'negative',
              message: 'Your account has expired.',
              caption:
                'Please contact your administrator to reactivate your account.',
              color: 'negative',
              position: 'bottom',
            });
            break;

          case 'disabled':
          case 'suspended':
            this.$q.notify({
              type: 'negative',
              message: 'Your account has been suspended or disabled.',
              caption:
                'Please contact your administrator to reactivate your account.',
              color: 'negative',
              position: 'bottom',
            });
            break;

          default:
            this.$q.notify({
              message: status,
              color: 'negative',
              position: 'bottom',
            });
        }
      }
    },
    clickMethod() {
      this.$router.push({ path: '/:catchAll(.*)*' });
    },
  },
});
</script>

<style>
</style>