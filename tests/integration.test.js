const { createTestClient } = require('apollo-server-testing');
const gql = require('graphql-tag');
// const { graphqlserver } = require('../');
const { constructTestServer } = require('./__utils__');


const mockContext = {
  PostAPI: {
    getAllPosts: jest.fn(),
    getPost: jest.fn(),
    createPost: jest.fn(),
    updatePost: jest.fn(),
    deletePost: jest.fn(),
  },
};

const testPost = {
  id: 1,
  title: 'testTitle',
  description: 'testDesc',
  body: 'testBody',
};

const GET_ALL_POSTS = gql`
  query {
    feed {
      id
      description
      title
      body
    }
  }
`;

const GET_POST = gql`
  query getPost($id: Int!) {
    getPost(id: $id){
      id
      title
      description
      body
    }
  }
`;

const UPDATE_POST = gql`
  mutation updatePost($id: Int!) {
    updatePost(id: $id, title:"this sucks")
  }
`;

const CREATE_POST = gql`
mutation createPost($title: String!, $description: String, $body: String!) {
    createPost(title: $title, description: $description, body: $body) {
      id
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($id: Int!) {
    deletePost(id: $id)
  }
`;

describe('Queries', () => {
  it('gets all posts', async () => {
    mockContext.PostAPI.getAllPosts.mockReturnValueOnce([testPost]);
    const server = constructTestServer(mockContext);
    const { query } = createTestClient(server);
    const res = await query({ query: GET_ALL_POSTS });
    expect(res).toMatchSnapshot();
  });

  it('gets a single post', async () => {
    mockContext.PostAPI.getPost.mockReturnValueOnce(testPost);
    const server = constructTestServer(mockContext);
    const { query } = createTestClient(server);
    const res = await query({ query: GET_POST, variables: { id: 1 } });
    expect(res).toMatchSnapshot();
  });
});

describe('Mutations', () => {
  it('creates single post', async () => {
    mockContext.PostAPI.createPost.mockReturnValueOnce(testPost);
    const server = constructTestServer(mockContext);
    const { query } = createTestClient(server);
    const res = await query({
      query: CREATE_POST,
      variables: {
        title: testPost.title, body: testPost.body,
      },
    });
    expect(res).toMatchSnapshot();
  });

  it('updates existing post', async () => {
    mockContext.PostAPI.updatePost.mockImplementation(id => (id === 1 ? [1] : [0]));
    const server = constructTestServer(mockContext);
    const { query } = createTestClient(server);
    const res = await query({ query: UPDATE_POST, variables: { id: 1 } });
    expect(res).toMatchSnapshot();
  });

  it('deletes single post', async () => {
    mockContext.PostAPI.deletePost.mockImplementation(id => (id === 1 ? 1 : 0));
    const server = constructTestServer(mockContext);
    const { query } = createTestClient(server);
    const res = await query({ query: DELETE_POST, variables: { id: 1 } });
    expect(res).toMatchSnapshot();
  });
});
