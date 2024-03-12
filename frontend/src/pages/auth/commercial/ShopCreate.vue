<script setup lang="ts">
import { reactive, computed, Ref, ref } from 'vue';
import { ErrorObject, useVuelidate } from '@vuelidate/core';
import { required, maxLength, helpers } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { getCountries } from '@/services/countries';
import { Country, Event, Shop } from '@prisma/client';
import { useToast } from 'vue-toast-notification';
import { createShop } from '@/services/shop';
import ContentHeader from '@/components/content/ContentHeader.vue';
import SelectCountry from '@/components/filters/SelectCountry.vue';
const $toast = useToast();
const router = useRouter();
const countries: Ref<Country[]> = ref([]);

const newShop: Shop = reactive({
  name: '',
  url: '',
  description: '',
  countryId: null,
  logo: '',
  instagram: '',
});

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Shop name is required', required),
    maxLength: maxLength(50),
  },
  url: {
    required: helpers.withMessage('Shop website is required', required),
    maxLength: maxLength(200),
  },
  description: {
    required: helpers.withMessage('Shop description is required', required),
    maxLength: maxLength(250),
  },
  countryId: {
    required: helpers.withMessage('Country of shop is required', required),
  },
  logo: {
    required: helpers.withMessage('A logo/image of the shop is required', required),
  },
}));

const getErrorMessage = (field: string) => {
  return v$.value[field].$errors.map((error: ErrorObject) => error.$message);
};
const v$ = useVuelidate(rules, newShop);

const uploadImage = (e: Event) => {
  let rawImg;
  const target = e.target as HTMLInputElement;
  if (!target.files) return;
  const file = target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    rawImg = reader.result;
    newShop.logo = rawImg as string;
  };
  reader.readAsDataURL(file);
};

async function create(): Promise<void> {
  const isValid = await v$.value.$validate();
  if (isValid) {
    const res = await createShop(newShop);
    if (res) {
      router.push(`/app/shops`);
    } else {
      $toast.error('Something went wrong. Try again.', {
        position: 'top-right',
        duration: 3000,
      });
    }
  }
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
          :color="'instagram-gradient-earthy'"
          :icon="'mdi-store-outline'"
          :title="'New Shop'"
          :subtitle="'Create a new shop to display'"
        />
        <div class="card-body p-3 mx-4">
          <div class="row">
            <div class="col-12 col-md-6">
              <!-- Shop Name -->
              <div class="row mt-4">
                <div>
                  <v-text-field
                    density="compact"
                    v-model="newShop.name"
                    color="info"
                    clearable
                    label="Name"
                    hint="Enter the shop name (max 50 characters)"
                    variant="outlined"
                    :error-messages="getErrorMessage('name')"
                  >
                    <template #prepend-inner>
                      <v-icon color="#0074D9">mdi-format-title</v-icon>
                    </template>
                  </v-text-field>
                </div>
              </div>
              <!-- Shop Website -->
              <div class="row mt-4">
                <div>
                  <v-text-field
                    density="compact"
                    v-model="newShop.url"
                    color="info"
                    clearable
                    label="Website"
                    hint="Enter the shop's website url"
                    variant="outlined"
                    :error-messages="getErrorMessage('url')"
                  >
                    <template #prepend-inner>
                      <v-icon color="primary">mdi-web</v-icon>
                    </template>
                  </v-text-field>
                </div>
              </div>
              <!-- Shop Description -->
              <div class="row mt-4">
                <div>
                  <v-textarea
                    density="compact"
                    v-model="newShop.description"
                    color="info"
                    label="Brief Description"
                    hint="Enter a description for the shop (max 250 characters)"
                    variant="outlined"
                    :error-messages="getErrorMessage('description')"
                  />
                </div>
              </div>
              <template class="row mt-4">
                <SelectCountry v-model="newShop.countryId" :label="'Shop Country'" :error-messages="getErrorMessage('countryId')" />
              </template>
              <!-- Shop Logo -->
              <div class="row mt-4">
                <v-file-input
                  density="compact"
                  color="info"
                  label="Logo/Image"
                  variant="outlined"
                  accept="image/png, image/jpeg"
                  @change="uploadImage"
                  :error-messages="getErrorMessage('logo')"
                />
              </div>
              <!-- Shop Instagarm -->
              <div class="row mt-4">
                <div>
                  <v-text-field
                    density="compact"
                    v-model="newShop.instagram"
                    color="info"
                    clearable
                    label="Instagram Profile"
                    hint="Enter the shop instagram url"
                    variant="outlined"
                  >
                    <template #prepend-inner>
                      <v-icon class="instagram-gradient">mdi-instagram</v-icon>
                    </template></v-text-field
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center justify-content-lg-start mt-5">
            <RouterLink to="/app/shops">
              <v-btn prepend-icon="mdi-arrow-left" color="dark" class="text-white" depressed elevation="5" text="Back" />
            </RouterLink>
            <v-btn color="green" class="text-white mx-5" depressed elevation="5" @click="create" text="Create Shop" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
