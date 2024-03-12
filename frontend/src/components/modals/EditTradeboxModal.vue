<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, maxLength, helpers } from '@vuelidate/validators';
import { renameTradeBox, changeTradeBoxDescription } from '@/services/tradebox';

const emit = defineEmits(['close', 'updated']);

const props = defineProps<{
  visible: boolean;
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
}>();

const newTitle = ref('');
const newDescription = ref('');
const rules = computed(() => ({
  newTitle: {
    required: helpers.withMessage('Title is required', required),
    maxLength: maxLength(50),
  },
  newDescription: {
    required: helpers.withMessage('Description is required', required),
    maxLength: maxLength(250),
  },
}));

const v$ = useVuelidate(rules, { newTitle, newDescription });

const getErrorMessage = (field: string) => {
  return v$.value[field].$errors.map(error => error.$message);
};

function hideModal(): void {
  emit('close');
}
async function updateTradebox(): Promise<void> {
  const isValid = await v$.value.$validate();
  if (isValid) {
    await renameTradeBox(props.id, newTitle.value);
    await changeTradeBoxDescription(props.id, newDescription.value);
    emit('updated');
  }
}
const modalIsVisible = ref(false);

watch(modalIsVisible, () => {
  if (!modalIsVisible.value) {
    hideModal();
  }
});
onMounted(() => {
  modalIsVisible.value = props.visible;

  newTitle.value = props.title as string;
  newDescription.value = props.description as string;
});
</script>
<template>
  <v-row justify="center">
    <v-dialog v-model="modalIsVisible" width="800">
      <v-card>
        <v-card-title>
          <span class="">Edit Tradebox</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newTitle"
            label="Tradebox Title"
            hint="Enter new Tradebox title (max 50 characters)"
            variant="outlined"
            :error-messages="getErrorMessage('newTitle')"
            color="info"
          />
          <v-textarea
            v-model="newDescription"
            label="Tradebox Description"
            class="mt-4"
            hint="Enter Tradebox description  (max 250 characters)"
            variant="outlined"
            :error-messages="getErrorMessage('newDescription')"
            color="info"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red" depressed elevation="5" variant="outlined" @click="hideModal" text="Close" />
          <v-btn color="success" depressed elevation="5" variant="outlined" @click="updateTradebox" text="Update" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
