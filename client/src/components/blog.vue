<template>
  <v-flex>
    <v-layout row wrap align-center justify-center fill-height v-if="typeof Post !== 'undefined'">
      <v-flex xs12 pa-2 class="bounce">
        <span style="font-size:30px">{{Post.title}}</span>
      </v-flex>
      <v-flex xs12 v-if="typeof Post.image !=='undefined' ">
        <v-img :src="'/static/'+Post.image" style="border-radius:10px"></v-img>
      </v-flex>

      <v-flex xs12 pa-2>
        <span style="font-size:18px">{{Post.content}}</span>
      </v-flex>
      <v-flex md3 sm3 xs6 pa-4 class="font_c1">
        <span>Camera: ""</span>
      </v-flex>
      <v-flex md3 sm3 xs12 pa-4 class="font_c1">
        <span>Lense: ""</span>
      </v-flex>
      <v-flex md3 sm3 xs12 pa-4 class="font_c1">
        <span>Time: ""</span>
      </v-flex>
      <v-flex md3 sm3 xs12 pa-4 class="font_c1">
        <span>Location: ""</span>
      </v-flex>
    </v-layout>
    <v-layout
      column
      wrap
      align-left
      justify-center
      fill-height
      xs12
      v-for="(comment,i) in Post.comments"
      :key="i"
    >
      <v-card style="border-radius:10px; padding:10px;margin:5px" dark color="#212121">
        <v-flex xs12 style="font-weight: 500">{{comment.name}}</v-flex>
        <v-flex xs12>{{comment.comment}}</v-flex>
      </v-card>
    </v-layout>
    <v-card style="border-radius:10px; padding:10px;margin:5px">
      <v-layout row wrap align-center justify-center fill-height>
        <v-flex xs12 style="font-weight: 500">
          <v-text-field label="Name" v-model="Name"></v-text-field>
        </v-flex>
        <v-flex xs11>
          <v-text-field label="Comment" v-model="Comment"></v-text-field>
        </v-flex>
        <v-flex xs1 pl-4>
          <v-btn fab dark small @click="submitComment()">
            <v-icon dark>send</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch("readPost", {
      component: this,
      id: this.$route.params.id
    });
  },
  methods: {
    async submitComment() {
      await this.$store.dispatch("addComment", {
        component: this,
        postId: this.Post._id,
        name: this.Name,
        comment: this.Comment
      });
    }
  },
  data() {
    return {
      Name: "",
      Comment: ""
    };
  },
  computed: {
    Post() {
      return this.$store.getters.getPost;
    }
  }
};
</script>

<style >
.font_c1 {
  font-size: 18px;
  font-weight: 300;
}
</style>