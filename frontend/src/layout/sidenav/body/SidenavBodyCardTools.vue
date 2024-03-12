<script setup lang="ts">
import { NavLink } from '@/models/navlink.ts';
import { useRoute } from 'vue-router';

const route = useRoute();
const toolsNavLinks: NavLink[] = [
  {
    id: 'pkmnscards_id',
    name: 'Cards',
    icon: 'mdi-cards',
    linksTo: '/app/cards',
  },
  {
    id: 'pkmnsets_id',
    name: 'Sets',
    icon: 'mdi-select-group',
    linksTo: '/app/sets',
  },
  {
    id: 'pkmncalendar_id',
    name: 'Events',
    icon: 'mdi-calendar-star',
    linksTo: '/app/events',
  },
];
</script>
<template>
  <li class="nav-item">
    <a data-bs-toggle="collapse" href="#searchNavTools" class="nav-link text-dark shadow-none" role="button" aria-expanded="false">
      <v-icon class="instagram-gradient-lavender" icon="mdi-magnify"></v-icon>
      <span class="nav-link-text ms-2 ps-1">Search Tools</span>
    </a>
  </li>
  <div class="collapse" id="searchNavTools">
    <li v-for="navLink in toolsNavLinks" class="nav-item mx-3" :key="navLink.id">
      <RouterLink class="nav-link text-dark" :class="{ active: route.path === navLink.linksTo }" :to="navLink.linksTo">
        <v-icon class="mystic-twilight" :icon="navLink.icon" />
        <span
          v-if="navLink.id === 'my_trades_id'"
          class="top-5 start-100 translate-middle badge rounded-pill bg-info border border-white small py-1 px-2"
        >
          <span class="small">{{ navLink.unansweredTradeRequests }}</span>
          <span class="visually-hidden">unread messages</span>
        </span>
        <span class="sidenav-normal ms-2 ps-1"> {{ navLink.name }} </span>
      </RouterLink>
    </li>
  </div>
</template>
