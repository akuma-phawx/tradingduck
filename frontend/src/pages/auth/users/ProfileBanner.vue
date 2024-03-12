<script setup lang="ts">
defineProps<{
  userBanner?: string; // Make userBanner optional
}>();
</script>

<template>
  <div
    class="page-header min-height-200 border-radius-xl mb-n16"
    :style="{
      'background-image': userBanner
        ? `url(${userBanner})`
        : `url('https://skunkapetreestands.com/wp-content/uploads/2019/08/Dark-Woods-Banner.jpg')`,
    }"
  >
    <span class="mask opacity-6"></span>
  </div>
</template>
