<script setup lang="ts">
import { getCardGrades } from '@/utils/getters';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string | null;
  label: string;
}>();

const emit = defineEmits(['update:modelValue']);

const grades = ref<string[]>([]);
const selectedGrade = ref<string | null>(null);

onMounted(async () => {
  grades.value = getCardGrades();
});

watch(
  () => props.modelValue,
  newVal => {
    selectedGrade.value = newVal;
  },
);

watch(
  () => selectedGrade.value,
  newVal => {
    if (newVal !== props.modelValue) {
      emit('update:modelValue', newVal);
    }
  },
);
</script>
<template>
  <v-select density="compact" :label="label" :items="grades" color="info" clearable variant="outlined" v-model="selectedGrade" />
</template>
