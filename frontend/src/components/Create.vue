<template>
  <div class="main">
    <div class="inner-block full-width">
      <h1>Create Category</h1>
      <section class="container py-3 py-lg-5">
        <div class="table-col-3">
          <TPTodoList />
        </div>
      </section>
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