module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('post', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    body: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Post.sync();
  return Post;
};
