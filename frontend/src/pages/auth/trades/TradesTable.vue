<script setup lang="ts">
import { computed, ref, PropType } from 'vue';
import { FullTradeRequest } from '@/services/tradeRequest';
import moment from 'moment';
import { getTradeColor } from '@/utils/getters';
const filteredStatus = ref('');

const filteredTrades = computed(() => {
  if (!filteredStatus.value) {
    return props.trades;
  }
  return props.trades.filter(trade => {
    return trade.tradeStatus.identifier === filteredStatus.value;
  });
});

const props = defineProps({
  trades: {
    required: true,
    type: Array as PropType<FullTradeRequest[]>,
  },
});

// List of statuses
const statuses = [
  { name: 'All', value: '' },
  { name: 'Pending', value: 'pending' },
  { name: 'Cancelled', value: 'cancelled' },
  { name: 'Accepted', value: 'accepted' },
  { name: 'Rejected', value: 'rejected' },
  { name: 'Completed', value: 'completed' },
];
</script>
<template>
  <div class="col-12 mb-2">
    <div class="col-6 col-lg-3 my-3">
      <v-select
        density="compact"
        v-model="filteredStatus"
        label="Trade Status"
        hint="Choose specific status for filtering trades"
        :items="statuses"
        item-title="name"
        item-value="value"
        variant="outlined"
        color="info"
      />
    </div>
  </div>
  <v-table height="500px">
    <thead>
      <tr>
        <th class="text-center">ID</th>
        <th class="text-left">Requester</th>
        <th class="text-left">Receiver</th>
        <th class="text-center">Date</th>
        <th class="text-center">Status</th>
        <th class="text-center"></th>
      </tr>
    </thead>
    <tbody>
      <template v-if="filteredTrades.length > 0">
        <tr v-for="trade in filteredTrades" :key="trade.id" class="text-center">
          <td>{{ trade?.id }}</td>
          <td class="py-2">
            <div class="d-flex px-2 py-1">
              <template v-if="trade.sendUser.userProfile.image">
                <v-avatar size="50" color="grey" rounded="5" class="shadow-lg">
                  <v-img cover :src="trade.sendUser.userProfile.image" />
                </v-avatar>
              </template>
              <template v-else>
                <v-avatar size="50" color="white" rounded="5" class="shadow-lg">
                  <v-icon size="x-large" icon="mdi-account-circle" />
                </v-avatar>
              </template>
              <div class="d-flex flex-column justify-content-center ml-3">
                <RouterLink :to="'/app/user/' + trade.sendUser.id" class="link-info">
                  <p class="mb-0 text-md">{{ trade.sendUser.userProfile.name }}</p>
                </RouterLink>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex px-2 py-1">
              <template v-if="trade.incUser.userProfile.image">
                <v-avatar size="50" color="grey" rounded="5" class="shadow-lg">
                  <v-img cover :src="trade.incUser.userProfile.image" />
                </v-avatar>
              </template>
              <template v-else>
                <v-avatar size="50" color="white" rounded="5" class="shadow-lg">
                  <v-icon size="x-large" icon="mdi-account-circle" />
                </v-avatar>
              </template>
              <div class="d-flex flex-column justify-content-center ml-3">
                <RouterLink :to="'/app/user/' + trade.incUser.id" class="link-info">
                  <p class="mb-0 text-md">{{ trade.incUser.userProfile.name }}</p>
                </RouterLink>
              </div>
            </div>
          </td>
          <td>{{ moment(trade?.createdAt).format('DD MMM YYYY') }}</td>
          <td>
            <v-chip class="ma-2 text-xs font-weight-bold" rounded="2" :color="getTradeColor(trade?.tradeStatus?.identifier)" text-color="white">
              {{ trade?.tradeStatus?.name }}
            </v-chip>
          </td>
          <td>
            <v-btn color="info" depressed elevation="5">
              <RouterLink :to="`/app/trades/${trade.id}`" class="text-white" :text="'View Details'" />
            </v-btn>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="6" class="text-center font-italic">No {{ filteredStatus }} Trades Available.</td>
        </tr>
      </template>
    </tbody>
  </v-table>
</template>
