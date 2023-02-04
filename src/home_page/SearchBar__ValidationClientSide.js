
function ValidationClientSide({ vinToValidate, isInputActive }) {
    const searchBtn = document.querySelector(".search-bar__data-input button");
    const colorDefault = {color: "var(--clr-text)"};
    const colorPositive = {color: "var(--clr-positive)"};
    const colorNegative = {color: "var(--clr-negative)"};

    // Functions to validate VIN Number by three different conditions
    const validationByLength = () => {
        let textColor;
        (vinToValidate.length === 0) ? textColor = colorDefault
        : (vinToValidate.length === 17) ? textColor = colorPositive : textColor = colorNegative;
        return textColor;
    };

    const validationByLettersAndNumbers = () => {
        let textColor;
        let regExp = /^[!A-Z0-9\s]*$/;
        (vinToValidate.length === 0) ? textColor = colorDefault
        : regExp.test(vinToValidate) ? textColor = colorPositive : textColor = colorNegative;
        return textColor;
    }

    const validationByWrongSymbols = () => {
        let textColor;
        let regExp = /[qQiIoO\s]/;
        (vinToValidate.length === 0) ? textColor = colorDefault
        : !regExp.test(vinToValidate) ? textColor = colorPositive : textColor = colorNegative; 
        return textColor;
    }

    // Overall result of validation by three conditions
    const isVinNumberValid = [
        validationByLength().color, 
        validationByLettersAndNumbers().color, 
        validationByWrongSymbols().color]
        .every(color => color === colorPositive.color);

    // Appearing adn disappearing of search button
    if (isInputActive) {
        if (isVinNumberValid) {
            searchBtn.style.opacity = "1";
            searchBtn.style.cursor = "pointer";
            searchBtn.style.pointerEvents = "auto";
        } else {
            searchBtn.style.opacity = "0";
            searchBtn.style.cursor = "default";
            searchBtn.style.pointerEvents = "none";
        }
    }

    return (
        isInputActive &&
        <div className="search-bar__validation">
            <p style={ validationByLength() }>17-character string</p>
            <p style={ validationByLettersAndNumbers() }>Only numbers and latin letters used</p>
            <p style={ validationByWrongSymbols() }>No spaces or the letters Q (q), I (i), and O (o)</p>
        </div>
    );
}

export default ValidationClientSide;