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
            // for (let index = 0; index < this.test.length; index++) {
            //   const element = array[index];
            // }
            console.log(response["data"]["hydra:member"][index]["products"]);
            this.filteredData = {
              firstName:
                response["data"]["hydra:member"][index]["customer"][
                  "firstName"
                ],
              lastName:
                response["data"]["hydra:member"][index]["customer"]["lastName"],
              email:
                response["data"]["hydra:member"][index]["customer"]["email"],
              name: response["data"]["hydra:member"][index]["products"][0][
                "name"
              ],
              description:
                response["data"]["hydra:member"][index]["products"][0][
                  "description"
                ],
              status: response["data"]["hydra:member"][index]["status"],
            };
          }
          console.log("all request", this.test);
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