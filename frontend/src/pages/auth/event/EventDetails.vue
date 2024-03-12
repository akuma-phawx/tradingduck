<script setup lang="ts">
import moment from 'moment';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { getEventById } from '@/services/event';
import { attendEvent, unattendEvent, getUpcomingEventsByAttendee } from '@/services/event';
import { useUserStore } from '@/stores/userStore';
import { useToast } from 'vue-toast-notification';
import { Ref } from 'vue';
import { EventWithShopsAndAttendees } from '../../../../../src/services/events.service';
import ContentHeader from '@/components/content/ContentHeader.vue';
import CountryIcon from '@/components/country/CountryIcon.vue';
import { storeToRefs } from 'pinia';

const $toast = useToast();
const changingAttendanceStatus = ref(false);

// User Info
const userStore = useUserStore();
const { userProfile } = storeToRefs(userStore);

const userAttendingEvents: Ref<EventWithShopsAndAttendees[]> = ref([]);
const isAttending = computed(() => {
  return userAttendingEvents.value.findIndex(e => e.id === event.value.id) !== -1;
});

// Event Info
const event = ref();
const eventId = useRoute().params.id;
const activeTab = ref('users');

const refreshEventPage = async (): Promise<void> => {
  userAttendingEvents.value = await getUpcomingEventsByAttendee(userProfile?.userId as number);
  event.value = await getEventById(eventId as string);
};
const toggleAttending = async (): Promise<void> => {
  changingAttendanceStatus.value = true;
  if (isAttending.value) {
    await unattendEvent(event.value.id);
    $toast.error(`Unattending ${event.value.name}`, {
      position: 'top-right',
      duration: 1000,
    });
  } else {
    await attendEvent(event.value.id);
    $toast.success(`Attending ${event.value.name}`, {
      position: 'top-right',
      duration: 1000,
    });
  }
  changingAttendanceStatus.value = false;
  await refreshEventPage();
};

onMounted(async () => {
  await refreshEventPage();
});
</script>
<template>
  <div class="row">
    <div class="col-lg-12 position-relative z-index-2">
      <div class="card">
        <ContentHeader
          :color="'midnight-serenity'"
          :icon="'mdi-calendar-star'"
          :title="'Event Details'"
          :subtitle="'More information about current event'"
        />
        <div class="card-body">
          <div v-if="event?.eventType === 'CONFERENCE'" class="row mt-1">
            <div v-if="!isAttending">
              <v-btn :loading="changingAttendanceStatus" color="success" depressed elevation="5" @click="toggleAttending" text="Attend" />
            </div>
            <div v-else>
              <v-btn color="danger" class="text-white" depressed elevation="5" @click="toggleAttending" text="Unattend" />
            </div>
          </div>
          <div class="row mt-10">
            <div class="col-lg-3 text-center">
              <v-container v-if="event?.image" class="border shadow-lg">
                <v-img :src="event?.image" height="200px"></v-img>
              </v-container>
              <v-container v-else>
                <v-img
                  src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                  height="200px"
                ></v-img>
              </v-container>
            </div>
            <div class="col-lg-5 mx-auto">
              <div class="mt-lg-0 mt-4 text-dark">{{ event?.name }}</div>
              <v-divider />
              <div class="mb-0 mt-3 text-dark">Description</div>
              <div class="font-weight-light">{{ event?.description }}</div>
              <div class="mb-0 mt-3 text-dark">Date</div>
              <div class="font-weight-light">{{ moment(event?.date).format('MMMM Do YYYY') }}</div>
              <div class="mb-0 mt-3 text-dark">Location</div>
              <div class="font-weight-light"><CountryIcon v-if="event?.location" :code="event?.location.code" /> {{ event?.location?.name }}</div>
            </div>
            <div v-if="event?.eventType === 'CONFERENCE'">
              <div class="mb-0 mt-8 text-dark">Attendants</div>
              <v-card class="mt-3">
                <v-tabs v-model="activeTab" color="deep-purple-accent-4" align-tabs="center">
                  <v-tab :value="'users'" text="Users" />
                  <v-tab :value="'shops'" text="Shops" />
                </v-tabs>
                <v-window v-model="activeTab">
                  <v-card-text>
                    <v-window-item value="users">
                      <v-table height="270px">
                        <thead>
                          <tr>
                            <th class="text-center">User</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-if="event.attendees.length > 0">
                            <tr v-for="(user, index) in event.attendees" :key="index">
                              <td>
                                <div class="d-flex px-2 py-1">
                                  <template v-if="user.userProfile.image">
                                    <v-avatar color="grey" rounded="5" class="shadow-lg">
                                      <v-img cover :src="user.userProfile.image" />
                                    </v-avatar>
                                  </template>
                                  <template v-else>
                                    <v-avatar color="white" rounded="5" class="shadow-lg">
                                      <v-icon size="x-large" icon="mdi-account-circle" />
                                    </v-avatar>
                                  </template>
                                  <div class="d-flex flex-column justify-content-center ml-3">
                                    <RouterLink :to="'/app/user/' + user.id" class="link-info">
                                      <p class="mb-0 text-md">{{ user.userProfile.name }}</p>
                                    </RouterLink>
                                    <p class="text-xs text-dark mb-0">
                                      <CountryIcon v-if="user.userProfile?.location" :code="user.userProfile.location.code" />
                                      {{ user.userProfile.location?.name ?? '-' }}
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </template>
                          <template v-else>
                            <tr>
                              <td class="text-center font-italic">No TradingDuck Users are attending.</td>
                            </tr>
                          </template>
                        </tbody>
                      </v-table>
                    </v-window-item>
                    <v-window-item value="shops">
                      <v-table height="270px">
                        <thead>
                          <tr>
                            <th class="text-center">Shop</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-if="event.attendingShops.length > 0">
                            <tr v-for="(shop, index) in event.attendingShops" :key="index">
                              <td>{{ shop }}</td>
                            </tr>
                          </template>
                          <template v-else>
                            <tr>
                              <td class="text-center font-italic">No TradingDuck Shops are attending.</td>
                            </tr>
                          </template>
                        </tbody>
                      </v-table>
                    </v-window-item>
                  </v-card-text>
                </v-window>
              </v-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
