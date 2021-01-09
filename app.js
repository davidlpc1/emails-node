const express = require('express')
const nodemailer = require('nodemailer')
const app = express()
const config = require('dotenv/config');
const PORT = process.env.PORT || 3000

const user = process.env.USER
const pass = process.env.PASSWORD
const host = process.env.HOST

app.get('/', (req, res, next) => res.send('Hello World'))

app.get('/send',(req, res, next) => {
    const transporter = nodemailer.createTransport({
        host,
        port:587,
        auth:{ user, pass }
    })
    transporter.sendMail({
        from: user,
        to: user,
        subject: "Olá, Seja bem vindo!!",
        text: "Estou te enviando este email com node.js",
    }).then(info => res.send(info))
      .catch(error => res.send(error))
})

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})