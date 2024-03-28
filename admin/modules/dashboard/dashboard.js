import { React, useState, useEffect } from 'react'
import './dashboard.css'

export default function Dashboard() {
    const userd = 'ASUb08e0adf-a0d8-4999-af70-8b41a8a5f206'
    const [user, setUser] = useState([])
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:2001/api/userdetail/' + userd);
            const result = await response.json();
            setUser(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <ul>
                {Object.keys(user).map((key) => (
                    <li key={key}>
                        <strong>{key}: </strong>
                        {user[key]}
                    </li>
                ))}
            </ul>
        </>
    )
}
