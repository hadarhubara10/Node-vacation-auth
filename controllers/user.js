const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/user');
const { default: axios } = require('axios');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN_KEY = process.env.TOKEN_KEY;
const jwt = require('jsonwebtoken');
// end test
const reMail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
rePhone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/;
module.exports = {
  getAllUsers: (req, res) => {
    User.find()
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) =>
        res.status(500).json({
          error,
        })
      );
  },
  getUser: (req, res) => {
    const userID = req.params.userID;
    User.findById(userID)
      .then((user) => {
        return res.status(200).json({ user });
      })
      .catch((err) => {
        return res.status(500).json({ message: err });
      });
  },
  signUp: async (req, res) => {
    const { firstName, lastName, password, email } = req.body;
    if (
      firstName != '' &&
      lastName != '' &&
      password != '' &&
      reMail.test(email)
    ) {
      const userInDB = await User.findOne({ email: email }).catch((err) => {
        return res.status(500).json(err);
      });
      if (!userInDB) {
        const saltRounds = 10;
        console.log(firstName, lastName, password, email);
        bcrypt.hash(password, saltRounds, (err, passwordHash) => {
          if (err) {
            return res.status(500).json(err);
          }

          // Store hash in your password DB.
          const userDetails = new User({
            _id: mongoose.Types.ObjectId(),
            firstName,
            lastName,
            password: passwordHash,
            email,
          });
          userDetails
            .save()
            .then(() => {
              return res
                .status(201)
                .json({ message: 'user created!', user: userDetails });
            })
            .catch((err) => {
              console.log('test');
              return res.status(400).json(err);
            });
        });
      } else {
        return res.status(400).json({ message: 'The email is exist!' });
      }
    } else {
      return res.status(400).json({
        message: 'details false',
      });
    }
  },

  verifyTokenGoogle: async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (authHeader.startsWith('Bearer ')) {
      // Get Token from headers
      idToken = authHeader.substring(7, authHeader.length);

      // const idToken = req.headers.authorization.split(' ')[1];

      console.log(CLIENT_ID);
      const client = new OAuth2Client(CLIENT_ID);
      async function verify() {
        const ticket = await client.verifyIdToken({
          idToken,
          audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        return res.status(200).json(payload);
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
      }
      verify().catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
    }
  },

  signIn: async (req, res) => {
    const { email, password } = req.body;
    if (!(password != '' && reMail.test(email))) {
      return res.status(400).json('All input is required');
    }

    const user = await User.findOne({ email }).catch((err) => {
      return res.status(400).json(err);
    });

    if (user) {
      const passwordVerify = await bcrypt.compare(password, user.password);
      // Create token
      if (!passwordVerify) return res.status(400).json('Invalid Detailes');

      const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY, {
        expiresIn: '24h',
      });

      // save user token
      // user.token = token;

      // user
      return res.status(200).json({ user, token });
    } else {
      return res.status(400).send('No user in DB');
    }
    // } catch (err) {
    //   console.log(err);
    // }
  },
  checkToken: (req, res) => {
    if (req.user) return res.status(200).json(req.user);
    // const authHeader = req.headers['authorization'];
    // if (authHeader.startsWith('Bearer ')) {
    //   // Get Token from headers
    //   token = authHeader.substring(7, authHeader.length);
    //   if (token !== '') {
    //     jwt.verify(token, TOKEN_KEY, (err, decoded) => {
    //       if (err) return res.status(401).send('Invalid Token');

    //       User.findById(decoded.user_id)
    //         .then((user) => {
    //           return res.status(200).json(user);
    //         })
    //         .catch((err) => {
    //           return res.status(401).send('Invalid Token');
    //         });
    //     });
    //   } else {
    //     return res.status(403).send('A token is required for authentication');
    //   }
    // } else {
    //   return res.status(403).send('A token is required for authentication');
    // }
  },
};
