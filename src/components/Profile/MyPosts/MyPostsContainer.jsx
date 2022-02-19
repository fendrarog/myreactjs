// import React from "react";
import { connect } from "react-redux";
import { addPost } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
// import StoreContext from "../../../StoreContext";

// const MyPostsContainer = (props) => {
//   //let state = props.store.getState();

//   // let addPost = () => {
//   //   props.store.dispatch(addPostActionCreator());
//   // };

//   // let onPostChange = (text) => {
//   //   props.store.dispatch(updateNewPostTextActionCreator(text));
//   // };

//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         let state = store.getState();
//         let addPost = () => {
//           store.dispatch(addPostActionCreator());
//         };

//         let onPostChange = (text) => {
//           store.dispatch(updateNewPostTextActionCreator(text));
//         };
//         return (
//           <MyPosts
//             updateNewPostText={onPostChange}
//             addPost={addPost}
//             postsData={state.profilePage.postsData}
//             newPostText={state.profilePage.newPostText}
//           />
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// };

const mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
  };
};

const MyPostsContainer = connect(mapStateToProps, { addPost })(MyPosts);

export default MyPostsContainer;
