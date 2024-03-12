<script setup lang="ts">
import { forgotPassword } from '@/services/auth';
import useVuelidate from '@vuelidate/core';
import { helpers, required, email as emailValidator } from '@vuelidate/validators';
import type { ErrorObject } from '@vuelidate/core';
import { Ref, computed, ref } from 'vue';

// PW forget Info and Error Message
const email = ref('');
const error = ref('');
const sucessmsg = ref('');

// Vuelidate
const rules = computed(() => ({
  email: {
    required: helpers.withMessage('Email is required', required),
    emailValidator,
  },
}));

const getErrorMessage = (field: string) => {
  return v$.value[field].$errors.map((error: ErrorObject) => error.$message);
};

const v$ = useVuelidate(rules, { email });

// Emits
const emit = defineEmits<{
  changeStatus: [status: string];
}>();

// Loading variable for spinner
const isLoading: Ref<boolean> = ref(false);

// Forgot Email Functionality
const sendEmail = async (): Promise<void> => {
  const isValid = await v$.value.$validate();

  if (isValid) {
    try {
      isLoading.value = true;
      await forgotPassword(email.value);
      isLoading.value = false;
      sucessmsg.value = 'If a account is associated with that Email, we have send you a Email with instructions on how to reset your password.';
    } catch (err) {
      error.value = 'Something went wrong. Please try again.';
    }
  }
};
</script>

<template>
  <div class="page-header align-items-start min-vh-100">
    <div class="container my-auto">
      <v-card class="mx-auto opacity-background fadeIn1 fadeInBottom" max-width="400">
        <template #title> Forgot Password </template>

        <template #text>
          <form role="form" class="text-start" @submit.prevent="sendEmail">
            <v-text-field
              density="compact"
              prepend-icon="mdi-email-outline"
              color="info"
              v-model="email"
              type="email"
              label="Email"
              hint="Enter your login email"
              variant="outlined"
              :error-messages="getErrorMessage('email')"
            />

            <div class="text-sm text-center text-danger mb-4 mt-0">
              <span>{{ error }}</span>
            </div>
            <div class="text-sm text-center text-sucess mb-4 mt-0">
              <span>{{ sucessmsg }}</span>
            </div>
            <v-divider class="my-5" />
            <div class="text-center">
              <v-btn :loading="isLoading" type="submit" color="info" depressed elevation="5" text="Send Email" />
            </div>
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
