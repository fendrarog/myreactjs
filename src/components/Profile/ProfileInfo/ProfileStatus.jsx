import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserStatus } from "../../../redux/profile-reducer";

const ProfileStatus = () => {
  const statusProps = useSelector((state) => state.profilePage.status);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [statusLocal, setStatusLocal] = useState(statusProps);

  useEffect(() => {
    setStatusLocal(statusProps);
  }, [statusProps]);

  const toggleActivateEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      dispatch(updateUserStatus(statusLocal));
    }
  };

  const onStatusUserChange = (event) => {
    setStatusLocal(event.currentTarget.value);
  };

  return (
    <div>
      {!editMode ? (
        <div>
          <span onClick={toggleActivateEditMode}>
            {statusProps || "------"}
          </span>
        </div>
      ) : (
        <div>
          <input
            onChange={onStatusUserChange}
            onBlur={toggleActivateEditMode}
            autoFocus={true}
            value={statusLocal}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
