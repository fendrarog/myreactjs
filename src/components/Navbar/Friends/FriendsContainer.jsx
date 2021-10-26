import StoreContext from "../../../StoreContext";
import Friends from "./Friends";

const FriendsContainer = (props) => {
  //let state = props.store.getState();
  return (
    <StoreContext.Consumer>
      {(store) => {
        let state = store.getState();
        return <Friends state={state} />;
      }}
    </StoreContext.Consumer>
  );
};

export default FriendsContainer;
