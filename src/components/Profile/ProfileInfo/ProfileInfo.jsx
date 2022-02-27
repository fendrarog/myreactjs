import Preloader from "../../Common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import onStatus from "../../../assets/images/on.png";
import offStatus from "../../../assets/images/off.png";
import noPhoto from "../../../assets/images/nophoto.jpg";
import ProfileStatus from "./ProfileStatus";
import { useSelector } from "react-redux";

const ProfileInfo = (props) => {
  const profile = useSelector((state) => state.profilePage.profile);

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
          src={profile.photos.large != null ? profile.photos.large : noPhoto}
          alt="#"
        />
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
            status={props.status}
            updateUserStatus={props.updateUserStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
