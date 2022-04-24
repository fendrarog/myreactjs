import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserStatus } from "../../../redux/profile-reducer";
import { CombinedStateType } from "../../../redux/redux-store";

type PropsType = {
  isOwner: boolean;
};

const ProfileStatus: React.FC<PropsType> = ({ isOwner }) => {
  const statusProps = useSelector(
    (state: CombinedStateType) => state.profilePage.status
  );
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

  const onStatusUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatusLocal(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode ? (
        <div>
          <b>Status: </b>
          <span onClick={isOwner && toggleActivateEditMode}>
            {statusProps || "------"}
          </span>
        </div>
      ) : (
        <div>
          <b>Status: </b>
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
