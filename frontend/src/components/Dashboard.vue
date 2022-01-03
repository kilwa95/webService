<template>
  <div>
    <div>
      <div>
        <TableCollapse
          title="Total orders :10"
          :products="gridData"
          :columns="gridColumns"
        />
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