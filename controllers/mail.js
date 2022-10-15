const nodemailer= require("nodemailer");

const transporter = nodemailer.createTransport({
    service:"hotmail",
    auth:{
        user:"ketanrandom@outlook.com", //admin username
        pass:"Random17547@", //admin password
    }
});

const options = {
    from:"ketanrandom@outlook.com",
    to:"yashpatel21102001@gmail.com",
    subject:"sending email with node.js",
    text:"Sir, \n  Good Morning \n Welcome to Canteen :))))))))"
}

transporter.sendMail(options, (err,info)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("sent: ", info.response);
})

// let mailOptions = {
//     from: '<from_email>', 
//     to: to_email_address.toString(),
//     subject: 'Subject',
//     text: 'Hello world', // plain text body
//     attachments: [{
//       filename: 'rello-logo-full-svg.svg',
//       path: './rello-logo-full-svg.svg',
//       cid: 'unique@cid'
//   }],
//     html: emailBody
// };