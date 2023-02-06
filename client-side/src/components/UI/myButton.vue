<template>
 <button class="btn">
    <slot></slot>
 </button>
</template>

<script>
export default {
   name: 'my-button'
}
</script>

<style>
.btn {
   background: none;
   padding: 10px 15px;
   color: teal;
   border: 1px solid teal;
   margin-top: 20px;
   align-self: flex-start;
}
.btn:hover {
   background-color: teal;
   color: white;
}
</style>
