<template>
    <form @submit.prevent>
      <h4>Update user</h4>
      <input @click.stop v-model="user.firstName" class="input" type="text"
        placeholder="First name">
      <input @click.stop v-model="user.lastName" class="input" type="text"
        placeholder="Second name">
      <input @click.stop v-model="user.email" class="input" type="email"
        placeholder="example@example.com">
      <input @click.stop v-model="user.phoneNumber" class="input" type="text"
        placeholder="+(38) 111 111 1111">
       <input @click.stop v-model="user.phoneNumber" class="input" type="password"
        placeholder="Password">
      <my-button @click="updateUser(this.$route.params.id)">Update user</my-button>
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
          phoneNumber: '',
          password: ''
        }
      }
    },
    methods: {
      async updateUser(id) {
        await axios.put(`http://localhost:3000/users/${id}`, this.user )
          .then((res) => console.log(res))
          .catch((err) => console.log(err));

        this.user = {
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          password: ''
        }
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
  