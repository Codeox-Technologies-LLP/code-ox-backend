const nodemailer = require("nodemailer")
const dotenv=require('dotenv')
dotenv.config()

const fs = require("fs");
const path = require("path");

// Convert image to Base64
const logoPath = path.join(__dirname, "logo.png");
const logoBase64 = fs.readFileSync(logoPath, { encoding: "base64" });
const logoSrc = `data:image/png;base64,${logoBase64}`;

// console.log("Logo Path:", logoSrc);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const contactSubmitResponse = (name, to) => {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject: "Thank You for Your Inquiry - Code Ox",
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;  line-height: 1.2;">
          <h2 style="margin-bottom: 8px;">Thank You for Contacting Code Ox!</h2>
          <p style="margin: 4px 0;">Dear ${name},</p>
          <p style="margin: 10px 0;">
            We appreciate your interest in <strong>Code Ox</strong>. Your inquiry has been received, and our team will get back to you as soon as possible.
          </p>
          <p style="margin: 4px 0;">
            <strong>Team Code Ox</strong>
          </p>
          <p style="margin: 4px 0;"><strong>Email:</strong> mail@code-ox.com</p>
          <p style="margin: 4px 0;"><strong>Phone:</strong> +91 7736169666</p>
          <img src="cid:unique-logo" alt="Code Ox Logo" style="max-width: 120px; height: auto; margin-top: 8px;">
          <p style="margin: 4px 0;"><i>This is an automated email. Please do not reply.</i></p>
        </div>
      `
      
      ,
        attachments: [
          {
            filename: "logo.png",
            path: logoPath,
            cid: "unique-logo", // Must match 'cid' in <img src="cid:unique-logo">
          },
        ],
      };
      
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          reject(error); 
        } else {
          console.log("Email sent:", info.response);
          resolve(info.response); 
        }
      });
    });
  };
  

module.exports = contactSubmitResponse;
