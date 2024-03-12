<script setup lang="ts">
const emit = defineEmits(['close', 'failed', 'added']);
import { TradeBoxWithCardCount, getTradeboxes } from '@/services/tradebox';
import { Ref, onMounted, ref, computed, watch } from 'vue';
import { createUsercard } from '@/services/userCard';
import { addCardToTradeBox } from '@/services/tradebox';
import { getCardLanguages } from '@/utils/getters';
import SelectCondition from '../filters/SelectCondition.vue';
import SelectGrade from '../filters/SelectGrade.vue';
import CountryIcon from '../country/CountryIcon.vue';

const props = defineProps<{
  title: string;
  visible: boolean;
  cardId: string;
}>();

// Constants for better readability
const Steps = {
  SelectTradebox: 1,
  SelectCondition: 2,
};

function hideModal(): void {
  emit('close');
}

const canBeAdded = computed(() => {
  return selectedCondition.value.length > 0 && image.value;
});

const step = ref(Steps.SelectTradebox);
const tradeboxes: Ref<TradeBoxWithCardCount[]> = ref([]);
const selectedTradebox = ref<number | null>(null);
const selectedCondition = ref<string>('');
const loadingTradeboxes = ref(false);
const cardIsBeingAdded = ref(false);

const image = ref<string>('');
const grade = ref('-');
const language = ref('gb-eng');
const languages = getCardLanguages();

const note = ref('');

const uploadImage = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target.files) return;
  const file = target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    image.value = reader.result as string;
  };
  reader.readAsDataURL(file);
};

const addCard = async (): Promise<void> => {
  cardIsBeingAdded.value = true;
  try {
    const res = await createUsercard(
      props.cardId,
      selectedCondition.value,
      image.value,
      grade.value !== '-' ? Number(grade.value) : undefined,
      language.value.length > 0 ? language.value : undefined,
      note.value ? note.value : undefined,
    );
    if (selectedTradebox.value && res) {
      await addCardToTradeBox(selectedTradebox.value, res.id);
    }
    emit('added');
  } catch (e) {
    emit('failed', e);
  } finally {
    cardIsBeingAdded.value = false;
  }
};

const modalIsVisible = ref(false);

watch(modalIsVisible, newValue => {
  if (!newValue) {
    hideModal();
  }
});

onMounted(async () => {
  modalIsVisible.value = props.visible;
  loadingTradeboxes.value = true;
  tradeboxes.value = await getTradeboxes();
  loadingTradeboxes.value = false;
});
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="modalIsVisible" width="800">
      <v-card>
        <v-card-title>
          <span class="">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <div v-if="tradeboxes.length > 0">
            <div v-show="step === Steps.SelectTradebox">
              <v-select
                density="compact"
                v-model="selectedTradebox"
                label="Tradebox"
                hint="Select tradebox for card to be added"
                :items="tradeboxes"
                item-title="name"
                color="info"
                item-value="id"
                variant="outlined"
              />
            </div>
            <div v-show="step === Steps.SelectCondition">
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
                density="compact"
                class="mt-4"
                color="info"
                label="Card Picture"
                variant="outlined"
                accept="image/png, image/jpeg"
                @change="uploadImage"
              />
              <label for="preview" class="mt-2">Picture Preview</label>
              <div class="container">
                <div class="row">
                  <img class="img-fluid w-100" :src="image" crossorigin="anonymous" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p>No Tradeboxes. <RouterLink class="link-info" to="/app/tradebox/create" :text="'Create One'" /></p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red" depressed elevation="5" variant="outlined" @click="hideModal" text="Close" />
          <v-btn v-if="step === Steps.SelectCondition" color="dark" depressed elevation="5" variant="outlined" @click="step--" text="Back" />
          <div>
            <v-btn
              v-if="step === Steps.SelectTradebox"
              color="blue"
              depressed
              elevation="5"
              class="mx-2"
              @click="step++"
              :disabled="!selectedTradebox"
              text="Next"
            />

            <div v-else>
              <v-btn
                :loading="cardIsBeingAdded"
                color="green"
                depressed
                class="mx-2"
                elevation="5"
                variant="outlined"
                @click="addCard"
                :disabled="!canBeAdded"
                text="Add"
              />
            </div>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
