const express = require('express')
const bodyParser = require('body-parser');
const forgotPasswordController = require("./forgotPasswordController");
const userController = require('./userController');
const upload = require('./multer');
const app = express()
const port = 5000;
require('./db');

const cors = require('cors');
const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:8100',
    'http://10.0.2.2:5000',
    'http://192.168.43.228:8100'
  ]
  
  // Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    }
  }

app.options('*', cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/uploads',express.static('uploads'));
app.post('/register',userController.register);
app.post('/login',userController.login);
app.post('/isAuthenticated',userController.isAuthenticated);
app.post('/sendForgotPasswordToken',forgotPasswordController.sendForgotPasswordToken);
app.post('/verifyForgotPasswordDetails',forgotPasswordController.verifyForgotPasswordDetails);
app.post('/updateprofile',upload.single('imgFile'),userController.updateProfile);
// app.get('/exp',function() {
//     console.log("ksjabd");
// });

app.listen(port, (err) => {
    if(err) {
        console.log(err);
        return;
    }
     console.log(`Example app listening at http://localhost:${port}`)
})