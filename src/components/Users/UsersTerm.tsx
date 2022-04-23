import React from "react";

type PropsType = {
  setTermState: (t: string) => void;
};

const UsersTerm: React.FC<PropsType> = ({ setTermState }) => {
  return (
    <>
      <label>
        Поиск{" "}
        <input
          type="text"
          onChange={(e) => {
            setTermState(`&term=${e.currentTarget.value}`);
          }}
          //value={termState}
        />
      </label>
    </>
  );
};

export default UsersTerm;
