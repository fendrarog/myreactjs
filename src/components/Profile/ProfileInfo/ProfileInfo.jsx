import Preloader from "../../Common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import onStatus from "../../../assets/images/on.png";
import offStatus from "../../../assets/images/off.png";
import noPhoto from "../../../assets/images/nophoto.jpg";
import ProfileStatus from "./ProfileStatus";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserPicture } from "../../../redux/profile-reducer";
import { useEffect, useState } from "react";

const ProfileInfo = ({ isOwnersUserPage }) => {
  const profile = useSelector((state) => state.profilePage.profile);
  const isOwner = useSelector((state) => state.profilePage.isOwner);

  if (!profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div>
        {/* <img
          src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
          alt=""
        /> */}
      </div>
      <div className={s.descriptionBlock}>
        <div>{profile.fullName}</div>
        <img
          src={profile.photos.large ? profile.photos.large : noPhoto}
          alt="#"
          className={s.photoProfile}
        />

        {isOwner && <AddUserPictureForm />}

        <div>{profile.aboutMe}</div>
        <div>
          {profile.contacts.facebook} {profile.contacts.github}{" "}
          {profile.contacts.website} {profile.contacts.vk}{" "}
          {profile.contacts.twitter} {profile.contacts.instagram}
        </div>
        <div>
          <img
            className={s.lfjStatus}
            src={profile.lookingForAJob === true ? onStatus : offStatus}
            alt="#"
          />
          {!profile.lookingForAJobDescription
            ? "статуса нет"
            : profile.lookingForAJobDescription}
        </div>
        <div>
          <ProfileStatus
            isOwner={isOwner}
            isOwnersUserPage={isOwnersUserPage}
          />
        </div>
      </div>
    </div>
  );
};

const AddUserPictureForm = () => {
  const photo = useSelector((state) => state.profilePage.profile.photos);
  const dispatch = useDispatch();
  const { register, reset, handleSubmit } = useForm();
  const [selectedFile, setSelectedFile] = useState(photo);

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    setSelectedFile(selectedFile);
    dispatch(updateUserPicture(selectedFile));
    reset();
  }, [selectedFile, dispatch, reset]);

  /*   const onSubmit = () => {
    dispatch(updateUserPicture(selectedFile));
  }; */

  return (
    <form onSubmit={handleSubmit()}>
      <input {...register("userPicture")} type="file" onChange={onFileChange} className={s.customFileInput} />
    </form>
  );
};

export default ProfileInfo;
