<template>
    <div class="login">
        <loginFrom />
    </div>
</template>

<script>
    import loginFrom from '../components/loginForm.vue'
    export default {
        components: {
            loginFrom
        }
    }
</script>

<style>
  .login {
    display: flex;
    justify-content: center;
  }
</style>
