const resolvers = require('../graphql/resolvers');

const mockContext = {
  PostAPI: {
    getAllPosts: jest.fn(),
    getPost: jest.fn(),
    createPost: jest.fn(),
    updatePost: jest.fn(),
    deletePost: jest.fn(),
  },
};

const { PostAPI } = mockContext;

const testPost = {
  id: 1,
  title: 'testTitle',
  description: 'testDesc',
  body: 'testBody',
};

describe('Query', () => {
  describe('feed', () => {
    it('returns array of posts', () => {
      PostAPI.getAllPosts.mockReturnValueOnce([testPost]);
      expect(resolvers.Query.feed(null, null, mockContext)).toEqual([testPost]);
    });
  });

  describe('getPost', () => {
    it('returns single post', () => {
      PostAPI.getPost.mockImplementation(({ id }) => (id === 1 ? testPost : null));
      const res = resolvers.Query.getPost(null, {
        id: 1,
      }, mockContext);
      expect(res).toEqual(testPost);
      expect(res.id).toEqual(1);
    });
  });
});

describe('Mutation', () => {
  describe('createPost', () => {
    it('returns created post', () => {
      PostAPI.createPost.mockImplementation(x => x);
      const res = resolvers.Mutation.createPost(null, testPost, mockContext);
      expect(res).toEqual(testPost);
    });
  });

  describe('updatePost', () => {
    it('returns number of updated rows', () => {
      PostAPI.updatePost.mockImplementation(() => 1);
      const res = resolvers.Mutation.updatePost(null, testPost, mockContext);
      expect(res).toBe(1);
    });
  });

  describe('deletePost', () => {
    PostAPI.deletePost.mockImplementation(() => 1);
    const res = resolvers.Mutation.deletePost(null, testPost, mockContext);
    expect(res).toEqual(1);
  });
});
