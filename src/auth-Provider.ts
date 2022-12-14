//在真实环境中不需要自己开发

import { User } from "./types/user";

const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = "__auth_provider_token__";

//从localStorage中取得 token
export const getToken = () => window.localStorage.getItem(localStorageKey);

//存储 token
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

//登录
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

//注册
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

//登出
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
