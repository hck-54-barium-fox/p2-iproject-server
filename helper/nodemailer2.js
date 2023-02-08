const nodemailer = require('nodemailer');

function sendEmail2(email) {

    const transporter = nodemailer.createTransport({
        // host: "smtp.gmail.email",
        service: "gmail",
        secure: true,
        auth: {
            user: "rayhanay115@gmail.com",
            pass: "ljntjhkrmfcowsdr"
        },
        debug: true,
        logger: true
    });

    const option = {
        from: "rayhanay115@gmail.com",
        to: email,
        subject: "Acount Success buy product",
        text: "Your Account has been create ",
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

module.exports = sendEmail2