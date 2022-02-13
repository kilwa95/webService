<template>
  <div class="main">
    <div class="inner-block full-width">
      <div>
        <section class="container py-3 py-lg-5">
          <div class="table-col-3">
            <TableCollapse
              :products="gridData"
              :columns="gridColumns"
              :filteredData="filteredData"
              :fulldata="data"
              :category="{ name: 'Requests' }"
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
import { getServerHost } from "../utils/api";
import TableCollapse from "./lib/TableCollapse.vue";

export default {
  props: {},
  data() {
    return {
      add: false,
      remove: false,
      filteredData: {},
      data: {},
      searchQuery: "",
      gridColumns: ["firstName", "lastName", "email", "products", "status"],
      gridData: [],
      test: [],
    };
  },
  mounted() {
    //Getting all the Products
    var axios = require("axios");
    var config = {
      method: "GET",
      url: getServerHost() + "/api/" + provider_id+"/products",
    };
    axios(config)
      .then((response) => {
        if (response["status"] == 200) {
          for (
            let index = 0;
            index < response["data"]["hydra:member"].length;
            index++
          ) {
            this.filteredData["data"] = response["data"]["hydra:member"][index];
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
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