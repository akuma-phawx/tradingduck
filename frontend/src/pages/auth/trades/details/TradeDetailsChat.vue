<script setup lang="ts">
import { FullTradeRequest, addMessageToTradeRequest, getMessagesFromTradeRequest } from '@/services/tradeRequest';
import { TradeRequestMessage } from '@prisma/client';
import { PropType, Ref, computed, ref, onMounted } from 'vue';
import moment from 'moment';
import { onUnmounted } from 'vue';

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

const messages: Ref<TradeRequestMessage[]> = ref([]);

const newMessage = ref('');

const sendingMsg = ref(false);

const interval = ref();

const getOtherUser = computed(() => {
  if (trade.incUser.id === userId) {
    return trade.sendUser.userProfile.name;
  } else {
    return trade.incUser.userProfile.name;
  }
});

const sendMessage = async () => {
  if (sendingMsg.value) {
    return;
  }
  if (newMessage.value === '') {
    return;
  }
  sendingMsg.value = true;

  await addMessageToTradeRequest(trade.id, newMessage.value);
  scrollToBottom();
  initMessages();
  newMessage.value = '';
  sendingMsg.value = false;
};

const initMessages = async () => {
  const msg = await getMessagesFromTradeRequest(trade.id);
  if (msg) {
    messages.value = msg;
  }
};
const getFormattedDateTime = (date: Date) => {
  return moment(date).format('MMMM Do YYYY, h:mm:ss a');
};

const virtualScrollRef = ref(null);

// Function to scroll to the bottom of the virtual scroll
const scrollToBottom = () => {
  if (virtualScrollRef.value) {
    virtualScrollRef.value.scrollToIndex(messages.value.length - 1);
  }
};

const startInterval = () => {
  interval.value = setInterval(() => {
    initMessages();
  }, 5000);
};

const clearInt = () => {
  if (interval.value) {
    clearInterval(interval.value);
  }
};

onMounted(() => {
  initMessages();
  startInterval();
});

onUnmounted(() => {
  clearInt();
});
</script>
<template>
  <v-row>
    <v-col>
      <v-card class="blur shadow-blur">
        <v-card-header class="p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
          <v-row class="bg-gradient-dark shadow-dark border-radius-lg p-3">
            <v-col cols="9" md="9" lg="10">
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <div class="text-white">
                    Your conversation with <span>{{ getOtherUser }}</span>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-header>
        <v-virtual-scroll :items="messages" :item-height="50" :height="300" ref="virtualScrollRef">
          <template #default="{ item: msg }">
            <template v-if="msg.userId !== userId">
              <v-row justify="start" class="mb-4 mx-2" :key="msg.id">
                <v-col cols="auto">
                  <v-card>
                    <v-card-text class="py-2 px-3">
                      <p class="mb-1">{{ msg.message }}</p>
                      <div class="d-flex align-items-center text-sm opacity-6">
                        <small>{{ getFormattedDateTime(msg.createdAt) }}</small>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </template>
            <template v-else>
              <v-row justify="end" class="text-right mb-4 mx-2" :key="msg.id">
                <v-col cols="auto">
                  <v-card color="primary">
                    <v-card-text class="py-2 px-3 text-white">
                      <p class="mb-1">{{ msg.message }}<br /></p>
                      <div class="d-flex align-items-center justify-end text-sm opacity-6">
                        <small>{{ getFormattedDateTime(msg.createdAt) }}</small>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </template>
        </v-virtual-scroll>
        <v-row class="mx-5 mt-2">
          <v-text-field color="info" v-model="newMessage" type="text" label="Your Message" variant="outlined" @keyup.enter="sendMessage" />
          <v-btn icon="mdi-send" color="green" class="mt-1 mx-1" rounded="1" :disabled="sendingMsg" @click="sendMessage" />
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
