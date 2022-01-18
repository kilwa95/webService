<template>
  <div class="main">
    <div class="inner-block full-width">
      <div>
        <TableCollapse
          :products="gridData"
          :columns="gridColumns"
          :category="{ name: 'Requests' }"
          :add="add"
          :remove="remove"
        />
      </div>
    </div>
  </div>
</template>
<script>
import TableCollapse from "./lib/TableCollapse.vue";

export default {
  props: {},
  data() {
    return {
      searchQuery: "",
      gridColumns: ["name", "lastname", "date", "price"],
      gridData: [
        {
          id: 1,
          name: "eddy",
          lastname: "Salibi",
          date: "19/1/2021",
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
.main-dashboard-container {
  display: flex;
  justify-content: space-around;
  vertical-align: middle;
}
</style>