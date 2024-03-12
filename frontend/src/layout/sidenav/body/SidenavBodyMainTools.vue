<script setup lang="ts">
import { NavLink } from '@/models/navlink.ts';
import { Ref, ref, onMounted } from 'vue';
import { FullTradeRequest, getAllIncomingTradeRequests } from '@/services/tradeRequest';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { TRADE_REQUEST } from '@/models/tradeRequest';

const route = useRoute();
const toolsNavLinks: NavLink[] = [
  {
    id: 'dashboard_id',
    name: 'Dashboard',
    icon: 'mdi-view-dashboard-outline',
    linksTo: '/app',
    iconColor: 'instagram-gradient',
  },
  {
    id: 'my_trades_id',
    name: 'My Trades',
    icon: 'mdi-swap-horizontal',
    linksTo: '/app/trades',
    iconColor: 'instagram-gradient-sky',
  },
  {
    id: 'my_tradeboxes_id',
    name: 'My Tradeboxes',
    icon: 'mdi-archive-outline',
    linksTo: '/app/tradebox',
    iconColor: 'instagram-gradient-desert',
  },
  {
    id: 'my_wishlist_id',
    name: 'My Wishlist',
    icon: 'mdi-heart',
    linksTo: '/app/wishlist',
    iconColor: 'instagram-gradient-candy',
  },
];

const incomingTrades: Ref<FullTradeRequest[]> = ref([]);

const pendingTrades = computed(() => {
  return incomingTrades.value.filter((trade: FullTradeRequest) => {
    return trade.tradeStatus.identifier === TRADE_REQUEST.PENDING;
  });
});
onMounted(async () => {
  incomingTrades.value = await getAllIncomingTradeRequests();
});
</script>
<template>
  <li v-for="navLink in toolsNavLinks" class="nav-item" :key="navLink.id">
    <RouterLink class="nav-link text-dark" :class="{ active: route.path === navLink.linksTo }" :to="navLink.linksTo">
      <v-icon :class="navLink.iconColor" :icon="navLink.icon" />
      <span
        v-if="navLink.id === 'my_trades_id' && pendingTrades.length > 0"
        class="top-2 start-100 translate-middle badge bg-info border border-white small py-1 px-2"
      >
        <span class="small text-white">{{ pendingTrades.length }}</span>
      </span>
      <span class="sidenav-normal ms-2 ps-1"> {{ navLink.name }} </span>
    </RouterLink>
  </li>
</template>
