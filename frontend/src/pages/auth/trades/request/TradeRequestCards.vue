<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { FullUsercard } from '@/services/userCard';
import { createTradeRequest } from '@/services/tradeRequest';
import { getConditionColor, getConditionText, getGradeColor } from '@/utils/getters';
import ImageModal from '@/components/modals/ImageModal.vue';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { FullUserProfile } from '@/services/userProfile';
import { FullWishlist } from '@/services/wishlist';
import CountryIcon from '@/components/country/CountryIcon.vue';

const router = useRouter();
const userStore = useUserStore();

const emit = defineEmits(['remove']);
const props = defineProps<{
  offeredCards: FullUsercard[];
  requestedCards: FullUsercard[];
  targetUser: FullUserProfile;
  myWishlist: FullWishlist;
  targetWishlist: FullWishlist;
}>();

const message = ref('');

const removeCard = (card: FullUsercard, from: string) => {
  emit('remove', card, from);
};

const isWanted = (card: FullUsercard): boolean | undefined => {
  return props.targetWishlist?.cards.some(wishlistCard => {
    return wishlistCard.identifier === card.cardId;
  });
};
const iNeedIt = (card: FullUsercard): boolean | undefined => {
  return props.myWishlist?.cards.some(wishlistCard => {
    return wishlistCard.identifier === card.cardId;
  });
};
const showImageModal = ref(false);
const selectedImageSource = ref<string | null>('');

const openImageModal = (imageSource: string | null) => {
  showImageModal.value = true;
  selectedImageSource.value = imageSource;
};
const closeImageModal = () => {
  showImageModal.value = false;
  selectedImageSource.value = '';
};

const isMakingOffer = ref(false);
const makeOffer = async (): Promise<void> => {
  isMakingOffer.value = true;
  // get data from props
  const offeredCards = props.offeredCards.map(card => card.id);
  const requestedCards = props.requestedCards.map(card => card.id);
  const targetId = props.targetUser.userId;
  // create trade request
  const data = {
    wantCards: requestedCards,
    giveCards: offeredCards,
    toUserId: Number(targetId),
    message: message.value,
  };
  if (data.wantCards.length === 0 || data.giveCards.length === 0) {
    return;
  }
  const resp = await createTradeRequest(data);
  router.push(`/app/trades/${resp?.id}`);
  isMakingOffer.value = false;
};
</script>

<template>
  <div>
    <div class="d-flex">
      <div v-if="userStore?.userProfile?.image">
        <v-avatar color="white" rounded="5" class="shadow-lg">
          <v-img cover :src="userStore?.userProfile.image" />
        </v-avatar>
      </div>
      <div v-else>
        <v-avatar color="white" rounded="5" class="shadow-lg">
          <v-icon size="x-large" icon="mdi-account-circle" />
        </v-avatar>
      </div>
      <div>
        <p class="mx-2 my-0">Offered</p>
        <div class="mx-2">
          by <RouterLink class="link-primary" :to="`/app/user/${userStore?.userProfile?.id}`">{{ userStore?.userProfile?.name }}</RouterLink>
        </div>
      </div>
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
        <template v-if="offeredCards.length > 0">
          <tr v-for="card in offeredCards" :key="card.id" class="text-center">
            <td><v-icon v-if="isWanted(card)" icon="mdi-star-shooting" class="mx-2" color="primary"></v-icon>{{ card?.card?.name }}</td>
            <td>{{ card?.card?.rarityName }}</td>
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
              <v-btn @click="openImageModal(card.image)" class="shadow-none">
                <v-icon size="x-large" icon="mdi-image-outline"></v-icon>
                <v-tooltip activator="parent" location="start">
                  <img
                    :src="card.image as string"
                    alt="img-blur-shadow"
                    crossorigin="anonymous"
                    class="zoom-image img-fluid shadow-lg border-radius-lg"
                  />
                </v-tooltip>
              </v-btn>
            </td>
            <td>
              <v-btn @click="openImageModal(card.userImage)" class="shadow-none">
                <v-icon size="x-large" icon="mdi-image-outline"></v-icon>
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
            <td><v-btn size="small" color="danger text-white" @click="removeCard(card, 'offered')">x</v-btn></td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="8" class="text-center font-italic">No cards offered.</td>
          </tr>
        </template>
      </tbody>
    </v-table>

    <div class="d-flex mt-6 mt-md-2">
      <div v-if="targetUser?.image">
        <v-avatar color="white" rounded="5" class="shadow-lg">
          <v-img cover :src="targetUser?.image"></v-img>
        </v-avatar>
      </div>
      <div v-else>
        <v-avatar color="white" rounded="5" class="shadow-lg">
          <v-icon size="x-large" icon="mdi-account-circle"></v-icon>
        </v-avatar>
      </div>
      <div>
        <p class="mx-2 my-0">Requested</p>
        <div class="mx-2">
          from <RouterLink class="link-primary" :to="`/app/user/${targetUser?.id}`">{{ targetUser?.name }}</RouterLink>
        </div>
      </div>
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
        <template v-if="requestedCards.length > 0">
          <tr v-for="card in requestedCards" :key="card.id" class="text-center">
            <td><v-icon v-if="iNeedIt(card)" icon="mdi-heart" class="mx-2" color="red"> </v-icon>{{ card?.card?.name }}</td>
            <td>{{ card?.card?.rarityName }}</td>
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
              <v-btn @click="openImageModal(card.image)" class="shadow-none">
                <v-icon size="x-large" icon="mdi-image-outline"></v-icon>
                <v-tooltip activator="parent" location="start">
                  <img
                    :src="card.image as string"
                    alt="img-blur-shadow"
                    crossorigin="anonymous"
                    class="zoom-image img-fluid shadow-lg border-radius-lg"
                  />
                </v-tooltip>
              </v-btn>
            </td>
            <td>
              <v-btn @click="openImageModal(card.userImage)" class="shadow-none">
                <v-icon size="x-large" icon="mdi-image-outline"></v-icon>
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
            <td><v-btn size="small" color="danger text-white" @click="removeCard(card, 'requested')">x</v-btn></td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="8" class="text-center font-italic">No cards requested.</td>
          </tr>
        </template>
      </tbody>
    </v-table>
    <v-textarea color="info" v-model="message" label="Your Message" hint="Enter a trade opening message" variant="outlined" />
  </div>
  <div class="mt-2 d-flex justify-content-end">
    <v-btn
      :loading="isMakingOffer"
      color="primary"
      depressed
      elevation="5"
      :disabled="offeredCards.length === 0 || requestedCards.length === 0"
      @click="makeOffer"
      text="Request Trade"
    />
  </div>
  <ImageModal v-if="showImageModal" :visible="showImageModal" :image-source="selectedImageSource" @close="closeImageModal" />
</template>
