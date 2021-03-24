const express = require('express');
const router = express.Router();
const isSignedIn = require('../utils/auth');
const { User, Snippet, Comment } = require('../models/');
const asyncHandler = require('express-async-handler');

router.get(
    '/',
    asyncHandler(isSignedIn),
    asyncHandler(async (req, res) => {
        return await User.findAll();
    })
);

router.get(
    '/:id/',
    asyncHandler(isSignedIn),
    asyncHandler(async (req, res) => {
        return await User.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: Snippet,
                    as: Snippet.author,
                },
                {
                    model: Comment,
                    as: Comment.author,
                },
            ],
        });
    })
);

router.delete(
    '/:id/',
    asyncHandler(isSignedIn),
    asyncHandler(async (req, res) => {
        let user = await User.findOne({
            where: {
                id: req.params.id,
            },
        });

        user.destroy().then(() => {
            return res.sendStatus(200);
        });
    })
);

module.exports = router;
