<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const emit = defineEmits(['close']);

const props = defineProps({
  imageSource: {
    type: String,
    default: '',
  },
  visible: Boolean,
});

function hideModal(): void {
  emit('close');
}
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
          <h5 class="modal-title">Preview</h5>
        </v-card-title>
        <v-card-text>
          <div class="d-flex justify-content-center">
            <img :src="imageSource" crossorigin="anonymous" alt="img-blur-shadow" class="zoom-image img-fluid shadow-lg border-radius-lg" />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red" depressed elevation="5" variant="outlined" @click="hideModal" text="Close" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
