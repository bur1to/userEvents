<template>
    <div>
        <h3 class="h3">Events table:</h3>
        <div class="select">
            <strong>Sort by:</strong>
            <my-select v-model="sort" :options="selectedOptions" @click="sortedEvents" />
        </div>
        <table class="table">
            <thead>
                <th>Title</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
            </thead>
            <tbody>
                <tr v-for="event in events" :key="event._id">
                    <td>{{ event.title }}</td>
                    <td>{{ event.description }}</td>
                    <td>{{ event.startDate }}</td>
                    <td>{{ event.endDate }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="page__wrapper">
        <div v-for="pageNumber in totalPages" :key="pageNumber" class="page" :class="{
            'current-page': page === pageNumber
        }" @click="changePage(pageNumber)">{{ pageNumber }}</div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            events: [],
            page: 1,
            limit: 5,
            sort: 'title',
            sortBy: 'asc',
            totalPages: 0,
            selectedOptions: [
                { value: 'title', name: 'Title' },
                { value: 'description', name: 'Description' },
            ]
        }
    },
    methods: {
        async changePage(pageNumber) {
            this.page = pageNumber;
            this.getEvents({ page: pageNumber - 1 });
            this.sort = this.sort;
            this.getEvents({sort: this.sort});
        },
        async getEvents(params) {
            const { data } = await axios.get(`http://localhost:3000/events/${this.$route.params.id}`, { params });
            this.events = data;
            console.log(params)
            this.totalPages = Math.ceil(data.length / this.limit);
        },
    },
    mounted() {
        this.getEvents();
    }
}
</script>

<style>
.h3 {
    text-align: center;
}

.table {
    border-collapse: collapse;
    border: 2px solid teal;
    margin: auto;
}

thead {
    text-align: left;
}

th,
td {
    border: 2px solid teal;
    padding: 10px;
    min-width: 200px;
}

a {
    text-decoration: none;
}

a:visited {
    color: purple;
}

.route_style {
    color: teal;
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
    justify-content: center;
}

.page {
    border: 1px solid black;
    padding: 8px;
    margin-right: 10px;
}

.current-page {
    border: 2.5px solid teal;
}

.select {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
}
</style>
