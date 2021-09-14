const sgMail = require("@sendgrid/mail");

exports.sendMail = (to, template) => {
  return new Promise((resolve, reject) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to, // Change to your recipient
      from: "k@beyondxlabs.com", // Change to your verified sender
      subject: template.subject,
      text: template.text,
      html: template.html,
    };

    sgMail
      .send(msg)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
