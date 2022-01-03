<template>
  <div>
    <div @click="open = !open" class="title">{{ title }}</div>
    <div v-show="open" class="body">
      <form id="search">
        Search <input name="query" v-model="searchQuery" />
      </form>
      <GridTable
        :products="products"
        :columns="columns"
        :filter-key="searchQuery"
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
    products: Array,
    columns: Array,
    filterKey: String,
    title: String,
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