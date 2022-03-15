import s from "./ProfileInfo.module.css";
import noPhoto from "../../../assets/images/nophoto.jpg";
import ProfileStatus from "./ProfileStatus";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  updateOwnersProfile,
  updateUserPicture,
} from "../../../redux/profile-reducer";

const ProfileDataForm = ({
  profile,
  isOwner,
  isOwnersUserPage,
  jumpToNonEditMode,
}) => {
  const dispatch = useDispatch();
  const { photos, ...rest } = profile;
  const { register, handleSubmit } = useForm({
    defaultValues: { ...rest },
  });

  const onSubmit = async (data) => {
    const { userPicture, ...rest } = data;
    await dispatch(updateOwnersProfile(rest));
    jumpToNonEditMode();
  };

  return (
    <div className={s.descriptionBlock}>
      <div className={s.descriptionItem}>
        <img
          src={photos.large ? photos.large : noPhoto}
          alt="#"
          className={s.photoProfile}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.descriptionItem}>
          <input
            type="file"
            {...register("userPicture", {
              onChange: (e) => {
                dispatch(updateUserPicture(e.target.files[0]));
              },
            })}
            className={s.customFileInput}
          />
        </div>
        <div className={s.descriptionItem}>
          <input {...register("fullName")} placeholder="Full name" />
        </div>
        <div className={s.descriptionItem}>
          <b>About me: </b>
          <input {...register("aboutMe")} placeholder="About me" />
        </div>
        <div className={s.descriptionItem}>
          <b>Looking for a job: </b>
          <input type="checkbox" {...register("lookingForAJob")} />
        </div>
        <div className={s.descriptionItem}>
          <b>My professional experience: </b>
          <input
            {...register("lookingForAJobDescription")}
            placeholder="My professional experience"
          />
        </div>
        <div className={s.descriptionItem}>
          <b>Contacts: </b>
          {Object.keys(profile.contacts).map((key) => {
            return (
              <div key={key} className={s.contact}>
                <b>{key} :</b>
                <input {...register("contacts." + key)} placeholder={key} />
              </div>
            );
          })}
        </div>
        <div className={s.descriptionItem}>
          <input type="submit" />
        </div>
      </form>
      <div className={s.descriptionItem}>
        <ProfileStatus isOwner={isOwner} isOwnersUserPage={isOwnersUserPage} />
      </div>
    </div>
  );
};

export default ProfileDataForm;
