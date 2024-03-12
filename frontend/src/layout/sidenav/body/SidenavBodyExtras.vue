<script setup lang="ts">
import { NavLink } from '@/models/navlink.ts';
import { useRoute } from 'vue-router';

const route = useRoute();
const toolsNavLinks: NavLink[] = [
  {
    id: 'tradingpolicy_id',
    name: 'Trading Policy',
    icon: 'mdi-security',
    linksTo: '/app/policy',
  },
  {
    id: 'safetymeasure_id',
    name: 'Safety Measures',
    icon: 'mdi-shield-alert-outline',
    linksTo: '/app/safety-measures',
  },
  {
    id: 'tipsandtrades_id',
    name: 'Trade Tips',
    icon: 'mdi-lightbulb-on-10',
    linksTo: '/app/trade-tips',
  },
  {
    id: 'authenticityguide_id',
    name: 'Authenticity Guide',
    icon: 'mdi-spellcheck',
    linksTo: '/app/authenticity-guide',
  },
];
</script>

<template>
  <li class="nav-item">
    <a
      data-bs-toggle="collapse"
      href="#additionalNavTools"
      class="nav-link text-dark shadow-none"
      aria-controls="additionalNavTools"
      role="button"
      aria-expanded="false"
    >
      <v-icon class="instagram-gradient-forest" icon="mdi-information-box-outline"></v-icon>
      <span class="nav-link-text ms-2 ps-1">Information</span>
    </a>
  </li>
  <div class="collapse" id="additionalNavTools">
    <ul class="nav">
      <li v-for="navLink in toolsNavLinks" class="nav-item mx-3" :key="navLink.id">
        <router-link class="nav-link text-dark" :class="{ active: route.path === navLink.linksTo }" :to="navLink.linksTo">
          <v-icon class="instagram-gradient-sunset" :icon="navLink.icon"></v-icon>
          <span
            v-if="navLink.id === 'my_trades_id'"
            class="top-5 start-100 translate-middle badge rounded-pill bg-info border border-white small py-1 px-2"
          >
            <span class="small">{{ navLink.unansweredTradeRequests }}</span>
            <span class="visually-hidden">unread messages</span>
          </span>
          <span class="sidenav-normal ms-2 ps-1"> {{ navLink.name }} </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
