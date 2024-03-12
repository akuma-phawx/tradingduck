<script setup lang="ts">
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
</script>

<template>
  <ContentOverlay>
    <ContentHeader
      :color="'instagram-gradient-sunset'"
      :icon="'mdi-shield-alert-outline'"
      :title="'Safety Measures'"
      :subtitle="'Suggestions and tips for safe trading'"
    ></ContentHeader>
    <ContentBody>
      <p>
        At TradingDuck, we prioritize your safety and peace of mind above everything else. We understand that trading online, especially items of
        value such as Pokémon cards, can sometimes be a risky endeavor. Therefore, we are committed to providing a safe and secure trading environment
        by implementing stringent safety measures and offering important safety advice to our users. However, please understand that the final
        responsibility for safe trading rests with you, our valuable users.
      </p>
      <span class="font-weight-bold">Promoting Face-to-Face Trading</span>
      <p>
        While online trading is convenient, we highly encourage and promote face-to-face trading (when possible) in safe, public spots such as
        reputable shops or malls. Meeting in person adds an extra layer of trust and security to your trading experience.
      </p>
      <span class="font-weight-bold">Secure Communication and Payment Methods</span>
      <p>
        TradingDuck ensures that all communication between traders happens within the confines of our secure messaging system, protecting your
        personal information from third-party misuse. We also offer secure payment methods to ensure that all transactions are protected.
      </p>
      <span class="font-weight-bold">Verification System </span>
      <p>
        Our user verification system is designed to create a network of trusted traders. We encourage users to complete our verification process,
        which helps increase your credibility among other traders on the platform.
      </p>
      <span class="font-weight-bold">Privacy Controls </span>
      <p>
        We provide privacy controls so you can choose what information to share on your profile. Please avoid sharing sensitive information like your
        physical address or payment details directly with other traders.
      </p>
      <span class="font-weight-bold">Regular Updates and Patches </span>
      <p>
        We regularly update TradingDuck and implement patches to address potential security vulnerabilities, ensuring a smooth and secure user
        experience.
      </p>
      <span class="font-weight-bold">Tips for Safe Trading </span>
      <p>Despite our best efforts to create a secure environment, we recommend our users to take some additional steps to ensure safe trading:</p>
      <div>
        <ol class="font-weight-light">
          <li>
            <span class="font-weight-bold">Educate Yourself:</span> Use our
            <router-link class="link-primary" to="/app/authenticity-guide">'Card Authenticity Guide'</router-link> and
            <router-link class="link-primary" to="/app/trade-tips">'Trade Tips'</router-link> resources to understand how to identify authentic cards,
            negotiate trades, and avoid potential scams.
          </li>
          <li>
            <span class="font-weight-bold">Check User Profiles:</span> Before engaging in a trade, check the user's profile, trading history, and
            reviews from other traders.
          </li>
          <li>
            <span class="font-weight-bold">Secure Transaction:</span> Use secure payment methods and avoid unconventional transaction methods. Do not
            send cards until the payment is received and confirmed.
          </li>
          <li>
            <span class="font-weight-bold">Clear Communication:</span> Clearly communicate your expectations about the condition, price, and delivery
            method for the cards to avoid potential disputes.
          </li>
          <li>
            <span class="font-weight-bold">Report Suspicious Activities:</span> If you notice any suspicious activity or have a negative trading
            experience, please report it to our support team.
          </li>
        </ol>
      </div>
      <p class="mt-3">
        Remember, a safe trading experience is a successful one. We encourage all users to be vigilant and proactive in ensuring their own safety
        while trading. Thank you for your trust in TradingDuck, and happy trading!
      </p>
    </ContentBody>
  </ContentOverlay>
</template>
