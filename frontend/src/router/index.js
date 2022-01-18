import Vue from "vue";
import VueRouter from "vue-router";
import { getServerHost } from "../utils/api";

Vue.use(VueRouter);

var axios = require("axios");

function requireAuth() {
  var confi = {
    method: "GET",
    url: getServerHost() + "/api/users?id=1",
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios(confi)
    .then((response) => {
      console.log("auth", response["data"]["hydra:member"]);
    })
    .catch((e) => {
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
    path: "/requests",
    name: "requests",
    component: () => import("../components/Requests.vue"),
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("../components/ForgotPassword.vue"),
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
  },
  {
    path: "/catalogues",
    name: "catalogues",
    component: () => import("../components/Catalogue.vue"),
  },
  {
    path: "/create",
    name: "create",
    component: () => import("../components/Create.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
