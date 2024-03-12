<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { logOut } from '@/services/auth';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';

const route = useRoute();
const userStore = useUserStore();
const { userProfile, isAdmin } = storeToRefs(userStore);

const router = useRouter();

const logout = async () => {
  await logOut();
  router.push('/');
};
</script>

<template>
  <li class="nav-item mb-2 mt-0">
    <a data-bs-toggle="collapse" href="#ProfileNav" class="nav-link text-dark" aria-controls="ProfileNav" role="button" aria-expanded="false">
      <template v-if="userProfile">
        <v-avatar v-if="userProfile?.image && userProfile.image.startsWith('data')" color="grey" rounded="5" class="shadow-lg">
          <v-img cover :src="userProfile.image" />
        </v-avatar>
        <v-avatar v-else color="white" rounded="5" class="shadow-lg">
          <v-icon size="x-large" icon="mdi-account-circle" />
        </v-avatar>

        <span class="nav-link-text ms-2 ps-1">{{ userProfile?.name }}</span>
      </template>
      <template v-else>
        <v-avatar color="white" rounded="5" class="shadow-lg">
          <v-progress-circular size="small" indeterminate />
        </v-avatar>
        <span class="nav-link-text ms-2 ps-1">Loading User</span>
      </template>
    </a>

    <div class="collapse" id="ProfileNav">
      <ul class="nav">
        <li class="nav-item">
          <router-link class="nav-link text-dark" :class="{ active: route.path === '/app/profile' }" to="/app/profile">
            <v-icon class="instagram-gradient-sky" icon="mdi-account"></v-icon>
            <span class="sidenav-normal ms-3 ps-1"> My Profile </span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-dark" :class="{ active: route.path === '/app/settings' }" to="/app/settings">
            <v-icon class="instagram-gradient-autumn" icon="mdi-tools" />
            <span class="sidenav-normal ms-3 ps-1"> Settings </span>
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link text-danger font-weight-bold" href="#" @click.prevent="logout">
            <v-icon icon="mdi-logout"></v-icon>
            <span class="sidenav-normal ms-3 ps-1"> Logout </span>
          </a>
        </li>
        <li v-if="userProfile && isAdmin" class="nav-item">
          <RouterLink class="nav-link text-info" to="/app/admin">
            <v-icon icon="mdi-shield-crown" />
            <span class="sidenav-normal ms-3 ps-1 font-weight-bold"> Admin Dashboard </span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </li>
</template>
