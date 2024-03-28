import { React, useState, useEffect } from 'react'
import './playlists.css'

export default function Playlists() {


    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:2001/api/allpublikplaylists');
            const result = await response.json();
            setplayLists(result);
        } catch (error) {
            console.error('Error fetching data:', error);
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

    const [playLists, setplayLists] = useState([]);
    const [playListName, setplayListName] = useState('');
    const [playListCover, setplayListCover] = useState('');
    const [collaborative, setCollaborative] = useState('false');

    const checklink = () => {
        console.log('sdsdsdsdsdsdsdsd')

        if (playListCover.includes('.jpg') || playListCover.includes('.jpeg') || playListCover.includes('.ico') || playListCover.includes('.png') || playListCover.includes('.svg') || playListCover.includes('.webp') || playListCover.includes('.heic')) {
            return true;
        }
        return false;
    };

    const playListupload = async () => {
        if (playListName === '' || playListCover === '') {
            alert('All Fields Are Mandatory in order to submit a playList upload request')
            return;
        }
        if (!checklink()) {
            alert('Link Invalid');
            return;
        }

        alert(1 + '\n' + playListName + '\n' + playListCover)

        try {
            const response = await fetch('http://localhost:2001/api/newplaylist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    playListName: playListName,
                    playListCreator: Uploader,
                    playListCover: playListCover,
                    publik: true,
                    collaborative: collaborative
                }),
            });
            const data = await response.json();
            console.log('playList added successfully:', data);
            // Reset form fields after successful submission
            setplayListName('');
            setplayListCover('');

            fetchData();
        } catch (error) {
            console.error('Error adding playList:', error);
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
            playListId: edit.playListId,
            playListName: event.target.Name.value,
            playListCover: event.target.Cover.value,
            collaborative: event.target.collab.value,
            publik: event.target.publik.value,
            // aur add krna hai to kr wahi krna jo update krna ho
        };
        console.log(updated)
        // return;
        try {
            const response = await fetch('http://localhost:2001/api/updateplaylist/' + edit.playListId, {
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
            const response = await fetch(`http://localhost:2001/api/deleteplaylist/${Id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            console.log('playlist deleted successfully:', data);
            fetchData();
        } catch (error) {
            console.error('Error deleting playlist:', error);
        }
    };
    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // c


    const handleSongRemoval = async (pId, sId) => {
        try {
            const response = await fetch(`http://localhost:2001/api/deletePlaylistSong/${pId}/${sId}`, {
                method: 'DELETE'
            });
            const data = response.json();
            console.log('song removed successfully:', data);
            fetchData();
        }
        catch (e) {
            console.error('Error removing song:', e);
        }
    }
    return (
        <div className='playLists'>
            <h1>playLists</h1>
            <hr />
            <div className="playLists-stats">
                <div className="playLists-yours">
                    playLists Uploaded By You :xx
                </div>
                <div className="circle-stat">
                    {/* gola gola */}
                </div>
                <div className="playLists-total">
                    playLists Uploaded Total :{playLists.length}

                </div>
            </div>
            <hr />
            <button onClick={showform} id='hideshowbuttontoggler'>Upload a Public playList</button>
            <div className="upload-the-playList" id='showhide'>
                <input type="text" className='form-control' placeholder='playList Name' value={playListName} onChange={(e) => setplayListName(e.target.value)} required />
                <input type="text" className='form-control' placeholder='playList cover URL' value={playListCover} onChange={(e) => setplayListCover(e.target.value)} required />
                Collaborative (By Default false) <br />
                Yes<input type="radio" id="collaborative" name="collaborative" value={collaborative} onClick={() => { setCollaborative('true') }} />
                No<input type="radio" id="not-collaborative" name="collaborative" value={collaborative} onClick={() => { setCollaborative('false') }} />

                <button className='btn btn-light' onClick={playListupload}>Upload Public playList</button>
            </div>
            <hr />
            {/*  */}
            {edit && (
                <div className="modal" style={{ display: 'block' }}>
                    <form onSubmit={handleUpdate}>
                        Playlist Name<input type="text" name="Name" defaultValue={edit.playListName} /><br /><br />
                        Playlist Cover<input type="text" name="Cover" defaultValue={edit.playListCover} /><br /><br />
                        Collaborative{'             '}
                        <select className="custom-selectdd" name="collab" required>
                            <option value={true} selected={edit.collaborative === true}>Yes</option>
                            <option value={false} selected={false === edit.collaborative}>No</option>
                        </select><br /><br />
                        Public{'             '}
                        <select className="custom-selectdd" name="publik" required>
                            <option value={true} selected={true === edit.publik}>Yes</option>
                            <option value={false} selected={false === edit.publik}>No</option>
                        </select><br /><br />
                        {/* aur lagana hai to lagaalena idhar */}
                        <button type="submit">Update</button>{'                '}
                        <button onClick={() => { setedit(null) }}>Cancel</button>
                    </form>
                </div>
            )}
            {/*  */}
            <hr />
            <h1>All Public playLists</h1>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>
                            S.No
                        </th>
                        <th>
                            playListId
                        </th>
                        <th>
                            playListcover
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            playListCreator
                        </th>
                        <th>
                            Collaborative
                        </th>
                        <th>
                            Songs
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {playLists.map((playList, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{playList.playListId}</td>
                            <td></td>
                            <td>{playList.playListName}</td>
                            <td>{playList.playListCreator}</td>
                            <td>{playList.collaborative ? 'Yes' : 'No'}</td>
                            <td>
                                <ul>{playList.playListSongs.map((song, ind) => (

                                    <li key={ind}>
                                        {song}
                                        <button onClick={() => handleSongRemoval(playList.playListId, song)}>Remove</button>
                                    </li>
                                ))}
                                </ul>
                            </td>
                            {/*  */}
                            <td>
                                <button onClick={() => handleEdit(playList)}>Edit</button>
                                <button onClick={() => handleDelete(playList.playListId)}>Delete</button>
                            </td>
                            {/*  */}

                        </tr>
                    ))}
                    {/* {playLists} */}
                </tbody>
            </table>
        </div>
    )



}
