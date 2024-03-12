<script setup lang="ts">
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';
</script>
<template>
  <ContentOverlay>
    <ContentHeader
      :color="'instagram-gradient'"
      :icon="'mdi-help-box-outline'"
      :title="'TradingDuck 101'"
      :subtitle="'Platform - How-To-Use guide'"
    />
    <ContentBody>
      <div class="text-dark">Welcome to TradingDuck - Your Ultimate Trading Platform</div>
      <div class="text-body-1 mt-4">
        TradingDuck is your one-stop destination for Pokemon trading cards. Whether you're a seasoned collector or just starting, we've got you
        covered. Here's what you can do on TradingDuck:
      </div>
      <div class="mt-4">
        <ol>
          <li>
            <div class="text-body-1">
              <RouterLink to="/app/tradebox" class="link-info">Create Tradeboxes</RouterLink>: Easily organize your collection by creating tradeboxes.
              Add your cards to these boxes to make them available for trade. It's a breeze to manage your inventory and showcase your cards to the
              trading community.
            </div>
          </li>
          <li>
            <div class="text-body-1">
              <RouterLink to="/app/wishlist" class="link-info">Wishlist Management</RouterLink>:Looking for that rare card to complete your
              collection? Use our Wishlist feature to keep track of the cards you're hunting for and for letting people know which card you want,
              making trading even more convenient.
            </div>
          </li>
          <li>
            <div class="text-body-1">
              <RouterLink to="/app/events" class="link-info">Discover Events</RouterLink>:Dive into the world of trading conferences, where collectors
              like you come together to share knowledge, insights, and their passion for trading cards. You can browse through upcoming conferences
              and indicate your attendance to let others know you'll be there. It's a great way to meet like-minded individuals and expand your
              trading network. <br />Stay ahead of the curve with information about upcoming Pokémon card set releases. While you can't physically
              attend a card release, you can be among the first to know about the newest sets hitting the market. Get a sneak peek at what's coming
              and plan your trading strategy accordingly.
            </div>
          </li>
          <li>
            <div class="text-body-1">
              <span class="text-dark font-weight-bold">Trade Requests</span>: Ready to make a trade? TradingDuck allows you to send and receive trade
              requests easily. Communicate with other users, negotiate terms, and complete your trades—all in one place. You can choose to either meet
              up for an in-person trade or trade via mail. Please note that while we provide a secure platform for trading,<u>
                the responsibility and risk associated with the trade, including potential losses, lie with the users involved.</u
              >
              We're here to facilitate your trades, but your trading decisions are entirely your own. Happy trading!
            </div>
          </li>
        </ol>
      </div>
    </ContentBody>
  </ContentOverlay>
</template>
