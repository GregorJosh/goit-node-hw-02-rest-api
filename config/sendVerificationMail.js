import { configDotenv } from "dotenv";
import { createTransport } from "nodemailer";

configDotenv();

const server = {
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
};

export const sendVerificationMail = async (to, token) => {
  const verificationLink = process.env.BASE_URL + "/users/verify/" + token;

  const message = {
    from: "grzegorz.jozw@gmail.com",
    to,
    subject: "Contacts Manager: New User Verification",
    text:
      "Hello new user!\n\nClick to verification link to verify your new account:\n\n" +
      verificationLink,
  };
  
  await createTransport(server).sendMail(message);
};
