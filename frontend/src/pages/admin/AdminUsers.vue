<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getUsers, banUser, unbanUser } from '@/services/user.ts';
import { getUserTypeColor, getStatusColor, getStatusText, getAdminUserText } from '@/utils/getters';
import { User } from '@prisma/client';
import { UserTypeSelector } from '@/models/user.ts';
import { Ref } from 'vue';

const users = ref<User[]>([]);
const filteredUsers = computed(() => {
  return selectedUserType.value
    ? users.value.filter(user => {
        return user.type === selectedUserType.value;
      })
    : users.value;
});

const selectedUserType = ref('');
const userTypes: Ref<UserTypeSelector[]> = ref([
  { name: 'All', value: '' },
  { name: 'User', value: 'USER' },
  { name: 'Admin', value: 'ADMIN' },
]);
const banUserClick = async (user: User) => {
  await banUser(user.id);
  window.location.reload();
};

const unbanUserClick = async (user: User) => {
  await unbanUser(user.id);
  window.location.reload();
};

onMounted(async () => {
  users.value = await getUsers();
});
</script>
<template>
  <div class="row p-3">
    <p class="mt-n1 ms-3 text-sm">{{ getAdminUserText(selectedUserType) }} Members Count: {{ filteredUsers.length }}</p>
    <v-select
      v-model="selectedUserType"
      label="User Type"
      :items="userTypes"
      item-title="name"
      item-value="value"
      variant="outlined"
      color="info"
    ></v-select>
    <v-table height="500px">
      <thead>
        <tr>
          <th class="text-center">ID</th>
          <th class="text-center">E-mail</th>
          <th class="text-center">Type</th>
          <th class="text-center">Verified</th>
          <th class="text-center">Premium</th>
          <th class="text-center">Banned</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="filteredUsers.length > 0">
          <tr v-for="user in filteredUsers" :key="user.id" class="text-center">
            <td>{{ user?.id }}</td>
            <td>{{ user?.email }}</td>
            <td>
              <v-chip class="ma-2 text-xs font-weight-bold" rounded="2" :color="getUserTypeColor(user.type)" text-color="white">
                {{ user?.type }}
              </v-chip>
            </td>
            <td>
              <v-chip class="ma-2 text-xs font-weight-bold" rounded="2" :color="getStatusColor(user?.isVerified)" text-color="white">
                {{ getStatusText(user?.isVerified) }}
              </v-chip>
            </td>
            <td>
              <v-chip class="ma-2 text-xs font-weight-bold" rounded="2" :color="getStatusColor(user?.isPremium)" text-color="white">
                {{ getStatusText(user?.isPremium) }}
              </v-chip>
            </td>
            <td>
              <v-chip class="ma-2 text-xs font-weight-bold" rounded="2" :color="getStatusColor(user?.isBanned)" text-color="white">
                {{ getStatusText(user?.isBanned) }}
              </v-chip>
            </td>
            <td class="text-center">
              <v-btn v-if="!user.isVerified" size="small" :color="getStatusColor(!user?.isVerified)" text="Verify" />
              <v-btn v-else size="small" :color="getStatusColor(!user?.isVerified)" text="Unverify" />
              <v-btn v-if="!user.isBanned" size="small" :color="getStatusColor(user?.isBanned)" class="mx-2" @click="banUserClick(user)" text="Ban" />
              <v-btn v-else size="small" :color="getStatusColor(!user?.isVerified)" class="mx-2" @click="unbanUserClick(user)" text="Unban" />
              <v-btn v-if="!user.isPremium" prepend-icon="mdi-crown" size="small" color="dark text-white" text="Premium" />
              <v-btn v-else size="small" :color="getStatusColor(!user?.isVerified)" text="Unpremium" />
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="6" class="text-center font-italic">No Users.</td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </div>
</template>
