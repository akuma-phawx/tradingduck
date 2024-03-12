<script setup lang="ts">
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
import { getStreamers } from '@/services/streamer';
import { fetchAllStreamData } from '@/services/twitch';
import { TwitchUser } from '@/models/twitch';
import { ref, onMounted } from 'vue';

// Define a reactive reference for streamers
const streamers = ref<TwitchUser[]>([]);
const streamersAreLoading = ref(false);
const errorMessage = ref('No streams available.');
// Function to fetch streamers data on component mount
onMounted(async () => {
  streamersAreLoading.value = true;
  try {
    const fetchedStreamers = await getStreamers();
    streamers.value = await fetchAllStreamData(fetchedStreamers);
  } catch (e) {
    errorMessage.value = 'Something went wrong, try again later.';
    console.error(e);
  }

  streamersAreLoading.value = false;
});
</script>

<template>
  <ContentOverlay>
    <ContentHeader :color="'instagram-gradient-rainbow'" :icon="'mdi-twitch'" :title="'Streams'" :subtitle="'Watch your favourite streamers'" />
    <ContentBody>
      <v-container v-if="streamersAreLoading">
        <v-progress-circular indeterminate />
        <span class="mx-2">Loading streams</span>
      </v-container>
      <v-container v-else-if="streamers.length > 0" class="row">
        <v-card v-for="streamer in streamers" class="col-12 col-md-5 m-2" :key="streamer.id">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class=""> {{ streamer.display_name }} </v-card-title>

              <v-card-subtitle>
                <div class="d-flex flex-column font-weight-bold text-sm mt-1" :class="streamer.isOnline ? 'text-success' : 'text-danger'">
                  <div>
                    <span>{{ streamer.isOnline ? 'Online' : 'Offline' }}</span>
                    <span v-if="streamer.isOnline"> - [{{ streamer.onlineData?.viewer_count }} Viewers]</span>
                  </div>
                  <div>
                    <span class="text-black">{{ streamer.isOnline ? streamer.onlineData?.game_name : '-' }}</span>
                  </div>
                </div>
              </v-card-subtitle>

              <v-card-actions>
                <a
                  class="btn btn-primary text-white rounded-2 p-2 mx-2 mb-0"
                  type="button"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Watch"
                  :href="`https://www.twitch.tv/${streamer.login}`"
                  target="_blank"
                >
                  Watch
                </a>
              </v-card-actions>
            </div>

            <v-avatar class="ma-3" size="125" rounded="5">
              <img :src="streamer.profile_image_url" class="h-100 w-100" crossorigin="anonymous" />
            </v-avatar>
          </div>
        </v-card>
      </v-container>
      <v-container v-else>
        <span class="mx-2">{{ errorMessage }}</span>
      </v-container>
    </ContentBody>
  </ContentOverlay>
</template>
