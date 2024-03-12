<script setup lang="ts">
import SidenavBodyProfile from '@/layout/sidenav/body/SidenavBodyProfile.vue';
import SidenavBodyMainTools from '@/layout/sidenav/body/SidenavBodyMainTools.vue';
import SidenavBodyCardTools from '@/layout/sidenav/body/SidenavBodyCardTools.vue';
import SidenavBodyExtras from '@/layout/sidenav/body/SidenavBodyExtras.vue';
import SideNavBodySocials from './body/SideNavBodySocials.vue';
</script>

<template>
  <div class="collapse navbar-collapse w-auto h-auto" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <SidenavBodyProfile />
      <v-divider class="mx-5 my-0 text-dark" />
      <SidenavBodyMainTools />
      <v-divider class="mx-5 my-0 text-dark" />
      <SidenavBodyCardTools />
      <v-divider class="mx-5 my-0 text-dark" />
      <SidenavBodyExtras />
      <v-divider class="mx-5 my-0 text-dark" />
      <SideNavBodySocials />
    </ul>
  </div>
</template>
