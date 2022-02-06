import Preloader from "../../Common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import onStatus from "../../../assets/images/on.png";
import offStatus from "../../../assets/images/off.png";
import noPhoto from "../../../assets/images/nophoto.jpg";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
  if (!props.profile) {
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
        <div>{props.profile.fullName}</div>
        <img
          src={
            props.profile.photos.large != null
              ? props.profile.photos.large
              : noPhoto
          }
          alt="#"
        />
        <div>{props.profile.aboutMe}</div>
        <div>
          {props.profile.contacts.facebook} {props.profile.contacts.github}{" "}
          {props.profile.contacts.website} {props.profile.contacts.vk}{" "}
          {props.profile.contacts.twitter} {props.profile.contacts.instagram}
        </div>
        <div>
          <img
            className={s.lfjStatus}
            src={props.profile.lookingForAJob === true ? onStatus : offStatus}
            alt="#"
          />
          {!props.profile.lookingForAJobDescription
            ? "статуса нет"
            : props.profile.lookingForAJobDescription}
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
