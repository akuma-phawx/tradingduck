<script setup lang="ts">
import CountryIcon from '../country/CountryIcon.vue';
import { getCountries } from '@/services/countries';
import { Country } from '@prisma/client';
import { onMounted, ref, watch } from 'vue';
import type { Ref } from 'vue';

const props = defineProps<{
  modelValue: string;
  label: string;
  errorMessages?: string[];
  initialCountry?: string;
}>();
const emit = defineEmits(['update:modelValue']);

const countries: Ref<Country[]> = ref([]);
const selectedCountry = ref<string | null>(null);

onMounted(async () => {
  countries.value = await getCountries();
  selectedCountry.value = props.initialCountry ?? '';
});

watch(
  () => props.modelValue,
  newVal => {
    selectedCountry.value = newVal;
  },
);

watch(
  () => selectedCountry.value,
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
    clearable
    :items="countries"
    item-title="name"
    item-value="code"
    color="info"
    variant="outlined"
    v-model="selectedCountry"
    :error-messages="errorMessages"
  >
    <template #selection="{ item }">
      <CountryIcon :code="item?.value" /><span class="mx-2">{{ item.title }} </span></template
    >
    <template #item="{ item, props }">
      <v-list-item v-bind="props">
        <template #title>
          <CountryIcon :code="item?.value" /><span class="mx-2">{{ item.title }}</span>
        </template>
      </v-list-item>
    </template>
    <template #prepend-inner>
      <v-icon color="#f34" icon="mdi-map-marke" />
    </template>
  </v-select>
</template>
