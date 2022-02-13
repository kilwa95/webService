<template>
  <div class="vertical-center">
    <div class="inner-block" style="width: 100%">
      <div class="vue-tempalte">
        <form @submit.prevent="newProduct">
          <h3>Create New Product</h3>
          <div class="form-group">
            <div class="form-group">
              <label>Product Name</label>
              <input
                name="productName"
                type="text"
                :value="productName"
                @input="handleChange"
                class="form-control form-control-lg"
              />
            </div>
          </div>
          <div class="form-group">
            <label>Quantity</label>
            <input
              name="quantity"
              type="text"
              :value="quantity"
              @input="handleChange"
              class="form-control form-control-lg"
            />
          </div>
          <div class="form-group">
            <label>Price</label>
            <input
              name="price"
              type="text"
              :value="price"
              @input="handleChange"
              class="form-control form-control-lg"
            />
          </div>
          <div class="form-group">
            <label>Product Description</label>
            <input
              name="description"
              type="text"
              :value="description"
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
    description: "",
    productName: "",
    selectedProduct: "",
    quantity: "",
    price: "",
  }),
  // mounted() {
  //   //Getting all the Products
  //   var axios = require("axios");
  //   var config = {
  //     method: "POST",
  //     url: getServerHost() + "/api/products",
  //   };
  //   axios(config)
  //     .then((response) => {
  //       console.log(response);
  //       if (response["status"] == 200) {
  //         for (
  //           let index = 0;
  //           index < response["data"]["hydra:member"].length;
  //           index++
  //         ) {
  //           this.allProducts.push(response["data"]["hydra:member"][index]);
  //         }
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // },
  methods: {
    newProduct(event) {
      var axios = require("axios");
      var FormData = require("form-data");
      const data = new FormData(event.target);

      var config = {
        method: "POST",
        url: getServerHost() + "/api/products",
        headers: {
          Authorization: "Bearer " + this.$store.state["logged_user"]["token"],
        },
        data: {
          name: data.get("productName"),
          description: data.get("description"),
          quantity: parseInt(this.quantity),
          price: parseFloat(this.price),
        },
      };
      axios(config)
        .then((response) => {
          if (response["status"] == 201) {
            this.flashMessage.success({
              title: "Product have been created",
              message: "You're product have been created suuccessfuly",
            });
            this.$router.push("products");
          }
        })
        .catch((e) => {
          this.flashMessage.error({
            title: "Somthing Went Wrong",
            message: "Please try again or contact the support",
          });
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