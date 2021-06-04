const User = require("./User");
const nodemailer = require("nodemailer");
const main = require("./sendMail");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

module.exports.sendForgotPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;
        let user = await User.findOne({ email: email });

        if (!user) {
            res.status(404).json({
                error: "User Not exist"
            });
            return;
        }
        let token = jwt.sign({
            userId: user._id
        }, 'secret1', { expiresIn: '1h' });

        let emailhtml = `<h1>Reset Password Token is :</h1>
    <h2>${token}</h2>
    <h3>Enter the token in your app</h3>`;

        let transporter = main();
        let info = await transporter.sendMail({
            from: "dummylogin1998@gmail.com",
            to: `${email}`, 
            subject: "Reset Password", 
            html: emailhtml, 
        });
      
        res.status(200).json({
            message: "Mail send Successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    }

}

module.exports.verifyForgotPasswordDetails = async (req, res) => {
    try {
        const { token, password } = req.body;
        var userId = jwt.verify(token, 'secret1').userId;
        let hash = await bcrypt.hash(password, 10);
        let user = await User.findByIdAndUpdate(userId, {
            password: hash
        });
        res.status(200).json({
            message: "Password changed Successfully"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    }
}