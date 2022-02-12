import Vue from "vue";
import VueRouter from "vue-router";
import { getServerHost } from "../utils/api";

Vue.use(VueRouter);
import store from "@/store/index";
var axios = require("axios");

function isAllowed(to, from, next) {
  try {
    if (store.state.logged_user["user"]["roles"][0] == "ROLE_PROVIDER") {
      requireAuth(to, from, next);
    }
  } catch (err) {
    err;
  }
  next("dashboard");
}

function requireAuth(from, to, next) {
  var confi = {
    method: "GET",
    url: getServerHost() + "/api/users/current",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + store.state["logged_user"]["token"],
    },
  };
  axios(confi)
    .then((response) => {
      store.commit("getLoggedUser", {
        user: response["data"],
        token: store.state["logged_user"]["token"],
      });
      next();
    })
    .catch((e) => {
      next("login");
      console.log(e);
    });
}
const routes = [
  {
    path: "/",
    name: "signup",
    component: () => import("../components/Signup.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("../components/ForgotPassword.vue"),
  },
  {
    path: "/requests",
    name: "requests",
    component: () => import("../components/Requests.vue"),
    beforeEnter: (to, from, next) => {
      requireAuth(to, from, next);
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../components/Dashboard.vue"),
    beforeEnter: (to, from, next) => {
      requireAuth(to, from, next);
    },
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../components/Product.vue"),
    beforeEnter: (to, from, next) => {
      requireAuth(to, from, next);
    },
  },
  {
    path: "/catalogues",
    name: "catalogues",
    component: () => import("../components/Catalogue.vue"),
    beforeEnter: (to, from, next) => {
      requireAuth(to, from, next);
    },
  },
  {
    path: "/create",
    name: "create",
    component: () => import("../components/Create.vue"),
    beforeEnter: (to, from, next) => {
      isAllowed(to, from, next);
    },
  },
  {
    path: "/new-request",
    name: "new-request",
    component: () => import("../components/NewRequest.vue"),
    // beforeEnter: (to, from, next) => {
    //   // isAllowed(to, from, next);
    // },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
