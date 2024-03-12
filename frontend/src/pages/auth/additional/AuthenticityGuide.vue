<script setup lang="ts">
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
</script>
<template>
  <ContentOverlay>
    <ContentHeader
      :color="'instagram-gradient-sunset'"
      :icon="'mdi-spellcheck'"
      :title="'Card Authenticity Guide'"
      :subtitle="'Authenticity guide for cards'"
    />
    <ContentBody>
      <p>Coming soon...</p>
    </ContentBody>
  </ContentOverlay>
</template>
