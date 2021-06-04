const User = require('./User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports.register = async (req, res) => {
    try {
        const { name, email, password, age, gender } = req.body;
        console.log(age);

        let user = await User.findOne({ email: email });

        if (user) {
            res.status(409).json({
                error: "User already exist"
            });
            return;
        }

        let hash = await bcrypt.hash(password, 10);

        user = await User.create({
            name: name,
            email: email,
            password: hash,
            age: age,
            gender: gender,
            avatar: "uploads/images/default.png"
        });

        res.status(200).json({
            message: "User created Successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    }

}

module.exports.login = async (req, res) => {
    try {
        console.log("sd");
        const { email, password } = req.body;

        let user = await User.findOne({ email: email });

        if (!user) {
            res.status(403).json({
                error: "Invalid Username/password"
            });
            return;
        }
        let match = await bcrypt.compare(password, user.password);

        if (!match) {
            res.status(403).json({
                error: "Invalid Username/password"
            });
            return;
        }
        let token = jwt.sign({
            userId: user._id
        }, 'secret', { expiresIn: '1h' });

        res.status(200).json({
            message: "User Logged In Successfully",
            token: token,
            user: user
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    }
}


module.exports.isAuthenticated = async (req, res) => {
    try {

        let token = req.get('Authorization');

        token = token.slice(7);
        if (!token) {
            res.staus(401).json({
                error: "Token Not present"
            });
            return;
        }
        var userId = jwt.verify(token, 'secret').userId;
        let user = await User.findById(userId).select("-password");
        if (!user) {
            res.staus(401).json({
                error: "Invalid Token"
            });
            return;
        }
        res.status(200).json({
            auth: true,
            user: user
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    }


}

module.exports.updateProfile = async (req, res) => {
    try {
        let { userId, name, age, gender } = req.body;
        console.log(userId);
        let user = await User.findById(userId).select("-password");
        if (!user) {
            res.status(401).json({
                error: "User Not Found"
            });
            return;
        }
        user.name = name;
        user.age = age;
        user.gender = gender;
        console.log(user.name);
        if (req.file) {

            if (user.avatar !== 'uploads/images/default.png') {
                if(fs.existsSync(`./${user.avatar}`))
                   fs.unlinkSync(`./${user.avatar}`);
            }
            
            user.avatar = req.file.path;
        }
        user.save();
        res.status(200).json({
            message: "Profile updated successfully",
            user: user
        });
    } catch (err) {
        console.log(err);
        console.log("g");
        res.status(500).json({ 
            error: "Something Went Wrong"
        });
    }
}



