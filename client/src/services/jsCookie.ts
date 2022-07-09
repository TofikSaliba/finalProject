import Cookie from "js-cookie";

export const SetCookie = (cookieName: string, value: string) => {
  Cookie.set(cookieName, value, {
    expires: 7,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
};

export const GetCookie = (cookieName: string) => {
  return Cookie.get(cookieName);
};

export const RemoveCookie = (cookieName: string) => {
  Cookie.remove(cookieName);
};
