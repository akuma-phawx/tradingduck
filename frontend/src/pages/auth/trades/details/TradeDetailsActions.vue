<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { FullTradeRequest, acceptTradeRequest, declineTradeRequest, cancelTradeRequest, completeTradeRequest } from '@/services/tradeRequest';
import { PropType, computed } from 'vue';

const { trade, userId } = defineProps({
  trade: {
    type: Object as PropType<FullTradeRequest>,
    required: true,
  },
  userId: {
    type: Number as PropType<number>,
    required: true,
  },
});

const isChangingTradeStatus = ref(false);

const acceptTrade = () => {
  isChangingTradeStatus.value = true;
  acceptTradeRequest(trade.id).then(() => {
    isChangingTradeStatus.value = false;
    window.location.reload();
  });
};

const declineTrade = () => {
  isChangingTradeStatus.value = true;
  declineTradeRequest(trade.id).then(() => {
    isChangingTradeStatus.value = false;
    window.location.reload();
  });
};

const cancelTrade = () => {
  isChangingTradeStatus.value = true;
  cancelTradeRequest(trade.id).then(() => {
    isChangingTradeStatus.value = false;
    window.location.reload();
  });
};

const completeTrade = () => {
  isChangingTradeStatus.value = true;
  completeTradeRequest(trade.id).then(() => {
    isChangingTradeStatus.value = false;
    window.location.reload();
  });
};

const isMyTrade = computed(() => {
  return trade.sendUser.id === userId;
});
const isCancelled = computed(() => {
  return trade.tradeStatus.identifier === 'cancelled';
});

const haveResponded = computed(() => {
  return (
    trade.tradeStatus.identifier === 'rejected' || trade.tradeStatus.identifier === 'accepted' || trade.tradeStatus.identifier === 'completed-sender'
  );
});

const isAccepted = computed(() => {
  return trade.tradeStatus.identifier === 'accepted';
});

const isCompleted = computed(() => {
  return trade.tradeStatus.identifier === 'completed';
});

const isCompletedSender = computed(() => {
  return trade.tradeStatus.identifier === 'completed-sender';
});

const isCompletedReceiver = computed(() => {
  return trade.tradeStatus.identifier === 'completed-receiver';
});
</script>

<template>
  <v-row>
    <v-container v-if="isMyTrade">
      <v-container v-if="isChangingTradeStatus">
        <v-progress-circular color="primary" indeterminate />
      </v-container>
      <template v-else>
        <v-btn
          v-if="!isCancelled && !isAccepted && !isCompleted && !isCompletedReceiver"
          color="dark text-white"
          depressed
          elevation="5"
          @click="cancelTrade"
          text="Cancel"
        />
        <v-btn
          v-if="!isCancelled && isAccepted && !isCompleted && !isCompletedSender"
          color="success text-white"
          depressed
          elevation="5"
          @click="completeTrade"
          text="Complete"
        />
      </template>
    </v-container>
    <v-container v-else>
      <v-container v-if="isChangingTradeStatus">
        <v-progress-circular color="primary" indeterminate />
      </v-container>
      <template v-else>
        <v-btn v-if="!haveResponded && !isCompleted" color="success" depressed elevation="5" @click="acceptTrade" text="Accept" />
        <v-btn
          v-if="!haveResponded && !isCompleted"
          color="danger text-white"
          depressed
          elevation="5"
          class="mx-2"
          @click="declineTrade"
          text="Reject"
        />
        <v-btn
          v-if="haveResponded && (isAccepted || isCompletedSender) && !isCompleted && !isCompletedReceiver"
          color="success text-white"
          depressed
          elevation="5"
          @click="completeTrade"
          text="Complete"
        />
      </template>
    </v-container>
  </v-row>
</template>
