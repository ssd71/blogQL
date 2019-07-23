const resolvers = {
  Query: {
    info: () => 'GraphQL API to access blog posts',
    feed: (_parent, _args, { models }) => models.Post.findAll(),
    getPost: (_parent, args, { models }) => models.Post.findByPk(args.id),
  },
  Mutation: {
    createPost: (_parent, args, { models }) => models.Post.create({
      title: args.title,
      description: args.description,
      body: args.body,
    }),
    updatePost: (_parent, args, { models }) => {
      models.Post.update({
        title: args.title,
        description: args.description,
        body: args.body,
      },
      {
        where: {
          id: args.id,
        },
      });
    },
    deletePost: (_parent, args, { models }) => {
      models.Post.destroy({
        where: {
          id: args.id,
        },
      });
    },
  },
  Post: {
    id: parent => parent.get('id'),
    title: parent => parent.get('title'),
    description: parent => parent.get('description'),
    body: parent => parent.get('body'),
  },
};

module.exports = resolvers;
