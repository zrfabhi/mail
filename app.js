const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const path = require("path")

const multer = require('multer');
const res = require("express/lib/response");
var bodyParser = require('body-parser');
const port = process.env.PORT || 80

app.use(bodyParser.urlencoded({ extended: true }))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })



async function main(filename, path, subject ,res) {

    console.log("Sending Email")

    let testAccount = await nodemailer.createTestAccount();

    var transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
           ciphers:'SSLv3'
        },
        auth: {
            user: 'abhishekssingh0000@hotmail.com',
            pass: 'Abhi@123'
        }
    });

    // let transporter = nodemailer.createTransport({
    //     host: "smtp.gmail.com",

    //     port: 465,
    //     secure: false,
    //     auth: {
    //         user: "abhishekssingh0000@gmail.com", // generated ethereal user
    //         pass: "9984941753", // generated ethereal password
    //     },
    // });

    var mailOptions = {
        from: "abhishekssingh0000@hotmail.com",
        to: 'zrfabhi7@gmail.com', // list of receivers (who receives)
        subject: 'Hello ', // Subject line
        text: 'Hello world ', // plaintext body
        html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
    };

    // let info = await transporter.sendMail({
    //     from: 'abhishekssingh0000@hotmail.com', // sender address
    //     to: "zrfabhi7@gmail.com", // list of receivers
    //     subject: "Priya Studio 2-Photo 4x6 " + subject, // Subject line
    //     attachments: [{
    //         filename: filename,
    //         path: path
    //     }]
    // });

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
    
        console.log('Message sent: ' + info.response);
    });


    // res.sendFile(__dirname+"/public/sent.html")


    
    
}

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile('index.html');

})

app.post('/', upload.single('file_upload'), (req, res) => {

    main(req.file.originalname, req.file.path,req.body.subject, res)

 

})

app.listen(port, () => {
    console.log("listening on port")
})

