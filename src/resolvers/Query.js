import User from "../../models/User";
import Blog from "../../models/Blog";
import Post from "../../models/Post";

const Query = {
  post() {
    return { id: "12345", title: "new post", body: "was ein tag" };
  },
  users: async (parent, args, ctx, info) => {
    const users = User.find({});
    return users;
  },
  posts(parent, args, ctx, info) {
    return Post.find({});
  },
  blogs(parent, args, ctx, infot) {
    //graphql erwartet promises oder daten als return
    return Blog.find({});
  },

  blog: async (parent, args, ctx, infot) => {
    //graphql erwartet promises oder daten als return
    const { id } = args;

    //return Blog.find({});
    const blog = await ctx.loaders.blog.load(id);

    const blog2 = await ctx.loaders.blog.load(id);

    const blog3 = await ctx.loaders.blog.load(id);

    if (!blog) {
      throw new Error("Blog with provided id does not exist");
    }

    return blog;
  },
};

export default Query;
