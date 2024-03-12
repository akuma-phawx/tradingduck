<script setup lang="ts">
import { Event } from '@prisma/client';
import { ref, Ref, onMounted } from 'vue';
import { getUpcomingEvents, getEvents } from '@/services/event';
import EventsTable from './EventsTable.vue';
import { useUserStore } from '@/stores/userStore';
import ContentHeader from '@/components/content/ContentHeader.vue';
const userStore = useUserStore();
const { isAdmin } = userStore;

const allEvents: Ref<Event[]> = ref([]);
const upcomingEvents: Ref<Event[]> = ref([]);
const activeTab = ref('upcoming');

onMounted(async () => {
  allEvents.value = await getEvents();
  upcomingEvents.value = await getUpcomingEvents();
});
</script>
<template>
  <div class="row">
    <div class="col-lg-12 position-relative z-index-2">
      <div class="card">
        <ContentHeader
          :color="'midnight-serenity'"
          :icon="'mdi-calendar-star'"
          :title="'Events'"
          :subtitle="'Browse upcoming events, tournaments and more!'"
        />
        <div class="card-body p-3 mx-4">
          <div v-if="isAdmin" class="row mt-4">
            <div class="d-flex justify-content-center justify-content-lg-start">
              <RouterLink to="/app/events/create">
                <v-btn color="success" depressed elevation="5" text="Add New" />
              </RouterLink>
            </div>
          </div>
          <v-card class="mt-4 shadow-none">
            <v-tabs v-model="activeTab" color="deep-purple-accent-4" align-tabs="center">
              <v-tab :value="'sent'" text="All Events" />
              <v-tab :value="'upcoming'" text="Upcoming Events" />
            </v-tabs>
            <v-window v-model="activeTab">
              <v-card-text>
                <v-window-item value="sent"> <EventsTable :events="allEvents" /> </v-window-item>
                <v-window-item value="upcoming"> <EventsTable :events="upcomingEvents" /></v-window-item>
              </v-card-text>
            </v-window>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>
