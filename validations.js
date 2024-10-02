import { body } from 'express-validator';

export const loginValidation = [
    body('email').isEmail()
];

export const RegisterValidation = [
    body('email').isEmail()
];

export const likeCreateValidation = [
    // body('title', 'Enter title').isLength({ min: 3 }).isString(),
    // body('text', 'Enter text').isLength({ min: 10 }).isString(),
    // body('tags', 'Enter array of tags').optional().isString(),
    // body('imageUrl', 'Incorrect image URL').optional().isString(),
];

