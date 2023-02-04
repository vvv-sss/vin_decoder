import ArrowDownIcon from './icons/arrow_down_icon.svg';

const DecodedList = ({ vinData, descriptionData, descriptionDataErrorMsg }) => {

    if (vinData && descriptionData) {
        for (let i = 0; i<vinData.length; i++) {
            for (let j = 0; j<descriptionData.length; j++) {
                if (vinData[i][0] === descriptionData[j][0]) {
                    vinData[i].push(descriptionData[j][1].replace( /(<([^>]+)>)/ig, ''));
                }
            }
        }
        vinData.forEach(arr => arr.length = 3);
    }

    // Event Handler Function to show and hide descriptions
    const handleClick = e => {
        let objectToBeExpanded = e.target.nextSibling.nextSibling;
        let arrowImage = e.target.firstElementChild;

        if (objectToBeExpanded.style.display === "" || objectToBeExpanded.style.display === "none") {
            objectToBeExpanded.style.display = "block";
            arrowImage.style.transform = "rotate(180deg)";
        } else {
            objectToBeExpanded.style.display = "none";
            arrowImage.style.transform = "rotate(360deg)";
        }
    }

    if (vinData) {
        return vinData.map((data, key) => { 
            return (
                <li key={ key }>
                    <span className="vin-data__variable" onClick={ (e) => handleClick(e) }>
                        { data[0] }
                        <img src={ ArrowDownIcon } alt="Arrow down icon" />
                    </span>
                    <span className="vin-data__value">
                        { data[1] }
                    </span> 
                    { descriptionDataErrorMsg && 
                    <span style={{ color:"var(--clr-negative)" }}>
                        { descriptionDataErrorMsg }
                    </span> }
                    { data[2] && 
                    <span className="vin-data__variable-description">
                        *** { data[2] }
                    </span> }
                </li>
            );
        });
    }
}

export default DecodedList;