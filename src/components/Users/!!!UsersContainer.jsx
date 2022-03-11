import React from "react";
import { connect } from "react-redux";
import {
  follow,
  toggleIsFetching,
  unfollow,
  toggleFollowingProgress,
  requestUsers,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import { compose } from "redux";
import {
  selectCurrentPage,
  selectFollowingProgress,
  selectHandleUsers,
  selectIsFetching,
  selectPageSize,
  selectToggleIsFetching,
  selectTotalUsersCount,
  } from "../../redux/users-selectors";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChange = (pageNumber) => {
    this.props.requestUsers(pageNumber, this.props.pageSize);
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
    users: selectHandleUsers(state),
    pageSize: selectPageSize(state),
    totalUsersCount: selectTotalUsersCount(state),
    currentPage: selectCurrentPage(state),
    isFetching: selectIsFetching(state),
    toggleIsFetching: selectToggleIsFetching(state),
    followingProgress: selectFollowingProgress(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    toggleIsFetching,
    toggleFollowingProgress,
    requestUsers,
  })
)(UsersContainer);
