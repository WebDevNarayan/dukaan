export const returnUser = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    verfication_sent_at: user.verification_sent_at,
    verified_at: user.verified_at,
  }
}
