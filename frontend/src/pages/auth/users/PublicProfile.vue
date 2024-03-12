<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Ref, onMounted, ref } from 'vue';
import { FullUserProfile, getUserProfileById } from '@/services/userProfile';
import ProfileWishlist from './ProfileWishlist.vue';
import ProfileTradeboxes from './ProfileTradeboxes.vue';
import CountryIcon from '@/components/country/CountryIcon.vue';
import { useUserStore } from '@/stores/userStore';
import { isUserNearby, getNearByByUserId } from '@/services/nearby';
import { NearBy } from '../../../../../src/services/nearby.service';
import NearbyTabs from './NearbyTabs.vue';

const userProfile: Ref<FullUserProfile | undefined> = ref();
const userStore = useUserStore();
const activeTab = ref('tradeboxes');
const isNearby = ref(false);
const nearByPlaces = ref<NearBy>();
const isLoadingUser = ref(false);
onMounted(async () => {
  isLoadingUser.value = true;
  const userId = useRoute().params.id as string;
  const data = await getUserProfileById(parseInt(userId, 10));
  isNearby.value = await isUserNearby(parseInt(userId, 10));
  nearByPlaces.value = await getNearByByUserId(parseInt(userId, 10));
  userProfile.value = data;
  isLoadingUser.value = false;
});
</script>
<template>
  <div>
    <div class="row">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="card mx-4">
          <div class="d-flex flex-column flex-md-row justify-content-md-between">
            <div class="d-flex">
              <div class="icon icon-shape icon-lg bg-white shadow text-center border-radius-xl mt-n3 ms-4">
                <v-icon class="instagram-gradient-sky" icon="mdi-account" />
              </div>
              <h5 class="mt-3 mb-2 ms-3">{{ userProfile ? 'User Profile' : 'Profile Not Found' }}</h5>
            </div>
          </div>
          <v-container v-if="isLoadingUser">
            <v-progress-circular color="primary" indeterminate />
          </v-container>
          <div v-else-if="userProfile" class="card-body row">
            <div v-if="userProfile && userProfile.userId !== userStore.userProfile?.userId" class="mt-2 mb-10 text-center text-lg-start">
              <RouterLink :to="'/app/trade/' + userProfile?.id">
                <v-btn color="primary" depressed elevation="5" text="Request Trade" />
              </RouterLink>
            </div>

            <div class="col-12 col-md-6">
              <div class="row mb-2">
                <!-- User Profile Photo -->
                <div class="d-flex justify-content-center">
                  <v-avatar v-if="userProfile?.image && userProfile.image.startsWith('data')" color="grey" rounded="5" class="shadow-lg" size="150">
                    <v-img cover :src="userProfile.image" />
                  </v-avatar>
                  <v-avatar v-else color="white" rounded="5" class="shadow-lg" size="150">
                    <v-icon size="x-large" icon="mdi-account-circle" />
                  </v-avatar>
                </div>
                <div class="my-auto mt-5">
                  <div class="h-100">
                    <h5 class="mb-1 text-center">
                      <CountryIcon v-if="userProfile?.location" :code="userProfile.location.code" />
                      <span class="mx-2"> {{ userProfile?.name }}</span>
                    </h5>
                    <p class="m-0 text-center">{{ userProfile?.fullName ?? '-' }}</p>
                    <!-- Chips -->
                    <div class="d-flex flex-wrap justify-content-center">
                      <div>
                        <v-chip
                          v-if="userProfile?.type === 'ADMIN'"
                          size="small"
                          class="ma-2"
                          color="dark"
                          text-color="white"
                          prepend-icon="mdi-shield-crown"
                        >
                          Admin
                        </v-chip>
                      </div>
                      <div>
                        <v-chip
                          v-if="userProfile?.isVerified"
                          size="small"
                          class="ma-2"
                          color="info"
                          text-color="white"
                          prepend-icon="mdi-checkbox-marked-circle"
                        >
                          Mail Verified
                        </v-chip>
                      </div>
                      <div>
                        <v-chip v-if="isNearby" size="small" class="ma-2" color="green" text-color="white" prepend-icon="mdi-home"> Near by </v-chip>
                      </div>
                      <div>
                        <v-chip v-if="userProfile?.isPremium" size="small" class="ma-2" color="orange" text-color="white" append-icon="mdi-star">
                          Premium
                        </v-chip>
                      </div>
                      <div>
                        <v-chip v-if="userProfile?.isBanned" class="ma-2" size="small" color="red" text-color="white" append-icon="mdi-cancel">
                          Banned
                        </v-chip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <NearbyTabs :nearby-locations="nearByPlaces" />
            </div>
            <div class="col-12 col-md-6">
              <v-card class="mt-4 shadow-none">
                <v-tabs v-model="activeTab" color="deep-purple-accent-4" align-tabs="center">
                  <v-tab :value="'tradeboxes'">Tradeboxes</v-tab>
                  <v-tab :value="'wishlist'">Wishlist</v-tab>
                </v-tabs>
                <v-window v-model="activeTab">
                  <v-card-text>
                    <v-window-item value="tradeboxes"> <ProfileTradeboxes :user-id="userProfile.userId"></ProfileTradeboxes> </v-window-item>

                    <v-window-item value="wishlist"> <ProfileWishlist :user-id="userProfile.userId" class="mt-4"></ProfileWishlist></v-window-item>
                  </v-card-text>
                </v-window>
              </v-card>
            </div>
          </div>
          <div v-else class="card-body">
            <div class="row mb-2">
              <div class="col-auto">
                <span class="font-italic">No User Found</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
