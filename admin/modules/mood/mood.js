import { React, useState, useEffect } from 'react'
import './mood.css'

export default function Mood() {


    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:2001/api/allmoods');
            const result = await response.json();
            setmoods(result);
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

    const [moods, setmoods] = useState([]);
    const [moodName, setmoodName] = useState('');
    const [moodCoverURL, setMoodCoverURL] = useState('');

    const checklink = () => {
        console.log('sdsdsdsdsdsdsdsd')

        if (moodCoverURL.includes('.jpg') || moodCoverURL.includes('.jpeg') || moodCoverURL.includes('.ico') || moodCoverURL.includes('.png') || moodCoverURL.includes('.svg') || moodCoverURL.includes('.webp') || moodCoverURL.includes('.heic')) {
            return true;
        }
        return false;
    };

    const moodupload = async () => {
        if (moodName === '' || moodCoverURL === '') {
            alert('All Fields Are Mandatory in order to submit a mood upload request')
            return;
        }
        if (!checklink()) {
            alert('Link Invalid');
            return;
        }

        alert(1 + '\n' + moodName + '\n' + moodCoverURL)

        try {
            const response = await fetch('http://localhost:2001/api/newmood', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    moodName: moodName,
                    moodCreator: Uploader,
                    moodCover: moodCoverURL
                }),
            });
            const data = await response.json();
            console.log('mood added successfully:', data);
            // Reset form fields after successful submission
            setmoodName('');
            setMoodCoverURL('');

            fetchData();
        } catch (error) {
            console.error('Error adding mood:', error);
        }
    }





    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // c
    const [edit, setedit] = useState(null);
    
    const handleEdit = (mood) => {
        // setShowFormUpdate('block')
        setedit(mood);
        console.log(edit);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        // setShowFormUpdate('block')
        const updatedmood = {
            moodId: edit.moodId,
            moodName: event.target.Name.value,
            moodCover: event.target.Cover.value
            // aur add krna hai to kr wahi krna jo update krna ho
        };
        try {
            const response = await fetch('http://localhost:2001/api/updatemood/'+edit.moodId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedmood),
            });
            const data = await response.json();
            console.log('mood updated successfully:', data);
            setedit(null);
            fetchData();
        } catch (error) {
            console.error('Error updating mood:', error);
        }
    };

    const handleDelete = async (moodId) => {
        try {
            const response = await fetch(`http://localhost:2001/api/deletemood/${moodId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log('mood deleted successfully:', data);
            fetchData();
        } catch (error) {
            console.error('Error deleting mood:', error);
        }
    };
    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // c








    return (
        <div className='moods'>
            <h1>Moods</h1>
            <hr />
            <div className="moods-stats">
                <div className="moods-yours">
                    Moods Uploaded By You :xx
                </div>
                <div className="circle-stat">
                    {/* gola gola */}
                </div>
                <div className="moods-total">
                    Moods Uploaded Total :{moods.length}

                </div>
            </div>
            
{/*  */}
{edit && (
                <div className="modal" style={{ display: 'block' }}>
                    <form onSubmit={handleUpdate}>
                        Mood Name<input type="text" name="Name" defaultValue={edit.moodName} /><br /><br />
                        Mood Cover<input type="text" name="Cover" defaultValue={edit.moodCover} /><br /><br />
                        Mood Songs <input type="text" disabled defaultValue={'Go to a particular Song and update mood'} /><br /><br />
                        {/* aur lagana hai to lagaalena idhar */}
                        <button type="submit">Update</button>{'                '}
                        <button onClick={() => { setedit(null) }}>Cancel</button>
                    </form>
                </div>
            )}


{/*  */}
            <hr />
            <button onClick={showform} id='hideshowbuttontoggler'>Upload a Mood</button>
            <div className="upload-the-mood" id='showhide'>
                <input type="text" className='form-control' placeholder='mood Name' value={moodName} onChange={(e) => setmoodName(e.target.value)} required />
                <input type="text" className='form-control' placeholder='mood cover URL' value={moodCoverURL} onChange={(e) => setMoodCoverURL(e.target.value)} required />
                <button className='btn btn-light' onClick={moodupload}>Upload Mood</button>
            </div>
            <hr />
            <h1>All moods</h1>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>
                            S.No
                        </th>
                        <th>
                            MoodId
                        </th>
                        <th>
                            Moodcover
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            MoodCreator
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
                    {moods.map((mood, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{mood.moodId}</td>
                            <td></td>
                            <td>{mood.moodName}</td>
                            <td>{mood.moodCreator}</td>
                            <td>
                                <ul>{mood.moodSongs.map((song, ind) => (

                                    <li key={ind}>
                                        {song}
                                    </li>
                                ))}
                                </ul>
                                </td>
{/*  */}
                            <td>
                                {/* {console.log(mood)} */}
                                <button onClick={() => handleEdit(mood)}>Edit</button>
                                <button onClick={() => handleDelete(mood.moodId)}>Delete</button>
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
