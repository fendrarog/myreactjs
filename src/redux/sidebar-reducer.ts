let initialState = {
  friendsData: [
    { id: 1, name: "Iana" },
    { id: 2, name: "Pavlik" },
    { id: 3, name: "Duriman" },
    { id: 4, name: "Kalita" },
    { id: 5, name: "Petush" },
    { id: 6, name: "Borovik" },
  ] as Array<FriendsType>,
};
export type initialStateType = typeof initialState;
type FriendsType = {
  id: number;
  name: string;
};

const sidebarReducer = (
  state = initialState,
  action: any
): initialStateType => {
  return state;
};

export default sidebarReducer;
