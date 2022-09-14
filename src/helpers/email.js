import { nodeEnv, emailHost, emailPort, emailAuthUser, emailAuthPassword } from '../config/environment';
import nodemailer from 'nodemailer';

const emailTransporter = nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: true,
    auth: {
        user: emailAuthUser,
        pass: emailAuthPassword,
    },
    debug: nodeEnv.development
});

const verificationCodeEmailOptions = {
    from: "service@mydomain.com",
    subject: "Seu código de verificação",
};

export { emailTransporter, verificationCodeEmailOptions };
