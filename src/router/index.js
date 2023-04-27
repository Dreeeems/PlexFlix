import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../view/homePage.vue";
import Video from "../view/video.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/video",
      name: "video",
      component: Video,
    },
  ],
});

export default router;
