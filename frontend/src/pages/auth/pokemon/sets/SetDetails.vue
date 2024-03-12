<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { FullCard } from '@/services/search';
import SelectRarity from '@/components/filters/SelectRarity.vue';
import { getSetById } from '@/services/set';
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
const set = ref();

function zoomIn(event: MouseEvent): void {
  (event.target as HTMLElement).classList.add('zoom-in');
}
function zoomOut(event: MouseEvent): void {
  (event.target as HTMLElement).classList.remove('zoom-in');
}

const raritySelected = ref(null);
const searchName = ref('');

const filteredCards = computed(() => {
  const nameFilter = searchName.value.toLowerCase();
  const rarityFilter = raritySelected.value ? raritySelected.value.toLowerCase() : null;

  return set.value?.cards.filter((card: FullCard) => {
    const cardName = card.name.toLowerCase();
    const cardRarity = card.rarityName.toLowerCase();

    if (!rarityFilter && nameFilter.length === 0) {
      return true; // No filters applied, return all cards.
    } else if (rarityFilter.length === 0) {
      return cardName.includes(nameFilter);
    } else {
      return cardName.includes(nameFilter) && cardRarity === rarityFilter;
    }
  });
});

onMounted(async () => {
  const setId = useRoute().params.id as string;
  set.value = await getSetById(setId);
});
</script>
<template>
  <ContentOverlay>
    <ContentHeader
      :color="'midnight-serenity'"
      :icon="'mdi-information'"
      :title="'Set Details'"
      :subtitle="`${set?.name} additional details and information`"
    />
    <ContentBody>
      <v-card class="mx-8 shadow-none" max-width="344">
        <v-img :src="set?.image" height="200px" />
        <v-card-title> {{ set?.name }} </v-card-title>
        <v-card-subtitle> Released at {{ set?.releaseDate }} </v-card-subtitle>
        <v-card-text> Number of cards: {{ set?.cards.length }} </v-card-text>
      </v-card>
      <div class="row px-4 mt-5">
        <div class="col-lg-3 my-3">
          <v-text-field density="compact" color="info" v-model="searchName" label="Card Name" hint="Enter Pokemon Name" variant="outlined" />
        </div>
        <template class="d-block col-lg-3 my-3">
          <SelectRarity :label="'Rarity'" v-model="raritySelected" />
        </template>
      </div>
      <div class="row mt-2">
        <h5 class="ms-3">Card List</h5>
        <div class="col-12">
          <div class="row mt-5">
            <div v-for="card in filteredCards" class="col-lg-3 col-md-4 col-sm-6 p-4" :key="card.identifier">
              <div class="card" data-animation="true">
                <div class="text-center p-0 position-relative mt-n4 mx-3 z-index-2">
                  <RouterLink class="d-block blur-shadow-image cursor-pointer" :to="'/app/cards/' + card.identifier">
                    <img
                      :src="card.image"
                      alt="img-blur-shadow"
                      class="zoom-image img-fluid shadow-lg border-radius-lg"
                      @mouseover="zoomIn"
                      @mouseleave="zoomOut"
                      crossorigin="anonymous"
                    />
                  </RouterLink>
                </div>
                <div class="card-body text-center">
                  <div class="d-flex mx-auto"></div>
                  <h5 class="font-weight-normal mt-1">
                    <RouterLink :to="'/app/cards/' + card.identifier" :text="card.name" />
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentBody>
  </ContentOverlay>
</template>
