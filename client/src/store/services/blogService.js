import Service from "./Service";
const url = "api/";
class BlogService extends Service {
  constructor(component) {
    super(component, url);
  }

  fetch() {
    return new Promise(async (resolve, reject) => {
      try {
        let blog = await this.getFromServer("posts/all");
        resolve(blog);
      } catch (cause) {
        reject(cause);
      }
    });
  }
  postComment(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        let { postId, comment, name } = payload;
        await this.postToServer("blog/comments", { postId, comment, name });
        resolve("created");
      } catch (cause) {}
    });
  }
  read(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let blog = await this.getFromServer("blog/", { id });
        let comments = blog.comments;
        let result = blog.result;
        result.comments = comments;
        resolve(result);
      } catch (cause) {
        reject(cause);
      }
    });
  }
}

export default BlogService;
