<script setup lang="ts">
import { toggleSidebar } from '@/utils/togglers';
import { useUserStore } from '@/stores/userStore';
import SideNavToggler from '@/components/togglers/SidenavToggler.vue';

import Searchbar from './Searchbar.vue';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const { userProfile } = storeToRefs(userStore);
</script>
<template>
  <!-- Top Navbar -->
  <nav
    class="navbar nav-background navbar-main navbar-expand-lg mt-4 top-1 px-0 mx-4 shadow-none border-radius-lg"
    id="navbarBlur"
    data-scroll="true"
  >
    <div class="container-fluid py-1 px-3 flex-nowrap">
      <div class="sidenav-toggler sidenav-toggler-inner d-xl-block d-none" @click="toggleSidebar">
        <SideNavToggler />
      </div>
      <Searchbar />
      <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <div class="ms-md-auto pe-md-3 d-flex align-items-center"></div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-xl-none ps-3 px-3 d-flex align-items-center">
            <SideNavToggler @click="toggleSidebar" />
          </li>
          <li class="nav-item px-3">
            <router-link to="/app/settings" class="nav-link text-body p-0">
              <v-icon class="mt-3 metal-black" icon="mdi-cog" />
            </router-link>
          </li>
          <li class="nav-item">
            <template v-if="userProfile">
              <router-link to="/app/profile" class="nav-link text-body p-0 position-relative">
                <div v-if="userProfile?.image">
                  <v-avatar color="white" rounded="5" class="shadow-lg">
                    <v-img cover :src="userProfile.image" />
                  </v-avatar>
                </div>
                <div v-else>
                  <v-avatar color="white" rounded="5" class="shadow-lg">
                    <v-icon size="x-large" icon="mdi-account-circle" />
                  </v-avatar>
                </div>
              </router-link>
            </template>
            <v-avatar v-else color="white" rounded="5" class="shadow-lg">
              <v-progress-circular size="small" indeterminate />
            </v-avatar>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Top Navbar -->
</template>
