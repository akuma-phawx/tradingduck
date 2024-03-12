<script setup lang="ts">
import router from '@/router';
import { logIn } from '@/services/auth';
import useVuelidate from '@vuelidate/core';
import type { ErrorObject } from '@vuelidate/core';
import { helpers, required, email as emaiLValidator } from '@vuelidate/validators';
import { Ref, computed, ref } from 'vue';

// Login Info and Error Message
const email = ref('');
const password = ref('');
const error = ref('');
const passwordVisible = ref(false);

// Vuelidate
const rules = computed(() => ({
  email: {
    required: helpers.withMessage('Email is required', required),
    emaiLValidator,
  },
  password: {
    required: helpers.withMessage('Password is required', required),
  },
}));

const getErrorMessage = (field: string) => {
  return v$.value[field].$errors.map((error: ErrorObject) => error.$message);
};

const v$ = useVuelidate(rules, { email, password });

// Emits
const emit = defineEmits<{
  changeStatus: [status: string];
}>();

// Loading variable for spinner
const isLoading: Ref<boolean> = ref(false);

// Login Functionality
const signIn = async (): Promise<void> => {
  const isValid = await v$.value.$validate();
  if (isValid) {
    const data = {
      email: email.value,
      password: password.value,
    };
    isLoading.value = true;
    const userData = await logIn(data);
    isLoading.value = false;

    if (userData.message && userData.message !== 'login') {
      error.value = userData.message;
    } else {
      router.push('/app');
    }
  }
};
</script>

<template>
  <div class="page-header align-items-start min-vh-100">
    <div class="container my-auto">
      <v-card class="mx-auto opacity-background fadeIn1 fadeInBottom" max-width="400">
        <template #title> Login </template>

        <template #text>
          <form role="form" class="text-start" @submit.prevent="signIn">
            <v-text-field
              density="compact"
              class="my-3"
              prepend-icon="mdi-email-outline"
              color="info"
              v-model="email"
              type="email"
              label="Email"
              hint="Enter your login email"
              variant="outlined"
              :error-messages="getErrorMessage('email')"
            />
            <v-text-field
              density="compact"
              class="mt-5"
              prepend-icon="mdi-lock-outline"
              color="info"
              v-model="password"
              :type="passwordVisible ? 'text' : 'password'"
              label="Password"
              hint="Enter your password"
              :error-messages="getErrorMessage('password')"
              variant="outlined"
              :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="passwordVisible = !passwordVisible"
            />
            <div class="text-sm text-center text-danger mb-4 mt-0">
              <span>{{ error }}</span>
            </div>
            <p class="text-xs mt-n2 text-end cursor-pointer">
              Forgotten your password?
              <a class="link-info" @click="emit('changeStatus', 'forgot-password')">Click here</a>
            </p>
            <v-divider class="my-5" />
            <v-btn :loading="isLoading" type="submit" color="success" depressed elevation="5" class="mx-auto d-block" text="Sign In" />
            <p class="mt-4 text-sm text-center cursor-pointer">
              Don't have an account?
              <a class="link-info" @click="emit('changeStatus', 'signup')">Sign Up</a>
            </p>
            <hr class="dark horizontal my-0 mt-2" />
            <p class="text-sm mt-2 mb-0 text-center cursor-pointer">
              <a class="link-dark font-weight-bold" @click="emit('changeStatus', 'default')"
                ><img class="w-10 h10" src="../../assets/img/logos/black_logo_no_text.png" crossorigin="anonymous" /><span> TradingDuck </span>
              </a>
            </p>
            <v-container class="text-center p-0 mt-5">
              <RouterLink class="metal-black mx-2" to="/privacy-policy" :text="'Privacy Policy'" target="_blank" />
              <RouterLink class="metal-black mx-2" to="/tradingduck-tac" :text="'ToS'" target="_blank" />
              <RouterLink class="metal-black mx-2" to="/imprint" :text="'Imprint'" target="_blank" />
            </v-container>
          </form>
        </template>
      </v-card>
    </div>
  </div>
</template>
