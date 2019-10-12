<template>
  <v-layout row wrap id="layout">
    <!-- LATEST MAIN CARD -->
    <transition name="fade" mode="out-in">
      <v-flex xs12 sm12 pa-2>
        <v-card
          flat
          class="border"
          @click="$router.push('/blog/' + Posts[0]._id)"
          style="cursor:pointer"
        >
          <v-flex v-if="empty">
            <v-img
              style="border-top-left-radius:10px;border-top-right-radius:10px"
              :src="'/static/' + Posts[0].image"
              aspect-ratio="1"
              height="600"
            >
              <template v-slot:placeholder>
                <v-layout fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="dark"></v-progress-circular>
                </v-layout>
              </template>
            </v-img>
          </v-flex>
          <v-toolbar flat color="#212121" dark height="40">
            <v-flex v-if="empty" class="bounce">{{Posts[0].title}}</v-flex>
            <v-spacer></v-spacer>
            <v-flex v-if="empty" class="bounce">By {{Posts[0].author}}</v-flex>
          </v-toolbar>
        </v-card>
      </v-flex>
    </transition>
    <v-flex xs12 sm6 v-for="(post) in remainingPosts()" :key="post._id" pa-2>
      <transition name="fade" mode="out-in">
        <div>
          <v-card
            flat
            class="border"
            style="cursor:pointer"
            @click="$router.push('/blog/' + post._id)"
          >
            <v-img :src="'/static/' + post.image" aspect-ratio="1" height="350">
              <template v-slot:placeholder>
                <v-layout fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="dark"></v-progress-circular>
                </v-layout>
              </template>
            </v-img>
            <v-toolbar flat color="#212121" dark height="40">
              <v-flex v-if="empty">{{post.title}}</v-flex>
              <v-spacer></v-spacer>
              <v-flex v-if="empty">By {{post.author}}</v-flex>
            </v-toolbar>
          </v-card>
        </div>
      </transition>
    </v-flex>
    <v-flex class="text-xs-center">
      <v-pagination
        v-model="page"
        color="#212121"
        circle
        :length="Math.ceil(P.length/6)"
        :total-visible="6"
      ></v-pagination>
    </v-flex>
  </v-layout>
</template>

<script>
import _ from "lodash";
import moment from "moment";
export default {
  mounted() {},
  async created() {
    await this.$store.dispatch("fetchPosts", { component: this });
  },
  data() {
    return {
      page: 1
    };
  },
  methods: {
    remainingPosts() {
      let posts = [];
      this.Posts.forEach((post, i) => {
        if (i !== 0) {
          posts.push(post);
        }
      });
      return posts;
    }
  },
  computed: {
    empty() {
      if (_.isEmpty(this.Posts)) {
        return false;
      } else return true;
    },
    Posts() {
      let pindex;
      let p = this.P;
      if (this.page === 1) {
        p = p.slice(0, 7);
      } else {
        pindex = this.page * 7 - 7;
        console.log(pindex);
        p = p.slice(pindex, pindex + 7);
      }
      console.log(p);
      return p;
    },
    P() {
      return this.$store.getters.getPosts;
    }
  }
};
</script>

<style>
.border {
  border-radius: 10px;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1s;
}
.fade-leave {
  /* opacity: 1; */
}
.fade-leave-active {
  transition: opacity 1s;
  opacity: 0;
}
</style>