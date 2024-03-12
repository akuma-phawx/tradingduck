<script setup lang="ts">
import { computed, ref } from 'vue';
import moment from 'moment';
import { Event } from '@prisma/client';
import { getEventTypeText, getEventTypeColor, getEventTypeIcon } from '@/utils/getters';
import ImageModal from '@/components/modals/ImageModal.vue';
import CountryIcon from '@/components/country/CountryIcon.vue';

const filteredType = ref('');

const filteredEvents = computed(() => {
  if (!filteredType.value) {
    return props.events;
  }
  return props.events.filter(event => {
    return event.eventType === filteredType.value;
  });
});

const props = defineProps<{
  events: Event[];
}>();
// Image
const showImageModal = ref(false);
const selectedImageSource = ref('');

const openImageModal = (imageSource: string) => {
  showImageModal.value = true;
  selectedImageSource.value = imageSource;
};
const closeImageModal = () => {
  showImageModal.value = false;
  selectedImageSource.value = '';
};

const types = [
  { name: 'All', value: '' },
  { name: 'Release', value: 'RELEASE' },
  { name: 'Conference', value: 'CONFERENCE' },
  { name: 'Tournament', value: 'TOURNAMENT' },
  { name: 'Meetup', value: 'MEETUP' },
  { name: 'Other', value: 'OTHER' },
];
</script>
<template>
  <div class="col-12 mb-2">
    <div class="col-6 col-lg-3 my-3">
      <v-select
        v-model="filteredType"
        label="Event Type"
        hint="Choose type of event your are looking for"
        :items="types"
        item-title="name"
        item-value="value"
        color="info"
        variant="outlined"
      />
    </div>
  </div>
  <v-table height="500px">
    <thead>
      <tr>
        <th class="text-center">Type</th>
        <th class="text-center">Image</th>
        <th class="text-center">Name</th>
        <th class="text-center">Date</th>
        <th class="text-center">Location</th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="filteredEvents.length > 0">
        <tr v-for="event in filteredEvents" :key="event.id" class="text-center">
          <td>
            <v-chip class="ma-2" :color="getEventTypeColor(event?.eventType)" label text-color="white">
              <v-icon start :icon="getEventTypeIcon(event?.eventType)" />
              {{ getEventTypeText(event?.eventType) }}
            </v-chip>
          </td>
          <td class="p-3">
            <v-avatar rounded="0" class="shadow-lg p-1 cursor-pointer" @click="openImageModal(event.image as string)">
              <v-img :src="event.image" />
            </v-avatar>
          </td>
          <td>{{ event?.name }}</td>
          <td>{{ moment(event?.date).format('MMMM Do YYYY') }}</td>
          <td>
            <CountryIcon v-if="event?.location" :code="event?.location.code" />
          </td>
          <td>
            <v-btn color="info" depressed elevation="5">
              <RouterLink :to="`/app/events/${event.id}`" class="text-white" :text="'View Details'" />
            </v-btn>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="6" class="text-center font-italic">No {{ filteredType }} Events Available.</td>
        </tr>
      </template>
    </tbody>
  </v-table>
  <ImageModal v-if="showImageModal" :visible="showImageModal" :image-source="selectedImageSource" @close="closeImageModal" />
</template>
