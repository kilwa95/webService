<template>
  <div class="main">
    <div class="inner-block full-width">
      <div>
        <section class="container py-3 py-lg-5">
          <div class="table-col-3">
            <TableCollapse
              :filteredData="filteredData"
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
import { getServerHost } from "../utils/api";

export default {
  props: {
    category: Object,
    add: Boolean,
    remove: Boolean,
  },
  data() {
    return {
      searchQuery: "",
      filteredData: [],
    };
  },
  mounted() {
    //Getting all the Products
    var axios = require("axios");
    var config = {
      method: "GET",
      url: getServerHost() + "/api/products",
    };
    axios(config)
      .then((response) => {
        if (response["status"] == 200) {
          for (
            let index = 0;
            index < response["data"]["hydra:member"].length;
            index++
          ) {
            this.filteredData.push(response["data"]["hydra:member"][index]);
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