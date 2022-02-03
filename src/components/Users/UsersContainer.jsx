import React from "react";
import { connect } from "react-redux";
import {
  follow,
  toggleIsFetching,
  unfollow,
  toggleFollowingProgress,
  getUsers,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChange = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          onPageChange={this.onPageChange}
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          users={this.props.users}
          isFetching={this.props.isFetching}
          followingProgress={this.props.followingProgress}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          toggleIsFetching={this.props.toggleIsFetching}
          toggleFollowingProgress={this.props.toggleFollowingProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    toggleIsFetching: state.usersPage.toggleIsFetching,
    followingProgress: state.usersPage.followingProgress,
  };
};

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    toggleIsFetching,
    toggleFollowingProgress,
    getUsers,
  }),
  withAuthRedirect
)(UsersContainer);
