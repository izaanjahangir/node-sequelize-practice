const sgMail = require("@sendgrid/mail");

const keys = require("../config/keys");

sgMail.setApiKey(keys.SENDGRID_API_KEY);

exports.sendMail = async function (payload) {
  try {
    const response = await sgMail.send({
      to: payload.to,
      from: payload.from,
      subject: payload.subject,

      content: [
        { type: "text/plain", value: payload.text },
        { type: "text/html", value: payload.html },
      ],
    });

    return { response, success: true };
  } catch (e) {
    return { e, success: false };
  }
};

// const msg = {
//     to: 'test@example.com',
//     from: 'test@example.com',
//     subject: 'Sending with Twilio SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   };
