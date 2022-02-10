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
import bus from "../bus.js";
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
      gridData: [],
    };
  },
  methods: {
    addProduct(value) {
      var doesExist = this.gridData.some((el) => value.id === el.id);
      if (doesExist == false) {
        this.gridData.push({
          id: value.id,
          name: value.name,
          quantity: value.quantity,
          category: value.category,
          price: value.price,
        });
      }
    },
    removeProduct(value) {
      var index = this.gridData
        .map((x) => {
          return x.id;
        })
        .indexOf(value["id"]);
      this.gridData.splice(index, 1);
    },

    handleChange: function (event) {
      this[event.target.name] = event.target.value;
    },

    avoidEnter: () => console.log("Enter avoided"),
  },
  created() {
    bus.$on("removeProducts", this.removeProduct);
    bus.$on("chosenProducts", this.addProduct);
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