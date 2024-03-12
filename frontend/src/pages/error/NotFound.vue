<script setup lang="ts"></script>
<template>
  <div class="page-layout">
    <div class="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
      <div class="mb-2">
        <h1>404</h1>
        <div class="">Page Not Found</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
h1 {
  margin: 0;
  font-size: 160px;
  color: rgba(225, 225, 225, 0.01);
  background-image: url('https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/03/wp2418475-psyduck-hd-wallpapers-(1).jpg');
  background-repeat: repeat;
  -webkit-background-clip: text;
  animation: animate 15s ease-in-out infinite;
  text-align: center;
  text-transform: uppercase;
  font-weight: 900;
}

@keyframes animate {
  0%,
  100% {
    background-position: left top;
  }
  25% {
    background-position: right bottom;
  }
  50% {
    background-position: left bottom;
  }
  75% {
    background-position: right top;
  }
}
</style>
