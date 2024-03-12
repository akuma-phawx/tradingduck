<script setup lang="ts">
import { TradeBoxWithCardCount, getTradeboxesByUser } from '@/services/tradebox';
import { watchEffect, ref } from 'vue';

const props = defineProps<{
  userId: number | undefined;
}>();

const tradeboxes = ref<TradeBoxWithCardCount[]>([]);

watchEffect(async () => {
  if (props.userId) {
    tradeboxes.value = await getTradeboxesByUser(props.userId);
  }
});
</script>
<template>
  <div>
    <v-table height="270px">
      <thead>
        <tr>
          <th class="text-center">Image</th>
          <th class="text-center">ID</th>
          <th class="text-center">Name</th>
          <th class="text-center">Cards</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="tradeboxes && tradeboxes.length > 0">
          <tr v-for="tradebox in tradeboxes" :key="tradebox.id + tradebox.name">
            <td class="text-center">
              <v-avatar color="white" rounded="2" class="shadow-lg">
                <v-img cover src="https://cdn.dribbble.com/users/6245075/screenshots/16269935/media/17cc5ec7251045c325392d0d5ceae910.png" />
              </v-avatar>
            </td>
            <td class="text-center">{{ tradebox.id }}</td>
            <td class="text-center">
              <RouterLink class="link-info" :to="`/app/tradebox/${tradebox.id}`" :text="tradebox.name" />
            </td>
            <td class="text-center">{{ tradebox._count.cards }}</td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="4" class="text-center font-italic">No available tradeboxes.</td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </div>
</template>
