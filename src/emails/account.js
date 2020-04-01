const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcome = (email, name) => {
    sgMail.send({
        to: email,
        from: 'maskisblack17@gmail.com',
        subject: `Hello ${name}`,
        text: `Welcome to Secret Diary App I'm so excited to have you join us,
We're always here to help you in any way we can.

Cheers 🥂,
Vaibhav Singh Negi`
    })
}

const sendRemove = (email, name) => {
    sgMail.send({
        to: email,
        from: 'maskisblack17@gmail.com',
        subject: `Good Bye ${name}`,
        text: `Sorry ${name} for not providing service to your expectations.Let us know what was our short fall.
Please keep in touch. Good luck with everything!

Cheers 🥂,
Vaibhav Singh Negi`
    })
}

module.exports = {
    sendWelcome,
    sendRemove
}