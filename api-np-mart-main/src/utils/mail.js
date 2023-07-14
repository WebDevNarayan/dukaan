import dotenv from "dotenv"
import nodemailer from "nodemailer"

dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const send = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_ADDRESS,
      to,
      subject,
      html,
    })

    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)

    return info
  } catch (e) {
    console.log(e)
  }
}
