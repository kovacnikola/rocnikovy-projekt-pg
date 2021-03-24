const asyncHandler = require('express-async-handler');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

const verifyToken = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
};

const isSignedIn = asyncHandler(async (req, res, next) => {
    const {
        sub,
        name,
        given_name,
        family_name,
        email,
        picture,
    } = await verifyToken(req.headers.authorization);

    const user = (
        await User.findOrCreate({
            where: {
                sub,
            },
            defaults: {
                displayName: name,
                familyName: family_name,
                givenName: given_name,
                email,
                picture,
            },
        })
    )[0];

    if (user) {
        return next();
    } else {
        let err = new Error('Unauthorized');
        err.status = 401;
        return next(err);
    }
});

module.exports = isSignedIn;
