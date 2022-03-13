import s from "./ProfileInfo.module.css";
import noPhoto from "../../../assets/images/nophoto.jpg";
import ProfileStatus from "./ProfileStatus";

import AddUserPictureForm from "./AddUserPictureForm";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateOwnersProfile } from "../../../redux/profile-reducer";

const ProfileDataForm = ({
  profile,
  isOwner,
  isOwnersUserPage,
  jumpToNonEditMode,
}) => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: profile.fullName.toUpperCase(),
      aboutMe: profile.aboutMe,
      lookingForAJob: profile.lookingForAJob,
      lookingForAJobDescription: profile.lookingForAJobDescription,
    },
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    jumpToNonEditMode();
    dispatch(updateOwnersProfile(data));
  };

  return (
    <div className={s.descriptionBlock}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.descriptionItem}>
          <input {...register("fullName")} />
        </div>
        <div className={s.descriptionItem}>
          <img
            src={profile.photos.large ? profile.photos.large : noPhoto}
            alt="#"
            className={s.photoProfile}
          />
        </div>
        <div className={s.descriptionItem}>
          <AddUserPictureForm />
        </div>
        <div className={s.descriptionItem}>
          <b>About me: </b>
          <input {...register("aboutMe")} />
        </div>
        <div className={s.descriptionItem}>
          <b>Looking for a job: </b>
          <input {...register("lookingForAJob")} type="checkbox" />
        </div>
        <div className={s.descriptionItem}>
          <b>My professional experience: </b>
          <input {...register("lookingForAJobDescription")} />
        </div>
        {/* <div className={s.descriptionItem}>
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
        </div> */}
        <div className={s.descriptionItem}>
          <ProfileStatus
            isOwner={isOwner}
            isOwnersUserPage={isOwnersUserPage}
          />
        </div>
        <div className={s.descriptionItem}>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

/* const Contact = ({ contactKey, contactValue }) => {
  return (
    <div className={s.contact}>
      <b>{contactKey}: </b>
      {contactValue}
    </div>
  );
}; */

export default ProfileDataForm;
