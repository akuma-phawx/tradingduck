<script setup lang="ts">
import { NavLink } from '@/models/navlink.ts';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const toolsNavLinks: NavLink[] = [
  {
    id: 'shops_id',
    name: 'Shops',
    icon: 'mdi-store-outline',
    linksTo: '/app/shops',
    iconColor: 'instagram-gradient-golden-hour',
  },
  {
    id: 'tradespots_id',
    name: 'Tradespots',
    icon: 'mdi-map-marker-radius',
    linksTo: '/app/tradespots',
    iconColor: 'azure-waters',
  },
  {
    id: 'streams_id',
    name: 'Streams',
    icon: 'mdi-twitch',
    linksTo: '/app/streams',
    iconColor: 'instagram-gradient-rainbow',
  },
];
// fab fa-twitch fa-lg
const unreadMessages = ref(0);
</script>
<template>
  <li v-for="navLink in toolsNavLinks" class="nav-item" :key="navLink.id">
    <router-link class="nav-link text-dark" :class="{ active: route.path === navLink.linksTo }" :to="navLink.linksTo">
      <v-icon :class="navLink.iconColor" :icon="navLink.icon"></v-icon>
      <span
        v-if="navLink.id === 'inbox_id' && unreadMessages > 0"
        class="top-5 start-100 translate-middle badge rounded-pill bg-info border border-white small py-1 px-2"
      >
        <span class="small">{{ unreadMessages }}</span>
        <span class="visually-hidden">unread messages</span>
      </span>
      <span class="sidenav-normal ms-2 ps-1"> {{ navLink.name }} </span>
    </router-link>
  </li>
</template>
