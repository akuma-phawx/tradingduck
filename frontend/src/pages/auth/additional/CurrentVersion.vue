<script setup lang="ts">
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
</script>
<template>
  <ContentOverlay>
    <ContentHeader :color="'instagram-gradient'" :icon="'mdi-alpha-v'" :title="'Platform Version'" :subtitle="'Beta Release (v.0.2.0)'" />
    <ContentBody>
      <h4>Welcome to the official beta release of TradingDuck! 🚀</h4>
      <h6>Version 0.2.0 includes:</h6>
      <p>
        <ul>
          <li><span class="text-warning font-weight-bold">[IMPROVEMENT]:</span> Loading indicator in streams page.</li>
          <li><span class="text-info font-weight-bold">[FIX]:</span> Update tradebox after usercard creation.</li>
          <li><span class="text-warning font-weight-bold">[IMPROVEMENT]:</span> Loading indicator in shops page now is properly displayed.</li>
          <li><span class="text-warning font-weight-bold">[IMPROVEMENT]:</span> Loading indicator in traders section of card details.</li>
        </ul>
      </p>
      <p>
        This beta release is just the beginning of an incredible journey, and we can't wait to see how you'll shape the future of TradingDuck. Thank
        you for being part of this exciting milestone!
      </p>
    </ContentBody>
  </ContentOverlay>
</template>
