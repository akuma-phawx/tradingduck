<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';

// User Profile
const userStore = useUserStore();
const { tradeboxes, wishlist, sentRequests, sentRequestsPending, incomingRequests, incomingRequestsPending } = storeToRefs(userStore);
</script>

<template>
  <div class="row">
    <div class="col-lg-3 col-md-6 col-sm-6">
      <div class="card mb-2">
        <div class="card-header p-3 pt-2">
          <div class="icon icon-lg icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-xl mt-n4 position-absolute">
            <v-icon icon="mdi-swap-horizontal" />
          </div>
          <div class="text-end pt-1">
            <p class="text-sm mb-0 text-capitalize">Sent Requests</p>
            <h4 class="mb-0">{{ sentRequests.length }}</h4>
          </div>
        </div>
        <hr class="dark horizontal my-0" />
        <div class="card-footer p-3 d-flex justify-content-between">
          <p class="mb-0">
            <span class="instagram-gradient text-sm font-weight-bolder">{{ sentRequestsPending.length }} </span> pending
          </p>
          <router-link to="/app/trades" class="link-info">
            <v-icon class="instagram-gradient-golden-hour" icon="mdi-launch" />
          </router-link>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-6 mt-sm-0 mt-4">
      <div class="card mb-2">
        <div class="card-header p-3 pt-2">
          <div class="icon icon-lg icon-shape bg-gradient-info shadow-dark shadow text-center border-radius-xl mt-n4 position-absolute">
            <v-icon icon="mdi-compare-horizontal" />
          </div>
          <div class="text-end pt-1">
            <p class="text-sm mb-0 text-capitalize">Incoming Requests</p>
            <h4 class="mb-0">{{ incomingRequests?.length }}</h4>
          </div>
        </div>
        <hr class="dark horizontal my-0" />
        <div class="card-footer p-3 d-flex justify-content-between">
          <p class="mb-0">
            <span class="instagram-gradient text-sm font-weight-bolder">{{ incomingRequestsPending?.length }} </span> pending
          </p>
          <RouterLink to="/app/trades" class="link-info">
            <v-icon class="instagram-gradient-golden-hour" icon="mdi-launch" />
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-6 mt-md-0 mt-4">
      <div class="card mb-2">
        <div class="card-header p-3 pt-2 bg-transparent">
          <div class="icon icon-lg icon-shape bg-gradient-warning shadow-success text-center border-radius-xl mt-n4 position-absolute">
            <v-icon icon="mdi-archive-outline" />
          </div>
          <div class="text-end pt-1">
            <template v-if="tradeboxes">
              <p class="text-sm mb-0 text-capitalize">Tradeboxes</p>
              <h4 class="mb-0">{{ tradeboxes.length }}</h4>
            </template>
            <template v-else>
              <p class="text-sm mb-0 text-capitalize">Loading Tradeboxes</p>
              <v-progress-circular indeterminate color="primary" class="mt-1" size="small" />
            </template>
          </div>
          <div class=""></div>
        </div>
        <hr class="horizontal my-0 dark" />
        <div class="card-footer p-3 d-flex justify-content-between">
          <div class="d-flex">
            <v-icon icon="mdi-calendar" />
            <p class="text-sm my-auto mx-1">today</p>
          </div>
          <RouterLink to="/app/tradebox" class="link-info">
            <v-icon class="instagram-gradient-golden-hour" icon="mdi-launch" />
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-6 mt-md-0 mt-4">
      <div class="card">
        <div class="card-header p-3 pt-2 bg-transparent">
          <div class="icon icon-lg icon-shape bg-gradient-primary shadow-info text-center border-radius-xl mt-n4 position-absolute">
            <v-icon icon="mdi-heart" />
          </div>

          <div class="text-end pt-1">
            <template v-if="wishlist">
              <p class="text-sm mb-0 text-capitalize">Wishlist Cards</p>
              <h4 class="mb-0">{{ wishlist?.cards?.length }}</h4>
            </template>
            <template v-else>
              <p class="text-sm mb-0 text-capitalize">Loading Wishlist</p>
              <v-progress-circular indeterminate color="primary" class="mt-1" size="small" />
            </template>
          </div>
        </div>
        <hr class="horizontal my-0 dark" />
        <div class="card-footer p-3 d-flex justify-content-between">
          <div class="d-flex">
            <v-icon icon="mdi-calendar" />
            <p class="text-sm my-auto mx-1">today</p>
          </div>
          <RouterLink to="/app/wishlist" class="link-info">
            <v-icon class="instagram-gradient-golden-hour" icon="mdi-launch" />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
