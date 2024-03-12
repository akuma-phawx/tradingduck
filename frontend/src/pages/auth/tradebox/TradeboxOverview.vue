<script setup lang="ts">
import moment from 'moment';
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { tradeboxes } = storeToRefs(userStore);
</script>
<template>
  <ContentOverlay>
    <ContentHeader
      :color="'instagram-gradient-desert'"
      :icon="'mdi-archive-outline'"
      :title="'My Tradeboxes'"
      :subtitle="'A place to organize your cards available for trade'"
    />
    <ContentBody>
      <div class="mb-16">
        <RouterLink to="/app/tradebox/create">
          <v-btn color="success" depressed elevation="5" text="Create New" />
        </RouterLink>
      </div>
      <div class="row">
        <div v-if="tradeboxes?.length > 0" class="row mt-5">
          <div v-for="tradebox in tradeboxes" class="col-xl-2 col-lg-3 col-md-6 col-12 mt-6" :key="tradebox.id">
            <div class="card" data-animation="true">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <RouterLink :to="`/app/tradebox/${tradebox.id}`" class="d-block blur-shadow-image">
                  <v-img>
                    <img
                      src="https://cdn.dribbble.com/users/6245075/screenshots/16269935/media/17cc5ec7251045c325392d0d5ceae910.png"
                      alt="img-blur-shadow"
                      class="img-fluid shadow border-radius-lg cursor-pointer"
                      crossorigin="anonymous"
                    />
                  </v-img>
                </RouterLink>
              </div>
              <div class="card-body text-center">
                <h5 class="font-weight-normal mt-3">
                  <RouterLink :to="`/app/tradebox/${tradebox.id}`" class="d-block blur-shadow-image" :text="tradebox.name" />
                </h5>
                <p class="mb-0">
                  {{ tradebox.description }}
                </p>
              </div>
              <hr class="dark horizontal my-0" />
              <div class="card-footer d-flex justify-content-between">
                <p class="font-weight-normal my-auto">{{ tradebox._count.cards }} cards</p>
                <div class="d-flex">
                  <v-icon icon="mdi-calendar" />
                  <p class="text-sm ml-2 my-auto">{{ moment(tradebox?.updatedAt).fromNow() }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="row m-0">
          <div class="col-lg-3 col-md-4 col-sm-6 p-4">
            <span class="text-muted font-italic">No tradeboxes available.</span>
          </div>
        </div>
      </div>
    </ContentBody>
  </ContentOverlay>
</template>
