import User from "../../models/User";

const Subscription = {
  post: {
    subscribe(parent, args, ctx, info) {
      const { userId } = args;
      const { pubsub } = ctx;

      //existiert der user auf dessen subscription man hören will
      const user = User.findById(userId);

      if (!user) {
        throw new Error("Post not found");
      }
      //channel post userId erzeugen
      return pubsub.asyncIterator(`post ${userId}`);
    },
  },
  allPosts: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator(`posts_listen`);
    },
  },
};

export default Subscription;
