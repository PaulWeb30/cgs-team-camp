import nodemailer from 'nodemailer';

const emailTemplatesObj = {
  VERIFICATION: {
    subject: 'Activate your account',
    html: (link: string) => `<div>
    <h1>Welcome to our website!</h1><br/>
    <p>Please activate your account</p><br/>
    <a href='${link}'>Activate</a>
    </div>`
  },
  FORGOT_PASSWORD: {
    subject: 'Forgot passoword',
    html: (link: string) => `<div>
    <h1>To reset password</h1><br/>
    <h3>Please follow below link</h3><br/>
    <a href='${link}'>Reset</a>
    </div>`
  }
};

export const sendEmail = (
  userEmail: string,
  link: string,
  emailAction: 'VERIFICATION' | 'FORGOT_PASSWORD'
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NO_REPLY_EMAIL,
      pass: process.env.NO_REPLY_PASS
    }
  });

  const emailInfo = emailTemplatesObj[emailAction];

  return transporter.sendMail({
    from: 'No reply',
    to: userEmail,
    subject: emailInfo.subject,
    html: emailInfo.html(link)
  });
};
