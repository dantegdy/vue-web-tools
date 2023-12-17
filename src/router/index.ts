import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Lottery.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: "/lottery",
      name: "lottery",
      component: () => import("../views/Lottery.vue"),
    },
    {
      path: "/lottery/sign_in",
      name: "signIn",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/signIn.vue"),
    },
  ],
});

export default router;
