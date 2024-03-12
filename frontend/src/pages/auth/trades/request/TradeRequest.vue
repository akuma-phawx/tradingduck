<script setup lang="ts">
import { FullCard } from '@/services/search';
import { Ref, onMounted, ref, computed } from 'vue';
import TradeRequestTradeboxes from './TradeRequestTradeboxes.vue';
import TradeRequestCards from './TradeRequestCards.vue';
import { useRoute } from 'vue-router';
import Disclaimer from '@/components/disclaimer/Disclaimer.vue';
import { TradeBoxWithCardCount, getTradeBoxById, getTradeboxes, getTradeboxesByUser } from '@/services/tradebox';
import { FullWishlist, getWishList, getWishListByUserId } from '@/services/wishlist';
import { FullTradeRequest, getAllSentTradeRequests } from '@/services/tradeRequest';
import { useUserStore } from '@/stores/userStore';
import { FullUserProfile, getUserProfileById } from '@/services/userProfile';
import ContentHeader from '@/components/content/ContentHeader.vue';
import TargetUserNotFoundScenario from './scenarios/TargetUserNotFoundScenario.vue';
import SelfTradeScenario from './scenarios/SelfTradeScenario.vue';
import TargetUserIsBannedScenario from './scenarios/TargetUserIsBannedScenario.vue';
import MaxRequestsReachedScenario from './scenarios/MaxRequestsReachedScenario.vue';
const userStore = useUserStore();
const targetUser = ref<FullUserProfile | undefined>();
const targetUserId = ref(parseInt(useRoute().params.user as string));
const sentRequests: Ref<FullTradeRequest[]> = ref([]);

const isSelfTrade = computed(() => {
  return targetUserId.value === userStore.userProfile?.id;
});
const hasReachedMaxTradeRequestLimit = computed(() => {
  return (
    sentRequests.value.filter(tr => {
      return tr.tradeStatus.identifier !== 'completed' && tr.tradeStatus.identifier !== 'cancelled' && tr.tradeStatus.identifier !== 'rejected';
    }).length >= 5
  );
});

// Offerer
const offeredCards = ref<FullCard[]>([]);
const myTradeboxes = ref<TradeBoxWithCardCount[]>([]);
const mySelectedTradeboxCards = ref<FullCard[]>([]);
const mySelectedTradeboxCardsToDisplay = ref<FullCard[]>([]);
const myWishlist = ref<FullWishlist | undefined>();

// Target
const requestedCards = ref<FullCard[]>([]);
const targetUserTradeboxes = ref<TradeBoxWithCardCount[]>([]);
const targetUserSelectedTradeboxCards = ref<FullCard[]>([]);
const targetUserSelectedTradeboxCardsToDisplay = ref<FullCard[]>([]);
const targetUserWishlist = ref<FullWishlist | undefined>();

const onChangeTradebox = async (from: string, tradeboxId: number): Promise<void> => {
  try {
    const res = await getTradeBoxById(tradeboxId);
    if (from === 'offerer') {
      mySelectedTradeboxCards.value = res?.cards as FullCard[];
      filterCards();
    } else if (from === 'receiver') {
      targetUserSelectedTradeboxCards.value = res?.cards as FullCard[];
      filterCards();
    }
  } catch (e) {
    console.error(e);
  }
};

const filterCards = (): void => {
  mySelectedTradeboxCardsToDisplay.value = mySelectedTradeboxCards.value.filter(itemA => !offeredCards.value.some(itemB => itemB.id === itemA.id));
  targetUserSelectedTradeboxCardsToDisplay.value = targetUserSelectedTradeboxCards.value.filter(
    itemA => !requestedCards.value.some(itemB => itemB.id === itemA.id),
  );
};
const addOfferedCard = (card: FullCard): void => {
  offeredCards.value.push(card);
  filterCards();
};
const addRequestedCard = (card: FullCard): void => {
  requestedCards.value.push(card);
  filterCards();
};
const removeCard = (card: FullCard, from: string): void => {
  if (from === 'offered') {
    offeredCards.value = offeredCards.value.filter(c => {
      return c.id !== card.id;
    });
  } else if (from === 'requested') {
    requestedCards.value = requestedCards.value.filter(c => {
      return c.id !== card.id;
    });
  }
  filterCards();
};
const isLoadingUser = ref(false);
onMounted(async () => {
  isLoadingUser.value = true;
  sentRequests.value = await getAllSentTradeRequests();
  const data = await getUserProfileById(targetUserId.value);
  targetUser.value = data;
  isLoadingUser.value = false;
  if (!isSelfTrade.value && targetUser.value && !hasReachedMaxTradeRequestLimit.value) {
    myTradeboxes.value = await getTradeboxes();
    myWishlist.value = await getWishList();
    targetUserTradeboxes.value = await getTradeboxesByUser(targetUserId.value);
    targetUserWishlist.value = await getWishListByUserId(targetUserId.value);
  }
});
</script>

<template>
  <div class="row">
    <div class="col-lg-12 position-relative z-index-2">
      <div class="card mb-4">
        <ContentHeader
          :color="'instagram-gradient-sky'"
          :icon="'mdi-swap-horizontal'"
          :title="'Trade Request'"
          :subtitle="'Create a new trade request'"
        />
        <v-container v-if="isLoadingUser">
          <v-progress-circular color="primary" indeterminate />
        </v-container>
        <SelfTradeScenario v-else-if="isSelfTrade" />
        <TargetUserNotFoundScenario v-else-if="!targetUser" />
        <TargetUserIsBannedScenario v-else-if="targetUser.isBanned" :name="targetUser.name" />
        <MaxRequestsReachedScenario v-else-if="sentRequests.length >= 5" />
        <div v-else class="container-fluid py-4">
          <Disclaimer />
          <div class="row gx-4">
            <div class="col-lg-6">
              <TradeRequestTradeboxes
                @change-tradebox="onChangeTradebox"
                @offer="addOfferedCard"
                @request="addRequestedCard"
                :my-tradeboxes="myTradeboxes"
                :target-tradeboxes="targetUserTradeboxes"
                :my-cards="mySelectedTradeboxCardsToDisplay"
                :target-cards="targetUserSelectedTradeboxCardsToDisplay"
                :my-wishlist="myWishlist"
                :target-wishlist="targetUserWishlist"
              />
            </div>
            <div class="col-lg-6 mt-8 mt-lg-0">
              <TradeRequestCards
                :offered-cards="offeredCards"
                :requested-cards="requestedCards"
                @remove="removeCard"
                :target-user="targetUser"
                :my-wishlist="myWishlist"
                :target-wishlist="targetUserWishlist"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
