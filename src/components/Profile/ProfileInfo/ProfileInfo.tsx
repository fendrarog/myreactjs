import React from "react";
import Preloader from "../../Common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import onStatus from "../../../assets/images/on.png";
import offStatus from "../../../assets/images/off.png";
import ProfileStatus from "./ProfileStatus";
import { useSelector } from "react-redux";
import { useState } from "react";
import ProfileDataForm from "./ProfileDataForm";
import { CombinedStateType } from "../../../redux/redux-store";
import { ContactsType, ProfileType } from "../../../types/types";
import ProfilePhotoData from "./ProfilePhotoData";

const ProfileInfo: React.FC<{}> = () => {
  const profile = useSelector(
    (state: CombinedStateType) => state.profilePage.profile
  );
  const isOwner = useSelector(
    (state: CombinedStateType) => state.profilePage.isOwner
  );

  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  return (
    <div>
      {editMode ? (
        <ProfileDataForm
          profile={profile}
          isOwner={isOwner}
          jumpToNonEditMode={() => setEditMode(false)}
        />
      ) : (
        <ProfileData
          profile={profile}
          isOwner={isOwner}
          jumpToEditMode={() => setEditMode(true)}
        />
      )}
    </div>
  );
};

type PropsProfileDataType = {
  profile: ProfileType;
  isOwner: boolean;
  jumpToEditMode: () => void;
};

const ProfileData: React.FC<PropsProfileDataType> = ({
  profile,
  isOwner,
  jumpToEditMode,
}) => {
  return (
    <div className={s.descriptionBlock}>
      <div className={s.descriptionItem}>
        <ProfilePhotoData photos={profile.photos} isOwner={isOwner} />
      </div>
      <div className={s.descriptionItem}>{profile.fullName.toUpperCase()}</div>
      <div className={s.descriptionItem}>
        <b>About me: </b>
        {profile.aboutMe}
      </div>
      <div className={s.descriptionItem}>
        <b>Looking for a job: </b>
        <img
          className={s.lfjStatus}
          src={profile.lookingForAJob ? onStatus : offStatus}
          alt="#"
        />
      </div>
      {profile.lookingForAJob && (
        <div className={s.descriptionItem}>
          <b>My professional experience: </b>
          {profile.lookingForAJobDescription}
        </div>
      )}
      <div className={s.descriptionItem}>
        <b>Contacts: </b>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactKey={key}
              contactValue={profile.contacts[key as keyof ContactsType]}
            />
          );
        })}
      </div>
      {isOwner && (
        <div className={s.descriptionItem}>
          <button onClick={jumpToEditMode}>Edit data</button>
        </div>
      )}
      <div className={s.descriptionItem}>
        <ProfileStatus isOwner={isOwner} />
      </div>
    </div>
  );
};

type PropsContactType = {
  contactKey: string;
  contactValue: string;
};

const Contact: React.FC<PropsContactType> = ({ contactKey, contactValue }) => {
  return (
    <div className={s.contact}>
      <b>{contactKey}: </b>
      {contactValue}
    </div>
  );
};

export default ProfileInfo;
