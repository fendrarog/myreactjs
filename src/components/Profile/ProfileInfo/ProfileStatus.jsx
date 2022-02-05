import React from "react";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
  };

  toggleActivateEditMode = () => {
    !this.state.editMode
      ? this.setState({ editMode: true })
      : this.setState({ editMode: false });
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
              autoFocus={true}
              onBlur={this.toggleActivateEditMode}
              value={this.props.status}
            />
          </div>
        )}
      </>
    );
  }
}

export default ProfileStatus;
