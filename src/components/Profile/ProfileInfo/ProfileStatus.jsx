import React from "react";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  toggleActivateEditMode = () => {
    !this.state.editMode
      ? this.setState({ editMode: true })
      : this.setState({ editMode: false });
    this.props.updateUserStatus(this.state.status);
  };

  onStatusUserChange = (e) => {
    this.setState({ status: e.currentTarget.value });
  };

  render() {
    return (
      <>
        {!this.state.editMode ? (
          <div>
            <span onDoubleClick={this.toggleActivateEditMode}>
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
