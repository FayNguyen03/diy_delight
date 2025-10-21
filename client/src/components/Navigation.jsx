import React from 'react'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h1>Serena's Auréline 💍</h1></li>
            </ul>

            <ul>
                <li><a href='/' role='button'>Add</a></li>
                <li><a href='/customcars' role='button'>View Cars</a></li>
            </ul>
            
        </nav>
    )
}

export default Navigation