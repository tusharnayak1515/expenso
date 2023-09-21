import { getCookie } from "cookies-next";

let isUser = null;
let isProfile = null;

if (getCookie("authorization")) {
  isUser = getCookie("authorization");
} else {
  isUser = null;
}

if (typeof localStorage !== "undefined") {
  if (localStorage.getItem("expenso_user_profile")) {
    isProfile = JSON.parse(localStorage.getItem("expenso_user_profile")!);
  } else {
    isProfile = null;
  }
}

const initState = {
  user: isUser,
  profile: isProfile,
};

const userReducer = (state = initState, action: any) => {
  if (action.type === "signup") {
    const { user, profile } = action.payload;
    return {
      ...state,
      user: user,
      profile: profile
    };
  }
  else if (action.type === "signin") {
    const { user, profile } = action.payload;
    return {
      ...state,
      user: user,
      profile: profile
    };
  }
  else if (action.type === "edit-profile") {
    const { profile } = action.payload;
    return {
      ...state,
      profile: profile,
    };
  }
  else if (action.type === "logout") {
    return {
      ...state,
      user: null,
      profile: null
    };
  }
  else {
    return state;
  }
};

export default userReducer;