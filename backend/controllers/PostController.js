import PostModel from '../schema/post.js';

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();
        const tags = posts.map((obj) => obj.tags).flat().slice(0, 5);
        res.json(tags);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Не удалось получить теги',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate({ path: 'author', select: ['_id', 'fullName', 'email'] }).exec();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};

export const getById = async (req, res) => {
    try {
        // const post = await PostModel.findById(req.params.id)
        PostModel.findByIdAndUpdate({
            _id: req.params.id,
        }, {
            $inc: {
                viewsCount: 1,
            },
        }, {
            returnDocument: 'after',
        }, (err, doc) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Не удалось получить статью',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Статья не найдена',
                });
            }
            res.json(doc);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Не удалось получить статью',
        });
    }
};

export const removeById = async (req, res) => {
    try {
        PostModel.findByIdAndDelete({
            _id: req.params.id,
        }, (err, doc) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Не удалось удалить статью',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Статья не найдена',
                });
            }
            res.json({
                success: true,
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Не удалось получить статью',
        });
    }
};

export const update = async (req, res) => {
    try {
        PostModel.findByIdAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            text: req.body.text,
            ImageUrl: req.body.ImageUrl,
            tags: req.body.tags,
            author: req.userId,
        }, (err, doc) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Не удалось обновить статью',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Статья не найдена',
                });
            }
            res.json({
                success: true,
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Не удалось обновить статью',
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            ImageUrl: req.body.ImageUrl,
            tags: req.body.tags,
            author: req.userId,
            viewsCount: 0,
        });

        const post = await doc.save();
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Не удалось создать статью',
        });
    }
};
