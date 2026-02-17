import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Define email options
    const mailOptions = {
        from: process.env.EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    // Send email
    await transporter.sendMail(mailOptions);
};

export default sendEmail;
