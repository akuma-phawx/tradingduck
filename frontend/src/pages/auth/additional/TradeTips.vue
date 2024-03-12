<script setup lang="ts">
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
</script>
<template>
  <ContentOverlay>
    <ContentHeader
      :color="'instagram-gradient-sunset'"
      :icon="'mdi-lightbulb-on-10'"
      :title="'Trade Tips'"
      :subtitle="'Tips and suggestions while trading with others'"
    />
    <ContentBody>
      <p>
        Welcome to TradingDuck, the home of Pokémon card enthusiasts! Here, we facilitate trades between collectors from all over the world. Whether
        you're a seasoned trader or just beginning your journey, our trade tips will help you make the most of your trading experience.
      </p>
      <span class="font-weight-bold">Understand the Value</span>
      <p>
        Before starting a trade, it's important to understand the value of the card(s) you're trading and the ones you're receiving. Check the latest
        market prices, rarity, condition, and demand for the cards. TradingDuck provides tools to help you evaluate card values, but doing your
        research will ensure a fair trade.
      </p>
      <span class="font-weight-bold">Be Clear and Honest</span>
      <p>
        Our user verification system is designed to create a network of trusted traders. We encourage users to complete our verification process,
        which helps increase your credibility among other traders on the platform.
      </p>
      <span class="font-weight-bold">Negotiate Politely</span>
      <p>
        Negotiation is part of the trading process, but remember to always be respectful and polite. It's okay to walk away from a trade if you're not
        comfortable with the terms.
      </p>
      <span class="font-weight-bold">Keep Records</span>
      <p>
        Document your trades. This includes screenshots of conversations, receipts, tracking numbers, and photos of the card(s) before shipping. These
        records can be invaluable in case of disputes.
      </p>
      <span class="font-weight-bold">Safety First</span>
      <p>
        While we strive to ensure a safe trading environment, it's important to protect yourself too. Never share sensitive personal information with
        other users. If something seems suspicious, trust your instincts and contact our support team.
      </p>
      <span class="font-weight-bold">Build Your Reputation</span>
      <p>
        A good reputation goes a long way in the trading community. Be prompt in your communication, fair in your trades, and courteous with other
        traders. Leaving honest reviews (<b>feature not yet implemented</b>) after each trade will also contribute to your reputation.
      </p>
    </ContentBody>
  </ContentOverlay>
</template>
