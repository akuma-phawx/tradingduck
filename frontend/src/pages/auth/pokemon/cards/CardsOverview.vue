<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import type { Ref } from 'vue';
import { searchCards } from '@/services/search';
import { FullCard } from '../../../../../../src/services/search.service';
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
import SelectSet from '@/components/filters/SelectSet.vue';
import SelectRarity from '@/components/filters/SelectRarity.vue';
import { NearBy, getNearBy } from '@/services/nearby';

// State variables
const filteredCards: Ref<FullCard[]> = ref([]);
const nearby = ref<NearBy>();
const onlyShowTradedCards = ref(false);
const onlyShowNearbyCards = ref(false);
const page = ref(1);
const pageSize = ref(8);
const pages = ref(0);
const loading = ref(false);

// Search terms and filters
const searchTerms = reactive({
  name: '',
  rarity: null,
  setId: null,
});

// Event handlers
function zoomIn(event: MouseEvent): void {
  (event.target as HTMLElement).classList.add('zoom-in');
}

function zoomOut(event: MouseEvent): void {
  (event.target as HTMLElement).classList.remove('zoom-in');
}

watch(page, async () => {
  await search();
});

// Reset filters
function resetFilters(): void {
  for (const key in searchTerms) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    searchTerms[key] = key === 'name' ? '' : null;
  }
}

// Search function
async function search(): Promise<void> {
  loading.value = true;
  const term = searchTerms.name.toLocaleLowerCase().trim();
  let searchParams = {};
  if (searchTerms.rarity) {
    searchParams = { name: term, rarity: searchTerms.rarity };
  } else {
    searchParams = { name: term };
  }
  if (searchTerms.setId) {
    searchParams = { ...searchParams, setId: searchTerms.setId };
  }
  if (onlyShowNearbyCards.value) {
    searchParams = { ...searchParams, onlyShowNearbyCards: onlyShowNearbyCards.value };
  }
  searchParams = { ...searchParams, onlyShowTradedCards: onlyShowTradedCards.value };
  const searchResp = await searchCards(searchParams, { page: page.value, pageSize: pageSize.value });
  filteredCards.value = searchResp.result;
  pages.value = Math.ceil(searchResp.total / pageSize.value);

  loading.value = false;
}

const calcNearbyUsers = (card: FullCard, myNearby?: NearBy): number => {
  if (!myNearby) return 0;
  if (card.userCards.length === 0) return 0;
  let cnt = 0;
  const usercards = card.userCards;
  usercards.forEach(usercard => {
    const userShops = usercard.user.ShopsNearBy.map(shop => shop.id);
    const userSpots = usercard.user.TradespotsNearBy.map(spot => spot.id);
    const userEvents = usercard.user.EventAttendees.map(event => event.id);
    if (
      myNearby.shops.some(shop => userShops.includes(shop.id)) ||
      myNearby.tradespots.some(spot => userSpots.includes(spot.id)) ||
      myNearby.upcomingEvents.some(event => userEvents.includes(event.id))
    ) {
      cnt++;
    }
  });
  return cnt;
};

onMounted(async () => {
  nearby.value = await getNearBy();
});
</script>

<template>
  <ContentOverlay>
    <ContentHeader :color="'instagram-gradient-earthy'" :icon="'mdi-cards'" :title="'Cards'" :subtitle="'Search for a Pokémon Card'" />
    <ContentBody>
      <div class="row px-4 mt-4">
        <v-text-field
          class="col-lg-4 my-3"
          density="compact"
          v-model="searchTerms.name"
          color="info"
          @keyup.enter="search"
          label="Name"
          hint="Enter Pokemon Name"
          variant="outlined"
        />
        <SelectRarity class="col-lg-4 my-3" :label="'Rarity'" v-model="searchTerms.rarity" />
        <SelectSet class="col-lg-4 my-3" :label="'Set'" v-model="searchTerms.setId" />
      </div>
      <div class="row">
        <v-checkbox class="col-lg-3 mt-0 pt-0" density="compact" v-model="onlyShowTradedCards" color="info" label="Available Cards Only" />
        <v-checkbox class="col-lg-3 mt-0 pt-0" density="compact" v-model="onlyShowNearbyCards" color="info" label="Nearby Cards Only" />
        <div class="col-lg-6"></div>
      </div>
      <div class="row">
        <div class="col-lg-5 my-3">
          <div class="mt-n4 mx-1">
            <v-btn :loading="loading" color="info" depressed elevation="5" @click="search" text="Filter" />
            <v-btn color="danger mx-2 text-white" depressed elevation="5" @click="resetFilters" text="Clear" />
          </div>
        </div>
      </div>
      <div v-if="filteredCards.length > 0" class="row px-4 mt-5">
        <!-- Pagination -->
        <v-container v-if="pages > 1" class="text-center">
          <v-row justify="center">
            <v-col cols="6">
              <v-container class="max-width">
                <v-pagination v-model="page" class="my-4" :length="pages" active-color="info" elevation="2" />
              </v-container>
            </v-col>
          </v-row>
        </v-container>
        <!-- Cards -->
        <div v-for="card in filteredCards" class="col-lg-3 col-md-4 col-sm-6 p-4" :key="card.identifier">
          <div class="card" data-animation="true">
            <div class="text-center p-0 position-relative mt-n4 mx-3 z-index-2">
              <RouterLink class="d-block blur-shadow-image cursor-pointer" :to="'/app/cards/' + card.identifier">
                <img
                  :src="card.image"
                  alt="img-blur-shadow"
                  class="zoom-image img-fluid shadow-lg border-radius-lg"
                  @mouseover="zoomIn"
                  @mouseleave="zoomOut"
                  crossorigin="anonymous"
                />
              </RouterLink>
            </div>
            <!-- Card Details/Links -->
            <v-container class="text-center">
              <RouterLink class="d-block mt-1" :to="`/app/cards/${card.identifier}`" :text="card.name" />
              <RouterLink class="d-block link-info" :to="`/app/sets/${card?.set.identifier}`" :text="card.set.name" />
            </v-container>
            <v-divider class="mx-4 my-0" />
            <!-- Card Footer -->
            <v-container>
              <div v-if="card._count.userCardsTrader">
                <div class="d-flex justify-content-between">
                  <p class="my-auto">Traders</p>
                  <span class="badge badge-success">{{ card._count.userCardsTrader }}</span>
                </div>
                <div class="d-flex justify-content-between mt-2">
                  <p class="my-auto">Nearby</p>
                  <span class="badge badge-info">{{ calcNearbyUsers(card, nearby) }}</span>
                </div>
              </div>
              <div v-else class="d-flex justify-content-center">
                <p class="font-weight-thin">No Traders.</p>
              </div>
            </v-container>
          </div>
        </div>
        <!-- Pagination -->
        <v-container v-if="pages > 1" class="text-center">
          <v-row justify="center">
            <v-col cols="6">
              <v-container class="max-width">
                <v-pagination v-model="page" class="my-4" :length="pages" active-color="info" elevation="2" />
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div v-else class="row px-4 mt-5">
        <div class="no-result-text">
          <p>No Results</p>
        </div>
      </div>
    </ContentBody>
  </ContentOverlay>
</template>
