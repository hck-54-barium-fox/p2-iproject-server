const nodemailer = require('nodemailer');

function sendEmail(email) {

    const transporter = nodemailer.createTransport({
        // host: "smtp.gmail.email",
        service: "gmail",
        secure: true,
        auth: {
            user: "beautydominique6@gmail.com",
            pass: "rfrxafiirjrwebwm"
        },
        debug: true,
        logger: true
    });

    const option = {
        from: "beautydominique6@gmail.com",
        to: email,
        subject: "Thank you for joining Ismuya Company!",
        text: "Happy shopping and we hope you can find your favorite make up!",
        html: "<b>Your Account has been create</b>"
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(option, (err, info) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            resolve('success')
            console.log("sent: " + info);
        })
    })
}

module.exports = sendEmail