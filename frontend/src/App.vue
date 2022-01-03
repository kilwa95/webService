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
          <ul class="nav navbar-nav flex-row float-right">
            <li class="nav-item">
              <router-link class="nav-link pr-3" to="/login"
                >Sign in</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="btn btn-outline-primary" to="/"
                >Sign up</router-link
              >
            </li>
          </ul>
          <ul class="nav navbar-nav flex-row float-left">
            <li class="nav-item">
              <router-link class="nav-link pr-3" to="/dashboard"
                >Dashboard</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="btn btn-outline-primary" to="/create"
                >Create</router-link
              >
            </li>
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
  mounted() {
    this.isConnected();
  },
  methods: {
    isConnected() {
      console.log("sa");
    },
  },
  components: {},
};
</script>
