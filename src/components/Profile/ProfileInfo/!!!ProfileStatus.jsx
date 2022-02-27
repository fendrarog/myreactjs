import React from "react";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  toggleActivateEditMode = () => {
    this.setState({ ...this.state, editMode: !this.state.editMode });
    if (this.state.editMode) {
      this.props.updateUserStatus(this.state.status)
    }
  };

  onStatusUserChange = (e) => {
    this.setState({ ...this.state, status: e.currentTarget.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({ ...this.state, status: this.props.status });
    }
  }

  render() {
    return (
      <>
        {!this.state.editMode ? (
          <div>
            <span onClick={this.toggleActivateEditMode}>
              {this.props.status}
            </span>
          </div>
        ) : (
          <div>
            <input
              onChange={this.onStatusUserChange}
              autoFocus={true}
              onBlur={this.toggleActivateEditMode}
              value={this.state.status}
            />
          </div>
        )}
      </>
    );
  }
}

export default ProfileStatus;
