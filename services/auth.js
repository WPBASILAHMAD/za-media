// services/auth.js
import httpService from "./http";
import config from "./config.json";
import { getAdminEmails } from "./helper";
import { setItem, getItem, removeItem } from "./storage";

const { api_url } = config;

export function loginUser(user_info) {
  return new Promise((resolve, reject) => {
    const url = `${api_url}/auth/login`;
    httpService
      .post(url, user_info)
      .then(async (response) => {
        const data = response.data;
        if (!data.error) {
          await login_user_locally(data);
          resolve(data);
        } else {
          reject(new Error(data.message));
        }
      })
      .catch((error) => {
        reject(new Error(error.message));
      });
  });
}

export function SignUpUser(user_info) {
  return new Promise((resolve, reject) => {
    const url = `${api_url}/auth/signup`;
    httpService
      .post(url, user_info)
      .then(async (response) => {
        const data = response.data;
        if (!data.error) {
          await login_user_locally(data);
          resolve(data);
        } else {
          reject(new Error(data.message));
        }
      })
      .catch((error) => {
        reject(new Error(error.response.data));
      });
  });
}

export function ProfileUpdate(user_info) {
  return new Promise((resolve, reject) => {
    const url = `${api_url}/auth/profile`;
    httpService
      .post(url, user_info)
      .then(async (response) => {
        const data = response.data;
        if (!data.error) {
          await setItem("zm_user", data.data);
          resolve(data);
        } else {
          reject(new Error(data.message));
        }
      })
      .catch((error) => {
        reject(new Error(error.response.data));
      });
  });
}

export function ChangePassword(data) {
  return new Promise((resolve, reject) => {
    const url = `${api_url}/auth/change-password`;
    httpService
      .post(url, data)
      .then((response) => {
        const data = response.data;
        if (!data.error) {
          resolve(data);
        } else {
          reject(new Error(data.message));
        }
      })
      .catch((error) => {
        reject(new Error(error.response.data));
      });
  });
}

export function ResetPassword(data) {
  return new Promise((resolve, reject) => {
    const url = `${api_url}/auth/reset-password`;
    httpService
      .post(url, data)
      .then((response) => {
        const data = response.data;
        if (!data.error) {
          resolve(data);
        } else {
          reject(new Error(data.message));
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          reject(new Error(error.response.data.message || "An error occurred"));
        } else {
          reject(new Error(error.message));
        }
      });
  });
}

export function ForgetPassword(data) {
  return new Promise((resolve, reject) => {
    const url = `${api_url}/auth/login/forget`;
    httpService
      .post(url, data)
      .then((response) => {
        const data = response.data;
        if (!data.error) {
          resolve(data);
        } else {
          reject(new Error(data.message));
        }
      })
      .catch((error) => {
        reject(new Error(error.response.data));
      });
  });
}

export async function login_user_locally(user_data) {
  await setItem("zm_user", user_data.user_info);
  await setItem("zm_token", user_data.token);
}

export async function logout() {
  await removeItem("zm_user");
  await removeItem("zm_token");
}

export async function getUserID() {
  try {
    const user = await getItem("zm_user");
    const parsedUser = JSON.parse(user);
    return parsedUser.user_id;
  } catch (ex) {
    return null;
  }
}

export async function getUserName() {
  try {
    const user = await getItem("zm_user");
    const parsedUser = JSON.parse(user);
    return parsedUser.user_name;
  } catch (ex) {
    return null;
  }
}

export async function isAdmin() {
  try {
    const user = await getItem("zm_user");
    const parsedUser = JSON.parse(user);
    const admin_emails = getAdminEmails();
    return admin_emails.split(",").includes(parsedUser.user_email.trim());
  } catch (ex) {
    return null;
  }
}

export async function getCurrentUser() {
  try {
    const user = await getItem("zm_user");
    return JSON.parse(user);
  } catch (ex) {
    return null;
  }
}

export default {
  loginUser,
  logout,
  getCurrentUser,
  ProfileUpdate,
};