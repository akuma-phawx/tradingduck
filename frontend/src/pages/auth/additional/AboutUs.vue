<script setup lang="ts">
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
</script>
<template>
  <ContentOverlay>
    <ContentHeader :color="'instagram-gradient-lavender'" :icon="'mdi-account-group'" :title="'Who Are We ?'" />
    <ContentBody>
      <p>
        Welcome to TradingDuck, the brainchild of two passionate Pokemon enthusiasts - Christoforos and Martin. We're both 28 years old, hailing from
        different corners of Europe, with a shared love for the world of Pokemon. Christoforos's heart belongs to Psyduck, while Martin's favorite
        Pokemon is the enigmatic Gengar. With our diverse backgrounds and a common bond over Pokemon, we set out on a mission to create a platform
        that would bring Pokemon card collectors from around the world together.
      </p>
      <p>
        Welcome to TradingDuck, the brainchild of two passionate Pokemon enthusiasts - Christoforos and Martin. We're both 28 years old, hailing from
        different corners of Europe, with a shared love for the world of Pokemon. Christoforos's heart belongs to Psyduck, while Martin's favorite
        Pokemon is the enigmatic Gengar. With our diverse backgrounds and a common bond over Pokemon, we set out on a mission to create a platform
        that would bring Pokemon card collectors from around the world together. Christoforos, originally from Greece, and Martin, a proud German,
        first connected through their mutual passion for Pokemon. As friends, they often found themselves discussing strategies, trading cards, and
        reminiscing about their childhood adventures in the Pokemon universe. However, they also recognized the challenges that fellow collectors
        faced in connecting with like-minded individuals, especially across international borders.
      </p>
      <p>
        Driven by their desire to create a global community of Pokemon card collectors, Christoforos and Martin embarked on this project. They
        envisioned a platform where Pokemon enthusiasts, whether they are collectors, traders, or simply fans, could easily find and connect with
        others who share their passion. And so, this platform was born.
      </p>
      <p>
        TradingDuck is more than just a place to trade Pokemon cards; it's a hub for sharing stories, tips, and experiences. It's a vibrant community
        where people from different backgrounds and cultures unite under the common banner of Pokemon. Whether you're searching for that elusive card
        to complete your collection, looking for trading partners, or simply want to connect with fellow trainers, you've come to the right place.
      </p>
      <p>
        We're excited to have you join us on this Pokemon adventure. Together with Christoforos and Martin, you're not just part of a trading
        platform; you're part of a global Pokemon family. Welcome, and let the trading, collecting, and bonding begin!
      </p>
    </ContentBody>
  </ContentOverlay>
</template>
