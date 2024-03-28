const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Html5gamesSchema = new Schema({
    html5gamesId: {
        type: String
    },
    html5gamesName: {
        type: String
    }, 
    html5gamesCreated: {
        type: Date
    },
    html5gamesCreator: {
        type: String
    },
    html5gamesPp: {
        type: String,
        default: 'https://www.shareicon.net/download/2015/06/27/60513_games.ico'
    },
    html5gamesLink: {
        type: String,
        default:'https://www.youtube.com/embed/LY40WztaFeA?si=lL-lkVng13mpMkFE'

    }
});

const Html5games = mongoose.model("html5games", Html5gamesSchema);

module.exports = Html5games;