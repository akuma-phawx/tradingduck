<script setup lang="ts">
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
</script>
<template>
  <ContentOverlay>
    <ContentHeader
      :color="'instagram-gradient-lavender'"
      :icon="'mdi-email-heart-outline'"
      :title="'Get in touch'"
      :subtitle="'Contact us via mail or social media'"
    />
    <ContentBody>
      <p>Email: support@tradingduck.com</p>
      <p>or</p>
      <p>
        <a class="midnight-serenity" href="https://www.instagram.com/_tradingduck/" target="_blank">Instagram</a>
      </p>
    </ContentBody>
  </ContentOverlay>
</template>
