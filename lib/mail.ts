'use server';
import nodemailer from 'nodemailer';

const host = process.env.EMAIL_SMTP_SERVER||'noreply@dive.paris';
const port = process.env.EMAIL_PORT||465;
const secure = true;
const user = process.env.EMAIL_USER||'noreply@dive.paris';
const pass = process.env.EMAIL_PASS||'Apples@2016#2021';
const noreply = process.env.EMAIL_NOREPLAY||'noreply@dive.paris';

const transporter = nodemailer.createTransport({
  host: 'nodels55-eu.n0c.com',
  port: 465,
  secure: true,
  auth: {
    user: 'noreply@dive.paris',
    pass: 'Apples@2016#2021'
  }
});

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await transporter.sendMail({
    from: `"Dive" <${noreply}>`,
    to: email,
    subject: "Code 2FA",
    html: `<p>Votre code 2FA est <b>${token}</b></p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await transporter.sendMail({
    from: `"Dive" <${noreply}>`,
    to: email,
    subject: "Réinitialisez votre mot de passe",
    html: `<p>Cliquez <a href="${resetLink}">ici</a> pour réinitialiser votre mot de passe.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await transporter.sendMail({
    from: `"Dive" <${noreply}>`,
    to: email,
    subject: "Confirmez votre email",
    html: `<p>Cliquez <a href="${confirmLink}">ici</a> pour confirmer votre email.</p>`,
  });
};
