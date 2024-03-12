<script setup lang="ts">
import { toggleIconSide } from '@/utils/togglers';
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="sidenav-header d-flex justify-content-center">
    <i
      class="fas fa-times p-3 cursor-pointer text-primary opacity-5 position-absolute end-0 top-0 d-xl-none"
      id="iconSidenav"
      @click="toggleIconSide"
    ></i>
    <RouterLink class="m-0" to="/app">
      <img crossorigin="anonymous" class="h-100 p-2" src="../../assets/img/logos/black_logo_vertical.png" />
    </RouterLink>
  </div>
</template>
