<script setup lang="ts">
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
</script>
<template>
  <ContentOverlay>
    <ContentHeader
      :color="'azure-waters'"
      :icon="'mdi-map-marker-radius'"
      :title="'Tradespot Locations'"
      :subtitle="'Places that can be used as meeting point for traders that want  to exchange cards'"
    />
    <ContentBody>
      <p>Coming soon...</p>
    </ContentBody>
  </ContentOverlay>
</template>
