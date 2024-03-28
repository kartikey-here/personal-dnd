import React, { useState } from 'react'
import './admin.css'
import Songs from './modules/songs/songs'
import Playlists from './modules/playlists/playlists'
import Genre from './modules/genre/genre'
import Dashboard from './modules/dashboard/dashboard'
import Games from './modules/games/games'
import Mood from './modules/mood/mood'
import Feedback from './modules/feedback/feedback'
import Users from './modules/users/users'
// import Genre1 from './modules/genre1/genre1'

export default function Admin() {

    const [content, setContent] = useState(<Mood/>);

    const dashboard = () => {
        setContent(<Dashboard />)
    }
    const songs = () => {
        setContent(<Songs />)
    }
 
    const playlists = () => { 
        setContent(<Playlists />)
    }

    const moods = () => {
        setContent(<Mood />)
    }

    const hTML5Games = () => {
        setContent(<Games />)
    }
    const genre = () => {
        setContent(<Genre />)
    }

    const feedback = () => {
        setContent(<Feedback />)
    }
    const users = () => {
        setContent(<Users />)
    }


    return (
        <div className="appp">
            <div className="navbarr">Admin Panel : : Arey Suno</div>
            <div className="containerr">
                <div className="menu-bar">
                    <button onClick={dashboard}>Dashboard</button>
                    <button onClick={users}>Users</button>
                    <button onClick={songs}>Songs</button>
                    <button onClick={playlists}>Playlists</button>
                    <button onClick={moods}>Moods</button>
                    <button onClick={hTML5Games}>HTML5Games</button>
                    <button onClick={genre}>Genre</button>
                    <button onClick={feedback}>Feedback/Suggestion</button>
                </div>
                <div className="contentt" id="maincontent">
                    {content}
                </div>
            </div>
        </div>

    )
}
