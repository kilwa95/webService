<template>
  <div class="main">
    <div class="inner-block full-width">
      <div>
        <section class="container py-3 py-lg-5">
          <div class="table-col-3">
            <TableCollapse
              title="My Catalogues"
              :products="gridData"
              :columns="gridColumns"
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
  data() {
    return {
      searchQuery: "",
      gridColumns: ["to", "category", "name", "quantity"],
      gridData: [
        { to: "Adrien", category: "Vegetable", name: "Toamato", quantity: 100 },
        { to: "Eddy", category: "Vegetable", name: "Tomato", quantity: 100 },
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
.main-dashboard-container {
  display: flex;
  justify-content: space-around;
  vertical-align: middle;
}
</style>