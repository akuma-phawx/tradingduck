<script setup lang="ts">
import { ref, onMounted, PropType, watch } from 'vue';
import { FullUsercard, updateUsercard as updateUsercardService } from '@/services/userCard';
import { getCardLanguages } from '@/utils/getters';
import SelectCondition from '../filters/SelectCondition.vue';
import CountryIcon from '../country/CountryIcon.vue';
import SelectGrade from '../filters/SelectGrade.vue';
const emit = defineEmits(['close', 'updated']);

const props = defineProps({
  visible: Boolean,
  card: {
    required: true,
    type: Object as PropType<FullUsercard>,
  },
});
const languages = getCardLanguages();

const editableUserCard = ref<FullUsercard>();
function hideModal(): void {
  emit('close');
}
const uploadImage = (e: Event) => {
  let rawImg;
  const target = e.target as HTMLInputElement;
  if (!target.files) return;
  const file = target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    rawImg = reader.result;
    editableUserCard.value.userImage = rawImg as string;
  };
  reader.readAsDataURL(file);
};

const updateUsercard = async (): Promise<void> => {
  await updateUsercardService(
    editableUserCard.value?.id as number,
    editableUserCard.value?.condition,
    editableUserCard.value?.userImage as string,
    editableUserCard.value?.grade !== '-' ? Number(editableUserCard.value?.grade) : undefined,
    editableUserCard.value?.language,
    editableUserCard.value?.note as string,
  );
  emit('updated');
};

const modalIsVisible = ref(false);

watch(modalIsVisible, () => {
  if (!modalIsVisible.value) {
    hideModal();
  }
});
onMounted(() => {
  modalIsVisible.value = props.visible;
  editableUserCard.value = { ...props.card, language: props.card.language.code };
});
</script>
<template>
  <v-row justify="center">
    <v-dialog v-model="modalIsVisible" width="800">
      <v-card>
        <v-card-title>
          <h5 class="modal-title">Editing Usercard</h5>
        </v-card-title>
        <v-card-text>
          <div>
            <!-- Select Condition -->
            <SelectCondition label="Condition" v-model="editableUserCard.condition" />
            <!-- Select Grade -->
            <SelectGrade class="mt-4" label="Grade" v-model="editableUserCard.grade" />
            <!-- Select Language -->
            <v-select
              color="info"
              class="mt-4"
              v-model="editableUserCard.language"
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
              v-model="editableUserCard.note"
              clearable
              class="mt-4"
              prepend-inner-icon="mdi-note-text-outline"
              label="Note (optional)"
              hint="Optional add a note (max 50 characters)"
              variant="outlined"
              color="info"
            />
            <v-file-input
              color="info"
              class="mt-4"
              label="Card Picture"
              variant="outlined"
              accept="image/png, image/jpeg"
              @change="uploadImage"
            ></v-file-input>
            <div class="mt-2">
              <label>Preview</label>
              <div class="container">
                <div class="row">
                  <img class="img-fluid w-100" :src="editableUserCard.userImage" crossorigin="anonymous" alt="User Image" />
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" depressed elevation="5" variant="outlined" @click="hideModal" text="Close" />
          <v-btn color="green" depressed elevation="5" variant="outlined" @click="updateUsercard" text="Update" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
