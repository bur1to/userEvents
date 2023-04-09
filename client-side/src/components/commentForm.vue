<template>
  <div>
    <form @submit.prevent>
      <label style="font-size: 20px;">
        Comment:
      </label><br />
      <textarea 
       v-model="comment.comment" 
       class="txt" type="text" 
       placeholder="Type your comment"
      >
    </textarea><br />
      <div>
        <button class="post" @click="createComment">Post</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      comment: {
        userId: localStorage.getItem('id'),
        blogId: localStorage.getItem('blogId'),
        comment: '',
        author: ''
      }
    }
  },
  methods: {
    async createComment() {
      try {
        await axios.post('http://localhost:3000/comments', this.comment);

        this.$emit('create', this.comment);
        this.comment = {
          userId: '',
          blogId: '',
          comment: '',
          author: ''
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getAuthor() {
      try {
        const { data } = await axios.get(`http://localhost:3000/users/${localStorage.getItem('id')}`);
        this.comment.author = `${data.firstName} ${data.lastName}`;
      } catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    this.getAuthor();
  }
}

</script>

<style>
.txt {
  margin-top: 10px;
  width: 500px;
  height: 150px;
  border-radius: 5px;
  padding: 5px;
}

.post {
  background: none;
  border: 2px solid white;
  border-radius: 15px;
  color: white;
  font-size: 20px;
  padding: 3px 11px 3px 11px;
  margin-top: 10px;
}

.post:hover {
  background: white;
  color: black;
}
</style>
