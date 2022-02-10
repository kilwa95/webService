<template>
  <div class="main">
    <div class="inner-block full-width">
      <div>
        <section class="container py-3 py-lg-5">
          <div class="table-col-3">
            <TableCollapse
              :products="gridData"
              :columns="gridColumns"
              :category="{ name: 'Products' } ? category : category"
              :add="add"
              :remove="remove"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import TableCollapse from "./lib/TableCollapse.vue";

export default {
  props: {
    category: Object,
    add: Boolean,
    remove: Boolean,
  },
  data() {
    return {
      searchQuery: "",
      gridColumns: ["name", "quantity", "category", "price"],
      gridData: [
        { id: 1, name: "Viande", quantity: 100, category: "Meet", price: 0.4 },
        {
          id: 2,
          name: "Tomate",
          quantity: 100,
          category: "Vegtebales",
          price: 0.4,
        },
      ],
    };
  },
  methods: {
    handleChange: function (event) {
      this[event.target.name] = event.target.value;
    },

    avoidEnter: () => console.log("Enter avoided"),
  },

  components: {
    TableCollapse,
  },
};
</script>
<style lang="css">
.table-col-3 .table-sticky-header > div:first-child,
.table-col-3 tbody th,
.table-col-3 thead th {
  width: 40%;
  min-width: 200px;
}
.table-col-3 .table-sticky-header > div:not(:first-child),
.table-col-3 tbody td {
  width: 20%;
  min-width: 100px;
}
.table-col-3 .table-sticky table,
.table-col-3 .table-sticky-header {
  width: calc(100% - 1px);
  margin: auto;
}
.table-col-3 .table-sticky-header {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.table-col-3 .table-sticky-header::-webkit-scrollbar {
  display: none;
}
</style>