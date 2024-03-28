const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    //1
    userId: {
        type: String
    },
    //2
    userName: {
        type: String
    },
    //3
    userPass: {
        type: String 
    },
    //4
    userPp: {
        type: String,
        default: 'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg'
    },
    //5
    userBio: {
        type: String
    },
    //6
    userPhoneNumber: {
        type: Number
    },
    //7
    userAccCreated: {
        type: Date
    },
    //8
    userType: {
        type: String,
        default: 'user'
    },
    //9
    userPlayList: {
        type: [String],
        default: []
    },
    //10
    userLikedPlayList: {
        type: [String],
        default: []
    }, 
    //11
    userGenreFav: {
        type: [String],
        default: []
    },
    //12
    userMoodFav: {
        type: [String],
        default: []
    },
    //13
    uploadedSongs: {
        type: [String],
        default: []
    },
    //14
    userMoodMade: {
        type: [String],
        default: []
    },
    //15
    userGenreMade: {
        type: [String],
        default: []
    },
    //16
    userLikedPlayList: {
        type: [String],
        default: []
    },
    //17
    userUploadedGames: {
        type: [String],
        default: []
    },
    //18
    userListenedMins: { 
        type: Number,
        default: 0
    }
});


const User = mongoose.model("User", UserSchema);


module.exports = User;