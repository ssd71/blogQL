const resolvers = {
  Query: {
    info: () => 'GraphQL API to access blog posts',
    feed: (_parent, _args, { PostAPI }) => PostAPI.getAllPosts(),
    getPost: (_parent, args, { PostAPI }) => PostAPI.getPost(args),
  },
  Mutation: {
    createPost: (_parent, args, { PostAPI }) => PostAPI.createPost(args),
    updatePost: (_parent, args, { PostAPI }) => PostAPI.updatePost(args),
    deletePost: (_parent, args, { PostAPI }) => PostAPI.deletePost(args),
  },
};

module.exports = resolvers;
