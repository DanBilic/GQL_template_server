import Blog from "../../models/Blog";
import User from "../../models/User";

const Post = {
  user: async (parent, args, ctx, info) => {
    const user = await User.findById(parent.user);
    return user;
  },
  blog: async (parent, args, ctx, info) => {
    const blog = await Blog.findById(parent.blog);
    return blog;
  },
};

export default Post;
