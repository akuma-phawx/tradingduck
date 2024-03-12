<script setup lang="ts">
import AdminShops from './AdminShops.vue';
import AdminStreamers from './AdminStreamers.vue';
import AdminUsers from './AdminUsers.vue';
import { ref } from 'vue';
import ContentHeader from '@/components/content/ContentHeader.vue';

const activeTab = ref('users');
</script>

<template>
  <div class="row">
    <div class="col-lg-12 position-relative z-index-2">
      <div class="card mb-4">
        <ContentHeader
          :color="'metal-black'"
          :icon="'mdi-shield-crown'"
          :title="'Admin Dashboard'"
          :subtitle="'Administrative tools for TradingDuck platform'"
        ></ContentHeader>
        <div class="card-body p-3">
          <v-card class="mt-4" elevation="0">
            <v-tabs v-model="activeTab" color="deep-purple-accent-4" align-tabs="center">
              <v-tab :value="'users'">Users</v-tab>
              <v-tab :value="'shops'">Shops</v-tab>
              <v-tab :value="'streamers'">Streamers</v-tab>
            </v-tabs>
            <v-window v-model="activeTab">
              <v-card-text>
                <v-window-item value="users"> <AdminUsers></AdminUsers> </v-window-item>
                <v-window-item value="shops"> <AdminShops></AdminShops></v-window-item>
                <v-window-item value="streamers"> <AdminStreamers></AdminStreamers> </v-window-item>
              </v-card-text>
            </v-window>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>
