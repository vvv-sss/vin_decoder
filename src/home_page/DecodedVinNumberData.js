import fetchVinData from './fetchVinData';
import fetchDescription from './fetchDescription';
import DecodedList from './DecodedList';
import { useState, useEffect } from 'react';

const DecodedVinNumberData = (props) => {
    const { startFetching } = props;
    const [vinData, setVinData] = useState();
    const [vinIsCheckedMsg, setVinIsCheckedMsg] = useState();
    const [vinDataErrorMsg, setVinDataErrorMsg] = useState();
    const [descriptionData, setDescriptionData] = useState();
    const [descriptionDataErrorMsg, setDescriptionDataErrorMsg] = useState();

    // Fetching data on click after passing validation
    startFetching &&
    fetchVinData(props, setVinData, setVinIsCheckedMsg, setVinDataErrorMsg);
    
    // Fetching additional data for variables
    useEffect(() => fetchDescription(setDescriptionData, setDescriptionDataErrorMsg),[startFetching]);

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
                <ul>
                    <DecodedList
                        vinData={ vinData } 
                        descriptionData={ descriptionData } 
                        descriptionDataErrorMsg={ descriptionDataErrorMsg } />
                </ul>
            </div> }
        </section>
    );
}

export default DecodedVinNumberData;