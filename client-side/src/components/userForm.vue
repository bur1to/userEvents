<template>
  <form @submit.prevent>
    <h4>Create user</h4>
    <input v-model="user.firstName" @input="firstName = $event.target.value" class="input" type="text"
      placeholder="First name">
    <input v-model="user.lastName" @input="lastName = $event.target.value" class="input" type="text"
      placeholder="Second name">
    <input v-model="user.email" @input="email = $event.target.value" class="input" type="email"
      placeholder="example@example.com">
    <input v-model="user.phoneNumber" @input="phoneNumber = $event.target.value" class="input" type="text"
      placeholder="+(38) 111 111 1111">
    <my-button @click="createUser">Create user</my-button>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      }
    }
  },
  methods: {
    async createUser() {
      await axios.post('http://localhost:3000/users', this.user )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      this.$emit('create', this.user);
      this.user = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      };
    }
  }
}
</script>

<style>
form {
  display: flex;
  flex-direction: column;
}

.input {
  width: 300px;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>
