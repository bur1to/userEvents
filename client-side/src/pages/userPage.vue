<template>
    <div class="user">
        <router-link :to="'/update/' + this.$route.params.id " class="updateData">Update data</router-link>
        <div>
            <h2>{{ `${user.firstName} ${user.lastName}` }}</h2>
        </div>
        <div style="font-size: 20px;"><strong>Email: </strong>{{ user.email }}</div>
        <div style="font-size: 20px;"><strong>Phone Number: </strong>{{ user.phoneNumber }}</div>
        <div class="btn_block4">
            <button class="btn6">My events</button>
            <button class="btn7">My blogs</button>
        </div>
        <eventList :events="events" />
        <!-- <my-button @click="showDialog">Create event</my-button>
        <my-dialog v-model:show="dialogVisible">
            <event-form @create="createEvent" />
        </my-dialog> -->
        <!-- <my-button @click="showDialog" class="btn__update">Edit</my-button>
        <my-dialog v-model:show="dialogVisible">
            <updateUserForm @click="updateUser"/>
        </my-dialog> -->
    </div>
</template>

<script>
import axios from 'axios';
import eventList from '@/components/eventList.vue';
import eventForm from '@/components/eventForm.vue';
import updateUserForm from '@/components/updateUserForm.vue';
import blogForm from '@/components/blogFrom.vue';

export default {
    components: {
        eventList,
        eventForm,
        updateUserForm,
        blogForm
    },
    data() {
        return {
            user: [],
            events: [],
            vlogs: [],
            dialogVisible: false
        }
    },
    methods: {
        async getUser() {
            const { data } = await axios.get(`http://localhost:3000/users/${this.$route.params.id}`);
            console.log(data);
            this.user = data;
        },
        showDialog() {
            this.dialogVisible = true;
        },
        createEvent(event) {
            this.events.push(event);
            this.dialogVisible = false;
        },
        createVlog(vlog) {
            this.vlogs.push(vlog);
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
    margin-left: 15px;
    margin-right: 15px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    height: 630px;
    color: white;
}

.btn_block4 {
    margin-top: 20px;
}

.btn6 {
    margin-right: 15px;
    font-size: 20px;
    border-radius: 15px;
    padding: 3px 12px 3px 12px;
}

.btn7 {
    font-size: 20px;
    border-radius: 15px;
    padding: 3px 12px 3px 12px;
}

.updateData {
    padding-left: 15px;
    color:black;
    font-size: 20px;
}

.updateData:visited {
    color: white;
}

.updateData:hover {
    color: purple;
}
</style>
