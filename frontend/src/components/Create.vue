<template>
  <div class="main">
    <div class="inner-block full-width">
      <h1>Create Category</h1>
      <TPTodoList />
    </div>
  </div>
</template>


<script>
import TPTodoList from "./TodoList/TPTodoList.vue";

export default {
  data() {
    return {};
  },

  components: {
    TPTodoList,
  },
};
</script>