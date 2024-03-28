    import { React, useState, useEffect } from 'react'
    import './games.css'

    export default function Games() {


        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:2001/api/allgames');
                const result = await response.json();
                setGames(result);
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

        const [games, setGames] = useState([]);
        const [gameName, setgameName] = useState('');
        const [gameCoverURL, setgameCoverURL] = useState('');
        const [gameSRCURL, setGameSRCURL] = useState('');

        const checklink = () => {
            console.log('sdsdsdsdsdsdsdsd')

            if ((gameCoverURL.includes('.jpg') || gameCoverURL.includes('.jpeg') || gameCoverURL.includes('.ico') || gameCoverURL.includes('.png') || gameCoverURL.includes('.svg') || gameCoverURL.includes('.webp') || gameCoverURL.includes('.heic'))&& gameSRCURL.includes('.com')) {
                return true;
            }
            return false;
        };

        const moodupload = async () => {
            if (gameName === '' || gameCoverURL === '') {
                alert('All Fields Are Mandatory in order to submit a mood upload request')
                return;
            }
            if (!checklink()) {
                alert('Link Invalid');
                return;
            }

            alert(1 + '\n' + gameName + '\n' + gameCoverURL)

            try {
                const response = await fetch('http://localhost:2001/api/newgame', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        html5gamesName: gameName,
                        html5gamesPp: gameCoverURL,
                        html5gamesCreator: Uploader,
                        html5gamesLink: gameSRCURL
                    }),
                });
                const data = await response.json();
                console.log('mood added successfully:', data);
                // Reset form fields after successful submission
                setgameName('');
                setgameCoverURL('');

                fetchData();
            } catch (error) {
                console.error('Error adding mood:', error);
            }
        }



        // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // c
        const [edit, setedit] = useState(null);

        const handleEdit = (genre) => {
            // setShowFormUpdate('block')
            setedit(genre);
            // console.log(edit);
        };

        const handleUpdate = async (event) => {
            event.preventDefault();

            // setShowFormUpdate('block')
            const updated = {
                html5gamesId: edit.html5gamesId,
                html5gamesName: event.target.Name.value,
                html5gamesPp: event.target.Cover.value,
                html5gamesLink: event.target.url.value,
                // aur add krna hai to kr wahi krna jo update krna ho
            };
            console.log(updated)
            // return;
            try {
                const response = await fetch('http://localhost:2001/api/updategame/' + edit.html5gamesId, {
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
                const response = await fetch(`http://localhost:2001/api/deletegame/${Id}`, {
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
            <div className='moods'>
                <h1>Games</h1>
                <hr />
                <div className="moods-stats">
                    <div className="moods-yours">
                        Games Uploaded By You :xx
                    </div>
                    <div className="circle-stat">
                        gola gola
                    </div>
                    <div className="moods-total">
                        Games Uploaded Total :{games.length}

                    </div>
                </div>
                <hr />
                <button onClick={showform} id='hideshowbuttontoggler'>Upload a Game</button>
                <div className="upload-the-mood" id='showhide'>
                    <input type="text" className='form-control' placeholder='Game Name' value={gameName} onChange={(e) => setgameName(e.target.value)} required />
                    <input type="text" className='form-control' placeholder='Game cover URL' value={gameCoverURL} onChange={(e) => setgameCoverURL(e.target.value)} required />
                    <input type="text" className='form-control' placeholder='Game src URL' value={gameSRCURL} onChange={(e) => setGameSRCURL(e.target.value)} required />
                    <button className='btn btn-light' onClick={moodupload}>Upload Games</button>
                </div>
                


                {/*  */}
                {edit && (
                    <div className="modal" style={{ display: 'block' }}>
                        <form onSubmit={handleUpdate}>
                            Game Name<input type="text" name="Name" defaultValue={edit.html5gamesName} /><br /><br />
                            Game Cover<input type="text" name="Cover" defaultValue={edit.html5gamesPp} /><br /><br />
                            Game URL<input type="text" name="url" defaultValue={edit.html5gamesLink} /><br /><br />
                            {/* aur lagana hai to lagaalena idhar */}
                            <button type="submit">Update</button>{'                '}
                            <button onClick={() => { setedit(null) }}>Cancel</button>
                        </form>
                    </div>
                )}
                {/*  */}



                <hr />
                <h1>All Games</h1>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>
                                S.No
                            </th>
                            <th>
                                GameId
                            </th>
                            <th>
                                Gamecover
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                GameUploader
                            </th>
                            <th>
                                src
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{game.html5gamesId}</td>
                                <td>{game.html5gamesPp}</td>
                                <td>{game.html5gamesName}</td>
                                <td>{game.html5gamesCreator}</td>
                                <td>{game.html5gamesLink}</td>
                                {/*  */}
                                <td>
                                    <button onClick={() => handleEdit(game)}>Edit</button>
                                    <button onClick={() => handleDelete(game.html5gamesId)}>Delete</button>
                                </td>
                                {/*  */}
                            </tr>
                        ))} 
                        {/* {moods} */}
                    </tbody>
                </table>
            </div>
        )


    }
