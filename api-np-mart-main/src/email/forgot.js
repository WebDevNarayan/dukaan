import { send } from "../utils/mail.js";

const template = `
<div>
  Dear {{name}},<br><br>
  We have received a request to reset your password. If you did not make this request, please disregard this email. <br>
  To reset your password, please click on the link below: <br>
  <br>
  <a href="{{link}}">Click Here to Reset </a>
  <br>
  <br>
  This link is valid for the next 24 hours. After this time, you will need to submit a new request to reset your password.
  <br><br>
  If you have any questions or concerns, please do not hesitate to contact us at contact@dukaan.com.
  <br><br>
  Thank you, <br><br>
  Duk@an
</div>
`;

export const sendReset = async ({ email, name, resetToken }) => {
  const link = `${process.env.FRONTEND_URL}/auth/reset/${resetToken}`;

  const html = template.replace("{{name}}", name).replace("{{link}}", link);

  await send(email, "Reset Password", html);
};
