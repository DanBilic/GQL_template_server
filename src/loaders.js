import DataLoader from "dataloader";
import Blog from "../models/Blog";
import User from "../models/User";

import _ from "lodash";

const createBlogLoader = () => {
  return new DataLoader((blogIds) => {
    return Blog.find({ _id: { $in: blogIds } })
      .exec()
      .then((blogs) => {
        console.log("blog loader batch: ", blogIds.length);
        const blogsById = _.keyBy(blogs, "_id");
        return blogIds.map((blogId) => blogsById[blogId]);
      });
  });
};

const createBlogsForUserLoader = () => {
  return new DataLoader((userIds) => {
    return Blog.find({ user: { $in: userIds } })
      .exec()
      .then((blogs) => {
        console.log("blogs for user loader batch: ", userIds.length);
        //const userById = _.keyBy(blogs, "_id");
        return userIds.map((userId) => blogs);
      });
  });
};

const createUserLoader = () => {
  return new DataLoader((userIds) => {
    return User.find({ _id: { $in: userIds } })
      .exec()
      .then((users) => {
        console.log("user loader batch: ", userIds.length);
        const usersById = _.keyBy(users, "_id");
        return userIds.map((userId) => usersById[userId]);
      });
  });
};

export default () => {
  return {
    blog: createBlogLoader(),
    user: createUserLoader(),
    blogForUser: createBlogsForUserLoader(),
  };
};
