<script setup lang="ts">
import router from '@/router';
import { signUp } from '@/services/auth';
import { logIn } from '@/services/auth';
import { ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import type { ErrorObject } from '@vuelidate/core';
import { required, email as emailValidator, minLength, helpers } from '@vuelidate/validators';

const email = ref('');
const name = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const agreeToTerms = ref(false);

const emit = defineEmits(['changeStatus']);
const rules = {
  email: {
    required: helpers.withMessage('Email is required', required),
    emailValidator,
  },
  password: {
    required: helpers.withMessage('Password is required', required),
    minLength: minLength(9),
  },
  name: {
    required: helpers.withMessage('Username is required', required),
  },
  confirmPassword: {
    required: helpers.withMessage('Confirm Password is required', required),
    minLength: minLength(9),
    sameAs: helpers.withMessage('Passwords should match', function (value) {
      return password.value === value;
    }),
  },
};

const v$ = useVuelidate(rules, { email, name, password, confirmPassword });

const getErrorMessage = (field: string) => {
  return v$.value[field].$errors.map((error: ErrorObject) => error.$message);
};

const isLoading = ref(false);
const register = async () => {
  const isValid = await v$.value.$validate();
  if (isValid && agreeToTerms.value) {
    const data = {
      email: email.value,
      name: name.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };
    isLoading.value = true;
    const userData = await signUp(data);
    if (userData.message && userData.message !== 'signup') {
      isLoading.value = false;
      error.value = userData.message;
    } else {
      // this takes also time so we let it load
      await logIn({ email: email.value, password: password.value });
      router.push('/app');
    }
  }
};
</script>
<template>
  <div class="page-header align-items-start min-vh-100" id="imagecontainer">
    <span class="mask opacity-6"></span>
    <div class="container my-auto">
      <v-card class="mx-auto opacity-background fadeIn1 fadeInBottom" max-width="400">
        <template #title> Sign Up </template>

        <template #text>
          <form role="form" @submit.prevent="register">
            <v-text-field
              class="my-3"
              density="compact"
              prepend-icon="mdi-email-outline"
              color="info"
              v-model="email"
              type="email"
              label="Email"
              hint="Enter your login email"
              :error-messages="getErrorMessage('email')"
              variant="outlined"
            />
            <v-text-field
              density="compact"
              prepend-icon="mdi-account"
              color="info"
              v-model="name"
              class="my-3"
              type="text"
              label="Username"
              hint="Enter your username"
              :error-messages="getErrorMessage('name')"
              variant="outlined"
            />
            <v-text-field
              prepend-icon="mdi-lock-outline"
              color="info"
              class="my-3"
              v-model="password"
              type="password"
              label="Password"
              hint="Enter your password"
              density="compact"
              :error-messages="getErrorMessage('password')"
              variant="outlined"
            />
            <v-text-field
              prepend-icon="mdi-lock-check-outline"
              v-model="confirmPassword"
              color="info"
              class="my-3"
              type="password"
              label="Confirm Password"
              hint="Confirm your password"
              density="compact"
              :error-messages="getErrorMessage('confirmPassword')"
              variant="outlined"
            />
            <div class="text-sm mt-2 mb-0 text-center cursor-pointer">
              <input type="checkbox" id="agreeTerms" v-model="agreeToTerms" />
              <label for="agreeTerms"
                >I agree to the <RouterLink class="link-info" :to="'/tradingduck-tac'" target="_blank" :text="'Terms and Conditions'"
              /></label>
            </div>
            <div class="text-sm text-center text-danger">
              <span>{{ error }}</span>
            </div>
            <div class="text-center">
              <v-btn
                :loading="isLoading"
                type="submit"
                color="dark"
                class="text-white my-4"
                depressed
                elevation="5"
                :disabled="!agreeToTerms"
                text="Sign Up"
              />
            </div>
            <p class="text-sm mt-3 mb-0 text-center cursor-pointer">
              Already have an account? <a class="link-info" @click="emit('changeStatus', 'login')">Sign In</a>
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
