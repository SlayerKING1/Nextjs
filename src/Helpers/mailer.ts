import nodemailer from "nodemailer";
import User from "@/Models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async (
  email: string,
  emailType: string,
  userId: string
) => {
  try {
    const hashToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        { verifyToken: hashToken, verifyTokenExpiry: Date.now() + 3600000 },
        { new: true, runValidators: true }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidators: true }
      );
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const resetUrlPath =
      emailType === "VERIFY" ? "VerifyMail" : "ResetPassword";

    const mailOptions = {
      from: "vishal@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>
    Click <a href="${
      process.env.DOMAIN
    }/${resetUrlPath}?token=${hashToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }, or copy the link below:
    <br />
    ${process.env.DOMAIN}/${resetUrlPath}?token=${hashToken}
  </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    if (mailResponse) {
      console.log("Email sent successfully");
    } else {
      console.log("Failed to send email");
    }
    return mailResponse;
  } catch (error: any) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
