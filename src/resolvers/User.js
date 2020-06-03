import Blog from "../../models/Blog";

const User = {
  /*
  name(parent, args, ctx, info) {
    return "overwritten default resolver";
  },
  */
  /*
  posts(parent, args, ctx, info) {
    const { db } = ctx;
    let { posts } = db;
    return posts.filter((post) => {
      return post.user === parent.id;
    });
  },
  */
  blogs: async (parent, args, ctx, info) => {
    //const blogs = await Blog.find({ user: parent.id });

    // dataloader probleme mit sofa
    const blogs = await ctx.loaders.blogForUser.load(parent.id.toString());

    return blogs;
  },
};

export default User;
