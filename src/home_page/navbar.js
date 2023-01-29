import LightModeIcon from './icons/light_mode_icon.svg';
import DarkModeIcon from './icons/dark_mode_icon.svg';
import toggleDarkLightModes from './toggleDarkLightModes';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [theme, setTheme] = useState('dark');

    // Function to change styles of Dark and Light modes on click
    const handleClick = () => {
        toggleDarkLightModes(theme, setTheme);
    }

    return (
        <nav className="navbar">
            {theme === 'dark' ? 
            <img 
                src={ LightModeIcon } 
                alt="Light mode icon" 
                onClick={ handleClick } />
            : <img 
                src={ DarkModeIcon } 
                alt="Dark mode icon" 
                onClick={ handleClick } />}
            <ul>
                <li onClick={ () => sessionStorage.setItem("aboutPageVisited", "false") }>
                    <Link to="/">Home</Link>
                </li>
                <li onClick={ () => sessionStorage.setItem("aboutPageVisited", "true") }>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;