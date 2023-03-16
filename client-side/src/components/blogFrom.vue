<template>
    <div class="blogForm">
        <div class="createForm">
            <form @submit.prevent>
                <h3 class="h4">Create blog</h3>
                <input class="input" v-model="vlog.title" type="text" placeholder="Blog title">
                <input class="input" v-model="vlog.themes" type="text" placeholder="Themes of your blog">
                <textarea class="textarea" v-model="vlog.content" placeholder="Blog content"></textarea>
                <input class="input" v-model="vlog.date" type="date">
                <div class="btn_block3">
                    <button class="btn5" @click="createBlog">Post</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            vlog: {
                userId: this.$route.params.id,
                title: '',
                themes: '',
                content: '',
                date: ''
            }
        }
    },
    methods: {
        async createBlog() {
            await axios.post('http://localhost:3000/blogs', this.vlog)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));

            this.$emit('create', this.vlog);
            this.vlog = {
                userId: '',
                title: '',
                themes: '',
                content: '',
                date: ''
            }
        }
    }
}
</script>

<style>

.h4 {
    color: white;
}

.blogForm {
    display: flex;
    justify-content: center;
}

.createForm {
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    width: 900px;
    margin-top: 40px;
    border-radius: 20px;
}

.input {
    width: 300px;
    border: 2px solid white;
    padding: 10px 15px;
    margin-top: 15px;
}

.btn_block3 {
    margin-top: 15px;
    margin-bottom: 20px;
}

.btn5 {
    font-size: 20px;
    padding: 3px 15px 3px 15px;
    border-radius: 15px;
    border: 2px solid blue;

}

.textarea {
    width: 600px;
    height: 200px;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
}
</style>
