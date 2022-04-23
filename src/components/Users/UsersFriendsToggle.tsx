import React from "react";
import s from "./Users.module.css";

type PropsType = {
  isFriends: null | boolean;
  setFrdTgglInit: (isFrd: null | boolean) => void;
};

const UsersFriendsToggle: React.FC<PropsType> = ({
  isFriends,
  setFrdTgglInit,
}) => {
  return (
    <div className={s.paginator}>
      <button
        disabled={isFriends === null}
        onClick={() => {
          setFrdTgglInit(null);
        }}
      >
        Все ползователи
      </button>
      <button
        disabled={isFriends}
        onClick={() => {
          setFrdTgglInit(true);
        }}
      >
        Друзья
      </button>
      <button
        disabled={isFriends === false}
        onClick={() => {
          setFrdTgglInit(false);
        }}
      >
        Пользователи
      </button>
    </div>
  );
};

export default UsersFriendsToggle;
