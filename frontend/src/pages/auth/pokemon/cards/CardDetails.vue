<script setup lang="ts">
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { getCardById } from '@/services/card';
import { onMounted, ref, computed, Ref, watch } from 'vue';
import { useToast } from 'vue-toast-notification';
import { addCardToWishList, removeCardFromWishList } from '@/services/wishlist';
import AddToTradeboxModal from '@/components/modals/AddToTradeboxModal.vue';
import { getUserCardsByCardId, FullUsercard } from '@/services/userCard';
import { isUserNearby } from '@/services/nearby';
import { useUserStore } from '@/stores/userStore';
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
import { storeToRefs } from 'pinia';
import CardDetailsTraders from './CardDetailsTraders.vue';

const userStore = useUserStore();
const { fetchWishlist } = userStore;
const { wishlist } = storeToRefs(userStore);

const card = ref();
const userCards: Ref<FullUsercard[]> = ref([]);
const nearByUsers: Ref<number[]> = ref([]);
const page = ref(1);
const pageSize = ref(10);
const pages = ref(0);
const showAddToTradeboxModal = ref(false);

const isInWishlist = computed(() => {
  return wishlist.value?.cards.find(c => c.identifier === card.value?.identifier) !== undefined;
});
const flavorText = computed(() => {
  return card.value && card.value.flavorText.length > 0 ? card.value.flavorText : 'No text available.';
});

const $toast = useToast();

const showAddedToast = (): void => {
  showAddToTradeboxModal.value = false;
  $toast.success('Added to tradebox!', {
    position: 'top-right',
    duration: 1000,
  });
};
const showFailedToast = (): void => {
  showAddToTradeboxModal.value = false;
  $toast.error('Something went wrong.', {
    position: 'top-right',
    duration: 1000,
  });
};

async function addToWishlist(): Promise<void> {
  await addCardToWishList(card.value.identifier);
  fetchWishlist();
  $toast.success('Added to wishlist.', {
    position: 'top-right',
    duration: 1000,
  });
}
async function removeFromWishlist(): Promise<void> {
  await removeCardFromWishList(card.value.identifier);
  fetchWishlist();
  $toast.error('Removed from wishlist.', {
    position: 'top-right',
    duration: 1000,
  });
}

onMounted(async () => {
  const cardId = useRoute().params.id as string;
  const data = await getCardById(cardId);
  if (data) {
    card.value = data;
    search();
    fetchWishlist();
  }
});

// watch param changes
onBeforeRouteUpdate(async to => {
  const cardId = to.params.id as string;
  const data = await getCardById(cardId);
  card.value = data;
  search();
  fetchWishlist();
});

const tradersAreLoading = ref(false);
const search = async (): Promise<void> => {
  tradersAreLoading.value = true;
  const userCardsData = await getUserCardsByCardId(card.value.identifier, { page: page.value, pageSize: pageSize.value });
  const uniqueUserIds = [...new Set(userCardsData.result.map(uc => uc.userId))];
  await Promise.all(
    uniqueUserIds.map(async userId => {
      const isNB = await isUserNearby(userId);
      if (isNB) {
        nearByUsers.value.push(userId);
      }
    }),
  );
  userCards.value = userCardsData.result;
  pages.value = Math.ceil(userCardsData.total / pageSize.value);
  tradersAreLoading.value = false;
};

watch(page, async () => {
  await search();
});

const getBadgeColor = computed(() => (userCards.value.length > 0 ? 'success' : 'danger'));
</script>
<template>
  <ContentOverlay>
    <ContentHeader
      :background="'bg-gradient-' + (card?.types[0]?.toLocaleLowerCase() ?? 'none')"
      :icon="'mdi-pokeball'"
      :title="card?.name ?? 'Not Found'"
      :subtitle="`Additional information about the card`"
    />
    <ContentBody>
      <!-- Card -->
      <div v-if="card">
        <!-- Buttons for Wishlist/Tradebox -->
        <v-container class="mb-5 pt-0">
          <v-btn color="info" depressed elevation="5" rounded="2" @click="showAddToTradeboxModal = true" icon="mdi-archive-outline" />
          <v-btn v-if="!isInWishlist" @click="addToWishlist" class="mx-4" rounded="2" color="green" depressed elevation="5" icon="mdi-heart" />
          <v-btn v-else @click="removeFromWishlist" class="mx-4" rounded="2" color="red" depressed elevation="5" icon="mdi-heart-off" />
        </v-container>
        <!-- Card Information -->
        <div class="row">
          <!-- Card Image -->
          <div class="col-lg-3 text-center">
            <img class="d-block img-fluid max-width-300 border-radius-lg shadow-lg mx-auto" :src="card.image" alt="card" crossorigin="anonymous" />
          </div>
          <!-- Card Details -->
          <div class="col-lg-5 mx-auto">
            <div class="mb-0 mt-3 text-dark">{{ card.name }}</div>
            <div class="font-weight-light">{{ card.rarityName }}</div>
            <v-divider />
            <div class="mb-0 mt-3 text-dark">
              <div class="mb-0 mt-3 text-dark">Available</div>
              <v-chip rounded="0" size="small" class="mx-1" :color="getBadgeColor" variant="outlined" :text="userCards.length" />
            </div>
            <div class="mb-0 mt-3 text-dark">
              <div class="mb-0 mt-3 text-dark">Set</div>
              <RouterLink class="flex-shrink flex-wrap link-info d-inline-block" :to="`/app/sets/${card.set.identifier}`" :text="card.set.name" />
            </div>
            <div class="mb-0 mt-3 text-dark">
              <div class="mb-0 mt-3 text-dark">Artist</div>
              <div class="font-weight-light">{{ card.artist }}</div>
            </div>
            <div class="mb-0 mt-3 text-dark">
              <div class="mb-0 mt-3 text-dark">Card Text</div>
              <div class="font-weight-light">{{ flavorText }}</div>
            </div>
          </div>
        </div>
        <v-container v-if="tradersAreLoading" class="mt-15">
          <v-progress-circular indeterminate />
          <span class="mx-5">Loading traders</span>
        </v-container>
        <CardDetailsTraders v-else :usercards="userCards" :near-by-users="nearByUsers" :pages="pages" v-model:page="page" />
      </div>
      <!-- Wrong Card Id -->
      <div v-else class="row m-0">
        <p class="text-muted">Card not found.</p>
      </div>
      <!-- Modals -->
      <AddToTradeboxModal
        v-if="showAddToTradeboxModal"
        :title="`Add ${card?.name} to Tradebox`"
        :visible="showAddToTradeboxModal"
        :card-id="card.identifier"
        @close="showAddToTradeboxModal = false"
        @added="showAddedToast"
        @failed="showFailedToast"
      />
    </ContentBody>
  </ContentOverlay>
</template>
