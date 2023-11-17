const UserDb = require('../server/model/user-model')
const passport = require('passport');
const passportJWT = require('passport-jwt');
const config = require('./config');
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function async() {
    const strategy = new Strategy(params, async (payload, done) => {
        let user = await UserDb.findById(payload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(new Error('User not found kanka'), null)
        }
    });

    passport.use(strategy)


    return { initialize: function () { return passport.initialize() } };
}