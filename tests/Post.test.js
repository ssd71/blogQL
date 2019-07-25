const { PostAPI, Post, rmstmp } = require('../graphql/dataSources');

const testPost = {
  title: 'testTitle',
  description: 'testDesc',
  body: 'testBody',
};

beforeAll(async () => {
  await Post.destroy({
    where: {},
  });
});

afterAll(async () => {
  await Post.destroy({
    where: {},
  });
  await Post.drop();
});

describe('createPost', () => {
  it('should create one row in Post table', () => PostAPI.createPost(testPost).then(async () => {
    const res = await Post.findAll({
      where: testPost,
    });
    expect(res.length).toBe(1);
    testPost.id = res[0].id;
  }));
});

describe('getAllPosts', () => {
  it('should get all posts in the Post table', () => PostAPI.getAllPosts().then((posts) => {
    expect(posts).toEqual([testPost]);
  }));
});

describe('getPost', () => {
  it('should get same post as created', async () => {
    const post = await PostAPI.getPost(testPost);
    expect(post).toEqual(testPost);
  });
});

describe('updatePost', () => {
  beforeEach(async () => {
    await Post.update({
      title: testPost.title,
      description: testPost.description,
      body: testPost.body,
    },
    {
      where: {
        id: testPost.id,
      },
    });
  });

  it('can only modify title', async () => {
    await PostAPI.updatePost({
      id: testPost.id,
      title: 'newtitle',
    });
    const post = await Post.findOne({
      where: {
        id: testPost.id,
      },
    });
    expect(rmstmp(post.toJSON())).toEqual({
      ...testPost,
      title: 'newtitle',
    });
  });

  it('can only modify description', async () => {
    await PostAPI.updatePost({
      id: testPost.id,
      description: 'newdescription',
    });
    const post = await Post.findOne({
      id: testPost.id,
    });
    expect(rmstmp(post.toJSON())).toEqual({
      ...testPost,
      description: 'newdescription',
    });
  });

  it('can only modify body', async () => {
    await PostAPI.updatePost({
      id: testPost.id,
      body: 'newbody',
    });
    const post = await Post.findOne({
      id: testPost.id,
    });
    expect(rmstmp(post.toJSON())).toEqual({
      ...testPost,
      body: 'newbody',
    });
  });
});

describe('deletePost', () => {
  it('should return number of posts deleted', async () => {
    const res = await PostAPI.deletePost(testPost);
    expect(res).toBe(1);
  });
});
