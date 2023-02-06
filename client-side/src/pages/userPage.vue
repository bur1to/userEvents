<template>
    <div class="user">
        <div>
            <h3>{{ `${user.firstName} ${user.lastName}` }}</h3>
        </div>
        <div><strong>Email: </strong>{{ user.email }}</div>
        <div><strong>Phone Number: </strong>{{ user.phoneNumber }}</div>
        <my-button @click="showDialog">Create event</my-button>
        <my-dialog v-model:show="dialogVisible">
            <event-form @create="createEvent" />
        </my-dialog>
    </div>
    <div>
        <eventList :events="events" />
    </div>
</template>

<script>
import axios from 'axios';
import eventList from '@/components/eventList.vue';
import eventForm from '@/components/eventForm.vue';

export default {
    components: {
        eventList,
        eventForm
    },
    data() {
        return {
            user: [],
            events: [],
            dialogVisible: false
        }
    },
    methods: {
        async getUser() {
            const { data } = await axios.get(`http://localhost:3000/users/${this.$route.params.id}`);
            this.user = data;
        },
        showDialog() {
            this.dialogVisible = true;
        },
        createEvent(event) {
            this.events.push(event);
            this.dialogVisible = false;
        }
    },
    mounted() {
        this.getUser();
    }
}
</script>

<style>
.user {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
}
</style>
