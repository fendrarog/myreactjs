import React, { ChangeEvent } from "react";
import s from "./ProfileInfo.module.css";
import noPhoto from "../../../assets/images/nophoto.jpg";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateUserPicture } from "../../../redux/profile-reducer";
import { PhotosType } from "../../../types/types";

type PropsType = {
  photos: PhotosType;
  isOwner: boolean;
};

const ProfilePhotoData: React.FC<PropsType> = ({ photos, isOwner }) => {
  const dispatch = useDispatch();

  const { register } = useForm<{ userPicture: File }>();

  return (
    <>
      <img
        src={photos.large ? photos.large : noPhoto}
        alt="#"
        className={s.photoProfile}
      />
      {isOwner && (
        <div>
          <input
            type="file"
            {...register("userPicture", {
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                e.target.files &&
                  dispatch(updateUserPicture(e.target.files[0]));
              },
            })}
            className={s.customFileInput}
          />
        </div>
      )}
    </>
  );
};

export default ProfilePhotoData;
