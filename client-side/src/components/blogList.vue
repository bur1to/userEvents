<template>
    <div class="blog" v-for="blog in blogs" :key="blog._id">
        <div class="title"><strong>Title: </strong>{{ blog.title }}</div>
        <div class="themes"><strong>Themes: </strong>{{ blog.themes }}</div>
        <div class="content"><strong>Content: </strong>{{ blog.content }}</div>
        <div class="date"><strong>Date: </strong>{{ blog.date }}</div>
        <div class="read">
            <RouterLink :to="'/blog/' + blog._id" class="link">Read</RouterLink>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            blogs: [],
            page: 1,
            limit: 5,
            sort: 'title',
            sortBy: 'asc',
            totalPages: 0
        }
    },
    methods: {
        async getBlogs(params) {
            const { data } = await axios.get('http://localhost:3000/blogs', { params });
            this.blogs = data.blogs;
            this.totalPages = Math.ceil(data.count / this.limit);
        }
    },
    mounted() {
        this.getBlogs();
    }
}
</script>

<style>
.blog {
    border-radius: 15px;
    margin-top: 30px;
    margin-left: 335px;
    width: 900px;
    padding: 10px;
    padding-top: 15px;
    background: rgba(0, 0, 0, 0.3);
    color: white;
}

.title, .themes, .content {
    padding-bottom: 15px;
}

.title, .themes, .content, .date {
    font-size: 20px;
}

.read {
    display: flex;
    justify-content: flex-end;
}

.link {
    border-radius: 10px;
    padding: 3px 15px 3px 15px;
    border: 2px solid white;
    background: none;
    font-size: 20px;
}

.link:visited {
    color: white;
}

.link:hover {
    background: white;
    color: black;
}

</style>
