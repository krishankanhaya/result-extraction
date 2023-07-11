const axios = require("axios");
const fs = require("fs");
const nodemailer = require("nodemailer");
require("dotenv").config();
// const filePath = "example.txt";

setTimeout(async () => {
  try {
    const response = await axios.get(
      "https://igu1.ucanapply.com/result-details?sesscode=d84f65a0se16eyjpdii6inllugxsstlrmytbmxr6ykmzyu9rq3c9psisinzhbhvlijoirnv0cmzfu0hyc1hynzd0rhg3c3pedz09iiwibwfjijoiotlhztfhyzk2nzdhntzkmdg2yjhjotu0odc2zjk5n2vkyta2ztq5ymeyy2vkmmzmzdnhmtzjmtg1odg1nzdmyyisinrhzyi6iij9"
    );
    const htmlContent = response.data; 
    // Result Title
    // var specificText =
    //   "BACHELOR OF TECHNOLOGY (COMPUTER SCIENCE &amp; ENGINEERING) (B.Tech (CSE)) (UG)&nbsp;Sixth Semester (Sem - 6)&nbsp;&nbsp;(New Scheme(19-20))";
    var specificText ="BACHELOR OF ARTS HON. (ENGLISH) (B.A HON. (ENGLISH)) (UG)&nbsp;Fifth Semester (Sem - 5)&nbsp;&nbsp;(2017-18(Old))";
    var index = htmlContent.indexOf(specificText);
    console.log(index)
    
    let hyperlink = ''
    if(index !== -1) {
          const remainingText = htmlContent.substr(index);
          const regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/;
          const match = remainingText.match(regex);

          if (match) {
            hyperlink = match[2];
            console.log("Hyperlink:", hyperlink);
          } else {
            console.log("Hyperlink not found");
          }
    }

    if (index !== -1) {
        // send mail
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });

      const mailOptions = {
        from: {
          name: "Krishan Kanhaya",
          address: process.env.USER,
        },
        to: process.env.RECIEVER,
        subject: `Result Out Now For :  ${specificText}`,
        text: "ram",
        html: `<b>Here is Your Result Link : ${hyperlink} `,
      };

      const sendMail = async (transporter, mailOptions) => {
        try {
          await transporter.sendMail(mailOptions);
          console.log("Email has been sent successfully.");
        } catch (error) {
          console.log(error);
        }
      };

      sendMail(transporter, mailOptions);
      console.log("Your result is out now!");
    } else {
      console.log("No result found!");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}, 1000);




