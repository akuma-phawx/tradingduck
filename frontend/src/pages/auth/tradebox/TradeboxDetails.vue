<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { FullTradeBox, addCardToTradeBox, deleteTradeBox, getTradeBoxById, removeCardFromTradeBox } from '@/services/tradebox';
import moment from 'moment';
import DeleteModal from '@/components/modals/DeleteModal.vue';
import EditUsercardModal from '@/components/modals/EditUsercardModal.vue';
import CreateUsercardModal from '@/components/modals/CreateUsercardModal.vue';
import CountryIcon from '@/components/country/CountryIcon.vue';
import EditTradeboxModal from '@/components/modals/EditTradeboxModal.vue';
import router from '@/router';
import { useToast } from 'vue-toast-notification';
import { useUserStore } from '@/stores/userStore';
import { getConditionText, getConditionColor, getGradeColor } from '@/utils/getters';
import ImageModal from '@/components/modals/ImageModal.vue';
import { FullUsercard } from '@/services/userCard';
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
import { getUserProfileById } from '@/services/userProfile';

const $toast = useToast();
const userStore = useUserStore();
const { fetchTradeboxes } = useUserStore();
const showImageModal = ref(false);
const selectedImageSource = ref('');

const tradebox = ref<FullTradeBox>();
const userProfile = ref<UserProfile>();

const tradeboxId = ref('');
const hasPermission = computed(() => {
  return userStore?.userProfile?.id === tradebox.value?.userId;
});

const tradeboxIsLoading = ref(false);
onMounted(async () => {
  tradeboxIsLoading.value = true;
  tradeboxId.value = useRoute().params.id as string;
  tradebox.value = await getTradeBoxById(parseInt(tradeboxId.value));
  if (tradebox.value) {
    const data = await getUserProfileById(tradebox.value?.userId as number);
    userProfile.value = data;
  }
  tradeboxIsLoading.value = false;
});

//Delete Section
const showDeleteModal = ref(false);
async function deleteTradebox() {
  if (!tradebox.value) {
    return;
  }
  await deleteTradeBox(tradebox.value.id.toString());
  await refreshCards();
  router.push('/app/tradebox');
  showDeleteModal.value = false;
}

// Delete Usercard Section
const showDeleteModalForCard = ref(false);
const cardToDeleteIdentifier = ref(); // Initialize with an empty string

const setCardToDeleteIdentifier = (identifier: number) => {
  cardToDeleteIdentifier.value = identifier;
  showDeleteModalForCard.value = true; // Show the delete modal
};
const closeDeleteUsercardModal = () => {
  cardToDeleteIdentifier.value = '';
  showDeleteModalForCard.value = false;
};

//Add Section
const showAddCardModal = ref(false);
const onCardCreated = async (cardId: number): Promise<void> => {
  if (!tradebox.value) {
    return;
  }
  await addCardToTradeBox(tradebox.value.id, cardId);
  await refreshCards();
  $toast.success('Card Added!', {
    position: 'top-right',
    duration: 1000,
  });
  showAddCardModal.value = false;
};

const refreshCards = async (): Promise<void> => {
  fetchTradeboxes();
  tradebox.value = await getTradeBoxById(parseInt(tradeboxId.value));
};

const removeCard = async () => {
  showDeleteModalForCard.value = false;

  if (!tradebox.value) {
    return;
  }
  await removeCardFromTradeBox(tradebox.value.id, cardToDeleteIdentifier.value);
  $toast.success('Card Removed', {
    position: 'top-right',
    duration: 1000,
  });
  await refreshCards();
};

const showEditUserCardModal = ref(false);
const editableUserCard = ref({});

const openEditUserCard = (card: FullUsercard): void => {
  editableUserCard.value = card;
  showEditUserCardModal.value = true;
};

const closeEditUsercardModal = (): void => {
  editableUserCard.value = {};
  showEditUserCardModal.value = false;
};

const onUpdatedUsercard = async (): Promise<void> => {
  editableUserCard.value = {};
  showEditUserCardModal.value = false;
  $toast.success('Card Updated', {
    position: 'top-right',
    duration: 1000,
  });
  await refreshCards();
};

// Edit Tradebox
const showEditTradeboxModal = ref(false);

const closeEditTradeboxModal = (): void => {
  showEditTradeboxModal.value = false;
};

const openImageModal = (imageSource: string) => {
  showImageModal.value = true;
  selectedImageSource.value = imageSource;
};
const closeImageModal = () => {
  showImageModal.value = false;
  selectedImageSource.value = '';
};

const onUpdateTradebox = async (): Promise<void> => {
  await refreshCards();
  showEditTradeboxModal.value = false;
  $toast.success('Tradebox Updated', {
    position: 'top-right',
    duration: 1500,
  });
};
</script>
<template>
  <ContentOverlay>
    <ContentHeader
      :color="'instagram-gradient-desert'"
      :icon="'mdi-archive-outline'"
      :title="'Tradebox Details'"
      :subtitle="'Details and information for selected tradebox'"
    />
    <ContentBody>
      <!-- If Is Loading -->
      <v-container v-if="tradeboxIsLoading">
        <v-progress-circular :width="3" color="green" indeterminate />
      </v-container>
      <!-- If it is loaded -->
      <v-container v-else class="p-0">
        <div v-if="tradebox" class="card-body p-0 mx-4">
          <!-- If it's your tradebox -->
          <v-container v-if="hasPermission" class="d-flex justify-content-center justify-content-lg-start">
            <v-btn color="info" rounded="2" elevation="5" @click="showEditTradeboxModal = true" icon="mdi-pencil" />
            <v-btn color="danger" rounded="2" elevation="5" @click="showDeleteModal = true" icon="mdi-delete" class="text-white mx-4" />
          </v-container>
          <!-- Tradebox Details -->
          <div class="row mt-4">
            <div class="col-lg-3 text-center">
              <v-container>
                <v-img src="https://cdn.dribbble.com/users/6245075/screenshots/16269935/media/17cc5ec7251045c325392d0d5ceae910.png" height="200px" />
              </v-container>
            </div>
            <div class="col-lg-5 mx-2">
              <div class="mb-0 mt-3 text-dark">{{ tradebox.name }}</div>

              <div class="mb-0 mt-3 text-dark">
                <!-- User -->
                <p class="text-md text-dark mb-1">Owner</p>
                <div class="d-flex">
                  <template v-if="userProfile.image">
                    <v-avatar size="50" color="grey" rounded="5" class="shadow-lg">
                      <v-img cover :src="userProfile.image" />
                    </v-avatar>
                  </template>
                  <template v-else>
                    <v-avatar size="50" color="white" rounded="5" class="shadow-lg">
                      <v-icon size="x-large" icon="mdi-account-circle" />
                    </v-avatar>
                  </template>
                  <div class="d-flex flex-column justify-content-center ml-3">
                    <RouterLink :to="'/app/user/' + tradebox.userId" class="link-info text-md font-weight-light" :text="userProfile.name" />
                    <p class="text-xs text-dark mb-0 mt-1">
                      <CountryIcon v-if="userProfile?.location" :code="userProfile.location.code" />
                      {{ userProfile.location?.name ?? '-' }}
                    </p>
                  </div>
                </div>
                <!-- Description -->
                <div class="mt-2">
                  <p class="text-md text-dark mt-4 mb-1">Description</p>
                  <div class="text-subtitle-4 font-weight-light">{{ tradebox.description }}</div>
                </div>
                <!-- Total Cards -->
                <div class="mt-2">
                  <p class="mb-0">Total Cards</p>
                  <span class="font-weight-bold">{{ tradebox?.cards.length }}</span>
                </div>
                <!-- Last Updated -->
                <div class="mt-2">
                  <p class="mb-0">Last Updated</p>
                  <v-icon icon="mdi-calendar" /> <span class="mx-1">{{ moment(tradebox?.updatedAt).fromNow() }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-12">
              <div class="mb-0 mt-3 text-dark">Card List</div>
              <v-btn v-if="hasPermission" color="purple" elevation="5" @click="showAddCardModal = true" class="mt-4" text="Add Card" />
              <div class="row mt-3">
                <v-table>
                  <thead>
                    <tr>
                      <th class="text-center">Language</th>
                      <th class="text-center">Card</th>
                      <th class="text-center">Rarity</th>
                      <th class="text-center">Condition</th>
                      <th class="text-center">Grade</th>
                      <th class="text-center">Note</th>
                      <th class="text-center">Card Image</th>
                      <th class="text-center">User Image</th>
                      <th v-if="hasPermission" class="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="tradebox.cards.length > 0">
                      <tr v-for="card in tradebox.cards" :key="card.id" class="text-center">
                        <td>
                          <CountryIcon v-if="card.language" :code="card?.language.code" />
                        </td>
                        <td>{{ card.card.name }}</td>
                        <td>{{ card.card.rarityName }}</td>
                        <td>
                          <v-chip class="text-xs font-weight-bold" rounded="2" :color="getConditionColor(card.condition)" text-color="white">
                            {{ getConditionText(card.condition) }}
                          </v-chip>
                        </td>
                        <td>
                          <v-chip class="ma-2 text-xs font-weight-bold" rounded="2" :color="getGradeColor(card?.grade)" text-color="white">
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
                          <v-btn @click="openImageModal(card.image as string)" class="shadow-none">
                            <v-icon size="x-large" icon="mdi-image-outline" />
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
                          <v-btn @click="openImageModal(card.userImage as string)" class="shadow-none">
                            <v-icon size="x-large" icon="mdi-camera-outline" />
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
                          <div v-if="hasPermission" class="p-3">
                            <v-btn size="small" rounded="2" color="danger text-white" @click="setCardToDeleteIdentifier(card.id)" icon="mdi-delete" />
                            <v-btn
                              size="small"
                              rounded="2"
                              class="mt-1 mt-md-0 mx-md-3"
                              color="info"
                              @click="openEditUserCard(card)"
                              icon="mdi-pencil"
                            />
                            <RouterLink :to="`/app/usercard/${card.id}`">
                              <v-btn size="small" rounded="2" class="mt-1 mt-md-0" color="green" icon="mdi-information-box"
                            /></RouterLink>
                          </div>
                          <div v-else>
                            <RouterLink :to="`/app/usercard/${card.id}`">
                              <v-btn size="small" rounded="2" class="mt-1 mt-md-0 mx-md-3" color="green" icon="mdi-information-box"
                            /></RouterLink>
                          </div>
                        </td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr>
                        <td colspan="9" class="text-center font-italic">No cards in tradebox. Add your first one!</td>
                      </tr>
                    </template>
                  </tbody>
                </v-table>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="card-body">
          <div class="row">
            <span>No Tradebox found with ID {{ tradeboxId }}</span>
          </div>
        </div>
      </v-container>

      <DeleteModal
        v-if="showDeleteModal"
        title="Delete Tradebox"
        :visible="showDeleteModal"
        @close="showDeleteModal = false"
        @delete="deleteTradebox"
      />
      <DeleteModal
        v-if="showDeleteModalForCard"
        title="Delete Usercard"
        :visible="showDeleteModalForCard"
        @close="closeDeleteUsercardModal"
        @delete="removeCard"
      />
      <CreateUsercardModal v-if="showAddCardModal" :visible="showAddCardModal" @close="showAddCardModal = false" @created="onCardCreated" />
      <EditUsercardModal
        v-if="showEditUserCardModal"
        :visible="showEditUserCardModal"
        :card="editableUserCard"
        @close="closeEditUsercardModal"
        @updated="onUpdatedUsercard"
      />
      <EditTradeboxModal
        v-if="showEditTradeboxModal"
        :visible="showEditTradeboxModal"
        :id="tradebox?.id"
        :title="tradebox?.name"
        :description="tradebox?.description"
        @close="closeEditTradeboxModal"
        @updated="onUpdateTradebox"
      />
      <ImageModal v-if="showImageModal" :visible="showImageModal" :image-source="selectedImageSource" @close="closeImageModal" />
    </ContentBody>
  </ContentOverlay>
</template>
