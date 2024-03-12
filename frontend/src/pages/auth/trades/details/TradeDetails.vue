<script setup lang="ts">
import TradeDetailsInformation from './TradeDetailsInformation.vue';
import TradeDetailsChat from './TradeDetailsChat.vue';
import TradeDetailsActions from './TradeDetailsActions.vue';
import { useRoute } from 'vue-router';
import { FullTradeRequest, getTradeRequestById } from '@/services/tradeRequest';
import { ref, onMounted } from 'vue';
import { getUserProfile } from '@/services/userProfile';

const tradeRequestId = ref('');
const tradeRequest = ref<FullTradeRequest>();
const userId = ref();

onMounted(async () => {
  tradeRequestId.value = useRoute().params.id as string;
  tradeRequest.value = await getTradeRequestById(tradeRequestId.value);
  const user = await getUserProfile();
  userId.value = user?.userId;
});
</script>
<template>
  <div class="row">
    <div class="col-lg-12 position-relative z-index-2">
      <div class="card mb-4">
        <div class="d-flex justify-content-between">
          <div class="d-flex">
            <div class="icon icon-shape icon-lg bg-white shadow text-center border-radius-xl mt-n3 ms-4">
              <v-icon class="instagram-gradient-sky" icon="mdi-swap-horizontal" />
            </div>
            <div>
              <h5 class="mt-3 mb-2 ms-3">Trade Details</h5>
              <p class="mt-n1 ms-3 text-sm">Here you can find information about a trade</p>
            </div>
          </div>
          <div class="mx-4 mt-4">
            <TradeDetailsActions :trade="tradeRequest" :user-id="userId" v-if="tradeRequest && userId" />
          </div>
        </div>
        <div class="container-fluid py-4">
          <div class="row gx-4" v-if="tradeRequest && userId">
            <div class="col-lg-6">
              <TradeDetailsInformation :trade="tradeRequest" />
            </div>
            <div class="col-lg-6">
              <TradeDetailsChat :user-id="userId" :trade="tradeRequest" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
