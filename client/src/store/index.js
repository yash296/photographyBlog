import Vue from "vue";
import Vuex from "vuex";
import blogModule from "./modules/blogModule";

//import VuexPersistence from 'vuex-persist'

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })
// TO DO USE PERSISTENT STORAGE
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    blogModule
  }
  //plugins: [vuexLocal.plugin]
});
export default store;
