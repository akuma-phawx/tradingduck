<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import type { ErrorObject } from '@vuelidate/core';
import { required, maxLength, helpers } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { createTradeBox } from '@/services/tradebox';
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();
const userStore = useUserStore();
const { fetchTradeboxes } = userStore;

const newTradebox = reactive({
  title: '',
  description: '',
});
const rules = computed(() => ({
  title: {
    required: helpers.withMessage('Tradebox title is required', required),
    maxLength: maxLength(50),
  },
  description: {
    required: helpers.withMessage('Tradebox description is required', required),
    maxLength: maxLength(250),
  },
}));

const v$ = useVuelidate(rules, newTradebox);

const getErrorMessage = (field: string) => {
  return v$.value[field].$errors.map((error: ErrorObject) => error.$message);
};

async function create() {
  const isValid = await v$.value.$validate();
  if (isValid) {
    await createTradeBox(newTradebox.title, newTradebox.description, []);
    fetchTradeboxes();
    router.push('/app/tradebox');
  }
}
</script>
<template>
  <ContentOverlay>
    <ContentHeader
      :color="'instagram-gradient-spring'"
      :icon="'mdi-archive-plus-outline'"
      :title="'New Tradebox'"
      :subtitle="'A place to organize your cards available for trade'"
    />
    <ContentBody>
      <!-- Title Field -->
      <div class="row">
        <div class="col-12 col-lg-6">
          <v-text-field
            v-model="newTradebox.title"
            clearable
            prepend-inner-icon="mdi-format-title"
            label="Tradebox Title"
            hint="Enter the tradebox title (max 50 characters)"
            variant="outlined"
            color="info"
            :error-messages="getErrorMessage('title')"
          />
        </div>
      </div>
      <!-- Description Field -->
      <div class="row mt-3">
        <div class="col-12 col-lg-6">
          <v-textarea
            v-model="newTradebox.description"
            label="Tradebox Description"
            hint="Enter a description for your tradebox (max 250 characters)"
            variant="outlined"
            color="info"
            :error-messages="getErrorMessage('description')"
          />
        </div>
      </div>
      <!-- Buttons -->
      <div class="row mt-4">
        <div class="d-flex justify-content-center justify-content-lg-start">
          <RouterLink to="/app/tradebox">
            <v-btn prepend-icon="mdi-arrow-left" color="dark" class="text-white" depressed elevation="5" text="Back" />
          </RouterLink>
          <v-btn color="green" class="text-white mx-5" depressed elevation="5" @click="create" text="Create" />
        </div>
      </div>
    </ContentBody>
  </ContentOverlay>
</template>
