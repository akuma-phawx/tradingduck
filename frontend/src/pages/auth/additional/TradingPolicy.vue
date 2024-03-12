<script setup lang="ts">
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
</script>
<template>
  <ContentOverlay>
    <ContentHeader
      :color="'instagram-gradient-sunset'"
      :icon="'mdi-security'"
      :title="'Trading Policy & Guidelines'"
      :subtitle="'Privacy and trading policy of platform'"
    />
    <ContentBody>
      <p>
        Welcome to TradingDuck, the ultimate platform for Pokémon card enthusiasts, collectors, and traders. At TradingDuck, we are committed to
        fostering a vibrant community where card aficionados can come together to exchange cherished items and share their passion.
      </p>
      <p>
        While we take pride in providing a robust platform, we'd like to emphasize that TradingDuck primarily acts as a connecting hub for traders. We
        do not directly participate in the actual card transactions. As such, the responsibility for verifying card authenticity, condition, and
        secure delivery rests entirely with the trading parties involved.
      </p>
      <p>
        We acknowledge that online trading can present certain challenges and risks. To ensure your trading experiences are safe and successful, we
        offer an array of invaluable resources. We highly recommend that you familiarize yourself with our 'Safety Measures', 'Trade Tips', and 'Card
        Authenticity Guide' pages before embarking on any transactions. These resources are carefully crafted to help you discern genuine cards,
        thwart potential scams, and ensure a seamless trading process.
      </p>
      <p>
        In the interest of enhancing security and reliability, we strongly encourage traders to consider in-person trades in safe, public spaces such
        as reputable shops or malls. Face-to-face interactions can provide an added layer of trust and reassurance for both parties involved.
      </p>
      <p>
        In the event of a dispute between traders, we encourage open and respectful communication to resolve the issue. If the problem persists, you
        can contact our support team for assistance. However, please understand that while we are happy to provide guidance, the final resolution of
        the dispute lies solely with the trading parties.
      </p>
      <p>By using TradingDuck, users agree to the following:</p>
      <div>
        <ol class="font-weight-light">
          <li class="font-weight-bold">
            You acknowledge that TradingDuck is not involved in the actual transaction between traders and cannot guarantee the authenticity,
            condition, or delivery of traded items.
          </li>
          <li class="font-weight-bold">
            You agree to conduct your due diligence in verifying the authenticity and condition of the cards and the credibility of the other trader.
          </li>
          <li class="font-weight-bold">
            You agree to not hold TradingDuck liable for any disputes, damages, or loss incurred as a result of a trade.
            <span class="font-italic">
              It is essential to understand that users are fully responsible for their trading decisions and actions. TradingDuck assumes no
              responsibility for the consequences of these decisions.
            </span>
          </li>
          <li class="font-weight-bold">
            TradingDuck reserves the right to suspend or ban users who engage in behaviors including, but not limited to:
            <ul>
              <li>Fraudulent activities.</li>
              <li>Violation of TradingDuck guidelines.</li>
              <li>Repeated failure to resolve disputes in a respectful manner.</li>
            </ul>
          </li>
        </ol>
      </div>

      <p>Thank you for choosing TradingDuck. Let's embark on a fun, safe, and fulfilling trading journey together.</p></ContentBody
    >
  </ContentOverlay>
</template>
