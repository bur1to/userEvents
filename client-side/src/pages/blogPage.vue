<template>
    <div class="blog2">
        <div class="title2"><strong>{{ blog.title }}</strong></div>
        <div><strong>Themes: </strong>{{ blog.themes }}</div>
        <div class="content2">{{ blog.content }}</div>
        <div><strong>Date: </strong>{{ blog.date }}</div>
        <div><strong>Author: </strong>{{ `${user.firstName} ${user.lastName}` }}</div>
    </div>
    <div class="comment">
        <button class="com" @click="showDialog">Add comment</button>
    </div>
    <my-dialog v-model:show="dialogVisible">
        <commentForm @create="createComment" />
    </my-dialog>
    <div class="comments">
        <commentList />
    </div>
</template>

<script>
import axios from 'axios';
import commentForm from '@/components/commentForm';
import commentList from '@/components/commentList';

export default {
    components: {
        commentForm,
        commentList
    },
    data() {
        return {
            blog: [],
            user: [],
            comments: [],
            dialogVisible: false
        }
    },
    methods: {
        async getBlog() {
            try {
                const { data } = await axios.get(`http://localhost:3000/blogs/${localStorage.getItem('blogId')}`);
                this.blog = data;

                this.blog.date = new Date(this.blog.date).toLocaleDateString('uk-UA');

                const user = await axios.get(`http://localhost:3000/users/${data.userId}`);
                this.user = user.data;
            } catch (err) {
                console.log(err);
            }
        },
        showDialog() {
            this.dialogVisible = true;
        },
        createComment(comment) {
            this.comments.push(comment);
            this.dialogVisible = false;
        }
    }, 
    watch: {
        comments(newValue) {
            this.comments = newValue;
        }
    },
    mounted() {
        this.getBlog();
    }
}
</script>

<style>
.title2 {
    text-align: center;
    padding-bottom: 10px;
}

.blog2 {
    margin-top: 20px;
    font-size: 22px;
    padding: 20px;
    background: rgba(0, 0, 0, 0.3);
    color: white;
    border-radius: 20px;
    border: 2px solid white;
}

.comment {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
}

.com {
    background: none;
    color: white;
    border: 2px solid white;
    border-radius: 15px;
    padding: 3px 11px 3px 11px;
    font-size: 20px;
    margin-bottom: 15px;
}

.com:hover {
    background: white;
    color: black;
}

.content2 {
    padding-top: 20px;
    padding-bottom: 15px;
}

.comments {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    border: 2px solid white;
}

.date2 {
    text-align: right;
}
</style>
