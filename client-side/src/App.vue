<template>
  <div class="app">
    <navbar />
    <RouterView></RouterView>
  </div>
</template>

<script>
  import navbar from '@/components/navbar.vue';

  export default {
    components: {
      navbar
    }
  }
</script>

<style>
body {
  background: url('/img/wallpaper-.jpg')no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  overflow-y: hidden;
}
</style>