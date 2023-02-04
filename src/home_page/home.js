import SearchBar from "./SearchBar";
import SearchHistory from "./SearchHistory";
import HowToUseInfo from "./HowToUseInfo";
import DecodedVinNumberData from './DecodedVinNumberData';
import { useState, useEffect } from 'react';

const Home = () => {
    const [vinNumber, setVinNumber] = useState("");
    const [startFetching, setStartFetching] = useState(false);
    const [vinForSearchHistory, setVinForSearchHistory] = useState(null);

    // Function to show last decoded VIN number after going to About page and back to Home page
    useEffect(() => {
        if ((sessionStorage.getItem("aboutPageVisited") === "false") &&
        (sessionStorage.getItem("searchBtnClicked") === "true") &&
        (localStorage.getItem("searchHistoryResult1").length === 17)) {
            setVinNumber(localStorage.getItem("searchHistoryResult1"));
            setStartFetching(true);
        }
    }, []);
    
    return (
        <section className="home-page">
            <SearchBar 
                vinNumber={ vinNumber } 
                setVinNumber={ setVinNumber }
                startFetching={ startFetching }
                setStartFetching={ setStartFetching } />
            <SearchHistory
                setVinNumber={ setVinNumber }
                vinForSearchHistory={ vinForSearchHistory } />
            <HowToUseInfo />
            <DecodedVinNumberData 
                vinNumber={ vinNumber }
                setVinNumber={ setVinNumber }
                startFetching={ startFetching }
                setStartFetching={ setStartFetching } 
                vinForSearchHistory={ vinForSearchHistory }
                setVinForSearchHistory={ setVinForSearchHistory } />
        </section>
    );
}

export default Home;