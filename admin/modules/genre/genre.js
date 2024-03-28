import { React, useState, useEffect } from 'react'
import './genre.css'

export default function Genre() {
    const Uploader = 'ASUb08e0adf-a0d8-4999-af70-8b41a8a5f206'
    const [genres, setgenres] = useState([]);
    const [genreName, setgenreName] = useState('');
    const [genreCoverURL, setgenreCoverURL] = useState('');
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:2001/api/allgenres');
            const result = await response.json();
            setgenres(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const showform = () => {
        document.getElementById('showhide').style.display = 'flex';
        document.getElementById('hideshowbuttontoggler').style.display = 'none';
    }
    const checklink = () => {
        console.log('sdsdsdsdsdsdsdsd')

        if (genreCoverURL.includes('.jpg') || genreCoverURL.includes('.jpeg') || genreCoverURL.includes('.ico') || genreCoverURL.includes('.png') || genreCoverURL.includes('.svg') || genreCoverURL.includes('.webp') || genreCoverURL.includes('.heic')) {
            return true;
        }
        return false;
    };
    const genreupload = async () => {
        if (genreName === '' || genreCoverURL === '') {
            alert('All Fields Are Mandatory in order to submit a genre upload request')
            return;
        }
        if (!checklink()) {
            alert('Link Invalid');
            return;
        }

        alert('success\n' + genreName + '\n' + genreCoverURL)

        try {
            const response = await fetch('http://localhost:2001/api/newgenre', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    genreName: genreName,
                    genreCreator: Uploader,
                    genreCover: genreCoverURL
                }),
            });
            const data = await response.json();
            console.log('genre added successfully:', data);
            // Reset form fields after successful submission
            setgenreName('');
            setgenreCoverURL('');

            fetchData();
        } catch (error) {
            console.error('Error adding genre:', error);
        }
    };
    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // c
    const [editGenre, setEditGenre] = useState(null);

    const handleEdit = (genre) => {
        // setShowFormUpdate('block')
        setEditGenre(genre);
        console.log(editGenre);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        // setShowFormUpdate('block')
        const updatedGenre = {
            genreId: editGenre.genreId,
            genreName: event.target.genreName.value,
            genreCover: event.target.genreCover.value
            // aur add krna hai to kr wahi krna jo update krna ho
        };
        try {
            const response = await fetch('http://localhost:2001/api/updategenre/' + editGenre.genreId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedGenre),
            });
            const data = await response.json();
            console.log('Genre updated successfully:', data);
            setEditGenre(null);
            fetchData();
        } catch (error) {
            console.error('Error updating genre:', error);
        }
    };

    const handleDelete = async (genreId) => {
        try {
            const response = await fetch(`http://localhost:2001/api/deletegenre/${genreId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log('Genre deleted successfully:', data);
            fetchData();
        } catch (error) {
            console.error('Error deleting genre:', error);
        }
    };
    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // c

    return (
        <div className='genres'>
            <h1>genres</h1>            <hr />
            <div className="genres-stats">
                <div className="genres-yours">
                    genres Uploaded By You :xx
                </div>
                <div className="circle-stat">
                    {/* gola gola */}
                </div>
                <div className="genres-total">
                    genres Uploaded Total :{genres.length}

                </div>
            </div>            <hr />
            <button onClick={showform} id='hideshowbuttontoggler'>Upload a genre1</button>
            <div className="upload-the-genre" id='showhide'>
                <input type="text" className='form-control' placeholder='genre Name' value={genreName} onChange={(e) => setgenreName(e.target.value)} required />
                <input type="text" className='form-control' placeholder='genre cover URL' value={genreCoverURL} onChange={(e) => setgenreCoverURL(e.target.value)} required />
                <button className='btn btn-light' onClick={genreupload}>Upload genre1</button>
            </div>            <hr />


            {/*  */}
            {editGenre && (
                <div className="modal" style={{ display: 'block' }}>
                    <form onSubmit={handleUpdate}>
                        Genre Name<input type="text" name="genreName" defaultValue={editGenre.genreName} /><br /><br />
                        Genre Cover<input type="text" name="genreCover" defaultValue={editGenre.genreCover} /><br /><br />
                        Genre Songs <input type="text" disabled defaultValue={'Go to a particular Song and update Genre'} /><br /><br />
                        {/* aur lagana hai to lagaalena idhar */}
                        <button type="submit">Update</button>{'                '}
                        <button onClick={() => { setEditGenre(null) }}>Cancel</button>
                    </form>
                </div>
            )}


            {/*  */}

            <hr />
            <h1>All genres</h1>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>S.No1</th>
                        <th>genreId1</th>
                        <th>genrecover1</th>
                        <th>Name1</th>
                        <th>genreCreator1</th>
                        <th>Songs1</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map((genre, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{genre.genreId}</td>
                            <td></td>
                            <td>{genre.genreName}</td>
                            <td>{genre.genreCreator}</td>
                            <td>

                                <ul>{genre.genreSongs.map((song, ind) => (

                                    <li key={ind}>
                                        {song}
                                    </li>
                                ))}
                                </ul></td>
                            {/*  */}
                            <td>
                                {/* {console.log(genre)} */}
                                <button onClick={() => handleEdit(genre)}>Edit</button>
                                <button onClick={() => handleDelete(genre.genreId)}>Delete</button>
                            </td>
                            {/*  */}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}
