import { body } from 'express-validator';

export const registration = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать минимум 5 символов').isLength({
        min: 5,
    }),
    body('fullName', 'Имя должно содержать минимум 3 символа').isLength({
        min: 3,
    }),
    body('avatar', 'Неверная ссылка на аватарку').optional(),
];

export const auth = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать минимум 5 символов').isLength({
        min: 5,
    }),
];

export const post = [
    body('title', 'Введите заголов статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 10 }).isString(),
    body('tags', 'Неверный формат тегов (укажите массив)').optional().isArray(),
    body('imagesUrl', 'Неверная ссылка на изображение').optional().isString(),
];
