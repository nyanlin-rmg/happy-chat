import {body, validationResult} from "express-validator";
import User from "../models/User.js";

export const signupRules = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('email').notEmpty().withMessage('Email cannot be empty')
                .isEmail().withMessage('Your email is invalid')
                .custom(async (value) => {
                    const user = await User.findOne({email: value});
                    if (user) {
                        throw new Error('This email is already registered!');
                    }
                }),
    body('password').notEmpty().withMessage('Password cannot be empty')
                .isLength({ min: 8 }).withMessage('Please enter at least 8 characters')
];

export const validateUser = async (req, res, next) => {
    const errors = validationResult(req);
    return errors.isEmpty() ? next() : res.status(400).json(errors);

}