import { connect } from "react-redux";
import Friends from "./Friends";
// import StoreContext from "../../../StoreContext";

// const FriendsContainer = (props) => {
//   //let state = props.store.getState();
//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         let state = store.getState();
//         return <Friends state={state} />;
//       }}
//     </StoreContext.Consumer>
//   );
// };

const mapStateToProps = (state) => {
  return {
    friendsData: state.sidebar.friendsData,
  };
};

const FriendsContainer = connect(mapStateToProps)(Friends);

export default FriendsContainer;
