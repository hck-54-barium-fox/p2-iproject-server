const nodemailer = require("nodemailer");

function sendEmail(email) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yugamauludi98@gmail.com",
      pass: "hgmceipebtgucmhp",
    },
  });

  let mailOptions = {
    from: "yugamauludi98@gmail.com",
    to: email,
    subject: "Success register",
    html: `
    <div class="es-wrapper-color">
    <!--[if gte mso 9]>
  <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
    <v:fill type="tile" color="#f4f4f4"></v:fill>
  </v:background>
<![endif]-->
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
            <tr class="gmail-fix" height="0">
                <td>
                    <table width="450" cellspacing="0" cellpadding="0" border="0" align="center">
                        <tbody>
                            <tr>
                                <td cellpadding="0" cellspacing="0" border="0" style="line-height: 1px; min-width: 450px;" height="0"><img src="https://tlr.stripocdn.email/content/guids/CABINET_837dc1d79e3a5eca5eb1609bfe9fd374/images/41521605538834349.png" style="display: block; max-height: 0px; min-height: 0px; min-width: 450px; width: 450px;" alt width="450" height="1"></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td class="esd-email-paddings" valign="top">
                    <table class="es-header esd-header-popover" cellspacing="0" cellpadding="0" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe" esd-custom-block-id="6339" align="center">
                                    <table class="es-header-body" width="450" cellspacing="0" cellpadding="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-structure es-p20t es-p10b es-p10r es-p10l" align="left">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-container-frame" width="430" valign="top" align="center">
                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-image es-p25t es-p25b es-p10r es-p10l" style="font-size:0" align="center"><a href target="_blank"><img src="https://tlr.stripocdn.email/content/guids/CABINET_3df254a10a99df5e44cb27b842c2c69e/images/7331519201751184.png" alt style="display: block;" width="40"></a></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe" style="background-color: #ffa73b;" esd-custom-block-id="6340" bgcolor="#ffa73b" align="center">
                                    <table class="es-content-body" style="background-color: transparent;" width="450" cellspacing="0" cellpadding="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-structure" align="left">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-container-frame" width="450" valign="top" align="center">
                                                                    <table style="background-color: #ffffff; border-radius: 4px; border-collapse: separate;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-text es-p35t es-p5b es-p30r es-p30l" align="center">
                                                                                    <h1>Success Register<br></h1>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-block-spacer es-p5t es-p5b es-p20r es-p20l" style="font-size:0" bgcolor="#ffffff" align="center">
                                                                                    <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td style="border-bottom: 1px solid #ffffff; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe" align="center">
                                    <table class="es-content-body" style="background-color: transparent;" width="450" cellspacing="0" cellpadding="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-structure" align="left">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-container-frame" width="450" valign="top" align="center">
                                                                    <table style="border-radius: 4px; border-collapse: separate; background-color: #ffffff;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-text es-p20t es-p20b es-p30r es-p30l es-m-txt-l" bgcolor="#ffffff" align="left">
                                                                                    <p>We're excited to have you get started. Your data will be safe in our database. just enjoy your exploring device for rent!<br></p>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-block-image" style="font-size: 0px;" align="center"><a target="_blank"><img class="adapt-img" src="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iphone/iphone-14-pro-max-colors.png" alt style="display: block;" width="290"></a></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-block-text es-p20t es-p30r es-p30l es-m-txt-l" align="left">
                                                                                    <p></p>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-block-text es-p20t es-p30r es-p30l es-m-txt-l" align="left">
                                                                                    <p></p>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-block-text es-p20t es-p30r es-p30l es-m-txt-l" align="left"><br></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-block-text es-p20t es-p30r es-p30l es-m-txt-l" align="left">
                                                                                    <p>If you have any questions, just reply to this email—we're always happy to help out.<br><br></p>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-block-text es-p20t es-p40b es-p30r es-p30l es-m-txt-l" align="left">
                                                                                    <p>Cheers,</p>
                                                                                    <p>The RentOPhoneTeam</p>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="es-content esd-footer-popover" cellspacing="0" cellpadding="0" align="center">
                        <tbody>
                            <tr>
                                <td class="esd-stripe" align="center">
                                    <table class="es-content-body" style="background-color: transparent;" width="450" cellspacing="0" cellpadding="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td class="esd-structure" align="left">
                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-container-frame" width="450" valign="top" align="center">
                                                                    <table width="100%" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-block-spacer es-p10t es-p20b es-p20r es-p20l" style="font-size:0" align="center">
                                                                                    <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td style="border-bottom: 1px solid #f4f4f4; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</div>
    `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log("Email sent: " + info.response);
  });
}

module.exports = { sendEmail };