<template>
  <div class="main">
    <div class="inner-block full-width">
      <div>
        <TableCollapse
          :products="gridData"
          :columns="gridColumns"
          :category="{ name: 'Products' } ? category : category"
          :add="add"
        />
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
  },
  data() {
    return {
      searchQuery: "",
      gridColumns: ["name", "quantity", "category", "price"],
      gridData: [
        { name: "Viande", quantity: 100, category: "Meet", price: 0.4 },
        { name: "Tomate", quantity: 100, category: "Vegtebales", price: 0.4 },
      ],
    };
  },
  methods: {
    handleChange: function (event) {
      this[event.target.name] = event.target.value;
    },

    avoidEnter: () => console.log("Enter avoided"),
  },
  mounted() {
    console.log(this.cateogry);
  },
  components: {
    TableCollapse,
  },
};
</script>
<style lang="css">
.main-dashboard-container {
  display: flex;
  justify-content: space-around;
  vertical-align: middle;
}
</style>