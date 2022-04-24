import s from "./ProfileInfo.module.css";
import noPhoto from "../../../assets/images/nophoto.jpg";
import ProfileStatus from "./ProfileStatus";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  updateOwnersProfile,
  updateUserPicture,
} from "../../../redux/profile-reducer";
import { ContactsType, ProfileType } from "../../../types/types";
import { ChangeEvent } from "react";

type PropsType = {
  profile: ProfileType;
  isOwner: boolean;
  jumpToNonEditMode: () => void;
};

const ProfileDataForm: React.FC<PropsType> = ({
  profile,
  isOwner,
  jumpToNonEditMode,
}) => {
  const dispatch = useDispatch();

  const { photos, ...restProfile } = profile;

  type LoginData = {
    userPicture: File;
    aboutMe: string;
    userId: number;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    contacts: ContactsType;
  };

  const { register, handleSubmit } = useForm<LoginData>({
    defaultValues: { ...restProfile },
  });

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    const { userPicture, ...restProfile } = data;
    await dispatch(updateOwnersProfile(restProfile));
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
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
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
          {Object.keys(profile.contacts).map((key: keyof ContactsType) => {
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
        <ProfileStatus isOwner={isOwner} />
      </div>
    </div>
  );
};

export default ProfileDataForm;
