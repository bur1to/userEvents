<template>
    <h3 style="text-align: center;">Your blogs:</h3>
    <div class="blog" v-for="blog in blogs" :key="blog._id">
        <div class="title"><strong>Title: </strong>{{ blog.title }}</div>
        <div class="themes"><strong>Themes: </strong>{{ blog.themes }}</div>
        <div class="content"><strong>Content: </strong>{{ blog.content }}</div>
        <div class="date"><strong>Date: </strong>{{ blog.date }}</div>
        <div class="read">
            <button class="btn15" @click="getBlog(blog._id)">Read</button>
            <button class="btn12" @click="deleteBlog(blog._id)">Delete</button>
            <button class="btn13" @click="editBlog(blog._id)" :blog="blogs">Edit</button>
        </div>
    </div>
    <div class="page__wrapper">
        <div v-for="pageNumber in totalPages" :key="pageNumber" class="page" :class="{
            'current-page': page === pageNumber
        }" @click="changePage(pageNumber)">{{ pageNumber }}</div>
    </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';

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

        // www.google.com
        changePage(pageNumber) {
            this.page = pageNumber;
            this.getUserBlogs({ page: pageNumber - 1 });
        },
        async getUserBlogs(params) {
            try {
                const { data } = await axios.get(`http://localhost:3000/blogs/usrBlogs/${localStorage.getItem('id')}`, { params });
                this.blogs = data.userBlogs;

                for (let i = 0; i < this.blogs.length; i++) {
                    this.blogs[i].date = new Date(this.blogs[i].date).toLocaleDateString('uk-UA');
                }

                this.totalPages = Math.ceil(data.count / this.limit);
            } catch (err) {
                console.log(err);
            }
        },
        async deleteBlog(id) {
            try {
                await axios.delete(`http://localhost:3000/blogs/${id}`);
            } catch (err) {
                console.log(err);
            }
        },
        async getBlog(id) {
            try {
                localStorage.setItem('blogId', id);
                router.push('/blog');
            } catch (err) {
                console.log(err);
            }
        },
        editBlog(id) {
            localStorage.setItem('blogId', id);
            router.push('/edit_blog');
        }
    },
    mounted() {
        this.getUserBlogs();
    }
}
</script>

<style>
.blog {
    border-radius: 15px;
    margin-top: 10px;
    margin-left: 335px;
    width: 900px;
    padding: 15px;
    padding-top: 15px;
    background: rgba(0, 0, 0, 0.3);
    color: white;
    border: 2px solid white;
}

.title,
.themes,
.content {
    padding-bottom: 15px;
}

.title,
.themes,
.content,
.date {
    font-size: 20px;
}

.read {
    display: flex;
    justify-content: flex-end;
}

.btn15 {
    border-radius: 15px;
    padding: 3px 11px 3px 11px;
    border: 2px solid white;
    color: white;
    background: none;
    font-size: 20px;
}

.btn15:hover {
    background: white;
    color: black;
}

.btn12,
.btn13 {
    margin-left: 15px;
    border: 2px solid white;
    border-radius: 15px;
    padding: 3px 11px 3px 11px;
    font-size: 20px;
    color: white;
    background: none;
}

.edit {
    color: white;
    font-size: 20px;
}

.edit:hover {
    color: black;
}

.edit:visited {
    color: white;
}

.btn12:hover,
.btn13:hover {
    background: white;
    color: black;
}
</style>
