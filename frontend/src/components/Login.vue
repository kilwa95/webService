<template>
  <div class="vertical-center">
    <div class="inner-block">
      <div class="vue-tempalte">
        <form @submit.prevent="login">
          <h3>Sign In</h3>
          <div class="form-group">
            <label>Email address</label>
            <input
              name="email"
              type="email"
              class="form-control form-control-lg"
              @keydown.prevent.stop.enter="avoidEnter"
              :value="email"
              @input="handleChange"
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              class="form-control form-control-lg"
              @keydown.prevent.stop.enter="avoidEnter"
              v-model="password"
              @input="handleChange"
            />
          </div>
          <input
            value="Sign in"
            type="submit"
            class="btn btn-dark btn-lg btn-block mt-16"
          />
          <p class="forgot-password text-right mt-2 mb-4">
            <router-link to="/forgot-password">Forgot password ?</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { getServerHost } from "../utils/api";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {},
  computed: {},
  methods: {
    login() {
      var axios = require("axios");
      var FormData = require("form-data");
      var data = new FormData();
      data.append("email", this.email);
      data.append("password", this.password);
      var config = {
        method: "POST",
        url: getServerHost() + "/login",
        headers: {},
        data: {
          email: data.get("email"),
          password: data.get("password"),
        },
      };
      axios(config)
        .then((response) => {
          if (response["data"]["token"]) {
            this.$store.commit("getLoggedUser", {
              token: response["data"]["token"],
            });
            this.$router.push("dashboard");
          }
        })
        .catch(() => {
          this.$store.commit("getLoggedUser", {});
          this.flashMessage.error({
            title: "Invalid passowrd or email",
            message: "Please try again or contact the support",
          });
        });
    },
    handleChange: function (event) {
      this[event.target.name] = event.target.value;
    },

    avoidEnter: () => console.log("Enter avoided"),
  },
  components: {},
};
</script>
<style scoped>
.mt-16 {
  margin-top: 16px;
}
</style>