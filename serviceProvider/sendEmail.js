const {server_port,db_url,accessTokenKey,refreshTokenKey,smtpPassword,smtpUser,clientUrl}=require('/data/data/com.termux/files/home/backend-express-village-project/secret.js');
const nodemailer = require("nodemailer");
const createErtor=require('http-errors');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: smtpUser,
    pass: smtpPassword,
  },
});
const emailWithNodeMailer=async(emailData)=>{
  try{
   const optionsMailData={
  from:smtpUser, // sender address
    to:emailData.email,// list of receivers
    subject:emailData.subject, // Subject line
    html:emailData.html, // html body
  };
  const info=await transporter.sendMail(optionsMailData);
  console.log('Message send: %s', info.response)
  }catch(error){
   throw error.message;
  }
};
module.exports= emailWithNodeMailer;
