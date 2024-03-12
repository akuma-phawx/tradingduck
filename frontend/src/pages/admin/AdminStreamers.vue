<script setup lang="ts">
import { getStreamers } from '@/services/streamer';
import { ref, onMounted } from 'vue';
import { fetchAllStreamData } from '@/services/twitch';
import { TwitchUser } from '@/models/twitch';

const streamers = ref<TwitchUser[]>([]);
onMounted(async () => {
  const fetchedStreamers = await getStreamers();
  streamers.value = await fetchAllStreamData(fetchedStreamers);
});
</script>
<template>
  <div class="row p-3">
    <div class="d-flex mt-n1 mb-5 ms-3 align-items-center">
      <p class="text-sm">Streamers Count: {{ streamers.length }}</p>
    </div>
    <v-table height="500px">
      <thead>
        <tr>
          <th class="text-center">Twitch ID</th>
          <th class="text-center">Name</th>
          <th class="text-center">Link</th>
          <th class="text-center">Status</th>
          <th class="text-center">Viewers</th>
          <th class="text-center">Game</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="streamers.length > 0">
          <tr v-for="streamer in streamers" :key="streamer.id" class="text-center">
            <td>{{ streamer.id }}</td>
            <td>
              <div class="d-flex px-2 py-1 align-items-center">
                <template v-if="streamer.profile_image_url">
                  <v-avatar size="50" color="grey" rounded="2" class="shadow-lg p-1">
                    <v-img cover :src="streamer.profile_image_url" />
                  </v-avatar>
                </template>
                <template v-else>
                  <v-avatar size="50" color="white" rounded="2" class="shadow-lg">
                    <v-icon size="x-large" icon="mdi-account-circle"></v-icon>
                  </v-avatar>
                </template>
                <div class="d-flex flex-column justify-content-center ml-3">
                  <p class="mb-0 text-sm">{{ streamer.display_name }}</p>
                </div>
              </div>
            </td>
            <td>
              <a :href="`https://www.twitch.tv/${streamer.login}`" target="_blank" class="link-info"><v-icon icon="mdi-launch"></v-icon></a>
            </td>
            <td>
              <div class="p-1" :class="streamer.isOnline ? 'bg-green' : 'bg-red'">
                <span class="mx-2">{{ streamer.isOnline ? 'Online' : 'Offline' }}</span>
              </div>
            </td>
            <td>
              <span class="text-black">{{ streamer.onlineData?.viewer_count ?? '0' }}</span>
            </td>
            <td>
              <span class="text-black">{{ streamer.onlineData?.game_name ?? '-' }}</span>
            </td>
            <td class="text-center">
              <v-btn color="danger" class="text-white" rounded="2" size="small" icon="mdi-delete" />
              <v-btn color="blue" rounded="2" size="small" class="mx-2" icon="mdi-pencil" />
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="7" class="text-center font-italic">No Streamers.</td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </div>
</template>
