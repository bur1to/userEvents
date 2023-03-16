<template>
  <div class="loginForm">
    <form @submit.prevent>
      <h4 class="h4">Log in</h4>
      <label>
        Email: <br />
      </label>
      <input class="input" v-model="user.email" type="text" placeholder="Your email address"> <br />
      <label>
        Password: <br />
      </label>
      <input class="input" v-model="user.password" type="password" placeholder="Your account password">
      <div class="btn_block">
        <button type="submit" @click="userLogin" class="btn2">Log in</button>
        <RouterLink :to="'/register'" class="register">No account?</RouterLink>
      </div>
    </form>
  </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async userLogin() {
      await axios.post('http://localhost:3000/auth/login', this.user)
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          router.push('/')
        })
        .catch((err) => console.log(err));

      this.$emit('login', this.user);
      this.user = {
        email: '',
        password: ''
      }
    }
  }
}
</script>

<style>
.loginForm {
  background: transparent;
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: center;
  justify-self: center;
  width: 400px;
  border-radius: 20px;
  margin-top: 120px;
  padding-bottom: 15px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  color: white;
}

.h4 {
  text-align: center;
}

.btn_block {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.btn2 {
  font-size: 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  padding: 3px 15px 3px 15px;
}

.register {
  text-align: center;
  padding-left: 10px;
  padding-top: 7.3px;
  font-size: 18px;
  color: white;
}

.register:visited {
  color: violet;
}

.register:hover {
  color: white;
}

.btn2:hover {
  border: 2px solid pink;
}

.input {
  width: 300px;
  border-radius: 15px;
  padding: 10px 15px;
  margin-top: 15px;
}

.input input {
  border: none;
}
</style>
