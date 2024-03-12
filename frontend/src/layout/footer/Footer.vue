<script setup lang="ts"></script>
<template>
  <footer class="footer py-4">
    <div class="container-fluid">
      <div class="row">
        <div class="d-flex flex-column flex-lg-row">
          <div class="copyright text-center text-sm text-muted text-lg-start">
            © <span class="font-weight-bold">TradingDuck Team</span> -
            <RouterLink class="metal-black mx-2 font-weight-bold" to="/app/version" :text="'v.0.2.0'" />
          </div>
          <div class="text-center text-sm text-muted text-lg-start">
            <RouterLink class="metal-black mx-2" to="/app/about-us" :text="'About Us'" />
            <RouterLink class="metal-black mx-2" to="/app/contact" :text="'Contact'" />
            <RouterLink class="metal-black mx-2" to="/privacy-policy" :text="'Privacy Policy'" target="_blank" />
            <RouterLink class="metal-black mx-2" to="/imprint" :text="'Imprint'" target="_blank" />
            <RouterLink class="metal-black mx-2" to="/tradingduck-tac" :text="'ToS'" target="_blank" />
            <a class="metal-black mx-2" href="https://www.instagram.com/_tradingduck/" target="_blank">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
