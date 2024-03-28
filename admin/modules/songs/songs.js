import { React, useState, useEffect } from 'react'
import './songs.css'

export default function Songs() {

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:2001/api/allsongs');
            const result = await response.json();
            setSongs(result);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }

        try {
            const response = await fetch('http://localhost:2001/api/allmoods');
            const data = await response.json();
            const allmoods = data.map(element => element.moodName);

            setAllmood(allmoods)

            const response1 = await fetch('http://localhost:2001/api/allgenres');
            const data1 = await response1.json();
            const allgenres = data1.map(element => element.genreName);

            setAllgenre(allgenres)
        }
        catch (error) {
            console.error('Error fetching moods:', error);
        }

    };
    useEffect(() => {
        fetchData();
    }, []);


    const showform = () => {
        document.getElementById('showhide').style.display = 'flex';
        document.getElementById('hideshowbuttontoggler').style.display = 'none';
    }

    const Uploader = 'ASUb08e0adf-a0d8-4999-af70-8b41a8a5f206'

    const [songs, setSongs] = useState([]);
    const [allmood, setAllmood] = useState([]);
    const [allgenre, setAllgenre] = useState([]);


    const [songName, setSongName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [mood, setMood] = useState('');
    const [genre, setGenre] = useState('');
    const [songURL, setSongURL] = useState('');
    const [songAlbumCover, setSongAlbumCover] = useState('');

    const checklinks = () => {
        if (songURL.includes('.mp3') || songURL.includes('.m4a') || songURL.includes('.wav') || songURL.includes('.ogg')) {
            if (songAlbumCover.includes('.jpg') || songAlbumCover.includes('.jpeg') || songAlbumCover.includes('.ico') || songAlbumCover.includes('.png') || songAlbumCover.includes('.svg') || songAlbumCover.includes('.webp') || songAlbumCover.includes('.heic')) {
                return true;
            }
        }
        return false;
    };

    const songupload = async () => {
        if (songName === '' || songAlbumCover === '' || artistName === '' || songURL === '' || mood === 'Choose the Song Mood...' || mood === '' || genre === 'Choose the Song Genre...' || genre === '') {
            alert('All Fields Are Mandatory in order to submit a song upload request')
            return;
        }
        if (!checklinks()) {
            alert('Links Invalid');
            return;
        }
        alert(songName, mood)

        try {
            const response = await fetch('http://localhost:2001/api/newsong', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    songName: songName,
                    songUploader: Uploader,
                    songAlbumCover: songAlbumCover,
                    artistName: artistName,
                    apilink: songURL,
                    mood: mood, 
                    genre: genre
                }),
            });
            const data = await response.json();
            console.log('Song added successfully:', data);
            // Reset form fields after successful submission
            setSongName('');
            setSongAlbumCover('');
            setArtistName('');
            setMood('');
            setGenre('');
            setSongAlbumCover('');
            setSongURL('');

            fetchData();
        } catch (error) {
            console.error('Error adding song:', error);
        }
    }



    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // c
    const [edit, setedit] = useState(null);

    const handleEdit = (genre) => {
        // setShowFormUpdate('block')
        setedit(genre);
        console.log(edit);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        // setShowFormUpdate('block')
        const updated = {
            trackid: edit.trackid,
            songName: event.target.songName.value,
            songAlbumCover: event.target.songCover.value,
            artistName: event.target.artistName.value,
            url: event.target.apiurl.value,
            mood: event.target.moood.value,
            genre: event.target.gennre.value
            // aur add krna hai to kr wahi krna jo update krna ho
        };
        console.log(updated)
        // return;
        try {
            const response = await fetch('http://localhost:2001/api/updatesong/' + edit.trackid, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updated),
            });
            const data = await response.json();
            console.log('song updated successfully:', data);
            setedit(null);
            fetchData();
        } catch (error) {
            console.error('Error updating song:', error);
        }
    };

    const handleDelete = async (Id) => {
        try {
            const response = await fetch(`http://localhost:2001/api/deletesong/${Id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log('song deleted successfully:', data);
            fetchData();
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };
    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // c


    return (
        <div className='Songs'>
            <h1>Songs</h1>
            <hr />
            <div className="songs-stats">
                <div className="songs-yours">
                    Songs Uploaded By You :xx
                </div>
                <div className="circle-stat">
                    {/* gola gola */}
                </div>
                <div className="songs-total">
                    Songs Uploaded Total :{songs.length}

                </div>
            </div>
            <hr />
            <button onClick={showform} id='hideshowbuttontoggler'>Upload a Song</button>
            <div className="upload-the-song" id='showhide'>
                <input type="text" className='form-control' placeholder='Song Name' value={songName} onChange={(e) => setSongName(e.target.value)} required />
                <input type="text" className='form-control' placeholder='Artist Name' value={artistName} onChange={(e) => setArtistName(e.target.value)} required />
                <select className="custom-selectdd" id="moood" value={mood} onChange={(e) => setMood(e.target.value)} required>
                    <option>Choose the Song Mood...</option>
                    {allmood.map((mood, index) => (
                        <option key={index} value={mood}>{mood}</option>
                    ))}
                </select>
                <select className="custom-selectdd" id="gennre" value={genre} onChange={(e) => setGenre(e.target.value)} required>
                    <option>Choose the Song Genre...</option>
                    {allgenre.map((genre, index) => (
                        <option key={index} value={genre}>{genre}</option>
                    ))}
                </select>
                <input type="text" className='form-control' placeholder='Song URL' value={songURL} onChange={(e) => setSongURL(e.target.value)} required />
                <input type="text" className='form-control' placeholder='Album Cover URL' value={songAlbumCover} onChange={(e) => setSongAlbumCover(e.target.value)} required />
                <button className='btn btn-light' onClick={songupload}>Upload Song</button>
            </div>
            <hr />


            {/*  */}
            {edit && (
                <div className="modal" style={{ display: 'block' }}>
                    <form onSubmit={handleUpdate}>
                        Song Name<input type="text" name="songName" defaultValue={edit.songName} /><br /><br />
                        Song Cover<input type="text" name="songCover" defaultValue={edit.songAlbumCover} /><br /><br />
                        Artist Name<input type="text" name="artistName" defaultValue={edit.artistName} /><br /><br />
                        Song API Link<input type="text" name="apiurl" defaultValue={edit.url} /><br /><br />

                        Mood <select className="custom-selectdd" name="moood" required>
                            {allmood.map((mood, index) => (
                                <option key={index} value={mood} selected={mood === edit.mood}>{mood}</option>
                            ))}
                        </select><br /><br />
                        Genre
                        <select className="custom-selectdd" name="gennre" required>
                            {allgenre.map((genre, index) => (
                                <option key={index} value={genre} selected={genre === edit.genre}>{genre}</option>
                            ))}
                        </select>
                        <br /><br />
                        {/* aur lagana hai to lagaalena idhar */}
                        <button type="submit">Update</button>{'                '}
                        <button onClick={() => { setedit(null) }}>Cancel</button>
                    </form>
                </div>
            )}
            {/*  */}



            <hr />
            <h1>All Songs</h1>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>
                            S.No
                        </th>
                        <th>
                            SongId
                        </th>
                        <th>
                            Albumcover
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Artist
                        </th>
                        <th>
                            Mood
                        </th>
                        <th>
                            Genre
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{song.trackid}</td>
                            <td></td>
                            <td>{song.songName}</td>
                            <td>{song.artistName}</td>
                            <td>{song.mood}</td>
                            <td>{song.genre}</td>
                            {/*  */}
                            <td>
                                <button onClick={() => handleEdit(song)}>Edit</button>
                                <button onClick={() => handleDelete(song.trackid)}>Delete</button>
                            </td>
                            {/*  */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
