<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { required, minLength, helpers } from '@vuelidate/validators';
import useVuelidate, { ErrorObject } from '@vuelidate/core';
import { changePassword } from '@/services/auth';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const props = defineProps<{
  visible: boolean;
}>();
const state = reactive({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
  currPwError: '',
});
const rules = {
  currentPassword: {
    required,
  },
  newPassword: {
    required,
    minLength: minLength(9),
  },
  confirmNewPassword: {
    required,
    sameAs: helpers.withMessage('Passwords should match', function (value) {
      return state.newPassword === value;
    }),
  },
};

const v$ = useVuelidate(rules, state);

const getErrorMessages = (field: string) => {
  if (field === 'currentPassword' && state.currPwError) {
    return state.currPwError;
  }
  return v$.value[field].$errors.map((error: ErrorObject) => error.$message);
};

function hideModal(): void {
  emit('close');
}
async function updatePassword(): Promise<void> {
  const isValid = await v$.value.$validate();
  if (isValid) {
    const resp = await changePassword(state.currentPassword, state.newPassword, state.confirmNewPassword);
    if (resp.message === 'changePassword') {
      emit('close');
    } else {
      state.currPwError = resp.message;
    }
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
});
</script>
<template>
  <v-row justify="center">
    <v-dialog v-model="modalIsVisible" width="800">
      <v-card>
        <v-card-title>
          <span>Change Password</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            density="compact"
            type="password"
            autocomplete="new-password"
            v-model="state.currentPassword"
            color="info"
            label="Current Password"
            hint="Enter your current password"
            variant="outlined"
            :error-messages="getErrorMessages('currentPassword')"
          />
          <v-text-field
            density="compact"
            type="password"
            autocomplete="new-password"
            v-model="state.newPassword"
            color="info"
            class="mt-4"
            label="New Password"
            hint="Enter the new password"
            variant="outlined"
            :error-messages="getErrorMessages('newPassword')"
          />
          <v-text-field
            density="compact"
            type="password"
            autocomplete="new-password"
            v-model="state.confirmNewPassword"
            color="info"
            class="mt-4"
            label="Confirm New Password"
            hint="Confirm the new password"
            variant="outlined"
            :error-messages="getErrorMessages('confirmNewPassword')"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="danger" depressed elevation="5" variant="outlined" @click="hideModal" text="Close" />
          <v-btn color="success" depressed elevation="5" variant="outlined" @click="updatePassword" text="Update" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
