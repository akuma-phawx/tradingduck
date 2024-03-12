<script setup lang="ts">
import { getRarities } from '@/services/rarities';
import { Rarity } from '@prisma/client';
import type { Ref } from 'vue';
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string | null;
  label: string;
}>();
const emit = defineEmits(['update:modelValue']);

const rarities: Ref<Rarity[]> = ref([]);
const selectedRarity = ref<string | null>(null);

const sortedRarities = computed(() => {
  // Use a slice to avoid mutating the original array
  const raritiesCopy = [...rarities.value];

  // Sort the array alphabetically based on the 'name' property
  return raritiesCopy.sort((a, b) => a.name.localeCompare(b.name));
});
onMounted(async () => {
  rarities.value = await getRarities();
});

watch(
  () => props.modelValue,
  newVal => {
    selectedRarity.value = newVal;
  },
);

watch(
  () => selectedRarity.value,
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
    :items="sortedRarities"
    color="info"
    clearable
    item-title="name"
    item-value="name"
    variant="outlined"
    v-model="selectedRarity"
  />
</template>
