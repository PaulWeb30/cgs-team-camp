import nodemailer from 'nodemailer';

export const sendEmail = (userEmail: string, link: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NO_REPLY_EMAIL,
      pass: process.env.NO_REPLY_PASS
    }
  });

  return transporter.sendMail({
    from: 'No reply',
    to: userEmail,
    subject: 'Activate your account',
    html: `<div>
    <h1>Welcome to our website!</h1><br/>
    <p>Please activate your account</p><br/>
    <a href='${link}'>Activate</a>
    </div>`
  });
};
