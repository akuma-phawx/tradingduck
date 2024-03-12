<script setup lang="ts">
import { getUsercards } from '@/services/userCard';
import { FullWishlist, getWishListByUserId } from '@/services/wishlist';
import { watchEffect, onMounted, ref } from 'vue';
import type { Ref } from 'vue';

const wishlist: Ref<FullWishlist | undefined> = ref();
const myCards = ref();

const props = defineProps<{
  userId: number;
  isPublicProfile?: boolean;
}>();

const isWanted = (card): boolean => {
  return myCards.value.some(userCard => {
    return userCard.cardId === card.identifier;
  });
};
watchEffect(async () => {
  if (props.userId) {
    wishlist.value = await getWishListByUserId(props.userId);
  }
});
onMounted(async () => {
  myCards.value = await getUsercards();
});
</script>
<template>
  <div>
    <span class="text-xs">
      Cards with <v-icon icon="mdi-heart" color="red" /> are in your Tradebox and the user might show high interest in them .
    </span>
    <v-table height="270px">
      <thead>
        <tr>
          <th class="text-center">Name</th>
          <th class="text-center">Set</th>
          <th class="text-center">Rarity</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="wishlist && wishlist.cards.length > 0">
          <tr v-for="card in wishlist?.cards" :key="card.identifier">
            <td class="text-center">
              <v-icon v-if="myCards && isWanted(card)" icon="mdi-heart" class="position-absolute mx-n3 mt-n4" color="red" />
              <RouterLink class="link-info" :to="`/app/cards/${card.identifier}`" :text="card.name" />
            </td>
            <td>
              <RouterLink class="link-info =" :to="`/app/sets/${card.set.identifier}`">
                <v-avatar size="large" rounded="2" class="shadow-lg p-1 m-2 cursor-pointer">
                  <v-img :src="card.set.image" />
                </v-avatar>
                {{ card.set.name }}</RouterLink
              >
            </td>
            <td class="text-center">{{ card.rarityName }}</td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="3" class="text-center font-italic">No cards in wishlist.</td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </div>
</template>
