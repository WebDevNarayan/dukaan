import argon2 from "argon2"
import User from "../models/User.js"

const create = async ({ name, email, password, role, token }) => {
  const hashedPassword = await argon2.hash(password)
  const user = new User({
    name,
    email,
    password: hashedPassword,
    role,
    token,
  })
  return await user.save()
}

const findById = async (id) => {
  return await User.findById(id)
}

const findByEmail = async (email) => {
  return await User.findOne({
    email,
  })
}

const UserService = {
  create,
  findById,
  findByEmail,
}

export default UserService
