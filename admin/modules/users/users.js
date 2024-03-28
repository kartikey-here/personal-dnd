import { React, useState, useEffect } from 'react'
import './users.css'

export default function Users() {

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:2001/api/allusers');
            const result = await response.json();
            setusers(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const [users, setusers] = useState([]);




    // // // // // // // // // // // // // // // // // c




    const handleDelete = async (Id) => {
        try {
            const response = await fetch(`http://localhost:2001/api/deleteuser/${Id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log('user deleted successfully:', data);
            fetchData();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // // // // // // // // // // // // // // // // // // c









    return (
        <div className='users'>
            <h1>users</h1>
            <hr />
            <div className="users-total">
                users  Total :{users.length}

            </div>






            <hr />
            <h1>All users</h1>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>
                            S.No
                        </th>
                        <th>
                            Id
                        </th>
                        <th>
                            Userpp
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Bio
                        </th>
                        <th>
                            Acc Created
                        </th>
                        <th>
                            User PlayLists
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.userId}</td>
                            <td></td>
                            <td>{user.userName}</td>
                            <td style={{ width: '200px' }} >{user.userBio}</td>
                            <td>{user.userAccCreated}</td>
                            <td>
                                <ol>
                                    {user.userPlayList.map((play, indexx) => (
                                        <li key={indexx}>
                                            {play}
                                        </li>
                                    ))}
                                </ol >
                            </td>

                            {/*  */}
                            <td>
                                {/* {console.log(genre)} */}
                                <button onClick={() => handleDelete(user.userId)}>Delete</button>
                            </td>
                            {/*  */}

                        </tr>
                    ))}
                    {/* {users} */}
                </tbody>
            </table>
        </div>
    )
}
