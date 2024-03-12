<script setup lang="ts"></script>
<template>
  <div class="container mt-5">
    <h1 class="mb-4">TradingDuck Terms and Conditions</h1>

    <h2>1. Acceptance of Terms</h2>
    <p tabindex="0">
      Welcome to TradingDuck! By accessing or using TradingDuck, you agree to abide by these Terms and Conditions. If you do not agree to these terms,
      please refrain from using our services.
    </p>

    <h2>2. User Responsibilities</h2>
    <p tabindex="0">
      2.1. TradingDuck provides a platform for users to arrange card trades, primarily Pokémon cards. While we facilitate connections between users,
      we do not take responsibility for the outcome of these trades.
    </p>
    <p tabindex="0">
      2.2. Users are solely responsible for sharing their address or personal information with other users. TradingDuck does not assume any
      responsibility for the consequences of such sharing.
    </p>

    <h2>3. Privacy and Cookies</h2>
    <p tabindex="0">
      3.1. We value your privacy. Please refer to our
      <RouterLink to="/privacy-policy" class="link-info" target="_blank" :text="'Privacy Policy'" />for details on how we collect, use, and protect
      your data.
    </p>
    <p>
      3.2. TradingDuck uses cookies to enhance your experience. By using TradingDuck, you consent to the use of cookies as described in our
      <RouterLink to="/cookie-policy" class="link-info" target="_blank" :text="'Cookie Policy'" />.
    </p>

    <h2>4. Limitation of Liability</h2>
    <p tabindex="0">4.1. TradingDuck shall not be liable for any disputes, losses, or damages arising from trades conducted on TradingDuck.</p>
    <p tabindex="0">4.2. We do not guarantee the quality, authenticity, or legality of items traded on TradingDuck.</p>

    <h2>5. Purpose</h2>
    <p tabindex="0">
      5.1. TradingDuck exists to bring people together through our trading platform. Our primary goal is to facilitate connections and foster a sense
      of community among trading enthusiasts.
    </p>

    <h2>6. Modifications</h2>
    <p tabindex="0">
      6.1. TradingDuck reserves the right to modify or update these Terms and Conditions at any time. Users will be notified of changes via our
      platform. Continued use of our services after such changes constitutes acceptance of the updated terms.
    </p>

    <h2>7. Contact Us</h2>
    <p tabindex="0">If you have any questions or concerns about these Terms and Conditions, please contact us.</p>
    <h2>8. Dispute Resolution</h2>
    <p tabindex="0">
      8.1. In the event of a dispute between users arising from trades conducted on TradingDuck, it is the responsibility of the involved parties to
      resolve the matter amicably. TradingDuck acts solely as a facilitator for trade connections and does not participate in or mediate disputes
      between users.
    </p>
    <p tabindex="0">
      8.2. Users are encouraged to communicate directly with each other to address and resolve any disagreements or issues related to their trades.
      TradingDuck does not assume any responsibility for the resolution of disputes and is not liable for any losses or damages incurred during the
      dispute resolution process.
    </p>
    <v-divider />
    <p tabindex="0">
      <strong>Disclaimer:</strong> Pokémon Content is used in TradingDuck. More about Pokémon copyright
      <RouterLink to="/pokemon-copyright" class="link-info" target="_blank" :text="'here'" />.
    </p>
    <p><em>This Terms and Conditions were last updated on 11 November 2023.</em></p>
  </div>
</template>
<style scoped>
p {
  color: rgb(70, 66, 66);
}
</style>
