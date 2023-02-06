<template>
    <form @submit.prevent>
        <h4>Create event</h4>
        <input v-model="event.title" @input="title = $event.target.value" class="input" type="text"
            placeholder="My event">
        <input v-model="event.description" @input="description = $event.target.value" class="input" type="text"
            placeholder="My plans on this event">
        <input v-model="event.startDate" @input="startDate = $event.target.value" class="input" type="date">
        <input v-model="event.endDate" @input="endDate = $event.target.value" class="input" type="date">
        <my-button @click="createEvent">Create event</my-button>
    </form>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            event: {
                userId: this.$route.params.id,
                title: '',
                description: '',
                startDate: '',
                endDate: ''
            }
        }
    },
    methods: {
        async createEvent() {
            await axios.post('http://localhost:3000/events', this.event)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));

            this.$emit('create', this.event);
            this.$event = {
                userId: '',
                title: '',
                description: '',
                startDate: '',
                endDate: ''
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
