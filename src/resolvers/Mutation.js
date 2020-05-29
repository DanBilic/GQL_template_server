import { v4 as uuidv4 } from "uuid";
import User from "../../models/User";
import Blog from "../../models/Blog";
import Post from "../../models/Post";

const Mutation = {
  createUser: async (parent, args, ctx, info) => {
    const { data } = args;
    console.log("data :", data);

    const user = await User.create(data);
    console.log("User :", user);

    return user;
  },
  deleteUser: async (parent, args, ctx, info) => {
    const { id } = args;
    let user = await User.findById(id);

    if (!user) {
      throw new Error(`User not found with id: ${id}`.red);
    }

    user = await user.remove();

    return user;
  },
  updateUser: async (parent, args, ctx, info) => {
    const { id, data } = args;

    let user = await User.findById(id);
    console.log("user : ", user);
    if (!user) {
      throw new Error(`User not found with id: ${id}`.red);
    }

    user = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return user;
  },
  createPost: async (parent, args, ctx, info) => {
    const { data } = args;
    const { pubsub } = ctx;

    let user = await User.findById(data.user);
    if (!user) {
      throw new Error(`User not found with id: ${data.user}`.red);
    }

    let blog = await Blog.findById(data.blog);
    if (!blog) {
      throw new Error(`User not found with id: ${data.blog}`.red);
    }

    const post = await Post.create(data);

    //alle subscriber über das erstellen des posts informieren
    pubsub.publish(`post ${data.user}`, { post: post });
    pubsub.publish("posts_listen", { allPosts: post });

    return post;
  },
  deletePost: async (parent, args, ctx, info) => {
    const { id } = args;
    let post = await Post.findById(id);

    if (!post) {
      throw new Error(`Post not found with id: ${did}`.red);
    }

    post = await post.remove();
    return post;
  },
  updatePost: async (parent, args, ctx, info) => {
    const { id, data } = args;
    let post = await Post.findById(id);
    // console.log("user : ", post);
    if (!post) {
      throw new Error(`post not found with id: ${id}`.red);
    }

    post = await Post.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return post;
  },
  createBlog: async (parent, args, ctx, info) => {
    const { data } = args;
    const user = User.findById(data.user);
    if (!user) {
      throw new Error(`User not found with id: ${id}`.red);
    }

    const blog = await Blog.create(data);

    return blog;
  },
  deleteBlog: async (parent, args, ctx, info) => {
    const { id } = args;
    let blog = await Blog.findById(id);

    if (!blog) {
      throw new Error(`Blog not found with id: ${id}`.red);
    }

    blog = await blog.remove();

    return blog;
  },
  updateBlog: async (parent, args, ctx, info) => {
    const { id, data } = args;
    let blog = await Blog.findById(id);
    console.log("user : ", blog);
    if (!blog) {
      throw new Error(`Blog not found with id: ${id}`.red);
    }

    blog = await Blog.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return blog;
  },
};

export default Mutation;
