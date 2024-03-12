<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { onMounted, ref } from 'vue';
import ProfileTradeboxes from './ProfileTradeboxes.vue';
import ProfileWishlist from './ProfileWishlist.vue';
import CountryIcon from '@/components/country/CountryIcon.vue';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { initUser } = userStore;
const { userProfile } = storeToRefs(userStore);

const activeTab = ref('tradeboxes');
onMounted(() => {
  initUser;
});
</script>
<template>
  <div>
    <div class="row">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="card mx-4">
          <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
            <div class="d-flex">
              <div class="icon icon-shape icon-lg bg-white shadow text-center border-radius-xl mt-n3 ms-4">
                <v-icon class="instagram-gradient-sky" icon="mdi-account" />
              </div>
              <h5 class="mt-3 mb-2 ms-3">My Profile</h5>
            </div>
          </div>

          <div class="card-body">
            <div class="mt-2 mb-10 text-center text-lg-start">
              <RouterLink to="/app/settings">
                <v-btn color="info" depressed text="Edit" />
              </RouterLink>
            </div>
            <div v-if="!userProfile?.isVerified" class="mb-10">
              <v-alert
                closable
                type="warning"
                title="Unverified"
                text="Your account is unverified, please check your email and come back again."
                variant="tonal"
              />
            </div>
            <div class="row">
              <div class="col-12 col-md-6">
                <div class="row">
                  <div class="row mb-2">
                    <div class="d-flex justify-content-center">
                      <v-avatar
                        v-if="userProfile?.image && userProfile.image.startsWith('data')"
                        color="white"
                        rounded="5"
                        class="shadow-lg"
                        size="150"
                      >
                        <v-img cover :src="userProfile.image" />
                      </v-avatar>
                      <v-avatar v-else color="white" rounded="5" class="shadow-lg">
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
                  <div class="row">
                    <div class="row mt-3">
                      <div class="col-12 mt-md-0">
                        <div>
                          <div class="d-flex justify-content-center">
                            <ul class="list-group">
                              <li class="list-group-item border-0">
                                <div class="row">
                                  <div>
                                    <a v-if="userProfile?.facebook" :href="userProfile?.facebook ?? ''">
                                      <v-icon color="#3b5998" icon="mdi-facebook"></v-icon>
                                    </a>

                                    <a class="mx-1" v-if="userProfile?.instagram" :href="userProfile?.instagram ?? ''">
                                      <v-icon color="#ac2bac" icon="mdi-instagram" />
                                    </a>
                                    <a v-if="userProfile?.twitter" :href="userProfile?.twitter ?? ''">
                                      <v-icon color="#55acee" icon="mdi-twitter" />
                                    </a>

                                    <a class="mx-1" v-if="userProfile?.youtube" :href="userProfile?.youtube ?? ''">
                                      <v-icon color="#ed302f" icon="mdi-youtube" />
                                    </a>
                                    <a v-if="userProfile?.twitch" :href="userProfile?.twitch ?? ''">
                                      <v-icon color="#9521bf" icon="mdi-twitch" />
                                    </a>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div class="text-center">
                            <p class="text-sm">
                              {{ userProfile?.description ?? 'No Description is given' }}
                            </p>
                          </div>
                          <hr class="horizontal gray-light my-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <v-card class="mt-4">
                  <v-tabs v-model="activeTab" color="deep-purple-accent-4" align-tabs="center">
                    <v-tab :value="'tradeboxes'">Tradeboxes</v-tab>
                    <v-tab :value="'wishlist'">Wishlist</v-tab>
                  </v-tabs>
                  <v-window v-model="activeTab">
                    <v-card-text>
                      <v-window-item value="tradeboxes"> <ProfileTradeboxes :user-id="userProfile?.userId" /> </v-window-item>
                      <v-window-item value="wishlist"> <ProfileWishlist :user-id="userProfile?.userId" class="mt-4" /></v-window-item>
                    </v-card-text>
                  </v-window>
                </v-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
