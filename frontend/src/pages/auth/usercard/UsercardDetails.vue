<script setup lang="ts">
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getUserCardById } from '@/services/userCard';
import { getConditionColor, getConditionText, getGradeColor } from '@/utils/getters';
import { getUserProfileById } from '@/services/userProfile';
import ContentHeader from '@/components/content/ContentHeader.vue';
import CountryIcon from '@/components/country/CountryIcon.vue';

const card = ref();
const owner = ref();
const cardId = useRoute().params.id as string;

onMounted(async () => {
  const data = await getUserCardById(cardId);
  card.value = data;

  const userData = await getUserProfileById(card.value.userId);

  owner.value = userData;
});

// watch param changes
onBeforeRouteUpdate(async to => {
  const cardId = to.params.id as string;
  const data = await getUserCardById(cardId);
  card.value = data;
});
</script>
<template>
  <div class="row">
    <div class="col-lg-12 position-relative z-index-2">
      <div class="card">
        <ContentHeader
          :color="'instagram-gradient-autumn'"
          :icon="'mdi-pokeball'"
          :title="'Usercard Details'"
          :subtitle="'Take a closer look at the available for trade card'"
        ></ContentHeader>
        <div v-if="card" class="card-body">
          <v-carousel>
            <v-carousel-item :src="card?.userImage"></v-carousel-item>

            <v-carousel-item :src="card?.image"></v-carousel-item>
          </v-carousel>

          <v-divider></v-divider>
          <div class="row mt-4">
            <div class="col-lg-5">
              <div class="mt-4">
                <p class="text-md text-dark mb-0">Owner</p>
                <div class="d-flex py-1">
                  <template v-if="owner?.image">
                    <v-avatar color="grey" rounded="5" class="shadow-lg">
                      <v-img cover :src="owner?.image"></v-img>
                    </v-avatar>
                  </template>
                  <template v-else>
                    <v-avatar color="white" rounded="5" class="shadow-lg">
                      <v-icon size="x-large" icon="mdi-account-circle"></v-icon>
                    </v-avatar>
                  </template>
                  <div class="d-flex flex-column justify-content-center ml-3">
                    <RouterLink :to="'/app/user/' + owner?.id" class="link-info">
                      <p class="mb-0 text-md">{{ owner?.name }}</p>
                    </RouterLink>
                    <p class="text-xs text-dark mb-0">{{ owner?.location?.name }}</p>
                  </div>
                </div>
              </div>
              <div class="mt-4 d-flex">
                <div class="text-center">
                  <p class="text-md text-dark mb-0">Condition</p>
                  <v-chip class="text-xs font-weight-bold" rounded="2" :color="getConditionColor(card?.condition)" text-color="white">
                    {{ getConditionText(card?.condition) }}
                  </v-chip>
                </div>
                <div class="mx-5 text-center">
                  <p class="text-md text-dark mb-0">Grade</p>
                  <v-chip class="text-xs font-weight-bold" rounded="2" :color="getGradeColor(card?.grade)" text-color="white">
                    {{ card?.grade ?? '-' }}
                  </v-chip>
                </div>
                <div class="text-center">
                  <p class="text-md text-dark mb-0">Language</p>
                  <CountryIcon v-if="card.languageCode" :code="card.languageCode" />
                </div>
              </div>
              <div class="mt-4">
                <p class="text-md text-dark mb-0">Note</p>
                <span class="text-sm text-muted font-weight-light"> {{ card?.note ?? '-' }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="card-body">
          <div class="row mb-2">
            <div class="col-auto">
              <span class="font-italic">No Usercard found with id {{ cardId }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
