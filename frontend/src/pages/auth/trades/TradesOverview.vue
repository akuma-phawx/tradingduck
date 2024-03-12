<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue';
import TradesTable from './TradesTable.vue';
import { FullTradeRequest, getAllIncomingTradeRequests, getAllSentTradeRequests } from '@/services/tradeRequest';
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
const activeTab = ref('incoming');
const sentTrades: Ref<FullTradeRequest[]> = ref([]);
const incomingTrades: Ref<FullTradeRequest[]> = ref([]);

onMounted(async () => {
  sentTrades.value = await getAllSentTradeRequests();
  incomingTrades.value = await getAllIncomingTradeRequests();
});
</script>
<template>
  <ContentOverlay>
    <ContentHeader :color="'instagram-gradient-sky'" :icon="'mdi-swap-horizontal'" :title="'My Trades'" :subtitle="'Table of all your trades'" />
    <ContentBody>
      <div class="row px-4">
        <div class="mb-10">
          <v-alert
            v-if="sentTrades.length === 5"
            closable
            type="warning"
            title="Maximum Trade Sent Requests"
            text="You can have a maximum of 5 sent trade requests. If you want to make a new one please make sure to close any open trade sent request first."
            variant="tonal"
          />
        </div>
      </div>
      <v-card class="shadow-none">
        <v-tabs v-model="activeTab" color="deep-purple-accent-4" align-tabs="center">
          <v-tab :value="'sent'" text="Sent" />
          <v-tab :value="'incoming'" text="Incoming" />
        </v-tabs>
        <v-window v-model="activeTab">
          <v-card-text>
            <v-window-item value="sent"> <TradesTable :trades="sentTrades" /></v-window-item>
            <v-window-item value="incoming"> <TradesTable :trades="incomingTrades" /> </v-window-item>
          </v-card-text>
        </v-window>
      </v-card>
    </ContentBody>
  </ContentOverlay>
</template>
