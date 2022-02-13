<template>
  <div class="main">
    <div class="inner-block full-width">
      <div>
        <section class="container py-3 py-lg-5">
          <div class="table-col-3">
            <div class="vertical-center">
              <div class="inner-block" style="width: 100%">
                <div class="vue-tempalte">
                  <form>
                    <h3>
                      Request From: {{ fulldata["customer"]["firstName"] }}
                      {{ fulldata["customer"]["lastName"] }}
                    </h3>
                    <br /><br />
                    <div class="form-group">
                      <h4>User Information</h4>
                      <div class="form-group">
                        <label>FirstName:</label>
                        {{ fulldata["customer"]["firstName"] }}
                      </div>
                      <div class="form-group">
                        <label>lastName:</label>
                        {{ fulldata["customer"]["lastName"] }}
                      </div>
                      <div class="form-group">
                        <label>Email:</label>
                        {{ fulldata["customer"]["email"] }}
                      </div>
                      <div class="form-group">
                        <label>Phone:</label>
                        {{ fulldata["customer"]["phone"] }}
                      </div>
                    </div>
                    <br /><br />
                    <div class="form-group">
                      <h4>Request Information</h4>
                      <div class="form-group">
                        <label>Name:</label>
                        {{ fulldata["products"]["name"] }}
                      </div>
                      <div class="form-group">
                        <label>quantity:</label>
                        {{ fulldata["products"]["quantity"] }}
                      </div>
                      <div class="form-group">
                        <label>Description:</label>
                        {{ fulldata["products"]["description"] }}
                      </div>
                    </div>
                    <br />
                    <button type="submit" class="btn btn-dark btn-lg btn-block">
                      Accept Request
                    </button>
                    <button
                      type="submit"
                      class="btn btn-green btn-lg btn-block"
                    >
                      Decline Request
                    </button>
                  </form>
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
export default {
  props: {
    fulldata: Object,
  },
  data: () => ({}),
  mounted() {},
  methods: {
    // newRequest(event) {
    //   var axios = require("axios");
    //   var FormData = require("form-data");
    //   const data = new FormData(event.target);
    //   this.products.push("/api/products/2");
    //   data.append("name", this.requestName);
    //   data.append("products", this.products);
    //   data.append("quantity", this.quantity);
    //   data.append("comment", this.comment);
    //   var config = {
    //     method: "POST",
    //     url: getServerHost() + "/api/requests",
    //     headers: {
    //       Authorization: "Bearer " + this.$store.state["logged_user"]["token"],
    //     },
    //     data: {
    //       name: data.get("name"),
    //       products: this.products,
    //       quantity: data.get("quantity"),
    //       comment: data.get("comment"),
    //       customer: "/api/users/" + this.$store.state.logged_user["user"]["id"],
    //     },
    //   };
    //   axios(config)
    //     .then((response) => {
    //       if (response["status"] == 201) {
    //         alert("ds");
    //       }
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
    handleChange: function (event) {
      this[event.target.name] = event.target.value;
    },
  },
};
</script>