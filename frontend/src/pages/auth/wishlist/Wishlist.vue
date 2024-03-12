<script setup lang="ts">
import { removeCardFromWishList } from '@/services/wishlist';
import { Rarity } from '@prisma/client';
import { ref, onMounted, Ref, computed } from 'vue';
import { useToast } from 'vue-toast-notification';
import { FullCard } from '@/services/search';
import { getRarities } from '@/services/rarities';
import DeleteModal from '@/components/modals/DeleteModal.vue';
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
import SelectRarity from '@/components/filters/SelectRarity.vue';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';

// Data
const showDeleteModal = ref(false);
const cardToDeleteIdentifier = ref(''); // Initialize with an empty string

const userStore = useUserStore();
const { fetchWishlist } = userStore;
const { wishlist } = storeToRefs(userStore);

// Function to set the card identifier when the delete button is clicked
const setCardToDeleteIdentifier = (identifier: string) => {
  cardToDeleteIdentifier.value = identifier;
  showDeleteModal.value = true; // Show the delete modal
};
const closeDeleteModal = () => {
  cardToDeleteIdentifier.value = '';
  showDeleteModal.value = false;
};
// Event handlers
function zoomIn(event: MouseEvent): void {
  (event.target as HTMLElement).classList.add('zoom-in');
}

function zoomOut(event: MouseEvent): void {
  (event.target as HTMLElement).classList.remove('zoom-in');
}

const $toast = useToast();

// Async function to remove a card from the wishlist
async function removeFromWishlist(): Promise<void> {
  showDeleteModal.value = false;
  await removeCardFromWishList(cardToDeleteIdentifier.value);
  fetchWishlist();
  $toast.error('Removed from wishlist.', {
    position: 'top-right',
    duration: 1000,
  });
}

// Sort Criteria
const sortCriterion = ref('Date Added'); // Default sorting criterion
const sortingOptions = ['Date Added', 'Name', 'Date Released']; // Add more options as needed

const rarities: Ref<Rarity[]> = ref([]);
const raritySelected = ref('');
const searchName = ref('');

const filteredCards = computed(() => {
  const nameFilter = searchName.value.toLowerCase();
  const rarityFilter = raritySelected.value ? raritySelected.value.toLowerCase() : '';
  const criterion = sortCriterion.value;

  return wishlist?.value?.cards
    .filter((card: FullCard) => {
      const cardName = card.name.toLowerCase();
      const cardRarity = card.rarityName.toLowerCase();

      if (rarityFilter.length === 0 && nameFilter.length === 0) {
        return true; // No filters applied, return all cards.
      } else if (rarityFilter.length === 0) {
        return cardName.includes(nameFilter);
      } else {
        return cardName.includes(nameFilter) && cardRarity === rarityFilter;
      }
    })
    .sort((a, b) => {
      if (criterion === 'Name') {
        return a.name.localeCompare(b.name);
      } else if (criterion === 'Date Released') {
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      }
      return 0; // Default case
    });
});

// Lifecycle hook to initialize the wishlist
onMounted(async () => {
  fetchWishlist();
  rarities.value = [{ name: '' }, ...(await getRarities())];
  raritySelected.value = rarities.value[0].name;
});
</script>
<template>
  <ContentOverlay>
    <ContentHeader :color="'instagram-gradient-candy'" :icon="'mdi-heart'" :title="'My Wishlist'" :subtitle="'The cards that you are looking for!'" />
    <ContentBody>
      <div v-if="wishlist?.cards.length && wishlist?.cards.length > 0" class="row mt-5">
        <div class="row px-4 mt-5">
          <div class="col-lg-3 my-3">
            <v-text-field density="compact" color="info" v-model="searchName" label="Card Name" hint="Enter Pokemon Name" variant="outlined" />
          </div>
          <div class="col-lg-3 my-3">
            <SelectRarity :label="'Rarity'" v-model="raritySelected" />
          </div>
          <div class="col-lg-3 my-3">
            <v-select density="compact" v-model="sortCriterion" label="Sort By" :items="sortingOptions" variant="outlined" color="info" />
          </div>
          <template class="d-block">
            <RouterLink to="/app/cards"> <v-btn class="mt-1 mb-10" color="primary" text="Find More Cards" /></RouterLink>
          </template>
        </div>
        <div v-for="card in filteredCards" class="col-lg-3 col-md-4 col-sm-6 p-4" :key="card?.identifier">
          <div class="card" data-animation="true">
            <div class="text-center p-0 position-relative mt-n4 mx-3 z-index-2">
              <RouterLink class="d-block blur-shadow-image cursor-pointer" :to="'/app/cards/' + card?.identifier">
                <img
                  :src="card?.image"
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
                <a href="javascript:;">{{ card?.name }}</a>
              </h5>
              <v-btn
                size="small"
                color="danger"
                class="text-white"
                depressed
                elevation="5"
                @click="setCardToDeleteIdentifier(card?.identifier)"
                text="Remove"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="row m-0">
        <div class="col-lg-4 col-md-4 col-sm-6 p-4">
          <p class="text-muted">Wishlist is empty. <router-link to="/app/cards" class="link-info"> Add More Cards</router-link></p>
        </div>
      </div>
    </ContentBody>
    <DeleteModal v-if="showDeleteModal" title="Remove Card" :visible="showDeleteModal" @close="closeDeleteModal" @delete="removeFromWishlist" />
  </ContentOverlay>
</template>
