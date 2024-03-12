<script setup lang="ts">
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
import CountryIcon from '@/components/country/CountryIcon.vue';
import ShopBanner from '@/components/banners/ShopBanner.vue';
import { Shop } from '@prisma/client';
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import SelectCountry from '@/components/filters/SelectCountry.vue';
import { getShops, addShopToNearBy, removeShopFromNearBy } from '@/services/shop';
import { useUserStore } from '@/stores/userStore';
import { NearBy } from '../../../../../src/services/nearby.service';
import { getNearBy } from '@/services/nearby';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isAdmin } = storeToRefs(userStore);

const selectedCountry = ref('');
const shops = ref<Shop[]>([]);

const filteredShops = computed(() => {
  if (!selectedCountry.value) {
    return shops.value;
  }
  return shops.value.filter(shop => {
    return shop.countryId === selectedCountry.value;
  });
});

const shopsAreLoading = ref(false);
const nearby: Ref<NearBy> = ref({
  shops: [],
  tradespots: [],
  upcomingEvents: [],
});

onMounted(async () => {
  shopsAreLoading.value = true;
  try {
    shops.value = await getShops();
    nearby.value = await getNearBy();
  } catch (e) {
    console.error(e);
  }
  shopsAreLoading.value = false;
});

const isShopNearby = (shop: Shop) => {
  return nearby.value.shops.some(s => s.id === shop.id);
};

const addShopToNearByClick = async (shop: Shop) => {
  await addShopToNearBy(shop.id);
  nearby.value = await getNearBy();
};

const removeShopFromNearByClick = async (shop: Shop) => {
  await removeShopFromNearBy(shop.id);
  nearby.value = await getNearBy();
};
</script>

<template>
  <ContentOverlay>
    <ContentHeader
      :color="'instagram-gradient-golden-hour'"
      :icon="'mdi-store-outline'"
      :title="'Shops'"
      :subtitle="'Top quality Pokemon Card & Accessories Stores'"
    />
    <ContentBody>
      <!-- Banner -->
      <v-container>
        <ShopBanner />
      </v-container>
      <!-- Admin Actions -->
      <div v-if="isAdmin">
        <RouterLink to="/app/shops/create">
          <v-btn color="success" depressed elevation="5" text="Add Shop" />
        </RouterLink>
      </div>
      <template class="row mt-5 m-0 col-4">
        <SelectCountry v-model="selectedCountry" :label="'Select Shop Country'" />
      </template>
      <!-- Shops List -->
      <template class="row mt-5">
        <v-container v-if="shopsAreLoading">
          <v-progress-circular indeterminate />
        </v-container>
        <div v-else-if="filteredShops.length > 0" id="shops-container">
          <v-card v-for="shop in filteredShops" max-width="360" :key="shop.id" class="m-2">
            <img crossorigin="anonymous" class="d-flex justify-content-center text-center w-100" :src="shop.logo?.toString()" />
            <v-card-title class="mt-5">
              <a :href="shop.url" class="link-info" target="_blank">
                {{ shop.name }}
              </a>
            </v-card-title>
            <v-card-text class="text-muted">
              {{ shop.description }}
              <v-btn
                v-if="isShopNearby(shop)"
                color="red"
                size="small"
                class="text-white mt-5 d-block"
                depressed
                elevation="5"
                @click="removeShopFromNearByClick(shop)"
                text="Is Not Nearby"
              />
              <v-btn
                v-else
                size="small"
                color="green"
                class="text-white mt-5 d-block"
                depressed
                elevation="5"
                @click="addShopToNearByClick(shop)"
                text="Is Nearby"
              />
            </v-card-text>

            <v-card-actions class="d-flex justify-content-between">
              <a :href="shop.instagram?.toString()" class="text-sm cursor-pointer" target="_blank">
                <v-icon color="#ac2bac" icon="mdi-instagram" />
              </a>
              <div v-if="shop.location" id="shop-location">
                <CountryIcon :code="shop.location.code" />
                <p class="text-sm d-inline mx-2">{{ shop.location.name }}</p>
              </div>
            </v-card-actions>
          </v-card>
        </div>
        <div v-else>
          <p>No Shops Available</p>
        </div>
      </template>
    </ContentBody>
  </ContentOverlay>
</template>
