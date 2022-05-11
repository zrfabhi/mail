const sendgrid = require('@sendgrid/mail');

const SENDGRID_API_KEY = 'SG.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'

sendgrid.setApiKey(SENDGRID_API_KEY)

const msg = {
   to: 'zrfabhi7@gmail.com',
 // Change to your recipient
   from: 'abhishekssingh0000@gmail.com',
 // Change to your verified sender
   subject: 'Sending with SendGrid Is Fun',
   text: 'and easy to do anywhere, even with Node.js',
   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sendgrid
   .send(msg)
   .then((resp) => {
     console.log('Email sent\n', resp)
   })
   .catch((error) => {
     console.error(error)
 })
