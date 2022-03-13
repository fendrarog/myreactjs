import s from "./ProfileInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserPicture } from "../../../redux/profile-reducer";
import { useEffect, useState } from "react";

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

  return (
    <form onSubmit={handleSubmit()}>
      <input
        {...register("userPicture")}
        type="file"
        onChange={onFileChange}
        className={s.customFileInput}
      />
    </form>
  );
};

export default AddUserPictureForm;
