import { connect } from "react-redux";
import {
  follow,
  toggleIsFetching,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  unfollow,
} from "../../redux/users-reducer";
import UsersAPIComponent from "./UsersAPIComponent";

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
  };
};



export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
})(UsersAPIComponent);
