<script setup lang="ts">
import { ModelListSelect } from 'vue-search-select'; // Import the ModelListSelect component from a package.
import { ref, Ref } from 'vue'; // Import ref and Ref from Vue for reactive data.
import { useRouter } from 'vue-router'; // Import the useRouter function from Vue Router.
import { searchCards } from '@/services/search'; // Import the searchCards function from a service.
import { debounce } from 'lodash'; // Import the debounce function from lodash for debouncing user input.

const searchText = ref(''); // Create a reactive variable to store the search text.
const searchSuggetions: Ref<{ identifier?: string; name: string; image?: string }[]> = ref([]); // Create a reactive variable to store search suggestions.
const onlyShowTradedCards = ref(false); // Create a reactive variable to store a boolean value.
const page = ref(1); // Create a reactive variable to store the current page.
const pageSize = ref(5); // Create a reactive variable to store the page size.

// Search function
async function search(text: string): Promise<void> {
  searchText.value = text; // Update the search text.
  const term = searchText.value.toLocaleLowerCase().trim(); // Clean and prepare the search term.
  if (term.length > 0) {
    const searchParams = { name: term, onlyShowTradedCards: onlyShowTradedCards.value }; // Define search parameters.
    const searchResp = await searchCards(searchParams, { page: page.value, pageSize: pageSize.value }); // Perform the search.
    const items = searchResp.result.map(card => {
      return {
        identifier: card.identifier,
        name: `${card.name} - ${card.set.name} - ${card.rarity.name}`,
        image: card.image,
      };
    }); // Transform search results into a suitable format.
    searchSuggetions.value = items; // Update the search suggestions with the search results.
  } else {
    searchSuggetions.value = []; // Clear the search suggestions if the search term is empty.
  }
}
const debouncedSearch = debounce(search, 300); // Create a debounced version of the search function.

async function searchDebounced(text: string): Promise<void> {
  debouncedSearch(text); // Call the debounced search function with user input.
}
const router = useRouter(); // Initialize the router.

function redirectToCardAfterClick(identifier: string): void {
  searchText.value = ''; // Clear the search text.
  searchSuggetions.value = []; // Clear the search suggestions.
  router.push('/app/cards/' + identifier); // Redirect to a card details page.
}
</script>

<template>
  <div class="container mt-3 mt-lg-0 w-50 mx-lg-4">
    <ModelListSelect
      :list="searchSuggetions"
      option-value="identifier"
      option-text="name"
      v-model="searchText"
      placeholder="Search card.."
      @searchchange="searchDebounced"
      @update:modelValue="redirectToCardAfterClick"
    />
  </div>
</template>
<style>
i.dropdown {
  display: none;
}
</style>
