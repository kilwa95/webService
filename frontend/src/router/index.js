import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

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
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../components/Dashboard.vue"),
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
