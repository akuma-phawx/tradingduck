<script setup lang="ts">
import { getCardConditions } from '@/utils/getters';

import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string | null;
  label: string;
}>();
const emit = defineEmits(['update:modelValue']);

const conditions = getCardConditions();
const selectedCondition = ref<string | null>('');

watch(
  () => props.modelValue,
  newVal => {
    selectedCondition.value = newVal;
  },
);

watch(
  () => selectedCondition.value,
  newVal => {
    if (newVal !== props.modelValue) {
      emit('update:modelValue', newVal);
    }
  },
);
</script>
<template>
  <v-select
    density="compact"
    :label="label"
    :items="conditions"
    color="info"
    clearable
    v-model="selectedCondition"
    hint="Select card condition"
    variant="outlined"
  />
</template>
