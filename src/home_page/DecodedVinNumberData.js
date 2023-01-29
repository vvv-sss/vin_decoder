import SearchIcon from './icons/search_icon.svg';
import ArrowDownIcon from './icons/arrow_down_icon.svg';
import fetchVinData from './fetchVinData';
import fetchDescription from './fetchDescription';
import { useState, useEffect } from 'react';

const DecodedVinNumberData = (props) => {
    const [vinData, setVinData] = useState();
    const [vinIsCheckedMsg, setVinIsCheckedMsg] = useState();
    const [vinDataErrorMsg, setVinDataErrorMsg] = useState();
    const [descriptionData, setDescriptionData] = useState();
    const [descriptionDataErrorMsg, setDescriptionDataErrorMsg] = useState();

    // Fetching data on click after passing validation
    props.startFetching &&
    fetchVinData(props, setVinData, setVinIsCheckedMsg, setVinDataErrorMsg, SearchIcon);
    
    // Fetching additional data for variables
    useEffect(() => fetchDescription(setDescriptionData, setDescriptionDataErrorMsg),[props.startFetching]);

    // Adding needed descriptions to own VIN Number data array
    if (vinData && descriptionData) {
        for (let i = 0; i<vinData.length; i++) {
            for (let j = 0; j<descriptionData.length; j++) {
                if (vinData[i][0] === descriptionData[j][0]) {
                    vinData[i].push(descriptionData[j][1]);
                }
            }
        }
        vinData.forEach(arr => arr.length = 3);
    }

    // Function to show and hide descriptions
    const expandDescription = event => {
        let objectToBeExpanded = event.target.nextSibling.nextSibling;
        if (objectToBeExpanded.style.display === "" || objectToBeExpanded.style.display === "none") {
            event.target.nextSibling.nextSibling.style.display = "block";
            event.target.firstElementChild.style.transform = "rotate(180deg)";
        } else {
            event.target.nextSibling.nextSibling.style.display = "none";
            event.target.firstElementChild.style.transform = "rotate(360deg)";
        }
    }

    // Mapping to create list of elements for rendering
    let decodedVinNumberList;
    if (vinData) {
        decodedVinNumberList = vinData.map((data, key) => { 
            return (
                <li key={ key }>
                    <span className="vin-data__variable" onClick={ expandDescription }>
                        { data[0] }<img src={ ArrowDownIcon } alt="Arrow down icon"/>
                    </span>
                    <span className="vin-data__value">{ data[1] }</span> 
                    { descriptionDataErrorMsg && 
                    <span style={{ color:"var(--clr-negative)" }}>{ descriptionDataErrorMsg }</span> }
                    { data[2] && 
                    <span className="vin-data__variable-description">*** { data[2].replace( /(<([^>]+)>)/ig, '') }</span> }
                </li>
            );
        });
    }

    // Note before decoded data
    const note = "NOTE: Any missing decoded values should be interpreted as NHTSA does not have data on the specific variable. Missing value should NOT be interpreted as an indication that a feature or technology is unavailable for a vehicle."
    
    return (
        <section className="vin-data-container">
            { vinDataErrorMsg && 
            <p style={{ color:"var(--clr-negative)", textAlign: "center" }}>
                Something went wrong! { vinDataErrorMsg }
            </p> }
            { !vinDataErrorMsg && vinIsCheckedMsg &&
            <div className="vin-data">
                <h3 style={{ color:"var(--clr-positive)" }}>
                    VIN Number { vinIsCheckedMsg } has been checked successfully.
                </h3>
                <p>{ note }</p>
                <ul> { decodedVinNumberList } </ul>
            </div> }
        </section>
    );
}

export default DecodedVinNumberData;