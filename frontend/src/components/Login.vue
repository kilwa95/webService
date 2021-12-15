<template>
  <div class="vue-tempalte">
    <form @submit.prevent="handleSubmit">
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
        class="btn btn-dark btn-lg btn-block"
      />
      <p class="forgot-password text-right mt-2 mb-4">
        <router-link to="/forgot-password">Forgot password ?</router-link>
      </p>
    </form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleChange: function (event) {
      this[event.target.name] = event.target.value;
    },
    handleSubmit: function (event) {
      const data = new FormData(event.target);
      console.log(data);
    },
    avoidEnter: () => console.log("Enter avoided"),
  },
  components: {},
};
</script>