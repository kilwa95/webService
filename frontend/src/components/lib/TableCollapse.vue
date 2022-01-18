<template>
  <div>
    <div @click="open = !open" class="title">
      <h3 v-if="category">{{ category.name }}</h3>
      <h3 v-else>My Products</h3>
    </div>
    <div v-show="open" class="body">
      <form id="search">
        Search <input name="query" v-model="searchQuery" />
      </form>
      <GridTable
        :products="products"
        :columns="columns"
        :filter-key="searchQuery"
        :add="add"
        :remove="remove"
      />
    </div>
  </div>
</template>

<script>
import GridTable from "./GridTable.vue";

export default {
  components: {
    GridTable,
  },
  props: {
    remove: Boolean,
    add: Boolean,
    products: Array,
    columns: Array,
    filterKey: String,
    category: Object,
    description: String,
    defaultBehavior: {
      type: String,
      default: "closed",
      validator: (val) => ["opened", "closed"].includes(val),
    },
  },
  data: function () {
    return {
      searchQuery: "",
      open: this.defaultBehavior === "opened",
    };
  },
};
</script>