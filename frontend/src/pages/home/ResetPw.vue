<script setup lang="ts">
import { resetPasswordWithToken, logIn } from '@/services/auth';
import { Ref, ref } from 'vue';
import router from '@/router';

// PW forget Info and Error Message
const error = ref('');
const email = ref('');
const password = ref<string>('');
const confirmPassword = ref<string>('');
const { token } = defineProps<{
  token: string;
}>();

// Emits
const emit = defineEmits<{
  changeStatus: [status: string];
}>();

// Loading variable for spinner
const isLoading: Ref<boolean> = ref(false);

async function resetPassword(): Promise<void> {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.';
    return;
  }

  isLoading.value = true;
  try {
    console.log('token', token);
    await resetPasswordWithToken(password.value, confirmPassword.value, token);
    await logIn({ email: email.value, password: password.value });
    router.push('/app');
  } catch (err) {
    error.value = 'Something went wrong. Please try again.';
  }
  isLoading.value = false;
}
</script>

<template>
  <div class="page-header align-items-start min-vh-100">
    <div class="container my-auto">
      <v-card class="mx-auto opacity-background fadeIn1 fadeInBottom" max-width="400">
        <template #title> Reset Password </template>

        <template #text>
          <form role="form" class="text-start" @submit.prevent="resetPassword">
            <div class="input-group input-group-outline my-3">
              <v-text-field
                density="compact"
                prepend-icon="mdi-email-outline"
                color="info"
                v-model="email"
                type="email"
                label="Email"
                hint="Enter your login email"
                variant="outlined"
              />
            </div>
            <div class="input-group input-group-outline my-3">
              <v-text-field
                prepend-icon="mdi-lock-outline"
                color="info"
                v-model="password"
                type="password"
                label="Password"
                hint="Enter your password"
                variant="outlined"
              ></v-text-field>
            </div>
            <div class="input-group input-group-outline my-3">
              <v-text-field
                prepend-icon="mdi-lock-check-outline"
                v-model="confirmPassword"
                color="info"
                type="password"
                label="Confirm Password"
                hint="Confirm your password"
                variant="outlined"
              ></v-text-field>
            </div>
            <div class="text-sm text-center text-danger mb-4 mt-0">
              <span>{{ error }}</span>
            </div>
            <v-divider class="my-5" />
            <div class="text-center">
              <v-btn :loading="isLoading" type="submit" color="primary" depressed elevation="5" text="Send Email" />
            </div>
            <p class="mt-2 text-sm text-center cursor-pointer">
              Don't have an account?
              <a class="link-info" @click="emit('changeStatus', 'signup')">Sign Up</a>
            </p>
            <hr class="dark horizontal my-0 mt-2" />
            <p class="text-sm mt-2 mb-0 text-center cursor-pointer">
              <a class="link-primary font-weight-bold" @click="emit('changeStatus', 'default')">TradingDuck</a>
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
