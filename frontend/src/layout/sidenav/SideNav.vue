<script setup lang="ts">
import SidenavHeader from '@/layout/sidenav/SidenavHeader.vue';
import SidenavBody from '@/layout/sidenav/SidenavBody.vue';
</script>
<template>
  <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-white" id="sidenav-main">
    <SidenavHeader />
    <div class="text-center text-sm font-weight-bold"><RouterLink to="/app/version" class="metal-black">v.0.2.0</RouterLink></div>
    <hr class="horizontal light mt-0 mb-2" />
    <SidenavBody />
  </aside>
</template>
