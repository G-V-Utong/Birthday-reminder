// cronJobs/sendBirthdayEmails.ts
import cron from 'node-cron';
import User from '../models/User';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const userMail = process.env.EMAIL;
const userPassword = process.env.PASSWORD;


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${userMail}`,
    pass: `${userPassword}`,
  },
});

function startBirthdayEmailCronJob() {
cron.schedule('0 7 * * *', async () => {
  try {
    const today = new Date();
    const users = await User.find({
      dob: {
        $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        $lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      },
    });

    users.forEach((user) => {
      sendBirthdayEmail(user.email, user.username);
    });
  } catch (error) {
    console.error('Error sending birthday emails:', error);
  }
});
};

function sendBirthdayEmail(email: string, username: string) {
  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Happy Birthday!',
    html: `<p>Dear ${username},</p>
           <p>Wishing you a fantastic birthday filled with joy and happiness!</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

export default startBirthdayEmailCronJob;