import { useState, useEffect } from 'react';

function FetchedDescription() {
    const baseUrl = "https://vpic.nhtsa.dot.gov/api/";
    const endpoint = "/vehicles/getvehiclevariablelist?format=json";

    const [description, setDescription] = useState();
    const [fetchErrorMsg, setFetchErrorMsg] = useState();

    useEffect(() => {
        fetch(baseUrl + endpoint)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                setFetchErrorMsg("Could not fetch the data for this resource!");
                throw Error("Could not fetch the data for this resource!");
            }
        })
        .then(data => {
            const arrayForFetchedData =[];
            data["Results"].forEach(obj => arrayForFetchedData.push([obj["Name"], obj["Description"]]));
            setDescription(arrayForFetchedData);
        })
        .catch(error => {
            setFetchErrorMsg(error.message);
            console.log(error.message);
        });
    },[]);

    return (
        <section className="vin-data-description-list">
            <h2>Vehicle Variables List with Description</h2>
            { fetchErrorMsg && 
            <p style={ {color:"var(--clr-negative)"} }>
                Something went wrong! { fetchErrorMsg }
            </p> 
            }
            { !fetchErrorMsg &&
            <p>Left column contains variables which you get after your VIN Number is decoded and Right column has 
                full description of each variable.
            </p> 
            }
            <ul>
                { description && description.map((data, key) => { return (
                    <li key={key}>
                        <span className="description-name">{ data[0] }</span>
                        <span className="description">
                            { data[1].replace( /(<([^>]+)>)/ig, '') }
                        </span> 
                    </li>
                    )})
                }
            </ul>
        </section>
    );
}

export default FetchedDescription;