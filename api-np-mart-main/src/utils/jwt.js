import jwt from "jsonwebtoken"
import { returnUser } from "./return.js"

const accessTokenConfig = {
  expiresIn: "7d",
}

const generateAccessToken = (user) => {
  return jwt.sign(
    returnUser(user),
    process.env.ACCESS_TOKEN_SECRET,
    accessTokenConfig
  )
}

export const createAuthTokens = (user) => {
  const accessToken = generateAccessToken(user)

  return {
    accessToken,
  }
}
