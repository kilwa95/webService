<template>
  <div class="main">
    <div class="inner-block full-width">
      <div>
        <section class="container py-3 py-lg-5">
          <div class="table-col-3">
            <div class="vertical-center">
              <div class="inner-block" style="width: 100%">
                <div class="vue-tempalte">
                  <h3>
                    Request From: {{ product["customer"]["firstName"] }}
                    {{ product["customer"]["lastName"] }}
                  </h3>
                  <br /><br />
                  <div class="form-group">
                    <h4>User Information</h4>
                    <div class="form-group">
                      <label>FirstName:</label>
                      {{ product["customer"]["firstName"] }}
                    </div>
                    <div class="form-group">
                      <label>lastName:</label>
                      {{ product["customer"]["lastName"] }}
                    </div>
                    <div class="form-group">
                      <label>Email:</label>
                      {{ product["customer"]["email"] }}
                    </div>
                    <div class="form-group">
                      <label>Phone:</label>
                      {{ product["customer"]["phone"] }}
                    </div>
                  </div>
                  <br /><br />
                  <div class="form-group">
                    <h4>Request Information</h4>
                    <div class="form-group">
                      <label>Name:</label>
                      {{ product["products"][0]["name"] }}
                    </div>
                    <div class="form-group">
                      <label>quantity:</label>
                      {{ product["products"][0]["quantity"] }}
                    </div>
                    <div class="form-group">
                      <label>Description:</label>
                      {{ product["products"][0]["description"] }}
                    </div>
                  </div>
                  <br />
                  <div v-if="reqStatus == false">
                    <button
                      type="submit"
                      @click="newRequest(product['products'][0]['id'])"
                      class="btn btn-dark btn-lg btn-block"
                    >
                      Accept Request
                    </button>
                    <button
                      type="submit"
                      class="btn btn-green btn-lg btn-block"
                    >
                      Decline Request
                    </button>
                  </div>
                  <div v-else>request have been already accepted</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { getServerHost } from "../utils/api";
export default {
  props: {
    product: Array,
  },
  data: () => ({
    reqStatus: false,
  }),
  mounted() {
    console.log("sasasa", this.product);
  },
  computed: {
    getRequest() {
      return this.getRequestDetail();
    },
  },

  methods: {
    getRequestDetail() {
      //Getting all the Products
      var axios = require("axios");
      var config = {
        method: "GET",
        url:
          getServerHost() +
          "/api/requests/" +
          this.product["products"][0]["id"],
      };
      axios(config)
        .then((response) => {
          console.log(response);
          if (response["status"] == 200) {
            return response;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newRequest(product_id) {
      var axios = require("axios");
      //    var FormData = require("form-data");
      // const data = new FormData(event.target);
      var config = {
        method: "PUT",
        url: getServerHost() + "/api/requests/" + product_id + "/accept",
        headers: {
          Authorization: "Bearer " + this.$store.state["logged_user"]["token"],
        },
        data: {
          provider: "/api/users/" + this.$store.state.logged_user["user"]["id"],
        },
      };
      axios(config)
        .then((response) => {
          console.log(response);
          if (response["status"] == 200) {
            this.flashMessage.success({
              title: "thee request have been successfuly accepted",
            });
            this.reqStatus = true;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    handleChange: function (event) {
      this[event.target.name] = event.target.value;
    },
  },
};
</script>