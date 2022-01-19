import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    logged_user: {},
  },

  mutations: {
    getLoggedUser(state, logged_user) {
      state.logged_user = logged_user;
    },
  },
  getters: {
    getLoggedUser: (getters) => {
      return getters.logged_user;
    },
  },

  plugins: [createPersistedState()],
});

export default store;
