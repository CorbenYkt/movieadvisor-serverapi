import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import UserModel from '../models/User.js';

export const Register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const doc = new UserModel({
            email: req.body.email,
        });

        const user = await doc.save();
        const token = jwt.sign({
            _id: user._id,
        }, 'secretkey',
            {
                expiresIn: '30d'
            });

        const { ...userData } = user._doc;
        res.json({
            ...userData,
            token,
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error: User creation not possible',
        })
    }
}

export const Login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return req.status(404).json({
                message: 'User not found',
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return req.status(400).json({
                message: 'Invalid email or password!',
            });
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'secretkey',
            {
                expiresIn: '30d'
            });

        const { passwordHash, ...userData } = user._doc;
        res.json({
            ...userData,
            token,
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error: Failed to log in!',
        })
    }
}

export const GetMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const { passwordHash, ...userData } = user._doc;
        res.json({
            userData
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Noa access!'
        })
    }
}