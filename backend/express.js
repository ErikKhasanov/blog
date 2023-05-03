import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

// Validators
import * as Validators from './validators/validators.js';
// Middleware
import { checkAuth, handleValidationErrors } from './middleware/index.js';
// Controllers
import { PostController, UserController } from './controllers/index.js';

mongoose
    .connect(
        'mongodb+srv://admin:uK3n4QolKbGR6jND@cluster0.ktg442s.mongodb.net/blog?retryWrites=true&w=majority',
    )
    .then(() => {
        console.log('DB Ok');
    })
    .catch((e) => console.error(e));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/auth/login', Validators.auth, handleValidationErrors, UserController.auth);
app.post('/registration', Validators.registration, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getById);
app.post('/posts', checkAuth, Validators.post, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.removeById);
app.patch('/posts/:id', checkAuth, Validators.post, handleValidationErrors, PostController.update);

app.get('/tags', PostController.getLastTags);

app.listen(3001, (error) => {
    if (error) console.error(error);
    console.log('Server Ok');
});
