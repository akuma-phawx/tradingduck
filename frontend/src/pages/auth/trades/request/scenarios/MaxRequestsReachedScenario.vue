<script setup lang="ts"></script>
<template>
  <div class="container-fluid py-4">
    <div class="row gx-4 p-4">
      <v-alert type="warning" title="Maximum Sent Trade Requests" variant="tonal">
        You can have a maximum of 5 sent trade requests. If you want to make a new one, please make sure to close any open trade sent request first.
        <RouterLink :to="{ path: '/app/trades' }" class="link-info" :text="'See Your Trades'" />
      </v-alert>
    </div>
  </div>
</template>
