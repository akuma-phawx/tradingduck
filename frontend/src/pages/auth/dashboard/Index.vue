<script setup lang="ts">
import DashboardUserInformation from './DashboardUserInformation.vue';
import DashboardEvents from './DashboardEvents.vue';
import DasshboardWatchlist from './DashboardWatchlist.vue';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isVerified, userProfile } = storeToRefs(userStore);
</script>

<template>
  <div class="row">
    <div class="col-lg-12 position-relative z-index-2">
      <v-alert color="white" class="mb-8">
        <img class="w-3 h-3" src="../../../assets/img/logos/black_logo_no_text.png" crossorigin="anonymous" />
        Welcome to <span class="font-weight-bold">TradingDuck - Beta</span>! Check <RouterLink to="/app/howto" class="link-info">here</RouterLink> to
        see what this platform is all about! Send your feedback here: support@tradingduck.com
      </v-alert>
      <div v-if="userProfile && !isVerified" class="mb-10">
        <v-alert
          closable
          type="warning"
          title="Unverified"
          text="Your account is unverified, please check your email and come back again."
          variant="tonal"
        />
      </div>
      <div v-if="!userProfile?.image && userProfile?.isVerified" class="mb-10">
        <v-alert
          closable
          type="warning"
          title="Unfinished profile"
          text="Please complete your profile by uploading a profile picture."
          variant="tonal"
        />
      </div>
      <DashboardUserInformation />
      <div class="row mt-4">
        <DashboardEvents />
        <DasshboardWatchlist />
      </div>
    </div>
  </div>
</template>
