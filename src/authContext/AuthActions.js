export const loginStart = () => ({
  type: "LOGIN_START",
});
export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const loginFailure = () => ({
  type: "LOGIN_FAILURE",
});

//logout

export const logout = () => ({
  type: "LOGOUT",
});

//follow
export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

//unfollow
export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});

export const subscribe = () => ({
  type: "SUBSCRIBED",
});
