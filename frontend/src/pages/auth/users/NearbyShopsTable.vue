<script setup lang="ts">
import { Shop } from '@prisma/client';
import CountryIcon from '@/components/country/CountryIcon.vue';
defineProps<{
  shops: Shop[];
}>();
</script>
<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-center">Name</th>
        <th class="text-center">URL</th>
        <th class="text-center">Country</th>
        <th class="text-center">Instagram</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="shops.length > 0">
        <tr v-for="shop in shops" :key="shop.id" class="text-center">
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
            <CountryIcon v-if="shop?.countryId" :code="shop?.countryId" />
          </td>
          <td>
            <a v-if="shop.instagram" :href="shop.instagram" target="_blank" class="link-info">
              <v-icon icon="mdi-launch" />
            </a>
            <p v-else>-</p>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="4" class="text-center font-italic">User has not set any shop to be nearby to his/her location.</td>
        </tr>
      </template>
    </tbody>
  </v-table>
</template>
