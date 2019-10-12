import Vue from "vue";
import Router from "vue-router";
import home from "../src/components/home";
import blog from "../src/components/blog";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: home
    },
    {
      path: "/blog/:id",
      component: blog
    }
  ]
});
