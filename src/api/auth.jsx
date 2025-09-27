import { callApi } from "./callApi";

export const login = (credentials) => callApi("post", "/auth/login", credentials);

export const signUp = (params) => callApi("post", "/auth/register", params);

export const resendVerificationEmail = (params) =>
  callApi("post", "/auth/re-send-verification", params);

export const verifyEmail = (token) => callApi("get", `/auth/verify?token=${token}`);

export const forgotPassword = (params) => callApi("post", "/auth/forgot-password", params);

export const resetPassword = (params) => callApi("post", "/auth/reset-password", params);