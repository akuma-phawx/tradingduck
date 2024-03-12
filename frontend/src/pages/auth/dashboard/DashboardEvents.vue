<script setup lang="ts">
import moment from 'moment';
import { Ref, computed, onMounted, ref } from 'vue';
import { Event } from '@prisma/client';
import { getUpcomingEvents } from '@/services/event';
import ImageModal from '@/components/modals/ImageModal.vue';
import CountryIcon from '@/components/country/CountryIcon.vue';
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

// Today Date
const today = ref(moment().format('dddd, MMMM Do YYYY'));

// Displaying Events Configuration
const visibleEventsCount = 3;
const upcomingEvents: Ref<Event[]> = ref([]);
const visibleEvents = computed(() => {
  return upcomingEvents.value.slice(0, visibleEventsCount);
});

onMounted(async () => {
  upcomingEvents.value = await getUpcomingEvents();
});
</script>

<template>
  <div class="col-12 col-md-6 col-lg-4">
    <div class="card">
      <div class="card-header p-3 pb-0 mb-2">
        <div class="text-dark font-weight-bold">Upcoming Events</div>
        <p class="text-sm mb-0 text-capitalize font-weight-normal">Today is: {{ today }}</p>
      </div>
      <div class="card-body border-radius-lg p-3">
        <div v-if="upcomingEvents.length > 0" id="dashboard-events-container">
          <div v-for="(event, index) in visibleEvents" class="d-flex" :class="index !== 0 ? 'mt-4' : ''" :key="event.id">
            <div>
              <v-avatar rounded="0" class="shadow-lg p-1 cursor-pointer" @click="openImageModal(event.image as string)">
                <v-img :src="event.image?.toString()" />
              </v-avatar>
            </div>
            <div class="ms-3">
              <div class="numbers">
                <h6 class="mb-0 text-dark text-sm">
                  <RouterLink :to="`/app/events/${event.id}`" class="link-info" :text="event.name" />
                </h6>
                <span class="text-sm">{{ moment(event.date).format('dddd, MMMM Do YYYY') }}</span>
                <p class="text-sm">
                  <CountryIcon v-if="event?.location" :code="event?.location.code" />{{ event?.location?.name }}
                  <span v-if="event.eventType === 'CONFERENCE'">- [Attendees: {{ event.attendees.length }}]</span>
                </p>
              </div>
            </div>
          </div>
          <hr class="dark horizontal my-0" />
          <div class="card-footer p-2 d-flex justify-content-end">
            <RouterLink to="/app/events" class="link-info">
              <span>See more</span>
            </RouterLink>
          </div>
        </div>
        <div v-else>
          <span class="text-sm font-italic text-muted">No Upcoming Events</span>
        </div>
      </div>
    </div>
    <ImageModal v-if="showImageModal" :visible="showImageModal" :image-source="selectedImageSource" @close="closeImageModal" />
  </div>
</template>
