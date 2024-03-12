<script setup lang="ts">
defineProps<{
  color?: string;
  icon: string;
  title: string;
  subtitle?: string;
  background?: string;
}>();
</script>

<template>
  <div class="d-flex">
    <div class="icon icon-shape icon-lg bg-white shadow text-center border-radius-xl mt-n3 ms-4" :class="background">
      <v-icon :class="color" :icon="icon" />
    </div>
    <div>
      <h5 class="mt-3 mb-2 ms-3">{{ title }}</h5>
      <p v-if="subtitle" class="mt-n1 ms-3 text-sm">{{ subtitle }}</p>
    </div>
  </div>
</template>
