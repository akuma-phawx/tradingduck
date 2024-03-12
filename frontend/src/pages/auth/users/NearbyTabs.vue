<script setup lang="ts">
import { NearBy } from '@/services/nearby';
import NearbyShopsTable from './NearbyShopsTable.vue';
import NearbyTradeSpotsTable from './NearbyTradeSpotsTable.vue';
import { ref } from 'vue';

defineProps<{
  nearbyLocations: NearBy | undefined;
}>();
const activeTab = ref('shops');
</script>
<template>
  <div class="col-12">
    <v-card class="mt-4 shadow-none mt-10">
      <v-tabs v-model="activeTab" color="deep-purple-accent-4" align-tabs="center">
        <v-tab :value="'shops'" text=" Nearby Shops" />
        <v-tab :value="'spots'" text=" Nearby Trade Spots" />
      </v-tabs>
      <v-window v-model="activeTab">
        <v-card-text>
          <v-window-item value="shops"><NearbyShopsTable :shops="nearbyLocations?.shops" /> </v-window-item>
          <v-window-item value="wishlist"> <NearbyTradeSpotsTable :tradespots="nearbyLocations?.tradespots" /> </v-window-item>
        </v-card-text>
      </v-window>
    </v-card>
  </div>
</template>
