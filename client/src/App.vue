<template>
  <div id="app">
    <v-app class="backgroundColor">
      <template>
        <v-navigation-drawer
          clipped
          v-model="drawer"
          style="z-index:88;background:#fafafaef;margin-top:50px"
          fixed
          class="elevation-0"
          width="150"
          floating
          hide-overlay
          temporary
        >
          <v-list>
            <v-list-tile v-for="item in items" :key="item.title" @click="$router.push(item.path)">
              <v-list-tile-action>
                <v-icon style="color:#212121">{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed flat style="z-index:99" color="#fafafaef" height="50">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-spacer></v-spacer>
          <v-icon
            style="font-size:35px;color:#000;cursor:pointer"
            @click="$router.push('/')"
          >photo_camera</v-icon>
          <v-toolbar-title
            class="bounce"
            id="titleFont"
            style="font-size:35px; cursor:pointer"
            @click="$router.push('/')"
          >
            <span style="font-weight:800;color:#212121;padding-right:5px">YW</span>Photography
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-content>
          <v-container fluid>
            <router-view style="padding:30px;margin-top:25px"></router-view>
          </v-container>
        </v-content>
      </template>
    </v-app>
  </div>
</template>

<script>
import lax from "lax.js";
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "home", path: "/" },
        { title: "About", icon: "question_answer", path: "/" }
      ]
    };
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Nunito+Sans:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i");
@import url("https://fonts.googleapis.com/css?family=Rubik");
html {
  font-family: "Nunito Sans", sans-serif;
}
#titleFont {
  font-family: "Nunito Sans", sans-serif;
}
.backgroundColor {
  background: #fafafa;
}
.bounce {
  animation: bounceIn 1s;
}
@keyframes bounceIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  60% {
    transform: scale(1.02);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}
</style>