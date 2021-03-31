const express = require('express');
const router = express.Router();
const isSignedIn = require('../utils/auth');
const { Snippet, User } = require('../models/');
const asyncHandler = require('express-async-handler');

router.get(
    '/',
    asyncHandler(isSignedIn),
    asyncHandler(async (req, res) => {
        return res.send(await Snippet.findAll());
    })
);

router.get(
    '/:id/',
    asyncHandler(isSignedIn),
    asyncHandler(async (req, res) => {
        return res.send(await Snippet.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: Comment,
                    as: Comment.author,
                },
            ],
        }));
    })
);

router.post(
    '/',
    asyncHandler(isSignedIn),
    asyncHandler(async (req, res) => {
        let { description, filename, code, author } = req.body;
        if ((description, filename, code, author)) {
            Snippet.create({
                description,
                filename,
                code,
                author,
            }).then((snippet) => {
                return res.send(snippet);
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
        let snippet = await Snippet.findOne({
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

        if (snippet.author !== snippet.User.id) {
            return res.sendStatus(401);
        }

        snippet.destroy().then(() => {
            return res.sendStatus(200);
        });
    })
);

module.exports = router;
