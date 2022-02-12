<template>
  <div class="vertical-center">
    <div class="inner-block" style="width: 100%">
      <div class="vue-tempalte">
        <form @submit.prevent="newRequest">
          <h3>Create New Request</h3>
          <div class="form-group">
            <div class="form-group">
              <label>Request Name</label>
              <input
                name="name"
                type="text"
                :value="requestName"
                @input="handleChange"
                class="form-control form-control-lg"
              />
            </div>
            <label>Products</label>
            <select v-model="selectedProduct">
              <option v-for="product in allProducts" :key="product.id">
                <span value="product.id">
                  {{ product.name }}
                </span>
              </option>
            </select>
            <!-- <select
              name="Products"
              type="select"
              @input="handleChange"
              class="form-control form-control-lg"
            /> -->
          </div>
          <div class="form-group">
            <label>Quantity</label>
            <input
              name="Quantity"
              type="text"
              :value="quantity"
              @input="handleChange"
              class="form-control form-control-lg"
            />
          </div>
          <div class="form-group">
            <label>Comment For Supplier</label>
            <input
              name="Comment"
              type="text"
              :value="comment"
              @input="handleChange"
              class="form-control form-control-lg"
            />
          </div>
          <div class="form-group">
            <label>Specifique Supplier?</label>
            <input
              name="SpecfiqueSupplier"
              type="text"
              :value="email"
              @input="handleChange"
              class="form-control form-control-lg"
            />
          </div>
          <br />
          <input
            type="submit"
            value="Create Request"
            class="btn btn-dark btn-lg btn-block"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getServerHost } from "../utils/api";
export default {
  data: () => ({
    requestName: "",
    allProducts: [],
    selectedProduct: "",
    quantity: "",
    products: [],
    comment: "",
  }),
  mounted() {
    //Getting all the Products
    var axios = require("axios");
    var config = {
      method: "GET",
      url: getServerHost() + "/api/products",
    };
    axios(config)
      .then((response) => {
        console.log(response);
        if (response["status"] == 200) {
          for (
            let index = 0;
            index < response["data"]["hydra:member"].length;
            index++
          ) {
            this.allProducts.push(response["data"]["hydra:member"][index]);
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    newRequest(event) {
      var axios = require("axios");
      var FormData = require("form-data");
      const data = new FormData(event.target);
      this.products.push("/api/products/2");
      data.append("name", this.requestName);
      data.append("products", this.products);
      data.append("quantity", this.quantity);
      data.append("comment", this.comment);
      var config = {
        method: "POST",
        url: getServerHost() + "/api/requests",
        headers: {
          Authorization: "Bearer " + this.$store.state["logged_user"]["token"],
        },
        data: {
          name: data.get("name"),
          products: this.products,
          quantity: data.get("quantity"),
          comment: data.get("comment"),
          customer: "/api/users/" + this.$store.state.logged_user["user"]["id"],
        },
      };
      axios(config)
        .then((response) => {
          if (response["status"] == 201) {
            alert("ds");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleChange: function (event) {
      this[event.target.name] = event.target.value;
    },
    handleSubmit: function (event) {
      const data = new FormData(event.target);
      console.log(data.getAll());
    },
    avoidEnter: () => console.log("Enter avoided"),
  },
};
</script>
/api/providers