import bcryptjs from 'bcryptjs';
/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { envVar } from "./env";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, async (email: string, password: string, done) => {
        try {
            const isUserExist = await User.findOne({ email })

            // if (!isUserExist) {
            //     return done(null, false, { message: "User does not exist" })
            // }

            if(!isUserExist){
                return done("User does not exist")
            }

            const isGoogleAuthenticated = isUserExist.auths.some(providerObjects=> providerObjects.provider=="google")

            if(isGoogleAuthenticated && !isUserExist.password){
                return done(null, false, {message: "You have authenticated through Google login, so if you want to login with credentials, the at first login with goole and set password with your mail and the you can login with email and password."})
            }
            // if(isGoogleAuthenticated){
            //     return done("You have authenticated through Google login, so if you want to login with credentials, the at first login with goole and set password with your mail and the you can login with email and password.")
            // }

            const ispasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string)

            if (!ispasswordMatched) {
                return done(null, false, { message: "Password does not match" })
            }

            return done(null, isUserExist)
        } catch (error) {
            console.log(error);
            done(error)
        }
    })
)

passport.use(
    new GoogleStrategy(
        {
            clientID: envVar.GOOGLE_CLIENT_ID,
            clientSecret: envVar.GOOGLE_CLIENT_SECRET,
            callbackURL: envVar.GOOGLE_CALLBACK_URL
        }, async (accesstoken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            try {
                const email = profile.emails?.[0].value;

                if (!email) {
                    return done(null, false, { message: "No email found" })
                }
                let user = await User.findOne({ email })

                if (!user) {
                    user = await User.create({
                        email,
                        name: profile.displayName,
                        picture: profile.photos?.[0].value,
                        role: Role.USER,
                        isVerified: true,
                        auths: [
                            {
                                provider: "google",
                                providerId: profile.id
                            }
                        ]

                    })
                }

                return done(null, user)
            } catch (error) {
                console.log("Google Strategy Error", error);
                return done(error)
            }
        }
    )
)

// frontend localhost:5173/login?redirect=/booking -> localhost:5000/api/v1/auth/google?redirect=/booking -> passport -> Google OAuth Consent -> gmail login -> successful -> callback url localhost:5000/api/v1/auth/google/callback -> db store -> token

// Bridge == Google -> user db store -> token
//Custom -> email , password, role : USER, name... -> registration -> DB -> 1 User create
//Google -> req -> google -> successful : Jwt Token : Role , email -> DB - Store -> token - api access


passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user._id)
})

passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = await User.findById(id);
        done(null, user)
    } catch (error) {
        console.log(error);
        done(error)
    }
})