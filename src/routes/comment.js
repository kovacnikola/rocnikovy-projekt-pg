const express = require('express');
const router = express.Router();
const isSignedIn = require('../utils/auth');
const { Comment, User } = require('../models/');
const asyncHandler = require('express-async-handler');

router.post(
    '/',
    asyncHandler(isSignedIn),
    asyncHandler(async (req, res) => {
        let { text, snippet, author } = req.body.data;
        if ((text, snippet, author)) {
            Comment.create({
                text,
                snippet,
                author,
            }).then((comment) => {
                return comment;
            });
        } else {
            return res.sendStatus(400);
        }
    })
);

router.delete(
    '/:id/',
    asyncHandler(isSignedIn),
    asyncHandler(async (req, res) => {
        let comment = await Comment.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: User,
                    as: User.id,
                },
            ],
        });

        if (comment.author !== comment.User.id) {
            return res.sendStatus(401);
        }

        comment.destroy().then(() => {
            return res.sendStatus(200);
        });
    })
);

module.exports = router;
