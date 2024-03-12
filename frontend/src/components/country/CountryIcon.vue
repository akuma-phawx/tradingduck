<script setup lang="ts">
import { getLanugageFlagId } from '@/utils/getters';
defineProps<{
  code: string;
}>();
</script>
<template>
  <span class="fi" :class="`fi-${getLanugageFlagId(code)}`"></span>
</template>
