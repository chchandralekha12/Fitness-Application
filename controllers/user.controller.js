const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltrounds = 10;
const jwt = require('jsonwebtoken');
const privateKey = 'WdnyPAADVpZujDsd7pkDqE'

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = {
    register: async (req, res) => {
        try {
            const { fullName, email, password } = req.body;
            if (!fullName) {
                return res.status(400).send({ status: false, error: { message: 'full name is required.' } });
            }
            if (!email) {
                return res.status(400).send({ status: false, error: { message: 'email is required.' } });
            }
            if (!validateEmail(email)) {
                return res.status(400).send({ status: false, error: { message: 'invalid email.' } });
            }
            if (!password) {
                return res.status(400).send({ status: false, error: { message: 'password is required.' } });
            }
            const userExist = await UserModel.findOne({ Email: email });
            if (userExist) {
                return res.status(400).send({ status: false, error: { message: 'email already exist.' } });
            }
            const hashedPassword = await bcrypt.hash(password, saltrounds);
            const user = new UserModel({
                FullName: fullName,
                Email: email,
                PasswordHash: hashedPassword
            });
            await user.save();
            const token = jwt.sign({ userId: user._id.toString() }, privateKey);
            return res.send({
                status: true,
                data: {
                    token
                }
            });
        } catch (error) {
            console.log('UserController.register', error);
            return res.status(500).send({ status: false, error: { message: 'Something went wrong. please try again' } });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email) {
                return res.status(400).send({ status: false, error: { message: 'email is required.' } });
            }
            if (!validateEmail(email)) {
                return res.status(400).send({ status: false, error: { message: 'invalid email.' } });
            }
            if (!password) {
                return res.status(400).send({ status: false, error: { message: 'password is required.' } });
            }
            const user = await UserModel.findOne({ Email: email });
            if (!user) {
                return res.status(401).send({ status: false, error: { message: 'email or password incorrect.' } });
            }
            const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);
            if (!isPasswordValid) {
                return res.status(401).send({ status: false, error: { message: 'email or password incorrect.' } });
            }
            const token = jwt.sign({ userId: user._id.toString() }, privateKey);
            return res.send({
                status: true,
                data: {
                    token
                }
            });
        } catch (error) {
            console.log('UserController.login', error);
            return res.status(500).send({ status: false, error: { message: 'Something went wrong. please try again' } });
        }
    }
}