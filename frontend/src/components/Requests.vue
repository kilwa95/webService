<template>
  <div class="main">
    <div class="inner-block full-width">
      <div>
        <section class="container py-3 py-lg-5">
          <div class="table-col-3">
            <TableCollapse
              :products="gridData"
              :columns="gridColumns"
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
  mounted() {
    //Getting all the requests
    var axios = require("axios");
    var config = {
      method: "GET",
      url: getServerHost() + "/api/requests",
    };
    axios(config)
      .then((response) => {
        if (response["status"] == 200) {
          console.log(response);
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