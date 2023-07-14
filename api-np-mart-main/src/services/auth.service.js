import argon2 from "argon2";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import { sendReset } from "../email/forgot.js";
import { sendVerify } from "../email/verify.js";
import { createAuthTokens } from "../utils/jwt.js";
import { returnUser } from "../utils/return.js";
import { generateToken } from "../utils/token.js";
import UserService from "./user.service.js";

const register = async ({ name, email, password, role = "user" }) => {
  const token = generateToken();

  const user = await UserService.create({
    name,
    email,
    password,
    token,
    role,
    verification_sent_at: new Date(),
  });
  const { accessToken } = createAuthTokens(user);

  await sendVerify(email, token);

  return {
    user: returnUser(user),
    accessToken,
  };
};

const resendVerification = async ({ email }) => {
  const user = await UserService.findByEmail(email);

  if (!user) {
    throw Error("The user is already verified");
  }

  const token = generateToken();
  user.token = token;
  user.verification_sent_at = new Date();

  await user.save();
  await sendVerify(email, token);
  return true;
};

const verify = async ({ id, token, req }) => {
  const user = await UserService.findById(id);

  if (!user) {
    throw Error("The user does not exist");
  }
  const userId = user._id.toString();
  if (req.user.id !== userId) {
    throw Error("You are not authorized to verify this user");
  }

  if (user.verified_at) {
    throw Error("The user is already verified");
  }

  if (user.token !== token) {
    throw Error("The token is not valid");
  }

  const verification_sent_at = new Date(user.verification_sent_at);
  const verification_expire_date = verification_sent_at + 1000 * 60 * 60;
  if (verification_expire_date < new Date()) {
    throw Error("The token has expired");
  }

  user.verified_at = new Date();
  user.token = null;

  await user.save();

  return user;
};

const login = async ({ email, password }) => {
  const user = await UserService.findByEmail(email);

  if (!user) {
    throw Error("The given credentials are not valid");
  }

  const isPasswordValid = await argon2.verify(user.password, password);

  if (!isPasswordValid) {
    throw Error("The given credentials are not valid");
  }

  const { accessToken } = createAuthTokens(user);

  return {
    user: returnUser(user),
    accessToken,
  };
};

const forgotPassword = async ({ email }) => {
  const user = await UserService.findByEmail(email);

  if (!user) {
    throw Error("The given credentials are not valid");
  }

  const resetToken = uuid();
  user.reset_token = resetToken;
  user.reset_token_sent_at = new Date();

  await user.save();

  await sendReset({ email, name: user.name, resetToken });

  return {
    message: "Reset link sent successfully",
  };
};

const resetPassword = async ({ resetToken, email, newPassword }) => {
  const user = await UserService.findByEmail(email);

  if (!user) {
    throw Error("The given credentials are not valid");
  }

  if (user.reset_token !== resetToken) {
    throw Error("The token is not valid");
  }

  const resetTokenSentAt = dayjs(user.reset_token_sent_at);
  const resetTokenExpireDate = resetTokenSentAt.add(24, "hour");

  if (resetTokenExpireDate.isBefore(dayjs())) {
    throw Error("The token has expired");
  }

  user.password = await argon2.hash(newPassword);
  user.reset_token = null;

  await user.save();

  return {
    message: "Password reset successfully",
  };
};

const AuthService = {
  register,
  verify,
  login,
  forgotPassword,
  resetPassword,
  resendVerification,
};

export default AuthService;
