import nodemailer from "nodemailer";

const sendEmail = async ({ subject, text, html, email }:any) => {
  console.log("email: ",email);
  const mailOptions = {
    from: process.env.NODE_MAILER_EMAIL,
    to: email,
    subject,
    text,
    html,
  };

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
          user: process.env.NODE_MAILER_EMAIL,
          pass: process.env.NODE_MAILER_PASSWORD
      }
    });

    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
          if (error) {
              console.log(error);
              reject(error);
          } else {
              console.log("Server is ready to take our messages");
              resolve(success);
          }
      });
    });

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error,info)=> {
            if(error) {
                reject(error);
            }
            else {
                resolve(info);
            }
        });
    });
  } catch (error:any) {
    console.log(`Nodemailer error: ${error}`);
  }
};

export default sendEmail;