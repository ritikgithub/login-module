"use strict";
const nodemailer = require("nodemailer");

function main() {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'dummylogin1998@gmail.com',
        pass: 'dummylogin@123'
        }
    });
    return transporter;
}
module.exports = main;
