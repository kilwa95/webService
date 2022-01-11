<template>
  <div class="main">
    <div class="inner-block full-width">
      <h1>Create Category</h1>
      <TPTodoList />
      <!-- <TPTodoListBackend />
      <todo-list-container>
        <TodoListDI />
      </todo-list-container> -->
    </div>
  </div>
</template>


<script>
// import TodoListContainer from "./TodoList/DependencyInjection/TpTodoListContainer.vue";
// import TodoListDI from "./TodoList/DependencyInjection/TpTodoList.vue";
import TPTodoList from "./TodoList/TPTodoList.vue";
// import TPTodoListBackend from "./TodoList/TPTodoListBackend.vue";

export default {
  data() {
    return {};
  },

  components: {
    // TodoListContainer,
    // TodoListDI,
    TPTodoList,
    // TPTodoListBackend,
  },
};
</script>