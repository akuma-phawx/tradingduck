<script setup lang="ts">
import CountryIcon from '../country/CountryIcon.vue';
import SelectGrade from '../filters/SelectGrade.vue';
import SelectCondition from '../filters/SelectCondition.vue';
import SelectCard from '../filters/SelectCard.vue';
import SelectSet from '../filters/SelectSet.vue';
import { createUsercard } from '@/services/userCard';
import { Card } from '@prisma/client';
import { Ref, computed, onMounted, ref, watch } from 'vue';
import { getCardLanguages } from '@/utils/getters';
const emit = defineEmits(['close', 'created']);

const props = defineProps({
  visible: Boolean,
});

function hideModal(): void {
  emit('close');
}

const optionsAreValid = computed(() => {
  return selectedSet.value && selectedCard.value;
});
const canBeCreated = computed(() => {
  return selectedCondition.value.length > 0 && language.value.length > 0 && image.value.length > 0;
});

const selectedCard: Ref<Card | null> = ref(null);

const step = ref(1);
const selectedSet: Ref<string | null> = ref(null);

const selectedCondition = ref('');
const image = ref('');

const grade = ref('-');

const language = ref('gb-eng');
const languages = getCardLanguages();

const note = ref('');

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

const cardIsBeingCreated = ref(false);
const createCard = async (): Promise<void> => {
  cardIsBeingCreated.value = true;
  try {
    const card = await createUsercard(
      selectedCard.value?.identifier as string,
      selectedCondition.value,
      image.value,
      grade.value !== '-' ? Number(grade.value) : undefined,
      language.value.length > 0 ? language.value : undefined,
      note.value ? note.value : undefined,
    );
    if (!card) return;
    emit('created', card.id);
  } catch (e) {
    emit('close');
  }
  cardIsBeingCreated.value = false;
};

const modalIsVisible = ref(false);

watch(modalIsVisible, () => {
  if (!modalIsVisible.value) {
    hideModal();
  }
});

onMounted(async () => {
  modalIsVisible.value = props.visible;
});
</script>
<template>
  <v-row justify="center">
    <v-dialog v-model="modalIsVisible" width="800">
      <v-card>
        <v-card-title>
          <span class="">Add New Card in Tradebox</span>
        </v-card-title>
        <v-card-text>
          <div v-show="step === 1">
            <!-- Set Search -->
            <SelectSet :label="'Set'" v-model="selectedSet" />
            <!-- Card Search -->
            <div>
              <SelectCard v-if="selectedSet" class="mt-2" :label="'Card'" :set="selectedSet" v-model="selectedCard" />
              <!-- Card Display -->
              <div v-if="selectedCard">
                <div class="d-flex justify-content-center mt-4">
                  <div class="d-block blur-shadow-image">
                    <v-img width="250" class="shadow-lg border-radius-lg" :src="selectedCard?.image" cover />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="step === 2">
            <!-- Select Condition -->
            <SelectCondition label="Condition" v-model="selectedCondition" />
            <!-- Select Grade -->
            <SelectGrade class="mt-4" label="Grade" v-model="grade" />
            <!-- Select Language -->
            <v-select
              density="compact"
              color="info"
              class="mt-4"
              v-model="language"
              label="Language"
              hint="Select card language"
              item-title="name"
              item-value="code"
              :items="languages"
              variant="outlined"
            >
              <template #selection="{ item }">
                <CountryIcon :code="item?.value" /><span class="mx-2">{{ item.title }} </span></template
              >
              <template #item="{ item, props }">
                <v-list-item v-bind="props">
                  <template #title>
                    <CountryIcon :code="item?.value" /><span class="mx-2">{{ item.title }}</span>
                  </template>
                </v-list-item>
              </template>
            </v-select>
            <!-- Add Note -->
            <v-text-field
              density="compact"
              v-model="note"
              clearable
              class="mt-4"
              prepend-inner-icon="mdi-note-text-outline"
              label="Note (optional)"
              hint="Optional add a note (max 50 characters)"
              variant="outlined"
              color="info"
            />
            <v-file-input
              color="color"
              density="compact"
              class="mt-4"
              label="Card Picture"
              variant="outlined"
              accept="image/png, image/jpeg"
              @change="uploadImage"
            />

            <div class="mt-2">
              <label for="preview">Picture Preview</label>
              <div class="container">
                <div class="row">
                  <img class="img-fluid w-100" :src="image" crossorigin="anonymous" alt="" />
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red" depressed elevation="5" variant="outlined" @click="hideModal" text="Close" />
          <v-btn v-if="step === 2" color="info" depressed elevation="5" variant="outlined" @click="step--" text="Back" />
          <div>
            <v-btn
              v-if="step === 1"
              color="info"
              variant="outlined"
              depressed
              elevation="5"
              class="mx-2"
              @click="step++"
              :disabled="!optionsAreValid"
              text="Next"
            />
            <div v-else>
              <v-btn
                :loading="cardIsBeingCreated"
                color="green"
                depressed
                class="mx-2"
                elevation="5"
                variant="outlined"
                @click="createCard"
                :disabled="!canBeCreated"
                text="Create"
              />
            </div>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
