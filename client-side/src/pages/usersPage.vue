<template>
  <div class="users">
    <h1>All users</h1>
    <user-list />
  </div>
</template>

<script>
import userList from '@/components/userList';

export default {
    components: {
        userList
    },
    data() {
        return {
            users: [],
            dialogVisible: false
        }
    },
    methods: {
        createUser(user) {
            this.users.push(user);
            this.dialogVisible = false;
        }
    }
}
</script>

<style>
.users {
    background: rgba(0, 0, 0, 0.5);
    height: 600px;
    padding: 20px;
    margin-top: 15px;
    color: white;
}
</style>
