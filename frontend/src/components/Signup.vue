<template>
  <div class="vertical-center">
    <div class="inner-block">
      <div class="vue-tempalte">
        <form @submit.prevent="singUp">
          <h3>Sign Up</h3>
          <div class="form-group">
            <label>First Name</label>
            <input
              name="firstName"
              type="text"
              :value="firstName"
              @input="handleChange"
              class="form-control form-control-lg"
            />
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input
              name="lastName"
              type="text"
              :value="lastName"
              @input="handleChange"
              class="form-control form-control-lg"
            />
          </div>
          <div class="form-group">
            <label>Email address</label>
            <input
              name="email"
              type="email"
              :value="email"
              @input="handleChange"
              class="form-control form-control-lg"
            />
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input
              name="phone"
              type="Phone"
              :value="phone"
              @input="handleChange"
              class="form-control form-control-lg"
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              :value="password"
              @input="handleChange"
              class="form-control form-control-lg"
            />
          </div>
          <input
            type="submit"
            value="Sign Up"
            class="btn btn-dark btn-lg btn-block"
          />

          <p class="forgot-password text-right">
            Already registered
            <router-link :to="{ name: 'login' }">sign in?</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getServerHost } from "../utils/api";
export default {
  data: () => ({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    password: "",
  }),
  methods: {
    singUp(event) {
      var axios = require("axios");
      var FormData = require("form-data");
      const data = new FormData(event.target);
      data.append("lastName", this.lastName);
      data.append("firstName", this.firstName);
      data.append("email", this.email);
      data.append("phone", this.phone);
      data.append("password", this.password);
      var config = {
        method: "POST",
        url: getServerHost() + "/api/customers",
        headers: {},
        data: {
          lastName: data.get("lastName"),
          firstName: data.get("firstName"),
          email: data.get("email"),
          phone: parseInt(data.get("phone")),
          password: data.get("password"),
        },
      };
      axios(config)
        .then((response) => {
          if (response["status"] == 201) {
            this.$router.push("login");
          }
        })
        .catch((e) => {
          console.log(data);
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