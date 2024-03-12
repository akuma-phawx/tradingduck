<script setup lang="ts">
import { ref, onMounted, computed, Ref } from 'vue';
import { Country, Shop } from '@prisma/client';
import { getShops } from '@/services/shop';
import { getCountries } from '@/services/countries';
import { getCountryName } from '../../utils/getters';
import CountryIcon from '@/components/country/CountryIcon.vue';
import SelectCountry from '@/components/filters/SelectCountry.vue';
const shops: Ref<Shop[]> = ref([]);
const filteredShops = computed(() => {
  return selectedCountry.value
    ? shops.value.filter(shop => {
        return shop.countryId === selectedCountry.value;
      })
    : shops.value;
});

const selectedCountry = ref('');

const countries: Ref<Country[]> = ref([]);

onMounted(async () => {
  countries.value = await getCountries();
  shops.value = await getShops();
});
</script>
<template>
  <div class="row p-3">
    <p class="text-sm">{{ getCountryName(selectedCountry) }} Shops Count: {{ filteredShops.length }}</p>
    <template class="d-block mt-1">
      <v-btn color="blue" @click="selectedCountry = ''" text="Show All" />
    </template>
    <SelectCountry class="mt-10" v-model="selectedCountry" :label="'Filter by country'" />
    <v-table height="500px">
      <thead>
        <tr>
          <th class="text-center">ID</th>
          <th class="text-center">Name</th>
          <th class="text-center">URL</th>
          <th class="text-center">Country</th>
          <th class="text-center">Instagram</th>
          <th class="text-center">Description</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="filteredShops.length > 0">
          <tr v-for="shop in filteredShops" :key="shop.id" class="text-center">
            <td>{{ shop?.id }}</td>
            <td>
              <div class="d-flex px-2 py-1 align-items-center">
                <template v-if="shop.logo">
                  <v-avatar size="50" color="white" rounded="2" class="shadow-lg p-1">
                    <v-img cover :src="shop.logo" />
                  </v-avatar>
                </template>
                <template v-else>
                  <v-avatar size="50" color="white" rounded="2" class="shadow-lg">
                    <v-icon size="x-large" icon="mdi-account-circle" />
                  </v-avatar>
                </template>
                <div class="d-flex flex-column justify-content-center ml-3">
                  <p class="mb-0 text-md">{{ shop.name }}</p>
                </div>
              </div>
            </td>
            <td>
              <a :href="shop?.url" target="_blank" class="link-info">
                <v-icon icon="mdi-launch" />
              </a>
            </td>
            <td>
              <CountryIcon v-if="shop?.location" :code="shop?.location.code" />
            </td>
            <td>
              <a v-if="shop.instagram" :href="shop.instagram" target="_blank" class="link-info">
                <v-icon icon="mdi-launch" />
              </a>
              <p v-else>-</p>
            </td>
            <td>
              {{ shop?.description }}
            </td>
            <td class="text-center p-1">
              <v-btn color="danger" class="text-white" rounded="2" size="small" icon="mdi-delete" />
              <v-btn color="blue" rounded="2" size="small" class="m-2" icon="mdi-pencil" />
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="7" class="text-center font-italic">No Shops.</td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </div>
</template>
