import SearchBar from "./searchbar";
import SearchHistory from "./search_history";
import HowToUseInfo from "./how_to_use_info";
import DecodedVinNumber from './fetch_vin_data';
import SearchIcon from './icons/search_icon.svg';
import { useState, useEffect } from 'react';

function Home() {
    const [vinNumber, setVinNumber] = useState("");
    const [isInputActive, setIsInputActive] = useState(false);
    const [startFetching, setStartFetching] = useState(false);
    const [searchIconChange, setSearchIconChange] = useState(SearchIcon);
    const [vinForSearchHistory, setVinForSearchHistory] = useState();

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
            <DecodedVinNumber 
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