import LightModeIcon from './icons/light_mode_icon.svg';
import DarkModeIcon from './icons/dark_mode_icon.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    const [theme, setTheme] = useState('dark');

    const changeThemeColors = () => {
        const root = document.querySelector(":root");
        const body = document.querySelector("body");
        const modeIcon = document.querySelector(".navbar img");
        const searchIcon = document.querySelector(".search-bar__data-input div img");
        const arrowIcon = document.querySelectorAll(".vin-data__variable img");

        theme === 'dark' ? setTheme('light') : setTheme('dark');
        if (theme === 'dark') {
            root.style.setProperty("--clr-background", "hsl(0, 0%, 76%)");
            root.style.setProperty("--clr-text", "hsl(0, 0%, 5%)");
            body.style.setProperty("font-weight", "700");
            modeIcon.style.setProperty("filter", "var(--clr-icon-dark)");
            searchIcon.style.setProperty("filter", "var(--clr-icon-dark)");
            arrowIcon.forEach(icon => icon.style.setProperty("filter", "var(--clr-icon-dark)"));
        } else {
            root.style.setProperty("--clr-background", "hsl(0, 0%, 13%)");
            root.style.setProperty("--clr-text", "hsl(0, 0%, 76%)");
            body.style.setProperty("font-weight", "400");
            modeIcon.style.setProperty("filter", "var(--clr-icon-light)");
            searchIcon.style.setProperty("filter", "var(--clr-icon-light)");
            arrowIcon.forEach(icon => icon.style.setProperty("filter", "var(--clr-icon-light)"));
        }
    }

    return (
        <nav className="navbar">
            {theme === 'dark' ? 
            <img 
                src={ LightModeIcon } 
                alt="Light mode icon" 
                onClick={changeThemeColors} />
            : <img 
                src={ DarkModeIcon } 
                alt="Dark mode icon" 
                onClick={changeThemeColors} />}
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