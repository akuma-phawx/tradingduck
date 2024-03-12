<!-- eslint-disable vue/no-parsing-error -->
<script setup lang="ts">
import { getCountries } from '@/services/countries';
import { updateUserProfile } from '@/services/userProfile';
import { Country } from '@prisma/client';
import { onMounted, ref, Ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useUserStore } from '@/stores/userStore';
import ChangePasswordModal from '@/components/modals/ChangePasswordModal.vue';
import DeleteModal from '@/components/modals/DeleteModal.vue';
import ContentHeader from '@/components/content/ContentHeader.vue';
import SelectCountry from '@/components/filters/SelectCountry.vue';
import { deleteMe } from '@/services/auth';
import router from '@/router';
const { userProfile, initUser } = useUserStore();

const name = ref('');
const fullName = ref('');
const description = ref('');
const image = ref('');
const facebook = ref('');
const twitter = ref('');
const instagram = ref('');
const youtube = ref('');
const twitch = ref('');
const selectedCountry = ref('');
const countries: Ref<Country[]> = ref([]);

const showDeleteAccountModal = ref(false);
const isSaving = ref(false);
const $toast = useToast();
const save = async () => {
  isSaving.value = true;
  const data = {
    name: name.value,
    fullName: fullName.value,
    location: selectedCountry.value,
    description: description.value,
    image: image.value,
    banner: '',
    facebook: facebook.value,
    twitter: twitter.value,
    instagram: instagram.value,
    youtube: youtube.value,
    twitch: twitch.value,
  };
  try {
    await updateUserProfile(data);
    $toast.success('Profile updated!', {
      position: 'top-right',
      duration: 1000,
    });
    await initUser();
  } catch (e) {
    $toast.error('Something went wrong :(', {
      position: 'top-right',
      duration: 1000,
    });
  }

  isSaving.value = false;
};

const uploadImage = (e: Event) => {
  let rawImg;
  const target = e.target as HTMLInputElement;
  if (!target.files) return;
  const file = target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    rawImg = reader.result;
    image.value = rawImg as string;
  };
  reader.readAsDataURL(file);
};

const deleteAccount = async () => {
  await deleteMe();
  router.push('/');
};

onMounted(async () => {
  countries.value = await getCountries();
  fullName.value = userProfile?.fullName ?? '';
  selectedCountry.value = userProfile?.countryId ?? '';
  description.value = userProfile?.description ?? '';
  image.value = userProfile?.image ?? '';
  facebook.value = userProfile?.facebook ?? '';
  twitter.value = userProfile?.twitter ?? '';
  instagram.value = userProfile?.instagram ?? '';
  youtube.value = userProfile?.youtube ?? '';
  twitch.value = userProfile?.twitch ?? '';
});

const showChangePasswordModal = ref(false);
</script>

<template>
  <div class="row">
    <div class="col-lg-12 position-relative z-index-2">
      <div class="card">
        <ContentHeader
          :color="'instagram-gradient-autumn'"
          :icon="'mdi-tools'"
          :title="'User Settings'"
          :subtitle="'Profile settings customization'"
        />
        <div class="card-body col-12">
          <div>
            <v-btn color="danger" class="mx-1 text-white" depressed elevation="5" @click="showDeleteAccountModal = true" text="Delete Account" />
            <v-btn color="dark" class="mx-1 text-white" depressed elevation="5" @click="showChangePasswordModal = true" text="Password Change" />
          </div>
          <div class="row mt-6">
            <div class="col-6">
              <div class="row mt-2 d-flex justify-content-center">
                <v-file-input
                  density="compact"
                  class="col-8"
                  label="Profile Picture"
                  variant="outlined"
                  accept="image/png, image/jpeg"
                  color="info"
                  @change="uploadImage"
                />
              </div>
              <div class="row mt-2">
                <v-text-field density="compact" v-model="fullName" label="Full Name" hint="Enter your full name" variant="outlined" color="info">
                  <template #prepend-inner>
                    <v-icon color="#0074D9">mdi-account</v-icon>
                  </template>
                </v-text-field>
              </div>
              <template class="row mt-4">
                <SelectCountry v-model="selectedCountry" :label="'Location'" />
              </template>
              <div class="row mt-3">
                <v-textarea
                  density="compact"
                  v-model="description"
                  color="info"
                  label="Description"
                  hint="Enter a brief description about yourself"
                  variant="outlined"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="row mt-2">
                <v-text-field v-model="facebook" label="Facebook Account" color="info" hint="Enter your Facebook profile link" variant="outlined">
                  <template #prepend-inner>
                    <v-icon color="#3b5998">mdi-facebook</v-icon>
                  </template>
                </v-text-field>
              </div>
              <div class="row mt-3">
                <v-text-field v-model="twitter" color="info" label="Twitter Account" hint="Enter your twitter profile link" variant="outlined">
                  <template #prepend-inner>
                    <v-icon color="#1DA1F2">mdi-twitter</v-icon>
                  </template>
                </v-text-field>
              </div>
              <div class="row mt-3">
                <v-text-field v-model="instagram" label="Instagram Account" color="info" hint="Enter your instagram profile link" variant="outlined">
                  <template #prepend-inner>
                    <v-icon class="instagram-gradient">mdi-instagram</v-icon>
                  </template>
                </v-text-field>
              </div>
              <div class="row mt-3">
                <v-text-field v-model="youtube" label="Youtube Account" hint="Enter your youtube profile link" color="info" variant="outlined">
                  <template #prepend-inner>
                    <v-icon color="#FF0000">mdi-youtube</v-icon>
                  </template>
                </v-text-field>
              </div>
              <div class="row mt-3">
                <v-text-field v-model="twitch" label="Twitch Account" color="info" hint="Enter your twitch profile link" variant="outlined">
                  <template #prepend-inner>
                    <v-icon color="#9146FF">mdi-twitch</v-icon>
                  </template>
                </v-text-field>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="d-flex justify-content-center">
              <v-btn :loading="isSaving" color="primary" depressed elevation="5" @click.prevent="save" text="Apply Changes" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <DeleteModal
      v-if="showDeleteAccountModal"
      title="Delete Account"
      :visible="showDeleteAccountModal"
      @close="showDeleteAccountModal = false"
      @delete="deleteAccount"
    />
    <ChangePasswordModal v-if="showChangePasswordModal" :visible="showChangePasswordModal" @close="showChangePasswordModal = false" />
  </div>
</template>
