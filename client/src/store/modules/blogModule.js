import BlogService from "../services/blogService";

const BlogModule = {
  state: {
    blogPosts: [],
    blogPost: {}
  },

  getters: {
    getPosts: state => {
      return state.blogPosts;
    },
    getPost: state => {
      return state.blogPost;
    }
  },

  mutations: {
    updateBlogPosts: (state, blogPosts) => {
      state.blogPosts = blogPosts;
    },
    updateBlogPost: (state, blogPost) => {
      state.blogPost = blogPost;
      console.log(state.blogPost);
    }
  },

  actions: {
    fetchPosts: async (context, payload) => {
      let { component } = payload;
      let blogService = new BlogService(component);
      let blogPosts = await blogService.fetch();
      context.commit("updateBlogPosts", blogPosts);
    },
    readPost: async (context, payload) => {
      let { component, id } = payload;
      let blogService = new BlogService(component);
      let blogPost = await blogService.read(id);
      context.commit("updateBlogPost", blogPost);
    },
    addComment: async (context, payload) => {
      let { component, postId, name, comment } = payload;
      let blogService = new BlogService(component);
      await blogService.postComment({ postId, name, comment });
      let blogPost = await blogService.read(postId);
      context.commit("updateBlogPost", blogPost);
    }
  }
};

export default BlogModule;
