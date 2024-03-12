<script setup lang="ts">
import type { Ref } from 'vue';
import { onMounted, ref, watch } from 'vue';
import { Card } from '@prisma/client';
import { getSetById } from '@/services/set';

const props = defineProps<{
  modelValue: string | null;
  label: string;
  set: string;
}>();
const emit = defineEmits(['update:modelValue']);

const cards: Ref<Card[]> = ref([]);
const selectedCard: Ref<Card | null> = ref(null);

onMounted(async () => {
  await fetchCards();
});

const fetchCards = async () => {
  const fetchedSet = await getSetById(props.set);
  if (!fetchedSet) return;
  cards.value = fetchedSet.cards;
};
watch(
  () => props.set,
  () => {
    fetchCards;
    selectedCard.value = null;
  },
);

watch(
  () => props.modelValue,
  newVal => {
    selectedCard.value = newVal;
  },
);

watch(
  () => selectedCard.value,
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
    v-model="selectedCard"
    label="Card"
    color="info"
    hint="Select card from set"
    :items="cards"
    item-title="name"
    return-object
    variant="outlined"
  >
    <template #selection="{ item }">
      <span class="mx-2">
        <v-avatar size="small" rounded="2" class="shadow-lg p-1 m-1">
          <v-img :src="item.raw.image" />
        </v-avatar>
        {{ item.raw.identifier.split('-')[1] }} - {{ item.raw.name }}
      </span>
    </template>
    <template #item="{ item, props }">
      <v-list-item v-bind="props">
        <template #title>
          <v-avatar size="small" rounded="2" class="shadow-lg p-1 m-1">
            <v-img :src="item.raw.image" />
          </v-avatar>
          <span class="mx-2">{{ item.raw.identifier.split('-')[1] }} - {{ item.raw.name }}</span>
        </template>
      </v-list-item>
    </template>
  </v-select>
</template>
