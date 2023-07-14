export const generateToken = () => {
  const token = Math.round(100000 + Math.random() * 900000)
  return token
}
