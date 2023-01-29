import { useState, useEffect } from 'react';

const DescriptionList = () => {
    const [description, setDescription] = useState();
    const [fetchErrorMsg, setFetchErrorMsg] = useState();

    // Fetching data for description of variables
    const baseUrl = "https://vpic.nhtsa.dot.gov/api/";
    const endpoint = "/vehicles/getvehiclevariablelist?format=json";

    useEffect(() => {
        const controller = new AbortController();

        fetch(baseUrl + endpoint, { signal: controller.signal })
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
                if (error.name !== "AbortError") {
                    setFetchErrorMsg(error.message);
                    console.log(error.message);
                }
            });
        return () => controller.abort();
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
                { description && description.map((data, key) => { 
                    let infoWithoutTags = data[1].replace( /(<([^>]+)>)/ig, '');
                    let info = infoWithoutTags.replace(/\//g, ' / ');
                    return (
                        <li key={key}>
                            <span className="description-name">{ data[0] }</span>
                            <span className="description">{ info }</span>
                        </li>
                    )})
                }
            </ul>
        </section>
    );
}

export default DescriptionList;