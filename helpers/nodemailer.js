const nodemailer = require('nodemailer');

function sendEmail(email) {

    const transporter = nodemailer.createTransport({
        // host: "smtp.gmail.email",
        service: "gmail",
        secure: true,
        auth: {
            user: "aprizallahmadhtc@gmail.com",
            pass: "hkcoihzmcknkoxar" 

        },
        debug: true,
        logger: true
    });

    const option = {
        from: "aprizallahmad@gmail.com",
        to: email,
        subject: "Acount Success Create",
        text: "Congratulations! Your Account has been create ",
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

function konfirmasiTransfer(email) {

    const transporter = nodemailer.createTransport({
        // host: "smtp.gmail.email",
        service: "gmail",
        secure: true,
        auth: {
            user: "aprizallahmadhtc@gmail.com",
            pass: "hkcoihzmcknkoxar" 

        },
        debug: true,
        logger: true
    });

    const option = {
        from: "aprizallahmad@gmail.com",
        to: email,
        subject: "Acount Success Create",
        text: "Congratulations! Your Account has been create ",
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


module.exports = {sendEmail, konfirmasiTransfer}