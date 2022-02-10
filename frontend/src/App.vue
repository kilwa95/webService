<template>
  <div class="vue-tempalte">
    <!-- Navigation -->
    <!-- Main -->
    <div class="App">
      <nav
        class="
          navbar
          shadow
          bg-white
          rounded
          justify-content-between
          flex-nowrap flex-row
          fixed-top
        "
      >
        <div class="container">
          <ul class="nav navbar-nav flex-row float-right" v-if="!isConnected">
            <li class="nav-item">
              <router-link class="nav-link pr-3 mr-14" to="/login"
                >Sign in</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="btn btn-outline-primary" to="/"
                >Sign up</router-link
              >
            </li>
          </ul>
          <ul class="nav navbar-nav flex-row float-left" v-else>
            <li class="nav-item">
              <router-link class="nav-link pr-3" to="/login"
                ><button @click="logOut">Signout</button></router-link
              >
            </li>
            <div class="nav-item" v-if="isSupplier" style="display: flex">
              <li class="nav-item">
                <router-link class="nav-link pr-3" to="/requests"
                  >Requests</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link pr-3" to="/dashboard"
                  >Dashboard</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="btn btn-outline-primary" to="/catalogues"
                  >My Catalogues</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="btn btn-outline-primary" to="/products"
                  >My Products</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="btn btn-outline-primary" to="/create"
                  >Create</router-link
                >
              </li>
            </div>
            <div class="nav-item" v-else style="display: flex">
              <li class="nav-item">
                <router-link class="nav-link pr-3" to="/requests"
                  >Requests</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link pr-3" to="/dashboard"
                  >Dashboard</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link pr-3" to="/dashboard"
                  >Create New Request</router-link
                >
              </li>
            </div>
          </ul>
        </div>
      </nav>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  // Will be executed on page load
  mounted() {},
  computed: {
    isConnected() {
      try {
        if (this.$store.state.logged_user["token"] !== undefined) {
          return true;
        }
      } catch (err) {
        err;
      }
      return false;
    },
    logged_user() {
      return this.$store.state.logged_user;
    },
    isSupplier() {
      try {
        if (this.$store.state.logged_user["user"]["roles"] == "Supplier") {
          return true;
        }
      } catch (err) {
        err;
      }
      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.commit("getLoggedUser", {});
    },
  },
};
</script>

<style scoped>
.mr-14 {
  margin-right: 14px;
}
</style>
