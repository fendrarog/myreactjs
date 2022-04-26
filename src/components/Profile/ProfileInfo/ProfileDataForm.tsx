import React from "react";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateOwnersProfile } from "../../../redux/profile-reducer";
import { ProfileType } from "../../../types/types";
import ProfilePhotoData from "./ProfilePhotoData";

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

  const { register, handleSubmit } = useForm<ProfileType>({
    defaultValues: { ...profile },
  });

  const onSubmit: SubmitHandler<ProfileType> = async (data) => {
    await dispatch(updateOwnersProfile(data));
    jumpToNonEditMode();
  };

  return (
    <div className={s.descriptionBlock}>
      <div className={s.descriptionItem}>
        <ProfilePhotoData photos={profile.photos} isOwner={isOwner} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                <input
                  {...register(
                    `contacts.${key as keyof ContactsInterface & string}` //или `contacts.${key as keyof typeof profile.contacts & string}`
                  )}
                  placeholder={key}
                />
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

interface ContactsInterface {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};