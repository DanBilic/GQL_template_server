import User from "../../models/User";

const Blog = {
  user: async (parent, args, ctx, info) => {
    //const user = await User.findById(parent.user);
    //console.log("user resolver for Blog");
    //console.log("parent blog: ", parent);
    //console.log("parent blog user string: ", parent.user.toString());

    const userIdString = parent.user.toString();

    const user = await ctx.loaders.user.load(userIdString);
    const user2 = await ctx.loaders.user.load(userIdString);
    const user3 = await ctx.loaders.user.load(userIdString);

    return user;
  },
  /*
  posts(parent, args, ctx, info) {
  },
  */
};

export default Blog;
