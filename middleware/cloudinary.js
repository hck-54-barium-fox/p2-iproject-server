const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dtcpoysri",
    api_key: "148115861615272",
    api_secret: "UtLbVIXV8IRMNp9rcWH1yzeMRCg"
})

module.exports = cloudinary