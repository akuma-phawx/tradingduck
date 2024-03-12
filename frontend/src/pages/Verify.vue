<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();

onMounted(() => {
  const tokenVal = useRoute().params.token;
  if (typeof tokenVal === 'string') {
    window.location.href = '/api/verify/' + tokenVal;
  } else {
    router.push('/');
  }
});
</script>
