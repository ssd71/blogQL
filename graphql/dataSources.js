const db = require('../models');

const { Post } = db;

const removeTimestamps = instance => ({
  id: instance.id,
  title: instance.title,
  description: instance.description,
  body: instance.body,
});

const PostAPI = {

  // Gets all Posts from database
  getAllPosts: () => Post.findAll()
    .then(posts => posts.map(post => removeTimestamps(post.toJSON()))),

  // Gets a single Post from the database using id
  getPost: ({ id }) => Post.findOne({
    where: {
      id,
    },
  })
    .then(instance => removeTimestamps(instance.toJSON())),

  // Creates new post and returns it
  createPost: ({ title, description, body }) => Post.create({
    title,
    description: description || '',
    body,
  })
    .then(instance => removeTimestamps(instance.toJSON())),

  // Updates existing post with newer values and returns it
  updatePost: ({
    id, title, description, body,
  }) => {
    // Store the current state of post
    const post = Post.findOne({
      where: {
        id,
      },
    })
      .then(instance => removeTimestamps(instance.toJSON()));

    // Update post with new values if passed values are not falsy
    return Post.update({
      title: title || post.title,
      description: description || post.description,
      body: body || post.description,
    },
    {
      where: {
        id,
      },
    });
  },

  // Deletes post and returns 1 on success
  deletePost: ({ id }) => Post.destroy({
    where: {
      id,
    },
  }),
};


module.exports = {
  PostAPI,
};
if (!process.env.DATABASE_URL) {
  module.exports.Post = Post;
  module.exports.rmstmp = removeTimestamps;
}
