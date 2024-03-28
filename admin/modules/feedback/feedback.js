import { React, useState, useEffect } from 'react'
import './feedback.css'

export default function Feedback() {


    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:2001/api/allfeedbacks');
            const result = await response.json();
            setFeeds(result);
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

    const [feeds, setFeeds] = useState([]);
    const [feedTitle, setfeedTitle] = useState('');
    const [feedContent, setfeedContent] = useState('');

 

    const moodupload = async () => {
        if (feedTitle === '' || feedContent === '') {
            alert('All Fields Are Mandatory in order to submit a mood upload request')
            return;
        }
        alert(1 + '\n' + feedTitle + '\n' + feedContent)

        try {
            const response = await fetch('http://localhost:2001/api/newfeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    feedbackTitle: feedTitle,
                    feedbackContent: feedContent,
                    feedbackCreator: Uploader,
                }),
            });
            const data = await response.json();
            console.log('mood added successfully:', data);
            // Reset form fields after successful submission
            setfeedTitle('');
            setfeedContent('');

            fetchData();
        } catch (error) {
            console.error('Error adding mood:', error);
        }
    }


    const handleDelete = async (Id) => {
        try {
            const response = await fetch(`http://localhost:2001/api/deletefeedback/${Id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log('user deleted successfully:', data);
            fetchData();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className='moods'>
            <h1>FeedBack</h1>
            <hr />
            <div className="moods-stats">
                <div className="moods-yours">
                    FeeBacks Uploaded By You :xx
                </div>
                <div className="circle-stat">
                    {/* gola gola */}
                </div>
                <div className="moods-total">
                    FeedBacks Uploaded Total :{feeds.length}

                </div>
            </div>
            <hr />
            <button className='btn btn-light' onClick={showform} id='hideshowbuttontoggler'>Upload a Game</button>
            <div className="upload-the-mood" id='showhide'>
                <input type="text" className='form-control' placeholder='FeedBack Title' value={feedTitle} onChange={(e) => setfeedTitle(e.target.value)} required />
                <textarea cols='0' type="text" className='form-control' placeholder='Please provide us with your valuable feedback' value={feedContent} onChange={(e) => setfeedContent(e.target.value)} required />
                <br />
                <button className='btn btn-light' onClick={moodupload}>Upload Feedback</button>
            </div>
            <hr />
            <h1>All Feedbacks</h1>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>
                            S.No
                        </th>
                        <th>
                            FeedBackId
                        </th>
                        <th>
                            FeedBackCreator
                        </th>
                        <th>
                            FeedBackTitle
                        </th>
                        <th>
                            FeedBackContent
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {feeds.map((feed, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{feed.feedbackId}</td>
                            <td>{feed.feedbackCreator}</td>
                            <td>{feed.feedbackTitle}</td>
                            <td>{feed.feedbackContent}</td>
                            
                            <td>
                                {/* {console.log(genre)} */}
                                <button onClick={() => handleDelete(feed.feedbackId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {/* {moods} */}
                </tbody>
            </table>
        </div>
    )



}
