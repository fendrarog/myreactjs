import s from "./ProfileInfo.module.css";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserPicture } from "../../../redux/profile-reducer";

const AddUserPictureForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit()}>
      <input
        type="file"
        {...register("userPicture", {
          onChange: (e) => {
            dispatch(updateUserPicture(e.target.files[0]));
          },
        })}
        className={s.customFileInput}
      />
    </form>
  );
};

export default AddUserPictureForm;
