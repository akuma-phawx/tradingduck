<script setup lang="ts">
import CountryIcon from '@/components/country/CountryIcon.vue';
import ImageModal from '@/components/modals/ImageModal.vue';
import { getConditionText, getConditionColor, getGradeColor } from '@/utils/getters';
import { getUserIsVerifiedColor, getUserIsVerifiedIcon, getUserIsVerifiedText } from '@/utils/getters';
import { useUserStore } from '@/stores/userStore';
import { FullUsercard } from '@/services/userCard';
import { ref, watch } from 'vue';

const props = defineProps<{
  usercards: FullUsercard[];
  nearByUsers: number[];
  page: number;
  pages: number;
}>();
const emit = defineEmits<{
  (e: 'update:page', page: number): void;
}>();
const userStore = useUserStore();
const selectedPage = ref(1);

watch(
  () => props.page,
  newVal => {
    selectedPage.value = newVal;
  },
);

watch(
  () => selectedPage.value,
  newVal => {
    if (newVal !== props.page) {
      emit('update:page', newVal);
    }
  },
);
const isUserNearByMe = (userId: number): boolean => {
  return props.nearByUsers.includes(userId);
};

const showImageModal = ref(false);
const selectedImageSource = ref('');

const openImageModal = (imageSource: string): void => {
  showImageModal.value = true;
  selectedImageSource.value = imageSource;
};

const closeImageModal = (): void => {
  showImageModal.value = false;
  selectedImageSource.value = '';
};
</script>
<template>
  <div class="row mt-5">
    <div class="col-12">
      <h5 class="ms-3">Traders</h5>
      <v-table height="270px">
        <thead>
          <tr class="text-sm">
            <th class="text-center">Location</th>
            <th class="text-center">Nearby</th>
            <th class="text-center">User</th>
            <th class="text-center">Condition</th>
            <th class="text-center">Language</th>
            <th class="text-center">Grade</th>
            <th class="text-center">Note</th>
            <th class="text-center">User Image</th>
            <th class="text-center"></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="usercards.length > 0">
            <tr v-for="card in usercards" :key="card.id">
              <td class="text-center text-sm">
                <CountryIcon v-if="card.user.userProfile?.location" :code="card.user.userProfile.location.code" />
                <span v-else> - </span>
              </td>
              <td>
                <v-btn class="shadow-none" v-if="isUserNearByMe(card.userId)">
                  <v-icon size="x-large" icon="mdi-home-outline"></v-icon>
                  <v-tooltip activator="parent" location="start">
                    <span> {{ 'This user has a spot, shop or event with you in common. It is a good idea to trade there' }}</span>
                  </v-tooltip>
                </v-btn>
              </td>
              <td class="text-sm">
                <div class="d-flex px-2 py-1 align-items-center">
                  <template v-if="card.user.userProfile.image">
                    <v-avatar size="50" color="grey" rounded="5" class="shadow-lg">
                      <v-img cover :src="card.user.userProfile.image" />
                    </v-avatar>
                  </template>
                  <template v-else>
                    <v-avatar size="50" color="white" rounded="5" class="shadow-lg" icon="mdi-account-circle" />
                  </template>
                  <div class="d-flex flex-column justify-content-center ml-5">
                    <RouterLink :to="`/app/user/${card.user.id}`" class="link-info font-weight-light text-md" :text="card.user.userProfile.name" />
                    <v-chip
                      class="text-xxs px-2 mt-1"
                      rounded="1"
                      :color="getUserIsVerifiedColor(card.user.isVerified)"
                      text-color="white"
                      :prepend-icon="getUserIsVerifiedIcon(card.user.isVerified)"
                    >
                      {{ getUserIsVerifiedText(card.user.isVerified) }}
                    </v-chip>
                  </div>
                </div>
              </td>
              <td class="text-center">
                <v-chip class="ma-2 text-xs font-weight-bold" rounded="2" :color="getConditionColor(card?.condition)" text-color="white">
                  {{ getConditionText(card?.condition) }}
                </v-chip>
              </td>
              <td class="text-center text-sm">
                <CountryIcon v-if="card.language" :code="card.language.code" />
              </td>
              <td class="text-center">
                <v-chip class="ma-2 text-xs font-weight-bold" rounded="2" :color="getGradeColor(card?.grade)" text-color="white">
                  {{ card?.grade ?? '-' }}
                </v-chip>
              </td>
              <td class="text-center">
                <v-btn class="shadow-none">
                  <v-icon size="x-large" icon="mdi-information-outline" />
                  <v-tooltip activator="parent" location="start">
                    <span> {{ card?.note ?? '-' }}</span>
                  </v-tooltip>
                </v-btn>
              </td>
              <td class="text-center">
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
                <RouterLink v-if="card.userId !== userStore?.userProfile?.id" :to="'/app/trade/' + card.user.id">
                  <v-btn color="primary" elevation="5" depressed text="Trade" />
                </RouterLink>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="9" class="text-center font-italic">No available traders.</td>
            </tr>
          </template>
        </tbody>
      </v-table>
      <div v-if="pages > 1" class="text-center">
        <v-container>
          <v-row justify="center">
            <v-col cols="6">
              <v-container class="max-width">
                <v-pagination v-model="selectedPage" class="my-4" :length="pages" active-color="primary" elevation="2"></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <ImageModal v-if="showImageModal" :visible="showImageModal" :image-source="selectedImageSource" @close="closeImageModal" />
  </div>
</template>
