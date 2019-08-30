const initalState = {
  username: "",
  profileImg: "",
  userId: 1
};

const SET_USER = "SET_USER";
export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

export default (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      const { username, profileImg, userId } = payload;
      return { ...state, username, profileImg, userId };
    default:
      return state;
  }
};
