<script setup lang="ts">
import type { Ref } from 'vue';
import { computed, onMounted, ref, watch } from 'vue';
import { Set } from '@prisma/client';
import { getSets } from '@/services/set';

const props = defineProps<{
  modelValue: string | null;
  label: string;
}>();
const emit = defineEmits(['update:modelValue']);

const sets: Ref<Set[]> = ref([]);
const selectedSet = ref<string | null>(null);

const sortedSets = computed(() => {
  // Use a slice to avoid mutating the original array
  const setsCopy = [...sets.value];

  // Sort the array alphabetically based on the 'name' property
  return setsCopy.sort((a, b) => a.name.localeCompare(b.name));
});
onMounted(async () => {
  sets.value = await getSets();
});

watch(
  () => props.modelValue,
  newVal => {
    selectedSet.value = newVal;
  },
);

watch(
  () => selectedSet.value,
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
    :items="sortedSets"
    color="info"
    clearable
    item-title="name"
    item-value="identifier"
    variant="outlined"
    v-model="selectedSet"
  >
    <template #selection="{ item }">
      <span class="mx-2">
        <v-avatar size="small" rounded="2" class="shadow-lg p-1 m-1">
          <v-img :src="item.raw.image" />
        </v-avatar>
        {{ item.title }}
      </span>
    </template>
    <template #item="{ item, props }">
      <v-list-item v-bind="props">
        <template #title>
          <v-avatar size="small" rounded="2" class="shadow-lg p-1 m-1">
            <v-img :src="item.raw.image" />
          </v-avatar>
          <span class="mx-2">{{ item.title }}</span>
        </template>
      </v-list-item>
    </template>
  </v-select>
</template>
