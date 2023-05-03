import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Models
import UserModel from '../schema/user.js';

export const register = async (req, res) => {
    try {
        const passwordHash = await bcrypt.hash(req.body.password.toString(), 10);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatar: req.body.avatar,
            password: passwordHash,
        });

        const user = await doc.save();

        const token = Jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const { password, ...userData } = user._doc;

        res.json({ ...userData, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Registration error',
        });
    }
};

export const auth = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return req.status(404).json({
                message: 'Неверный логин или пароль',
            });
        }

        const isValidPass = await bcrypt.compare(
            req.body.password,
            user._doc.password,
        );

        if (!isValidPass) {
            return res.status(404).json({
                message: 'Неверный логин или пароль',
            });
        }

        const token = Jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const { password, ...userData } = user._doc;

        res.json({ ...userData, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Authorization error',
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.userId });
        if (!user) {
            res.status(404).json({
                message: 'Пользователь не найден',
            });
        }
        const { password, ...userData } = user._doc;

        res.json({ ...userData, user });
    } catch (error) {
        res.status(500).json({
            message: 'Auth error',
        });
    }
};
