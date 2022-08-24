const express = require("express");
const bodyParser = require("body-parser");

const nodemailer = require("nodemailer");
const nodemailerSMTPTransport = require("nodemailer-smtp-transport");
const app = express();
const port = 3000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// NodeMailer Config
app.post("/", async (req, res) => {
    const { name, email } = req.body;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(
        nodemailerSMTPTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: "jazlyn.olson64@ethereal.email", // ethereal user
                pass: "9ft5HpqCUmXGSVjxBG", // ethereal password
            },
        })
    );

    const msg = {
        from: "<luemail@example.com>",
        to: `${email}`,
        subject: "LU Email Testing",
        text: "This is a Test Mail.Don't Worry!!",
        html: `<!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="x-apple-disable-message-reformatting">
            <title>Email Template</title>

            <style>
                table,
                td,
                div,
                h1,
                p {
                    font-family: Arial, sans-serif;
                }

                @media screen and (max-width: 530px) {
                    .unsub {
                        display: block;
                        padding: 8px;
                        margin-top: 14px;
                        border-radius: 6px;
                        background-color: #555555;
                        text-decoration: none !important;
                        font-weight: bold;
                    }

                    .col-lge {
                        max-width: 100% !important;
                    }
                }

                @media screen and (min-width: 531px) {
                    .col-sml {
                        max-width: 27% !important;
                    }

                    .col-lge {
                        max-width: 73% !important;
                    }
                }
            </style>
        </head>

        <body style="margin:0;padding:0;word-spacing:normal;background-color:#939297;">
            <div role="article" aria-roledescription="email" lang="en"
                style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#939297;">
                <table role="presentation" style="width:100%;border:none;border-spacing:0;">
                    <tr>
                        <td align="center" style="padding:0;">

                            <table role="presentation"
                                style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                                <tr>
                                    <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                                        <a href="http://lus.ac.bd/" style="text-decoration:none;"><img
                                                src="https://www.lus.ac.bd/wp-content/themes/leading-university-theme/img/logo-white.png" width="165" alt="Logo"
                                                style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:30px;background-color:#ffffff;">
                                        <h1
                                            style="margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em; text-align: center;">
                                            Welcome to the Leading University</h1>
                                        <p>Dear <span style="font-weight: bold;">${name},</span></p>
                                        <p>Congratulation!</p>
                                        <p>Your final admission is successful. Your student ID is: <span
                                                style="font-weight: bold;">0182220012131003.</span> Please use
                                            the following link to login your dashboard with the email: <span
                                                style="font-weight: bold;">${email}</span> and
                                            password: <span style="font-weight: bold;">6KUW9I:</span>For Login
                                            <a target="_blank" rel="noopener noreferrer" href = "192.168.161.232:4040/login" style="font-weight: bold;">192.168.161.232:4040/login</a>
                                        </p>
                                    </td>
                                </tr>



                                <tr>
                                    <td
                                        style="padding:30px;text-align:center;font-size:12px;background-color:#404040;color:#cccccc;">

                                        <p style="margin:0 0 8px 0;"><a href="http://www.facebook.com/"
                                                style="text-decoration:none;"><img
                                                    src="https://assets.codepen.io/210284/facebook_1.png" width="40" height="40"
                                                    alt="f" style="display:inline-block;color:#cccccc;"></a> <a
                                                href="www.youtube.com"
                                                style="text-decoration:none;"><img src="https://pnggrid.com/wp-content/uploads/2021/07/White-YouTube-Logo-Transparent.png" width="40"
                                                    height="40" alt="t" style="display:inline-block;color:#cccccc;"></a></p>
                                        <p style="margin:0;font-size:14px;line-height:20px;"><br><a class="unsub"
                                                href="http://www.unsubscribe.com/"
                                                style="color:#cccccc;text-decoration:underline;">Unsubscribe Leading
                                                University</a></p>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                </table>
            </div>
        </body>

        </html>`, // html body
    };
    // send mail with defined transport object
    await transporter.sendMail(msg, (err, data) => {
        if (err) {
            console.log("Error Occurs", err);
        } else {
            console.log("Email Send Successfully");
        }
    });

    res.send("Email Sent!");
});
app.listen(port, () =>
    console.log(`App listening at Port http://localhost:${port}`)
);
