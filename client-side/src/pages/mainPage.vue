<template>
    <div>
        <h2 class="pageName">Blogs</h2>
        <blog-list />
    </div>
</template>

<script>
import blogList from '@/components/blogList';

export default {
    components: {
        blogList
    }
}
</script>

<style>
  .pageName {
    text-align: center;
    color: white;
  }
</style>
