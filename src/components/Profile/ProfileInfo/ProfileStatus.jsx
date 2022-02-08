import React from "react";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  toggleActivateEditMode = (isEditMode) => {
    this.setState({ editMode: isEditMode });
    !isEditMode && this.props.updateUserStatus(this.state.status);
  };

  onStatusUserChange = (e) => {
    this.setState({ status: e.currentTarget.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }

  render() {
    return (
      <>
        {!this.state.editMode ? (
          <div>
            <span
              onDoubleClick={() => {
                this.toggleActivateEditMode(true);
              }}
            >
              {this.props.status}
            </span>
          </div>
        ) : (
          <div>
            <input
              onChange={this.onStatusUserChange}
              autoFocus={true}
              onBlur={() => {
                this.toggleActivateEditMode(false);
              }}
              value={this.state.status}
            />
          </div>
        )}
      </>
    );
  }
}

export default ProfileStatus;
