<script setup lang="ts">
import { TradeBoxWithCardCount } from '@/services/tradebox';
import { FullCard } from '@/services/search';
import { ref, watch } from 'vue';
import { getConditionText, getConditionColor } from '@/utils/getters';
import { PropType } from 'vue';
import { FullWishlist } from '@/services/wishlist';
const emit = defineEmits(['offer', 'request', 'change-tradebox']);
const props = defineProps({
  myTradeboxes: Array,
  targetTradeboxes: Array,
  myCards: Array as PropType<FullCard[]>,
  targetCards: Array,
  myWishlist: Object as PropType<FullWishlist>,
  targetWishlist: Object as PropType<FullWishlist>,
});

const activeTab = ref('requester');

const mySelectedTradebox = ref<TradeBoxWithCardCount | null>(null);
const targetUserSelectedTradebox = ref<TradeBoxWithCardCount | null>(null);

const isWanted = (card: FullCard): boolean | undefined => {
  return props.targetWishlist?.cards.some(wishlistCard => {
    return wishlistCard.identifier === card.cardId;
  });
};
const iNeedIt = (card: FullCard): boolean | undefined => {
  return props.myWishlist?.cards.some(wishlistCard => {
    return wishlistCard.identifier === card.cardId;
  });
};
watch(mySelectedTradebox, async () => {
  emit('change-tradebox', 'offerer', mySelectedTradebox.value);
});
watch(targetUserSelectedTradebox, async () => {
  emit('change-tradebox', 'receiver', targetUserSelectedTradebox.value);
});
</script>

<template>
  <v-card>
    <v-tabs v-model="activeTab" color="deep-purple-accent-4" align-tabs="center">
      <v-tab :value="'requester'" text="My Tradeboxes" />
      <v-tab :value="'receiver'" text="Their Tradeboxes" />
    </v-tabs>
    <v-window v-model="activeTab">
      <v-card-text>
        <v-window-item value="requester">
          <div id="tradebox-selector-requester">
            <v-select
              density="compact"
              color="info"
              v-model="mySelectedTradebox"
              label="My Tradeboxes"
              hint="Select one of my tradeboxes"
              :items="myTradeboxes"
              item-title="name"
              item-value="id"
              variant="outlined"
            />
          </div>
          <div id="cards-selector" class="mt-3">
            <label for="">Cards</label>

            <div v-if="!mySelectedTradebox"><p class="mx-1 text-muted text-sm">No Tradebox Selected</p></div>

            <div v-else>
              <div id="cards-display-container-requester" class="row text-center text-sm-start">
                <div v-for="card in myCards" class="col-12 col-sm-6 col-lg-4 col-xl-3 mt-2" :key="card.identifier">
                  <div data-animation="true">
                    <div class="d-flex flex-column justify-content-center align-items-center">
                      <img
                        :src="card.image"
                        alt="img-blur-shadow"
                        crossorigin="anonymous"
                        class="custom-size img-fluid shadow-lg border-radius-lg cursor-pointer"
                      />
                      <v-chip class="ma-2 text-xs font-weight-bold" rounded="2" :color="getConditionColor(card?.condition)" text-color="white">
                        {{ getConditionText(card?.condition) }}
                      </v-chip>
                      <div class="position-relative">
                        <v-btn @click="emit('offer', card)" text="Offer" />
                        <v-icon v-if="isWanted(card)" icon="mdi-star-shooting" class="position-absolute mx-n3 mt-5" color="primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-window-item>

        <v-window-item value="receiver">
          <div id="tradebox-selector-receiver">
            <v-select
              density="compact"
              color="info"
              v-model="targetUserSelectedTradebox"
              label="Their Tradeboxes"
              hint="Select one of target user tradeboxes"
              :items="targetTradeboxes"
              item-title="name"
              item-value="id"
              variant="outlined"
            />
          </div>
          <div id="cards-selector" class="mt-3">
            <label for="">Cards</label>

            <div v-if="!targetUserSelectedTradebox"><p class="mx-1 text-muted text-sm">No Tradebox Selected</p></div>

            <div v-else>
              <div id="cards-display-container" class="row text-center text-sm-start">
                <div v-for="card in targetCards" class="col-12 col-sm-6 col-lg-4 col-xl-3 mt-2" :key="card.identifier">
                  <div data-animation="true">
                    <div class="d-flex flex-column justify-content-center align-items-center">
                      <img
                        :src="card.image"
                        alt="img-blur-shadow"
                        crossorigin="anonymous"
                        class="custom-size img-fluid shadow-lg border-radius-lg cursor-pointer"
                      />
                      <v-chip class="ma-2 text-xs font-weight-bold" rounded="2" :color="getConditionColor(card?.condition)" text-color="white">
                        {{ getConditionText(card?.condition) }}
                      </v-chip>
                      <div class="position-relative">
                        <v-btn @click="emit('request', card)" text="Request" />
                        <v-icon v-if="iNeedIt(card)" icon="mdi-heart" class="position-absolute mx-n3 mt-5" color="red" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-window-item>
      </v-card-text>
    </v-window>
  </v-card>
</template>
