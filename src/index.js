const fs = require("fs");
const { makeExecutableSchema } = require("graphql-tools");

import { GraphQLServer, PubSub } from "graphql-yoga";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "../config/mongo_db";

import { useSofa } from "sofa-api";

import db from "./db";

import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Blog from "./resolvers/Blog";
import Subscription from "./resolvers/Subscription";

import loaders from "./loaders";

const resolvers = { Query, Mutation, User, Post, Blog, Subscription };

//!! path relative to the root path
dotenv.config({ path: "./config/config.env" });

//connect to mongodb
connectDB();

const typeDefs = fs.readFileSync("./src/schema.graphql", "utf8");
const schema = makeExecutableSchema({ typeDefs, resolvers });

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Blog,
    Subscription,
  },
  context: {
    db,
    pubsub,
    loaders: loaders(),
  },
});

server.express.use("/http-api", useSofa({ schema }));

server.start(() => {
  console.log("The server is up".yellow);
});
