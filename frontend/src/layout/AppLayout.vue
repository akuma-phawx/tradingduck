<script setup lang="ts">
import SideNav from '@/layout/sidenav/SideNav.vue';
import Topbar from '@/layout/topbar/Topbar.vue';
import Footer from '@/layout/footer/Footer.vue';
import { useRoute } from 'vue-router';
import { getBreadcrumbsTitle } from '@/utils/getters';
import { onMounted } from 'vue';
import { authGuard } from '@/utils/common';

const route = useRoute();
const getBreadcrumbItems = () => {
  const segments = route.path.split('/').filter(segment => segment !== ''); // Split the path into segments
  // Generate breadcrumb items
  const items = segments.map((segment, index) => ({
    title: getBreadcrumbsTitle(segment), // Use the segment as the breadcrumb text
    disabled: index === segments.length - 1, // The last item should not be a link
    to: `/${segments.slice(0, index + 1).join('/')}`, // The link should point to the current segment and its ancestors
  }));

  return items;
};

onMounted(() => {
  authGuard();
});
</script>
<template>
  <SideNav />
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
    <Topbar />
    <div class="container-fluid py-4 mt-4">
      <v-breadcrumbs v-if="route.path !== '/app'" :items="getBreadcrumbItems()">
        <template #prepend>
          <v-icon size="small" icon="mdi-duck" />
        </template>
      </v-breadcrumbs>
      <RouterView class="min-vh-75" />
      <Footer></Footer>
    </div>
  </main>
</template>
