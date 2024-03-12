<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Login from './LogIn.vue';
import SignUp from './SignUp.vue';
import ForgotPw from './ForgotPw.vue';
import { useRoute } from 'vue-router';
import ResetPwVue from './ResetPw.vue';

const status = ref<string>('default');
const pwResetToken = ref<string>('');
function changeStatus(newStatus: string): void {
  status.value = newStatus;
}

onMounted(() => {
  const route = useRoute();
  if (route.fullPath.includes('/reset-password')) {
    if (route.params.token && typeof route.params.token === 'string') {
      pwResetToken.value = route.params.token;
      status.value = 'reset-password';
    }
  }
});
</script>
<template>
  <div class="page-layout">
    <div v-for="(snow, index) in 80" class="snow" :key="'snow' + snow + index"></div>
    <div v-if="status === 'default'" class="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
      <div class="mb-2">
        <img class="w-60" src="../../assets/img/logos/black_logo_vertical.png" crossorigin="anonymous" />
        <p>Your Gateway to Global Pokémon Card Trading 🌎</p>
      </div>
      <div>
        <v-btn color="dark" class="text-white" depressed elevation="5" @click="status = 'login'" text="Login" />
        <v-btn class="mx-2" color="primary" depressed elevation="5" @click="status = 'signup'" text="Signup" />
      </div>
      <v-container class="mt-5">
        <RouterLink class="metal-black mx-2" to="/privacy-policy" :text="'Privacy Policy'" target="_blank" />
        <RouterLink class="metal-black mx-2" to="/tradingduck-tac" :text="'ToS'" target="_blank" />
        <RouterLink class="metal-black mx-2" to="/imprint" :text="'Imprint'" target="_blank" />
      </v-container>
    </div>
    <Login
      v-else-if="status === 'login'"
      class="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center"
      @change-status="changeStatus"
    />
    <SignUp
      v-else-if="status === 'signup'"
      class="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center"
      @change-status="changeStatus"
    />
    <ForgotPw
      v-else-if="status === 'forgot-password'"
      class="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center"
      @change-status="changeStatus"
    />
    <ResetPwVue
      v-else-if="status === 'reset-password'"
      class="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center"
      @change-status="changeStatus"
      :token="pwResetToken"
    />
  </div>
</template>
<style scoped lang="scss">
.page-layout {
  background: radial-gradient(ellipse at bottom, #ffffff 0%, rgb(210, 212, 224) 100%);
  height: 100vh;
}
</style>
