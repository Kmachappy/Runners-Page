require(dotenv).config()
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require("../models/user");


// passport.use
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
}, function (accessToken, refreshToken, profile, cb) {

    User.findOne({'googleId': profile.id},function(err, user){
        // if they don't we create 
        // check for and handle errors
        if(err) return cb(err);
        // if a user exists in our database - log them in
        if(user){
            return cb(null, user);
        } else{
            // user doesn't exists, create them 
            const newUser = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                avatarURL: profile.photos[0].value
            });
            newUser.save(function(err){
                if(err) return cb(err)
                // user saved succesffully 
                return cb(null, newUser)
            });
        };
    });
}));

///make sure it works with arrow function

// passport.serailizeUser
passport.serializeUser(function(user,done){
    done(null,user.id);
});
// passport.deserializeUser
//then decodes thw cookei and looks up the user in session store req.user for us 
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        done(err,user);//creates req.user 
    });
});



