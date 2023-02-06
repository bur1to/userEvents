<template>
    <div>
        <h1>Page with users</h1>
        <my-button @click="showDialog">Create user</my-button>
        <my-dialog v-model:show="dialogVisible">
            <user-form @create="createUser" />
        </my-dialog>
        <user-list :users="users" />
    </div>
</template>

<script>
import userList from '@/components/userList.vue';
import userForm from '@/components/userForm.vue';

export default {
    components: {
        userForm,
        userList
    },
    data() {
        return {
            users: [],
            dialogVisible: false,
        }
    },
    methods: {
        showDialog() {
            this.dialogVisible = true;
        },
        createUser(user) {
            this.users.push(user);
            this.dialogVisible = false;
        }
    }
}
</script>

<style>

</style>
