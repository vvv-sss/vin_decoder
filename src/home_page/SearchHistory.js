import { useState, useEffect } from "react";

const SearchHistory = ({ vinForSearchHistory, setVinNumber }) => {
    
    // Creation of 5 history positions inside Local Storage
    const callVinHistory = () => {
        let vinHistory;
        try {
            vinHistory = JSON.parse(localStorage.getItem('vinHistory'));
        } catch(error) {
            console.log(error);
        }
        return vinHistory;
    }

    const saveVinHistory = (vin) => {
        const data = callVinHistory();
        if (vin && vin !== data[0]) {
            localStorage.setItem(
                'vinHistory',
                JSON.stringify([vin, ...(data ?? [])].slice(0, 5))
            );
        }
    };

    useEffect(() => {
        saveVinHistory(vinForSearchHistory);
    },[vinForSearchHistory])

    // Handle of search element click
    const handleClick = (val) => {
        setVinNumber(val);
        document.querySelector(".search-bar__data-input input").focus();
    }

    // Block to create and render search history list
    const [searchHistoryList, setSearchHistoryList] = useState();

    const createSearchHistoryList = () => {
        const data = callVinHistory();
        const list = data.map((vin, key) => {
            if (vin && vin.length === 17) {
                return <li key={ key } onClick={ () => handleClick(vin) }>{ vin }</li>;
            }
        });
        setSearchHistoryList(list);
    }
    useEffect(() => createSearchHistoryList, [vinForSearchHistory]);

    if (localStorage.vinHistory && callVinHistory()[0].length === 17) {
        return (
            <section className="search-history">
                <p>Search History</p>
                <div className="search-history__container">
                    <ul>{ searchHistoryList }</ul>
                </div>
            </section>
        );
    }
}

export default SearchHistory;