import Vue from "vue";
import VueRouter from "vue-router";
import { getServerHost } from "../utils/api";

Vue.use(VueRouter);

var axios = require("axios");

function requireAuth() {
  var confi = {
    method: "GET",
    url:
      getServerHost() +
      "/api/users?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NDI1ODI5MDMsImV4cCI6MTY0MjU4NjUwMywicm9sZXMiOlsiU3VwcGxpZXIsU3VwcGxpZXIsU3VwcGxpZXIiLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJlZGR5c3Nhc2FzYWFsaWJ5QGdtYWlsLmNvbWEifQ.YjSjWNatuBuk21GQJ3w_R3bK-XhSQBRYfT3lw7deEco4URBjV_sYjzaO6SQT3eDOYX8Hjh0AAMRL4EPaz9MAa0cXBm9znmESIC7aAbJ4Z4yfJajCPukXstxtR6_1vbbKSHZ_GWkulWLZMdtzcmBXYrdBu-v4VQTj7riKu4aYj12HFBbtMCOIjKUVvRNDYQidLvVDM1iMuvWl1MGXalbRZI5GRV3Lozuyey1wLi20-3V2VwtuuduoxEHkVqjN7JAepp3HTAef3VryqCUU4TrksrN5TuWd3x_TYAX7dju1r7nEr2KVbpn3XfcHR6pKlU5nLsiHNruMDaCTNBAMZZPdlQ",
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
