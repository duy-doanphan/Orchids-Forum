const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const UserSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        email: {
            type: String,
            unique: true,
        },
        username: {
            type: String,
            unique: true,
        },
        password: String,
        avatar: {
            public_id: {
                type: String,
                default: null,
            },
            url: {
                type: String,
                default: "https://i.imgur.com/iV7Sdgm.jpg",
            },
        },
        cover: {
            public_id: {
                type: String,
                default: null,
            },
            url: {
                type: String,
                default: "https://i.imgur.com/CAFy1oY.jpg",
            },
        },
        socialNetwork: {
            facebook: {
                type: String,
                trim: true,
                match:
                    /(?:https?:\/\/)?(?:www\.|m\.|mobile\.|touch\.|mbasic\.)?(?:facebook\.com|fb(?:\.me|\.com))\/(?!$)(?:(?:\w)*#!\/)?(?:pages\/|pg\/)?(?:photo\.php\?fbid=)?(?:[\w\-]*\/)*?(?:\/)?(?:profile\.php\?id=)?([^\/?&\s]*)(?:\/|&|\?)?.*/gm,
                default: "",
            },
            zalo: {
                type: String,
                trim: true,
                default: "",
            }
        },
        bio: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "A new user of Orchids forum",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isLock: {
            type: Boolean,
            default: false,
        },
        following: [
            {
                type: String,
                default: [],
            },
        ],
        followers: [
            {
                type: String,
                default: [],
            },
        ],
    },
    {timestamps: true}
);

UserSchema.virtual("user_following", {
    ref: "User",
    localField: "following",
    foreignField: "username",
});

UserSchema.virtual("user_followers", {
    ref: "User",
    localField: "followers",
    foreignField: "username",
});

UserSchema.set("toObject", {virtuals: true});
UserSchema.set("toJSON", {virtuals: true});

UserSchema.plugin(AutoIncrement, {inc_field: "userID"});

module.exports = mongoose.model("User", UserSchema);
