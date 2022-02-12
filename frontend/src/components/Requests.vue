<template>
  <div class="main">
    <div class="inner-block full-width">
      <div>
        <section class="container py-3 py-lg-5">
          <div class="table-col-3">
            <TableCollapse
              :products="gridData"
              :columns="gridColumns"
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
      data: {},
      searchQuery: "",
      gridColumns: [],
      gridData: [],
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
          for (
            let index = 0;
            index < response["data"]["hydra:member"].length;
            index++
          ) {
            Object.entries(response["data"]["hydra:member"][index]).forEach(
              ([key, value]) => {
                if (key == "customer") {
                  this.data["customer"] = value;
                  for (
                    let index = 0;
                    index < this.data["customer"].length;
                    index++
                  ) {
                    if (
                      index !== "@id" &&
                      index !== "@type" &&
                      index !== "id"
                    ) {
                      this.data[key] = value[index];
                    }
                  }
                }

                if (key == "products") {
                  for (let index = 0; index < value.length; index++) {
                    if (
                      index !== "@id" &&
                      index !== "@type" &&
                      index !== "id"
                    ) {
                      this.data[key] = value[index];
                    }
                  }
                }
              }
            );

            Object.entries(this.data["customer"]).forEach(([k, v]) => {
              console.log("ds");
              if (k !== "@id" && k !== "@type" && k !== "id") {
                this.gridColumns.push(k);
                this.gridData.push(v);
              }
            });
            Object.entries(this.data["products"]).forEach(([k, v]) => {
              if (k !== "@id" && k !== "@type" && k !== "id") {
                this.gridColumns.push(k);
                this.gridData.push(v);
              }
            });
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