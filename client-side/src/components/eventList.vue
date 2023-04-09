<template>
    <div>
        <h3 class="h3">Events table:</h3>
        <div class="select">
            <strong>Sort by:</strong>
            <my-select v-model="sort" :options="selectedOptions" @click="sortedEvents" />
            <div><strong class="count">Number of events: </strong> {{ events.length }}</div>
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
                    <td>
                        <div style="display: flex; justify-content: center; padding-top: 10px;">
                            <button @click="deleteEvent(event._id)" class="btn__delete">Delete</button>
                        </div>
                    </td>
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
            this.getEvents({ sort: this.sort });
        },
        async getEvents(params) {
            const { data } = await axios.get(`http://localhost:3000/events/${localStorage.getItem('id')}`, { params });
            this.events = data;

            for (let i = 0; i < this.events.length; i++) {
                this.events[i].startDate = new Date(this.events[i].startDate).toLocaleDateString('uk-UA');
                this.events[i].endDate = new Date(this.events[i].endDate).toLocaleDateString('uk-UA');
            }

            this.totalPages = Math.ceil(data.length / this.limit);
        },
        async deleteEvent(id) {
            await axios.delete(`http://localhost:3000/events/${id}`)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        }
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
    border: 2px solid white;
    margin: auto;
    font-size: 20px;
}

thead {
    text-align: left;
}

th,
td {
    border: 2px solid white;
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
    color: white;
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
    padding-top: 10px;
    justify-content: center;
    color: white;
}

.page {
    border: 1px solid black;
    padding: 8px;
    margin-right: 10px;
}

.current-page {
    border: 2.5px solid white;
}

.btn__delete {
    margin-bottom: 10px;
    color: white;
    font-size: 20px;
    border-radius: 15px;
    background: none;
    padding: 3px 12px 3px 12px;
    border: 2px solid white;
}

.btn__delete:hover {
    background: white;
    color: black;
}

.select {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
}

.count {
    margin-left: 15px;
}
</style>
