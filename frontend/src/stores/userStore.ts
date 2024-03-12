import { FullTradeRequest, getAllIncomingTradeRequests, getAllSentTradeRequests } from '@/services/tradeRequest';
import { getTradeboxes } from '@/services/tradebox';
import { FullUserProfile, getUserProfile } from '@/services/userProfile';
import { FullWishlist, getWishList } from '@/services/wishlist';
import { TradeBox, TradeRequest } from '@prisma/client';
import { defineStore } from 'pinia';
import { Ref, computed, ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const userProfile: Ref<FullUserProfile | undefined> = ref();
  const tradeboxes: Ref<TradeBox[]> = ref([]);
  const wishlist: Ref<FullWishlist | undefined> = ref();
  // Trade Requests
  const sentRequests: Ref<FullTradeRequest[]> = ref([]);
  const sentRequestsPending = ref<TradeRequest[]>([]);
  const incomingRequests: Ref<FullTradeRequest[]> = ref([]);
  const incomingRequestsPending = ref<TradeRequest[]>([]);

  const isAdmin = computed(() => {
    return userProfile.value?.type === 'ADMIN';
  });
  const isVerified = computed(() => {
    return userProfile.value?.isVerified;
  });

  async function initUser() {
    refreshUserProfile();
    fetchWishlist();
    fetchTradeboxes();
    fetchTradeRequests();
  }

  async function refreshUserProfile() {
    userProfile.value = await getUserProfile();
  }

  async function fetchTradeRequests() {
    sentRequests.value = await getAllSentTradeRequests();
    sentRequestsPending.value = sentRequests.value.filter(request => request.tradeStatus.identifier === 'pending');
    incomingRequests.value = await getAllIncomingTradeRequests();
    incomingRequestsPending.value = incomingRequests.value.filter(request => request.tradeStatus.identifier === 'pending');
  }
  async function fetchWishlist() {
    wishlist.value = await getWishList();
  }

  async function fetchTradeboxes() {
    tradeboxes.value = await getTradeboxes();
  }

  return {
    userProfile,
    isAdmin,
    isVerified,
    tradeboxes,
    wishlist,
    sentRequests,
    sentRequestsPending,
    incomingRequests,
    incomingRequestsPending,
    initUser,
    fetchWishlist,
    fetchTradeboxes,
  };
});
