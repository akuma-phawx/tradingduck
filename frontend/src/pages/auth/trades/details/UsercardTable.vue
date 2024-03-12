<script setup lang="ts">
import { getConditionText, getConditionColor, getGradeColor } from '@/utils/getters';
import { FullUsercard } from '@/services/userCard';
import ImageModal from '@/components/modals/ImageModal.vue';
import CountryIcon from '@/components/country/CountryIcon.vue';
import { ref } from 'vue';
defineProps<{
  cards: FullUsercard[];
}>();
const showImageModal = ref(false);
const selectedImageSource = ref('');

const openImageModal = (imageSource: string) => {
  showImageModal.value = true;
  selectedImageSource.value = imageSource;
};
const closeImageModal = () => {
  showImageModal.value = false;
  selectedImageSource.value = '';
};
</script>
<template>
  <div class="col-12 mb-2">
    <div class="col-6 col-lg-3 my-3"></div>
  </div>
  <v-table height="270px">
    <thead>
      <tr>
        <th class="text-center">Card</th>
        <th class="text-center">Rarity</th>
        <th class="text-center">Condition</th>
        <th class="text-center">Language</th>
        <th class="text-center">Grade</th>
        <th class="text-center">Note</th>
        <th class="text-center">Card Image</th>
        <th class="text-center">User Image</th>
        <th class="text-center"></th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cards.length > 0">
        <tr v-for="card in cards" :key="card.id" class="text-center">
          <td>{{ card.card.name }}</td>
          <td>{{ card.card.rarityName }}</td>
          <td>
            <v-chip class="text-xs font-weight-bold" rounded="2" :color="getConditionColor(card.condition)" text-color="white">
              {{ getConditionText(card.condition) }}
            </v-chip>
          </td>
          <td>
            <CountryIcon v-if="card?.language" :code="card?.language.code" />
          </td>
          <td>
            <v-chip class="text-xs font-weight-bold" rounded="2" :color="getGradeColor(card.grade)" text-color="white">
              {{ card?.grade ?? '-' }}
            </v-chip>
          </td>
          <td>
            <v-btn class="shadow-none">
              <v-icon size="x-large" icon="mdi-information-outline"></v-icon>
              <v-tooltip activator="parent" location="start">
                <span> {{ card?.note ?? '-' }}</span>
              </v-tooltip>
            </v-btn>
          </td>
          <td>
            <v-btn @click="openImageModal(card.card.image as string)" class="shadow-none">
              <v-icon size="x-large" icon="mdi-image-outline" />
              <v-tooltip activator="parent" location="start">
                <v-img
                  :max-height="300"
                  width="300"
                  :src="card.card.image as string"
                  alt="img-blur-shadow"
                  class="zoom-image img-fluid shadow-lg border-radius-lg"
                />
              </v-tooltip>
            </v-btn>
          </td>
          <td>
            <v-btn @click="openImageModal(card.userImage as string)" class="shadow-none">
              <v-icon size="x-large" icon="mdi-image-outline" />
              <v-tooltip activator="parent" location="start">
                <v-img
                  :max-height="300"
                  width="300"
                  :src="card.userImage as string"
                  alt="img-blur-shadow"
                  class="zoom-image img-fluid shadow-lg border-radius-lg"
                />
              </v-tooltip>
            </v-btn>
          </td>
          <td>
            <v-btn color="info" depressed elevation="5">
              <RouterLink :to="`/app/usercard/${card.id}`" class="text-white" :text="'Details'" />
            </v-btn>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="6" class="text-center font-italic">No cards.</td>
        </tr>
      </template>
    </tbody>
  </v-table>
  <ImageModal v-if="showImageModal" :visible="showImageModal" :image-source="selectedImageSource" @close="closeImageModal" />
</template>
