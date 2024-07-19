// src/mailer/mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'bridget.ebert10@ethereal.email',
        pass: 'F1fS5UJ4vuR7ahsQ5b'
      },
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `http://yourapp.com/reset-password?token=${token}`
      const mailOptions = {
        from: 'Auth-backend service', 
        to: to, 
        subject: 'Password Reset Request', // Subject line
        html: `<p>You requested a password reset. CLick the link below to reset your password:</p><P><a href="${resetLink}">click here</a></P>`, // html body
      };

      await this.transporter.sendMail(mailOptions)
  }
}

