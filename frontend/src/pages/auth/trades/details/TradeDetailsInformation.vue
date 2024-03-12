<script setup lang="ts">
import { FullTradeRequest } from '@/services/tradeRequest';
import { PropType, computed, ref } from 'vue';
import UsercardTable from './UsercardTable.vue';
import { getTradeColor } from '@/utils/getters';
import moment from 'moment';

const props = defineProps({
  trade: {
    required: true,
    type: Object as PropType<FullTradeRequest>,
  },
});
const formattedDate = computed(() => {
  return moment(props.trade.createdAt).format('MMMM Do YYYY, h:mm:ss a');
});
const activeTab = ref('offered');

const tradeStatusName = computed(() => {
  const tradeStatusIdentifier = props.trade.tradeStatus.identifier;
  if (tradeStatusIdentifier === 'completed-sender' || tradeStatusIdentifier === 'completed-receiver') {
    return props.trade.tradeStatus.name + ' 1/2';
  }
  return props.trade.tradeStatus.name;
});
</script>
<template>
  <div class="mx-4 mt-4">
    <v-chip size="x-large" :color="getTradeColor(props.trade.tradeStatus.identifier)" label text-color="white">
      {{ tradeStatusName }}
    </v-chip>
    <div class="mt-1">Trade requested at {{ formattedDate }}</div>

    <v-card class="mt-10">
      <v-tabs v-model="activeTab" color="deep-purple-accent-4" align-tabs="center">
        <v-tab :value="'offered'">
          <div v-if="props.trade.sendUser.userProfile?.image">
            <v-avatar color="white" rounded="5" class="shadow-lg">
              <v-img cover :src="props.trade.sendUser.userProfile.image"></v-img>
            </v-avatar>
          </div>
          <div v-else>
            <v-avatar color="white" rounded="5" class="shadow-lg">
              <v-icon size="x-large" icon="mdi-account-circle"></v-icon>
            </v-avatar>
          </div>
          <div>
            <span class="mx-2">Offered</span><br />
            <div class="text-dark">by {{ props.trade.sendUser.userProfile.name }}</div>
          </div>
        </v-tab>
        <v-tab :value="'requested'">
          <div v-if="props.trade.incUser.userProfile?.image">
            <v-avatar color="white" rounded="5" class="shadow-lg">
              <v-img cover :src="props.trade.incUser.userProfile.image"></v-img>
            </v-avatar>
          </div>
          <div v-else>
            <v-avatar color="white" rounded="5" class="shadow-lg">
              <v-icon size="x-large" icon="mdi-account-circle" />
            </v-avatar>
          </div>
          <div>
            <span class="mx-2">Requested</span><br />
            <div class="text-dark">from {{ props.trade.incUser.userProfile.name }}</div>
          </div></v-tab
        >
      </v-tabs>
      <v-window v-model="activeTab">
        <v-card-text>
          <v-window-item value="offered"> <UsercardTable :cards="props.trade.giveCards" /> </v-window-item>

          <v-window-item value="requested"> <UsercardTable :cards="props.trade.wantCards" /> </v-window-item>
        </v-card-text>
      </v-window>
    </v-card>
  </div>
</template>
