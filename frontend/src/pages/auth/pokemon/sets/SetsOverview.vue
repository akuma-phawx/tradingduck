<script setup lang="ts">
import moment from 'moment';
import { ref, reactive, computed } from 'vue';
import { FullSet, searchSets } from '@/services/search';
import { getSets } from '@/services/set';
import ImageModal from '@/components/modals/ImageModal.vue';
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';

const showImageModal = ref(false);
const selectedImageSource = ref('');

const filteredSets = ref<FullSet[]>([]);
const searchTerms = reactive({
  name: '',
});

const sortedSets = computed(() => {
  // Use a slice to avoid mutating the original array
  const setsCopy = [...filteredSets.value];

  // Sort the array alphabetically based on the 'name' property
  return setsCopy.sort((a, b) => a.name.localeCompare(b.name));
});

const isLoading = ref(false);
const canSearch = computed(() => {
  return searchTerms.name.length > 0;
});

async function search(): Promise<void> {
  isLoading.value = true;
  const term = searchTerms.name.toLocaleLowerCase().trim();
  if (term.length > 0) {
    filteredSets.value = await searchSets(term);
  }
  isLoading.value = false;
}

const openImageModal = (imageSource: string): void => {
  showImageModal.value = true;
  selectedImageSource.value = imageSource;
};
const closeImageModal = (): void => {
  showImageModal.value = false;
  selectedImageSource.value = '';
};

async function getAllSets(): Promise<void> {
  isLoading.value = true;
  searchTerms.name = '';
  filteredSets.value = await getSets();
  isLoading.value = false;
}
</script>
<template>
  <ContentOverlay>
    <ContentHeader :color="'midnight-serenity'" :icon="'mdi-select-group'" :title="'Sets'" :subtitle="'Search through Pokémon Sets'" />
    <ContentBody>
      <div class="row mt-4">
        <div class="col-lg-4">
          <v-text-field
            density="compact"
            v-model="searchTerms.name"
            type="text"
            color="info"
            label="Set Name"
            hint="Search set by name"
            variant="outlined"
            append-inner-icon="mdi-magnify"
            @keyup.enter="search"
          />
        </div>
      </div>
      <div class="d-flex justify-content-center justify-content-md-start my-5">
        <v-btn color="info" class="text-white" depressed elevation="5" :disabled="!canSearch" @click="search" text="Search" />
        <v-btn color="dark" class="text-white mx-2" depressed elevation="5" @click="getAllSets" text="Show All" />
      </div>
      <div v-if="isLoading" class="d-flex justify-content-center">
        <v-progress-circular :size="50" color="primary" indeterminate />
      </div>
      <div v-else>
        <div v-if="filteredSets.length > 0">
          <v-table height="500px">
            <thead>
              <tr>
                <th class="text-center">Image</th>
                <th class="text-center">Name</th>
                <th class="text-center">Cards</th>
                <th class="text-center">Release Year</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="set in sortedSets" :key="set.name">
                <td class="text-center">
                  <v-avatar size="x-large" rounded="2" class="shadow-lg p-1 m-2 cursor-pointer" @click="openImageModal(set.image)">
                    <v-img :src="set.image" />
                  </v-avatar>
                </td>
                <td class="text-center">
                  <span>{{ set.name }}</span>
                </td>
                <td class="text-center">{{ set?._count.cards }}</td>
                <td class="text-center">{{ moment(set.releaseDate).format('YYYY') }}</td>
                <td class="text-center">
                  <v-btn color="info" depressed elevation="5">
                    <RouterLink :to="'/app/sets/' + set.identifier" class="text-white" :text="'View Details'" />
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </div>
      <ImageModal v-if="showImageModal" :visible="showImageModal" :image-source="selectedImageSource" @close="closeImageModal" />
    </ContentBody>
  </ContentOverlay>
</template>
