import profileReducer, { addPost, deletePost } from "./profile-reducer";

let state = {
  postsData: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 9 },
    { id: 3, message: "GG WP", likesCount: 3 },
    { id: 4, message: "Ez katka", likesCount: 7 },
  ],
};

test("after adding length of messages should be increment", () => {
  // 1. test data
  let action = addPost("something for test");
  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectations
  expect(newState.postsData.length).toBe(5);
});

test("message of new post should be correct", () => {
  // 1. test data
  let action = addPost("something for test");
  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectations
  expect(newState.postsData[4].message).toBe("something for test");
});

test("after deleting length of messages should be decrement", () => {
  // 1. test data
  let action = deletePost(1);
  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectations
  expect(newState.postsData.length).toBe(3);
});

test("after deleting length of messages shouldn't be decrement if id isn't correct", () => {
  // 1. test data
  let action = deletePost(1000000);
  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectations
  expect(newState.postsData.length).toBe(4);
});