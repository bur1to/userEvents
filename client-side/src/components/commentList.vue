<template>
  <div style="color: white; font-size: 22px; padding-left: 15px; padding-top: 10px; padding-bottom: 5px;"> {{ comments.length }} Comments</div>
  <div class="commentList" v-for="comment in comments" :key="comment._id">
    <div style="margin-bottom: 5px;">{{ comment.author }}</div>
    <div>{{ comment.comment }}</div>
    <div>
      <button class="rep" @click="showDialog">Reply</button>
      <button class="edt" v-if="btnVisible === true" @click="updateComment(comment._id)">Edit</button>
      <button class="del" v-if="btnVisible === true" @click="deleteComment(comment._id)">Delete</button>
    </div>
    <div>
      <my-dialog v-model:show="dialogVisible">
        <commentForm @create="replyToComment" />
      </my-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import commentForm from '@/components/commentForm';

export default {
  components: {
    commentForm
  },
  data() {
    return {
      comments: [],
      comment: [],
      btnVisible: false,
      dialogVisible: false
    }
  },
  methods: {
    async getBlogComments() {
      try {
        const { data } = await axios.get(`http://localhost:3000/comments/${localStorage.getItem('blogId')}`);
        this.comments = data;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteComment(id) {
      try {
        await axios.delete(`http://localhost:3000/comments/${id}`);
      } catch (err) {
        console.log(err);
      }
    },
    async updateComment(id) {
      try {
        await axios.put(`http://localhost:3000/comments/${id}`);
      } catch (err) {
        console.timeLog(err);
      }
    },
    replyToComment(comment) {
      this.comment.push(comment);
      this.dialogVisible = false;
    },
    showDialog() {
      this.dialogVisible = true;
    }
  },
  mounted() {
    this.getBlogComments();
  }
}
</script>

<style>
.commentList {
  color: white;
  font-size: 20px;
  border-radius: 15px;
  padding: 15px;
}

.rep,
.edt,
.del {
  margin-top: 5px;
  background: none;
  border-radius: 15px;
  border: 2px solid white;
  color: white;
  padding: 3px 11px 3px 11px;
  font-size: 15px;
}

.edt,
.del {
  margin-left: 15px;
}

.rep:hover,
.edt:hover,
.del:hover {
  color: black;
  background: white;
}
</style>
