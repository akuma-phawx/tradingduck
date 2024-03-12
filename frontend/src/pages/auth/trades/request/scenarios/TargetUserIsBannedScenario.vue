<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>
<template>
  <div class="container-fluid py-4">
    <div class="row gx-4">
      <div class="col-lg-3 col-md-4 col-sm-6 p-4">
        <p class="text-muted">User {{ name }} is banned.</p>
      </div>
    </div>
  </div>
</template>
