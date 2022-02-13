<template>
  <div class="main">
    <div class="inner-block full-width">
      <div>
        <section class="container py-3 py-lg-5">
          <div class="table-col-3"></div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import { getServerHost } from "../utils/api";

export default {
  props: {},
  data() {
    return {
      add: false,
      remove: false,
      filteredData: [],
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
      url:
        getServerHost() +
        "/requests/" +
        this.$store.state.logged_user["user"]["id"] +
        "/provider",
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

  components: {},
};
</script>
<style lang="css">
.main-dashboard-container {
  display: flex;
  justify-content: space-around;
  vertical-align: middle;
}
</style>