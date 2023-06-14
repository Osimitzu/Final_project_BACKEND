const transporter = require("./mailer");
const ejs = require("ejs");
const path = require("path");

const sendMail = (email, doc, attachments) => {
  transporter
    .sendMail({
      from: "osimitzuuu@gmail.com",
      to: email,
      subject: "Bienvenido al Mercado Gorilla",
      text: "Mensaje en caso de que el html falle...no jalo el template xd", // El texto plano solo se envia si el html falla
      html: doc,
      attachments,
    })
    .then(() => console.log("Mensaje enviado"))
    .catch((err) => console.log(err));
};

const sendWelcomeMail = async (email, data) => {
  // renderizar ejs
  const filePath = path.join(
    __dirname,
    "../views/emailTemplates/welcome/welcomeTemplate.ejs"
  );
  const doc = await ejs.renderFile(filePath, data);
  //
  const attachments = [
    {
      filename: "github.png",
      path: path.join(
        __dirname,
        "../views/emailTemplates/welcome/images/github.png"
      ),
      cid: "github@forum_api.academlo.com",
    },
    {
      filename: "instagram2x.png",
      path: path.join(
        __dirname,
        "../views/emailTemplates/welcome/images/instagram2x.png"
      ),
      cid: "instagram2x@forum_api.academlo.com",
    },
    {
      filename: "linkedin2x.png",
      path: path.join(
        __dirname,
        "../views/emailTemplates/welcome/images/linkedin2x.png"
      ),
      cid: "linkedin2x@forum_api.academlo.com",
    },
    {
      filename: "spotify2x.png",
      path: path.join(
        __dirname,
        "../views/emailTemplates/welcome/images/spotify2x.png"
      ),
      cid: "spotify2x@forum_api.academlo.com",
    },
    {
      filename: "winstonOw.png",
      path: path.join(
        __dirname,
        "../views/emailTemplates/welcome/images/winstonOw.png"
      ),
      cid: "winstonOw@forum_api.academlo.com",
    },
  ];

  sendMail(email, doc, attachments);
};

module.exports = {
  sendWelcomeMail,
};
