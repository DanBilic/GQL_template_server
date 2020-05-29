//demo user data
const users = [
  {
    id: "1",
    name: "Dan",
    email: "dan@gmail.com",
  },
  {
    id: "2",
    name: "Felix",
    email: "felix@gmail.com",
  },
  {
    id: "3",
    name: "Alex",
    email: "alex@gmail.com",
  },
  {
    id: "4",
    name: "Pumba",
    email: "pumba@gmail.com",
  },
];

const posts = [
  {
    id: "1",
    title: "title 1",
    body: "a",
    user: "1",
    blog: "1",
  },
  {
    id: "2",
    title: "title 2",
    body: "b",
    user: "1",
    blog: "1",
  },
  {
    id: "3",
    title: "title 3",
    body: "a",
    user: "2",
    blog: "1",
  },
  {
    id: "4",
    title: "title 4",
    body: "pu",
    user: "2",
    blog: "1",
  },
];

const blogs = [
  {
    id: "1",
    title: "blog 1",
    topic: "flowers",
    user: "1",
  },
  {
    id: "2",
    title: "blog 2",
    topic: "coding",
    user: "2",
  },
];

const db = {
  users,
  posts,
  blogs,
};

export default db;
