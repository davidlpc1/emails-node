const express = require('express')
const nodemailer = require('nodemailer')
const config = require('dotenv/config')
const path = require('path')

const PORT = process.env.PORT || 3000
const mailtrapUser = process.env.MAILTRAP_USER
const mailtrapPass = process.env.MAILTRAP_PASS

const app = express()

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))
app.get('/send', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))

app.get('/send/mailtrap',(req, res, next) => {
    const { to,subject,text } = req.query
    const transporter = nodemailer.createTransport({
        host:"smtp.mailtrap.io",
        port:2525,
        auth:{ user:mailtrapUser, pass:mailtrapPass }
    })

    transporter.sendMail({
        from: 'ea2a56d4b8-5a86d3@inbox.mailtrap.io',
        to,
        subject,
        text,
    })
      .then(info => res.send(info))
      .catch(error => res.send(error))
})

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})