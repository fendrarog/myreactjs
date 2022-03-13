import Preloader from "../../Common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import onStatus from "../../../assets/images/on.png";
import offStatus from "../../../assets/images/off.png";
import noPhoto from "../../../assets/images/nophoto.jpg";
import ProfileStatus from "./ProfileStatus";
import { useSelector } from "react-redux";
import { useState } from "react";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({ isOwnersUserPage }) => {
  const profile = useSelector((state) => state.profilePage.profile);
  const isOwner = useSelector((state) => state.profilePage.isOwner);

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
          isOwnersUserPage={isOwnersUserPage}
          jumpToNonEditMode={() => setEditMode(false)}
        />
      ) : (
        <ProfileData
          profile={profile}
          isOwner={isOwner}
          isOwnersUserPage={isOwnersUserPage}
          jumpToEditMode={() => setEditMode(true)}
        />
      )}
    </div>
  );
};

const Contact = ({ contactKey, contactValue }) => {
  return (
    <div className={s.contact}>
      <b>{contactKey}: </b>
      {contactValue}
    </div>
  );
};

const ProfileData = ({
  profile,
  isOwner,
  isOwnersUserPage,
  jumpToEditMode,
}) => {
  return (
    <div className={s.descriptionBlock}>
      <div className={s.descriptionItem}>{profile.fullName.toUpperCase()}</div>
      <div className={s.descriptionItem}>
        <img
          src={profile.photos.large ? profile.photos.large : noPhoto}
          alt="#"
          className={s.photoProfile}
        />
      </div>
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
              contactValue={profile.contacts[key]}
            />
          );
        })}
      </div>
      <div className={s.descriptionItem}>
        <ProfileStatus isOwner={isOwner} isOwnersUserPage={isOwnersUserPage} />
      </div>
      {(isOwner || isOwnersUserPage) && (
        <div className={s.descriptionItem}>
          <button onClick={jumpToEditMode}>Edit data</button>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
