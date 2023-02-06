<template>
  <div>
    <h3 class="h3">Users table:</h3>
    <div class="select">
      <strong>Sort:</strong>
      <my-select v-model="sort" :options="selectedOptions"/>
    </div>
    <table class="table">
      <thead>
        <th>Username</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Event Count</th>
        <th>Next Event Date</th>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>
            <RouterLink :to="'/users/' + user._id" class="route_style">
              <a>
                {{ `${user.firstName} ${user.lastName}` }}
              </a>
            </RouterLink>
          </td>
          <td>{{ user.email }}</td>
          <td>{{ user.phoneNumber }}</td>
          <td>{{ user.eventsCount }}</td>
          <td v-if="user.nextEvent">{{ user.nextEvent.startDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="page__wrapper">
    <div v-for="pageNumber in totalPages" :key="pageNumber" class="page" :class="{
      'current-page': page === pageNumber
    }" @click="changePage(pageNumber, sorted)">{{ pageNumber }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      page: 1,
      limit: 5,
      sort: 'firstName',
      sortBy: 'asc',
      totalPages: 0,
      selectedOptions: [
        { value: 'firstName', name: 'first name' },
        { value: 'lastName', name: 'last name' },
        { value: 'email', name: 'email' },
      ]
    }
  },
  methods: {
    async changePage(pageNumber) {
      this.page = pageNumber;
      this.getUsers({ page: pageNumber - 1 });
      this.sort = this.sort;
      this.getUsers({ sort: this.sort });
    },
    async getUsers(params) {
      const { data } = await axios.get('http://localhost:3000/users', { params });
      console.log(params);
      this.users = data.users;
      this.totalPages = Math.ceil(data.count / this.limit);
    }
  },
  mounted() {
    this.getUsers();
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
