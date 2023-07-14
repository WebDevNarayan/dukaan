import AuthService from "../services/auth.service.js"
import { returnUser } from "../utils/return.js"

/**
 * @type {import('express').RequestHandler}
 */
const register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const data = await AuthService.register({ name, email, password })

    res.cookie("accessToken", data.accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })

    return res.status(201).json({
      message: "User created successfully",
      ...data,
    })
  } catch (e) {
    if (e.code === 11000) {
      e.message = "The user with this email already exists."
    }
    return res.status(400).json({
      message: e.message || "Something went wrong",
      errors: {
        email: e.message,
      },
    })
  }
}

const verify = async (req, res) => {
  const { id, token } = req.params
  try {
    const user = await AuthService.verify({ id, token, req })

    return res.status(200).json({
      message: "User verified successfully",
      user: returnUser(user),
    })
  } catch (e) {
    return res.status(400).json({
      message: e.message || "Something went wrong",
      errors: {
        token: e.message
      }
    })
  }
}

const resendVerification = async (req, res) => {
  const {email} = req.body
  try {
    await AuthService.resendVerification({email})

    return res.status(200).json({
      message: "Verificatin email send successfully"
    })
  } catch(e) {
    return res.status(400).json({
      message: e.message || "Something went wrong"
    })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const data = await AuthService.login({ email, password })

    res.cookie("accessToken", data.accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })

    return res.status(200).json({
      message: "User logged in successfully",
      ...data,
    })
  } catch (e) {
    return res.status(400).json({
      message: e.message || "Something went wrong",
    })
  }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body
  try {
    await AuthService.forgotPassword({ email })

    return res.status(200).json({
      message: "Password reset link sent successfully",
    })
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      message: e.message || "Something went wrong",
    })
  }
}

const resetPassword = async (req, res) => {
  const { resetToken, email, newPassword } = req.body

  try {
    await AuthService.resetPassword({ resetToken, email, newPassword })

    return res.status(200).json({
      message: "Password reset successfully",
    })
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      message: e.message || "Something went wrong",
    })
  }
}

const me = async (req, res) => {
  return res.status(200).json({
    user: req.user,
  })
}

const AuthController = {
  register,
  verify,
  login,
  forgotPassword,
  resetPassword,
  me,
  resendVerification,
}

export default AuthController
