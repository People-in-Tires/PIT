import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_APP_PASSWORD,
  },
});

export async function sendMail(to: string, subject: string, text: string) {
  await transporter.sendMail({
    from: '"PIT" <${proces.env.MAIL_USER}>',
    to,
    subject,
    text,
  });
}
