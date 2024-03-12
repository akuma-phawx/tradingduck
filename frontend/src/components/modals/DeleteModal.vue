<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
const emit = defineEmits(['close', 'delete']);

const props = defineProps<{
  visible: boolean;
  title: string;
}>();

function hideModal(): void {
  emit('close');
}

function deleteModal(): void {
  emit('delete');
}

const modalIsVisible = ref(false);

watch(modalIsVisible, () => {
  if (!modalIsVisible.value) {
    hideModal();
  }
});
onMounted(() => {
  modalIsVisible.value = props.visible;
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
          <p>Are you sure you want to proceed?</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" depressed elevation="5" variant="outlined" @click="hideModal" text="Close" />
          <v-btn color="danger" depressed elevation="5" variant="outlined" @click="deleteModal" text="Delete" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
