import SearchIcon from './icons/search_icon.svg';
import ArrowDownIcon from './icons/arrow_down_icon.svg';
import { useState, useEffect } from 'react';

function DecodedVinNumber(props) {
    const vin = props.vinNumber;
    const baseUrl = "https://vpic.nhtsa.dot.gov/api/";
    const endpoint1 = `/vehicles/decodevin/${vin}?format=json`;
    const endpoint2 = "/vehicles/getvehiclevariablelist?format=json";
    
    const [vinData, setVinData] = useState();
    const [descriptionData, setDescriptionData] = useState();
    const [vinIsCheckedMsg, setVinIsCheckedMsg] = useState();
    const [fetchErrorMsg, setFetchErrorMsg] = useState();
    const [descriptionDataErrorMsg, setDescriptionDataErrorMsg] = useState();

    // Fetching data on click after passing validation
    props.startFetching && 
    fetch(baseUrl + endpoint1)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                setFetchErrorMsg("Could not fetch the data for this resource!");
                throw Error("Could not fetch the data for this resource!");
            }
        })
        .then(data => {
            const dataFiltered = data["Results"].filter(obj => obj["Value"]);
            const arrayForFetchedData =[];
            dataFiltered.forEach(obj => arrayForFetchedData.push([obj["Variable"], obj["Value"]]));
            setVinData(arrayForFetchedData);
            setVinIsCheckedMsg(vin);
            props.setStartFetching(false);
            props.setIsInputActive(false);
            props.setVinForSearchHistory(vin);
            sessionStorage.setItem("searchBtnClicked", "true");
            sessionStorage.setItem("aboutPageVisited", "true");
            setTimeout(() => props.setSearchIconChange(SearchIcon), 1000);
        })
        .catch(error => {
            setTimeout(() => props.setSearchIconChange(SearchIcon), 1000);
            setFetchErrorMsg(error.message);
            console.log(error.message);
        });
    
    // Fetching additional data for variables
    useEffect(() => {
        fetch(baseUrl + endpoint2)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                setDescriptionDataErrorMsg("Could not fetch the description data!");
                throw Error("Could not fetch the description data!");
            }
        })
        .then(data => {
            const arrayForFetchedData =[];
            data["Results"].forEach(obj => arrayForFetchedData.push([obj["Name"], obj["Description"]]));
            setDescriptionData(arrayForFetchedData);
        })
        .catch(error => {
            setDescriptionDataErrorMsg(error.message);
            console.log(error.message);
        });
    },[]);

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
    
    return (
        <section className="vin-data-container">
            { fetchErrorMsg && 
            <p style={{ color:"var(--clr-negative)", textAlign: "center" }}>
                Something went wrong! { fetchErrorMsg }
            </p> }
            { !fetchErrorMsg && vinIsCheckedMsg &&
            <div className="vin-data">
                <h3 style={{ color:"var(--clr-positive)" }}>
                    VIN Number { vinIsCheckedMsg } has been checked successfully.
                </h3>
                <p>NOTE: Any missing decoded values should be interpreted as NHTSA does not have data on the specific variable. Missing value should NOT be interpreted as an indication that a feature or technology is unavailable for a vehicle.</p>
                <ul>
                    {vinData && vinData.map((data, key) => { return (
                        <li key={ key }>
                            <span
                            className="vin-data__variable"
                            onClick={ expandDescription }>
                                { data[0] }<img src={ ArrowDownIcon } alt="Arrow down icon"/>
                            </span>
                            <span className="vin-data__value">{ data[1] }</span> 
                            { descriptionDataErrorMsg ? 
                            <span style={{ color:"var(--clr-negative)" }}> { descriptionDataErrorMsg }</span>
                            : <span className="vin-data__variable-description">
                                *** { data[2].replace( /(<([^>]+)>)/ig, '') }
                            </span> }
                        </li>
                    )})}
                </ul>
            </div> }
        </section>
    );
}

export default DecodedVinNumber;