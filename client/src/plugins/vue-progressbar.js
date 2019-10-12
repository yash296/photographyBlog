import Vue from "vue";
import VueProgressBar from "vue-progressbar";

const progressBarConfig = {
  color: "#1976d2",
  failedColor: "red",
  height: "2px"
};

Vue.use(VueProgressBar, progressBarConfig);
