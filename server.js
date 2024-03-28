// import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json())
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/AreySuno", {
    // mongoose.connect("mongodb+srv://areysunona:areysunona@areysuno.a7eakik.mongodb.net/?retryWrites=true&w=majority&appName=AreySuno", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("connected to db"))
    .catch(console.error);

app.listen(2001, () => console.log("Server started at 2001"));




const Songs = require('./collections/songs');
const PlayList = require('./collections/playlist');
const User = require('./collections/user');
const Mood = require('./collections/mood');
const FeedBack = require('./collections/feedback')
const Genre = require('./collections/genre');
const Html5games = require('./collections/html5games');








//login part c
//func to verify whether id pass correct or not
const loginverif = async (usname, uspass) => {
    try {
        // Find a user with the provided userId and userPass
        // const user = await User.findOne({ userName, userPass });
        // console.log(usname, uspass);
        const user = await User.findOne({ userName: usname, userPass: uspass }).lean();
        // console.log('wait', user, usname, uspass);
        // if a user is found, return 1 success otherwise return 0
        console.log('tryblock loginverif')
        return user ? user : 0;
    } catch (error) {
        console.error('Server Error Contact Administrator ', error);
        return "Error in loginverif:"; // Return 0 in case of an error
    }
    //function to return 1 if user id matches with userpass from User database and no if not found or not matched
};
//login api
app.post('/api/login', async (req, res) => {
    const userNam = req.body.userName;
    const userPas = req.body.userPass;
    console.log(userNam, userPas);
    const doneornot = await loginverif(userNam, userPas);
    console.log(doneornot);
    res.json({ doneornot });
    //this api will return 1 or 0 1 for success 0 for un-sucess
    console.log('login api called successfully');
});
//registration part begin
//to get an id of new user
const getNextUserId = async () => {
    try {
        // Count the number of existing users
        // Generate the next user ID based on the count
        const nextuserid = `ASU${uuidv4()}`;
        return nextuserid;
    } catch (error) {
        console.error(error);
        throw new Error('Error generating playlist ID');
    }
};
//func to verify if a user with the username already exists :):):):):)
const regisverif = async (userId, userName, userPass, userPhoneNumber, userAccCreated, userBio, userPp, userType) => {
    try {
        // Find a user with the provided userId and userPass
        const user = await User.findOne({ userName: userName });
        if (user) {
            return "User Already Exists";
        }
        else {
            const newuser = new User({
                userId: userId,
                userName: userName,
                userPass: userPass,
                userPhoneNumber: userPhoneNumber,
                userPp: userPp,
                userAccCreated: userAccCreated,
                userBio: userBio,
                userType: userType
            });
            await newuser.save();
            const userExists = newuser._id;
            // Return 1 if the new user was found, 0 otherwise
            return userExists ? newuser : 'Error in regisverif:';
        }
    } catch (error) {
        console.error('Error in regisverif:', error);
        return 0; // Return 0 in case of an error
    }
};
//api register
app.post('/api/register', async (req, res) => {
    const currentDateAndTime = new Date();
    const userId = await getNextUserId();
    const userName = req.body.userName;
    const userPass = req.body.userPass;
    const userPhoneNumber = req.body.userPhoneNumber;
    const userAccCreated = currentDateAndTime;
    const userBio = req.body.userBio;
    const userPp = req.body.userPp;
    const userType = req.body.userType;
    const doneornot = await regisverif(userId, userName, userPass, userPhoneNumber, userAccCreated, userBio, userPp, userType);
    res.json({ doneornot });
    //this api will return 1 or 0 1 for success 0 for un-sucess
    console.log('regis api called successfully');
});

//api to return data of a particular user
app.get('/api/userdetail/:userid', async (req, res) => {
    try {
        const name = req.params.userid;
        const userr = await User.findOne({ userId: name });
        if (!userr) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(userr);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log('particular user detailed returned successufully')
});
//api to return all users
app.get('/api/allusers', async (req, res) => {

    try {
        const allUsers = await User.find({});
        res.json(allUsers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    // console.log('all moods returned successufully')
});

































// // // // // // // // // // // // // // // // // //SONGS

//api to return all songs
app.get('/api/allsongs', async (req, res) => {

    try {
        const allSongs = await Songs.find({});
        res.json(allSongs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    // console.log('all songs returned successufully')
});
//api to return particular song
app.get('/api/asong/:trackid', async (req, res) => {

    try {
        const trackid = req.params.trackid;
        const song = await Songs.findOne({ trackid: trackid });
        // console.log(song)
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }
        res.json(song);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    // console.log('particular song returned successufully')
});

//func to create a new songId
const getNextSongId = async () => {
    try {
        // Count the number of existing playlists
        // Generate the next playlist ID based on the count
        const nextSongId = `ASS${uuidv4()}`;
        return nextSongId;
    } catch (error) {
        console.error(error);
        throw new Error('Error generating song ID');
    }
};
//api to upload a new song
app.post('/api/newsong', async (req, res) => {
    const newSongId = await getNextSongId();
    const currentDateAndTime = new Date();
    // console.log(currentDateAndTime);
    //add into playlist collection
    const song = new Songs({
        trackid: newSongId,
        songUploaded: currentDateAndTime,
        songName: req.body.songName,
        mood: req.body.mood,
        genre: req.body.genre,
        songUploader: req.body.songUploader,
        songAlbumCover: req.body.songAlbumCover,
        artistName: req.body.artistName,
        url: req.body.apilink
    });
    await song.save();
    //add into userdata
    const userd = req.body.songUploader;
    const user = await User.findOne({ userId: userd });
    if (!user) {
        // console.log(2222)
        return res.status(404).json({ error: 'User not found1' });
    }
    // Append the new playlist ID to the userPlayList array 
    user.uploadedSongs.push(newSongId);

    // Save the updated user document
    await user.save();
    res.json({ song });
    console.log('new song created successufully')

    //mood appending the song
    const moodp = req.body.mood;
    try {
        const moody = await Mood.findOne({ moodName: moodp });
        console.log(moody.moodSongs)
        moody.moodSongs.push(newSongId);
        await moody.save();
        console.log(moody.moodSongs)
    }
    catch (e) {
        console.error(e)
    }
    const genrep = req.body.genre;
    try {
        const genrey = await Genre.findOne({ genreName: genrep });
        // console.log(moodp, moody)
        genrey.genreSongs.push(newSongId);
        // console.log(moody.playListSongs)
        await genrey.save();
    }
    catch (e) {
        console.error(e)
    }
});
































// // // // // // // // // // // // // // // // //PLAYLIST

//api to return particular playlist
app.get('/api/playlist/:playListId', async (req, res) => {

    try {
        const playListId = req.params.playListId;
        const playList = await PlayList.findOne({ playListId: playListId });
        if (!playList) {
            return res.status(404).json({ error: 'playList not found' });
        }
        res.json(playList);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        console.log('particular playlist returned successufully')
    }
});
//func to create a new playlist
const getNextPlaylistId = async () => {
    try {
        // Count the number of existing playlists
        // Generate the next playlist ID based on the count
        const nextPlaylistId = `ASP${uuidv4()}`;
        return nextPlaylistId;
    } catch (error) {
        console.error(error);
        throw new Error('Error generating playlist ID');
    }
};
//api to create a new playlist
app.post('/api/newplaylist', async (req, res) => {
    const newPlaylistId = await getNextPlaylistId();
    const currentDateAndTime = new Date();
    // console.log(currentDateAndTime);
    //add into playlist collection
    const play = new PlayList({
        playListId: newPlaylistId,
        playListName: req.body.playListName,
        playListCover: req.body.playListCover,
        playListCreator: req.body.playListCreator,

        playListCreated: currentDateAndTime,
        collaborative: req.body.collaborative,
        publik: req.body.publik
    });
    await play.save();
    //add into userdata
    const userd = req.body.playListCreator;
    const user = await User.findOne({ userId: userd });
    if (!user) {
        // console.log(2222)
        return res.status(404).json({ error: 'User not found1' });
    }
    // Append the new playlist ID to the userPlayList array 
    user.userPlayList.push(newPlaylistId);
    // Save the updated user document
    await user.save();
    // console.log(user);
    // console.log(play);
    // res.json(user);
    // res.json(play);
    res.json({ play });
    console.log('new playlist created successufully')
});
//get api to fetch all publik playlists
app.get('/api/allpublikplaylists', async (req, res) => {

    try {
        const allPublicPlaylists = await PlayList.find({ publik: true });
        // console.log(allPublicPlaylists)
        // if (allPublicPlaylists)
        res.json(allPublicPlaylists);
        // else
        // res.json([])
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    // console.log('all publik playlists returned successufully')
});



















// // // // // // // // // // // // // // //FEEDBACK

//func to create a new feedback
const getnextFeedBackId = async () => {
    try {
        // Count the number of existing playlists
        // Generate the next playlist ID based on the count
        const nextFeedBackId = `ASF${uuidv4()}`;
        return nextFeedBackId;
    } catch (error) {
        console.error(error);
        throw new Error('Error generating feedback ID');
    }
};
//post api to add new feedback
app.post('/api/newfeedback', async (req, res) => {
    const newFeedBackId = await getnextFeedBackId();
    const currentDateAndTime = new Date();
    // console.log(currentDateAndTime);
    //add into feedback collection
    const feed = new FeedBack({
        feedbackId: newFeedBackId,
        feedbackTitle: req.body.feedbackTitle,
        feedbackContent: req.body.feedbackContent,
        feedbackCreated: currentDateAndTime,
        feedbackCreator: req.body.feedbackCreator
    });
    await feed.save();
    res.json({ feed });
    console.log('new feedback created successufully');
});
//get api to fetch all feedbacks
app.get('/api/allfeedbacks', async (req, res) => {

    try {
        const allFeedBacks = await FeedBack.find({});
        res.json(allFeedBacks);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    // console.log('all songs returned successufully')
});
//get api to fetch single feedback
app.get('/api/feedbackdetail/:feedbackId', async (req, res) => {
    try {
        const id = req.params.feedbackId;
        const feed = await FeedBack.findOne({ feedbackId: id });
        if (!feed) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.json(feed);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log('particular feedback returned successufully')
});













// // // // // // // // // // // // // // MOOD
//moods
//post api to upload a new mood

//func to create a new mood
const getNextMoodId = async () => {
    try {
        // Count the number of existing mood
        // Generate the next mood ID based on the count
        const nextMoodId = `ASM${uuidv4()}`;
        return nextMoodId;
    } catch (error) {
        console.error(error);
        throw new Error('Error generating mood ID');
    }
};
//api to create a new mood
app.post('/api/newmood', async (req, res) => {
    const newMoodId = await getNextMoodId();
    const currentDateAndTime = new Date();
    // console.log(currentDateAndTime);
    //add into mood collection
    const moood = new Mood({
        moodId: newMoodId,
        moodName: req.body.moodName,
        moodCover: req.body.moodCover,
        moodCreator: req.body.moodCreator,
        moodCreated: currentDateAndTime
    });
    await moood.save();
    //add into user data
    const userd = req.body.moodCreator;
    const user = await User.findOne({ userId: userd });
    if (!user) {
        // console.log(2222)
        return res.status(404).json({ error: 'User not found1' });
    }
    // Append the new playlist ID to the userPlayList array 
    user.userMoodMade.push(newMoodId);
    // Save the updated user document
    await user.save();
    // console.log(user);
    // console.log(play);
    // res.json(user);
    // res.json(play);
    res.json({ moood });
    console.log('new mood created successufully');
});

//getapi for returning all moods
//api to return all moods
app.get('/api/allmoods', async (req, res) => {

    try {
        const allMoods = await Mood.find({});
        res.json(allMoods);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    // console.log('all moods returned successufully')
});

//get api to return single mood
app.get('/api/mooddetail/:moodId', async (req, res) => {
    try {
        const id = req.params.moodId;
        const det = await Mood.findOne({ moodId: id });
        if (!det) {
            return res.status(404).json({ error: 'Mood not found' });
        }
        res.json(det);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log('particular mood returned successufully')
});













// // // // // // // // // // // // // // Genre
//moods
//post api to upload a new genre

//func to create a new genre
const getNextGenreId = async () => {
    try {
        // Count the number of existing mood
        // Generate the next mood ID based on the count
        const nextGenreId = `ASG${uuidv4()}`;
        return nextGenreId;
    } catch (error) {
        console.error(error);
        throw new Error('Error generating genre ID');
    }
};
//api to create a new genre
app.post('/api/newgenre', async (req, res) => {
    const newGenreId = await getNextGenreId();
    const currentDateAndTime = new Date();
    // console.log(currentDateAndTime);
    //add into genre collection
    const gen = new Genre({
        genreId: newGenreId,
        genreName: req.body.genreName,
        genreCover: req.body.genreCover,
        genreCreator: req.body.genreCreator,
        genreCreated: currentDateAndTime
    });
    await gen.save();
    //add into user data 
    const userd = req.body.genreCreator;
    const user = await User.findOne({ userId: userd });
    if (!user) {
        // console.log(2222)
        return res.status(404).json({ error: 'User not found122' });
    }
    // Append the new playlist ID to the userPlayList array 
    user.userGenreMade.push(newGenreId);
    // Save the updated user document
    await user.save();
    res.json({ gen });
    console.log('new mood created successufully');
});

//getapi for returning all moods
//api to return all moods
app.get('/api/allgenres', async (req, res) => {

    try {
        const allGenres = await Genre.find({});
        res.json(allGenres);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    // console.log('all moods returned successufully')
});

//get api to return single genre
app.get('/api/genredetail/:genreId', async (req, res) => {
    try {
        const id = req.params.genreId;
        const det = await Genre.findOne({ genreId: id });
        if (!det) {
            return res.status(404).json({ error: 'Genre not found' });
        }
        res.json(det);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log('particular genre returned successufully')
});

// // // // // // // // // // // // // // // // // // // // // // //UPDATE GENRE API

app.put('/api/updategenre/:genreId', async (req, res) => {
    try {
        const id = req.params.genreId;
        const genreToUpdate = await Genre.findOne({ genreId: id });
        const prevname = ToUpdate.genreName;

        //update shuru
        genreToUpdate.genreName = req.body.genreName;
        genreToUpdate.genreCover = req.body.genreCover;

        await genreToUpdate.save();
        await Songs.updateMany({ genre: prevname }, { $set: { genre: req.body.genreName } });


        res.json({ message: 'Genre updated successfully', updatedGenre: genreToUpdate });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log('particular genre updated successufully')
})
// // // // // // // // // // // // // // // // // // // // // // // // // //delete genre api
app.delete('/api/deletegenre/:genreId', async (req, res) => {
    const Id = req.params.genreId;
    try {
        //change songs genre data
        const prevnam = await Genre.findOne({ genreId: Id });
        const prevname = prevnam.genreName;
        await Songs.updateMany({ genre: prevname }, { $set: { genre: 'Not Set' } });
        //changing user uploadedgenres
        await User.updateMany({ userGenreMade: Id }, { $pull: { userGenreMade: Id } }
        );

        const deleted = await Genre.findOneAndDelete({ genreId: Id });
        if (!mongoose.deleted) {
            return res.status(404).json({ message: "Genre not found" });
        }
        res.status(200).json({ message: "Genre deleted successfully", deleted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// // // // // // // // // // // // // // // // // // // // // // // // // //delete playlist api
app.delete('/api/deleteplaylist/:playId', async (req, res) => {
    const Id = req.params.playId;
    try {

        // updating user info removing playlistmade
        await User.updateMany({ userPlayList: Id }, { $pull: { userPlayList: Id } });

        const deleted = await PlayList.findOneAndDelete({ playListId: Id });

        if (!deleted) {
            return res.status(404).json({ message: "Playlist not found" });
        }
        res.status(200).json({ message: "playlist deleted successfully", deleted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// // // // // // // // // // // // // // // // // // // // // // //UPDATE playlist API

app.put('/api/updateplaylist/:playlistId', async (req, res) => {
    try {
        const id = req.params.playlistId;
        const ToUpdate = await PlayList.findOne({ playListId: id });

        //update shuru
        ToUpdate.playListName = req.body.playListName;
        ToUpdate.playListCover = req.body.playListCover;
        ToUpdate.collaborative = req.body.collaborative;
        ToUpdate.publik = req.body.publik;

        await ToUpdate.save();
        res.json({ message: 'playlist updated successfully', updated: ToUpdate });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log('particular playlist updated successufully')
})

// // // // // // // // // // // // // // // // // // // // // // // // // //delete mood api
app.delete('/api/deletemood/:moodId', async (req, res) => {
    const Id = req.params.moodId;
    try {
        //change songs mood data
        const prevnam = await Mood.findOne({ moodId: Id });
        const prevname = prevnam.moodName;
        await Songs.updateMany({ mood: prevname }, { $set: { mood: 'Not Set' } });
        //changing user uploadedmoods
        await User.updateMany(
            { userMoodMade: Id },
            { $pull: { userMoodMade: Id } }
        );

        const deleted = await Mood.findOneAndDelete({ moodId: Id });
        if (!deleted) {
            return res.status(404).json({ message: "mood not found" });
        }
        res.status(200).json({ message: "mood deleted successfully", deleted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// // // // // // // // // // // // // // // // // // // // // // //UPDATE mood API

app.put('/api/updatemood/:moodId', async (req, res) => {
    try {
        const id = req.params.moodId;
        const ToUpdate = await Mood.findOne({ moodId: id });

        const prevname = ToUpdate.moodName;
        //update shuru
        ToUpdate.moodName = req.body.moodName;
        ToUpdate.moodCover = req.body.moodCover;

        await ToUpdate.save();
        await Songs.updateMany({ mood: prevname }, { $set: { mood: req.body.moodName } });

        res.json({ message: 'mood updated successfully', updatedmood: ToUpdate });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log('particular mood updated successufully')
})

// // // // // // // // // // // // // // // // // // // // // // // // // //delete song api
app.delete('/api/deletesong/:songId', async (req, res) => {
    const Id = req.params.songId;
    try {
        //remove from useruploaded
        await User.updateMany({ uploadedSongs: Id }, { $pull: { uploadedSongs: Id } });
        //remove from mood
        await Mood.updateMany({ moodSongs: Id }, { $pull: { moodSongs: Id } });
        //remove from genre
        await Genre.updateMany({ genreSongs: Id }, { $pull: { genreSongs: Id } });
        //remove from playlist
        await PlayList.updateMany({ playListSongs: Id }, { $pull: { playListSongs: Id } });
        //remove from songs table
        const deleted = await Songs.findOneAndDelete({ trackid: Id });
        if (!deleted) {
            return res.status(404).json({ message: "song not found" });
        }
        res.status(200).json({ message: "song deleted successfully", deleted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// // // // // // // // // // // // // // // // // // // // // // //UPDATE song API

app.put('/api/updatesong/:songId', async (req, res) => {
    try {
        const id = req.params.songId;
        const ToUpdate = await Songs.findOne({ trackid: id });

        //update shuru in songs table
        ToUpdate.songName = req.body.songName;
        ToUpdate.songAlbumCover = req.body.songAlbumCover;
        ToUpdate.artistName = req.body.artistName;
        //[prev mood]
        const prevmood = ToUpdate.mood;
        ToUpdate.mood = req.body.mood;
        //[prev genre]
        const prevgenre = ToUpdate.genre;
        ToUpdate.genre = req.body.genre;
        ToUpdate.url = req.body.url;

        await ToUpdate.save();
        //update in mood
        if (prevmood !== ToUpdate.mood) {
            const pmood = await Mood.findOne({ moodName: prevmood });
            pmood.moodSongs = pmood.moodSongs.filter(item => item !== id);
            await pmood.save();
            const nmood = await Mood.findOne({ moodName: ToUpdate.mood });
            nmood.moodSongs.push(id);
            await nmood.save();
        }
        //update ingenre
        if (prevgenre !== ToUpdate.genre) {
            const pgenre = await Genre.findOne({ genreName: prevgenre });
            pgenre.genreSongs = pgenre.genreSongs.filter(item => item !== id);
            await pgenre.save();
            const ngenre = await Genre.findOne({ genreName: ToUpdate.genre });
            ngenre.genreSongs.push(id);
            await ngenre.save();
        }
        res.json({ message: 'Genre updated successfully', updated: ToUpdate });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log('particular genre updated successufully')
})

// // // // // // // // // // // // // // // // // // // // // // // // // //delete game api
app.delete('/api/deletegame/:gameId', async (req, res) => {
    const Id = req.params.gameId;
    try {
        await User.updateMany({ userUploadedGames: Id }, { $pull: { userUploadedGames: Id } });

        const deleted = await Html5games.findOneAndDelete({ html5gamesId: Id });
        if (!deleted) {
            return res.status(404).json({ message: "game not found" });
        }
        res.status(200).json({ message: "game deleted successfully", deleted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// // // // // // // // // // // // // // // // // // // // // // //UPDATE playlist API

app.put('/api/updategame/:gameId', async (req, res) => {
    try {
        const id = req.params.gameId;
        const ToUpdate = await Html5games.findOne({ html5gamesId: id });

        //update shuru
        ToUpdate.html5gamesName = req.body.html5gamesName;
        ToUpdate.html5gamesPp = req.body.html5gamesPp;
        ToUpdate.collaborative = req.body.collaborative;
        ToUpdate.html5gamesLink = req.body.html5gamesLink;

        await ToUpdate.save();
        res.json({ message: 'game updated successfully', updated: ToUpdate });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log('particular game updated successufully')
})


// // // // // // // // // // // // // // // // // // // // // // // // // //delete feedback api
app.delete('/api/deletefeedback/:feedId', async (req, res) => {
    const Id = req.params.feedId;
    try {
        const deleted = await FeedBack.findOneAndDelete({ feedbackId: Id });
        if (!deleted) {
            return res.status(404).json({ message: "feedback not found" });
        }
        res.status(200).json({ message: "feedback deleted successfully", deleted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// // // // // // // // // // // // // // // // // // // // // // // // // //delete user api
app.delete('/api/deleteuser/:userId', async (req, res) => {
    const Id = req.params.userId;
    try {
        const deleted = await User.findOneAndDelete({ userId: Id });
        if (!deleted) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json({ message: "user deleted successfully", deleted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// // // // // // // // // // // // // // // // // del playlist song
app.delete('/api/deletePlaylistSong/:playlistId/:songId', async (req, res) => {
    const Id = req.params.playlistId;
    const songId = req.params.songId;
    try {
        //removing from playListSongs
        const find = await PlayList.findOne({ playListId: Id });
        console.log(find.playListSongs)
        find.playListSongs = find.playListSongs.filter(item => item != songId);
        console.log(find.playListSongs)
        await find.save();
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});
// // // // // // // // // // // // // // // // // del playlist song
app.get('/api/appendPlaylistSong/:playlistId/:songId', async (req, res) => {
    const Id = req.params.playlistId;
    const songId = req.params.songId;
    try {
        //removing from playListSongs
        const find = await PlayList.findOne({ playListId: Id });
        console.log(find.playListSongs)
        find.playListSongs.push(songId);
        console.log(find.playListSongs)
        await find.save();
        res.json(find)
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

// // // // // // // // // // // // // // //add to a playlist
app.post('api/addToPlaylist/:playlistId/:songId', async (req, res) => {
    const Id = req.params.playlistId;
    const songId = req.params.songId;
    try {
        //add to playlist   
        const find = await PlayList.findOne({ playListId: Id });
        console.log(find.playListSongs)
        find.playListSongs.push(songId);
        console.log(find.playListSongs)
        await find.save();
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' })
    }
})



// // // // // // // // // // // // // // HTML%GAMES
//moods
//post api to upload a new game

//func to create a new gameid
const getNextGameId = async () => {
    try {
        // Count the number of existing game
        // Generate the next game ID based on the count
        const nextGameId = `ASH${uuidv4()}`;
        return nextGameId;
    } catch (error) {
        console.error(error);
        throw new Error('Error generating game ID');
    }
};
//api to create a new game
app.post('/api/newgame', async (req, res) => {
    const newGameId = await getNextGameId();
    const currentDateAndTime = new Date();
    // console.log(currentDateAndTime);
    //add into genre collection
    const gen = new Html5games({
        html5gamesId: newGameId,
        html5gamesName: req.body.html5gamesName,
        html5gamesPp: req.body.html5gamesPp,
        html5gamesCreator: req.body.html5gamesCreator,
        html5gamesCreated: currentDateAndTime,
        html5gamesLink: req.body.html5gamesLink
    });
    await gen.save();
    //add into user data
    const userd = req.body.html5gamesCreator;
    const user = await User.findOne({ userId: userd });
    if (!user) {
        // console.log(2222)
        return res.status(404).json({ error: 'User not found1' });
    }
    // Append the new playlist ID to the userPlayList array 
    user.userUploadedGames.push(newGameId);
    // Save the updated user document
    await user.save();
    res.json({ gen });
    console.log('new game created successufully');
});

//getapi for returning all games
//api to return all games
app.get('/api/allgames', async (req, res) => {

    try {
        const allGames = await Html5games.find({});
        res.json(allGames);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    // console.log('all games returned successufully')
    // console.log(await everythingatonce('happy'));
});
app.get('/api/agame/:id', async (req, res) => {
    const id = req.params.id
    const allGames = await Html5games.find({ html5gamesId: id });
    res.json(allGames);
});











app.get('/api/search/:ele', async (req, res) => {
    const toSearch = req.params.ele;
    const output = await everythingatonce(toSearch);
    res.json(output);

});

const everythingatonce = async (toSearch) => {
    const allGames = await Html5games.find({});
    const allGenres = await Genre.find({});
    const allMoods = await Mood.find({});
    const allPlaylists = await PlayList.find({ publik: true });
    const allSongs = await Songs.find({});
    let everything = [];
    // console.log(allGames)

    allMoods.forEach((element) => {
        everything.push({ [`${element.moodId}`]: `${element.moodName.toLowerCase()}` })
    });

    allSongs.forEach((element) => {
        everything.push({ [`${element.trackid}`]: `${element.songName.toLowerCase()} ${element.artistName.toLowerCase()} ${element.mood.toLowerCase()} ${element.genre.toLowerCase()}` })
    });

    allGames.forEach((element) => {
        everything.push({ [`${element.html5gamesId}`]: `${element.html5gamesName.toLowerCase()}` })
    });

    allGenres.forEach((element) => {
        everything.push({ [`${element.genreId}`]: `${element.genreName.toLowerCase()}` })
    });

    allPlaylists.forEach((element) => {
        everything.push({ [`${element.playListId}`]: `${element.playListName.toLowerCase()}` })
    });
    // console.log(everything)
    let output = [];
    for (let i = 0; i < everything.length; i++) {
        const key = Object.keys(everything[i])[0]; // Get the key (html5gamesId)
        const value = everything[i][key]; // Get the value
        if (value.includes(toSearch)) {
            output.push(key); // Return the key if the value includes the toSearch string
        }
    }
    return output;
    // if(everything value .includes(toSearch)){return id of that key-value pair}
}
// console.log('sdsd')
// console.log(everythingatonce('hel'));








//send mail
app.get('/api/mailer/:email/:content/:reciever',async (req,res)=>{
    console.log('hey')
    const EmailtoSend=req.params.email;
    const contentToSend=req.params.content;
    const nameOfReciever=req.params.reciever;

    const transporter = nodemailer.createTransport({

        service: 'gmail',
        // secure: false,
        auth: {
            user: '1winnext@gmail.com',
            // pass: 'Yashalwayswin@99'
            pass: 'ukqshdzbrqurmrrw'
        }
    });

    const mailOptions = {
        from: 'Arey Suno <1winnext@gmail.com>',
        // to: doc.doctorEmail,
        // to: 'gupta.jatin273@gmail.com',
        to: EmailtoSend,
        subject: `FeedBack Recieved from ${nameOfReciever}`,
        text: `
        Dear ${nameOfReciever},\n
        We have successfully recieved your feedback for our application Arey Suno.
        \n\n\n\n\n
        Your Feedback:\n
        ${contentToSend}
        \n\n\n\n\n
        We wish you a good luck,\n
        Regards,\n
        Arey Suno Devs
        `

    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
            // console.log(nodemailer.getTestMessageUrl(info))
        }
    });
    res.send('sent')
})