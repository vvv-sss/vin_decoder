
const toggleDarkLightModes = (theme, setTheme) => {
    const root = document.querySelector(":root");
    const body = document.querySelector("body");
    const modeIcon = document.querySelector(".navbar img");
    const searchIcon = document.querySelector(".search-bar__data-input div img");
    const arrowIcon = document.querySelectorAll(".vin-data__variable img");

    theme === 'dark' ? setTheme('light') : setTheme('dark');
    if (theme === 'dark') {
        root.style.setProperty("--clr-background", "var(--light-mode-background)");
        root.style.setProperty("--clr-text", "var(--light-mode-text)");
        body.style.setProperty("font-weight", "700");
        modeIcon.style.setProperty("filter", "var(--clr-icon-dark)");
        searchIcon && searchIcon.style.setProperty("filter", "var(--clr-icon-dark)");
        arrowIcon.forEach(icon => icon.style.setProperty("filter", "var(--clr-icon-dark)"));
    } else {
        root.style.setProperty("--clr-background", "var(--dark-mode-background)");
        root.style.setProperty("--clr-text", "var(--dark-mode-text)");
        body.style.setProperty("font-weight", "400");
        modeIcon.style.setProperty("filter", "var(--clr-icon-light)");
        searchIcon && searchIcon.style.setProperty("filter", "var(--clr-icon-light)");
        arrowIcon.forEach(icon => icon.style.setProperty("filter", "var(--clr-icon-light)"));
    }
}

export default toggleDarkLightModes;