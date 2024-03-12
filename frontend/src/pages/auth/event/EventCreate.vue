<script setup lang="ts">
import { reactive, computed, Ref, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, helpers } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { createEvent } from '@/services/event';
import { onMounted } from 'vue';
import { getCountries } from '@/services/countries';
import { Country, Event } from '@prisma/client';
import { getEventTypes } from '@/utils/getters';
import { useToast } from 'vue-toast-notification';
import ContentHeader from '@/components/content/ContentHeader.vue';
import SelectCountry from '@/components/filters/SelectCountry.vue';
const $toast = useToast();
const router = useRouter();
const countries: Ref<Country[]> = ref([]);

const newEvent: Partial<Event> = reactive({
  name: '',
  description: '',
  date: null,
  eventType: 'CONFERENCE',
  countryId: '',
  image: '',
});
const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Event name is required', required),
    maxLength: maxLength(50),
  },
  description: {
    required: helpers.withMessage('Event description is required', required),
    maxLength: maxLength(250),
  },
  date: {
    required: helpers.withMessage('Date of event is required', required),
  },
  eventType: {
    required: helpers.withMessage('Type of event is required', required),
  },
  countryId: {
    required: helpers.withMessage('Location of event is required', required),
  },
  image: {
    required: helpers.withMessage('A logo/image of event is required', required),
  },
}));

const v$ = useVuelidate(rules, newEvent);

const getErrorMessage = (field: string) => {
  return v$.value[field].$errors.map(error => error.$message);
};

const eventTypes = getEventTypes();

const uploadImage = (e: Event) => {
  let rawImg;
  const target = e.target as HTMLInputElement;
  if (!target.files) return;
  const file = target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    rawImg = reader.result;
    newEvent.image = rawImg as string;
  };
  reader.readAsDataURL(file);
};

const isBeingCreated = ref(false);
async function create() {
  isBeingCreated.value = true;
  const isValid = await v$.value.$validate();
  if (isValid) {
    const res = await createEvent(newEvent);
    if (res) {
      router.push(`/app/events/${res?.id}`);
    } else {
      $toast.error('Something went wrong. Try again.', {
        position: 'top-right',
        duration: 3000,
      });
    }
  }
  isBeingCreated.value = false;
}

onMounted(async () => {
  countries.value = await getCountries();
});
</script>
<template>
  <div class="row">
    <div class="col-lg-12 position-relative z-index-2">
      <div class="card mb-4">
        <ContentHeader
          :color="'midnight-serenity'"
          :icon="'mdi-calendar-plus'"
          :title="'New Event'"
          :subtitle="'Create a new event for TradingDuck users'"
        />
        <div class="card-body p-3 mx-4">
          <div class="row mt-4">
            <div class="d-flex justify-content-center justify-content-lg-start">
              <RouterLink to="/app/events">
                <v-btn prepend-icon="mdi-arrow-left" color="dark" class="text-white" depressed elevation="5" text="Back" />
              </RouterLink>
              <v-btn
                :loading="isBeingCreated"
                prepend-icon="mdi-plus"
                color="success"
                class="text-white mt-1 mt-sm-0 mx-sm-2"
                depressed
                elevation="5"
                @click="create"
                text="Create"
              />
            </div>
          </div>
          <div class="row mt-10">
            <div class="col-12 col-md-6">
              <div class="row mt-4">
                <div>
                  <v-text-field
                    density="compact"
                    v-model="newEvent.name"
                    color="info"
                    clearable
                    prepend-inner-icon="mdi-format-title"
                    label="Event Name"
                    hint="Enter the event name (max 50 characters)"
                    variant="outlined"
                    :error-messages="getErrorMessage('name')"
                  />
                </div>
              </div>
              <div class="row mt-4">
                <v-select
                  density="compact"
                  prepend-inner-icon="mdi-form-select"
                  color="info"
                  label="Event Type"
                  :items="eventTypes"
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                  v-model="newEvent.eventType"
                  :error-messages="getErrorMessage('eventType')"
                />
              </div>
              <div class="row mt-4">
                <v-file-input
                  density="compact"
                  color="info"
                  label="Event Picture"
                  variant="outlined"
                  accept="image/png, image/jpeg"
                  @change="uploadImage"
                  :error-messages="getErrorMessage('image')"
                />
              </div>
              <div class="row mt-4">
                <SelectCountry
                  v-model="newEvent.countryId"
                  initial-country="nl"
                  :label="'Event Location'"
                  :error-messages="getErrorMessage('countryId')"
                />
              </div>
              <div class="row mt-4">
                <div>
                  <v-textarea
                    density="compact"
                    v-model="newEvent.description"
                    color="info"
                    label="Event Description"
                    hint="Enter a description for the event (max 250 characters)"
                    variant="outlined"
                    :error-messages="getErrorMessage('description')"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <v-date-picker :min="new Date()" v-model="newEvent.date" />
              <div class="input-errors" v-for="error of v$.date.$errors" :key="error.$uid">
                <div class="error-msg text-sm text-danger mx-1 mt-1">{{ error.$message }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
