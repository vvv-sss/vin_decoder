import SearchBar from "./SearchBar";
import SearchHistory from "./SearchHistory";
import HowToUseInfo from "./HowToUseInfo";
import DecodedVinNumberData from './DecodedVinNumberData';
import SearchIcon from './icons/search_icon.svg';
import { useState, useEffect } from 'react';

const Home = () => {
    const [vinNumber, setVinNumber] = useState("");
    const [isInputActive, setIsInputActive] = useState(false);
    const [startFetching, setStartFetching] = useState(false);
    const [searchIconChange, setSearchIconChange] = useState(SearchIcon);
    const [vinForSearchHistory, setVinForSearchHistory] = useState();

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
                searchIconChange={ searchIconChange }
                setSearchIconChange={ setSearchIconChange }
                isInputActive={ isInputActive }
                setIsInputActive={ setIsInputActive }
                startFetching={ startFetching }
                setStartFetching={ setStartFetching } />
            <SearchHistory
                vinForSearchHistory={ vinForSearchHistory } 
                setVinNumber={ setVinNumber } 
                setIsInputActive={ setIsInputActive } />
            <HowToUseInfo />
            <DecodedVinNumberData 
                vinNumber={ vinNumber }
                setVinNumber={ setVinNumber }
                setSearchIconChange={ setSearchIconChange }
                isInputActive={ isInputActive }
                setIsInputActive={ setIsInputActive }
                startFetching={ startFetching }
                setStartFetching={ setStartFetching } 
                vinForSearchHistory={ vinForSearchHistory }
                setVinForSearchHistory={ setVinForSearchHistory } />
        </section>
    );
}

export default Home;