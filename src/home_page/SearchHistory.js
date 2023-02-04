import { useState, useEffect } from "react";

const SearchHistory = ({ vinForSearchHistory, setVinNumber }) => {
    // Creation of 5 history positions inside Local Storage
    if (vinForSearchHistory) {
            if ((vinForSearchHistory !== localStorage.getItem("searchHistoryResult1")) &&
            (vinForSearchHistory !== undefined)) {
            localStorage.setItem("searchHistoryResult5", localStorage.getItem("searchHistoryResult4"));
            localStorage.setItem("searchHistoryResult4", localStorage.getItem("searchHistoryResult3"));
            localStorage.setItem("searchHistoryResult3", localStorage.getItem("searchHistoryResult2"));
            localStorage.setItem("searchHistoryResult2", localStorage.getItem("searchHistoryResult1"));
            localStorage.setItem("searchHistoryResult1", vinForSearchHistory);
        }
    }

    // Handle of search element click
    const handleClick = (val) => {
        setVinNumber(val);
        document.querySelector(".search-bar__data-input input").focus();
    }

    // Block to create and render search history list
    const [searchHistoryList, setSearchHistoryList] = useState();

    const createSearchHistoryList = () => {
        const list = [];
        for(let i = 1; i < 6; i++) {
            let historyValue = localStorage.getItem(`searchHistoryResult${i}`);
            if (historyValue && historyValue.length === 17) {
                let element = <li key={ i } onClick={ () => handleClick(historyValue) }>{ historyValue }</li>;
                list.push(element);
            }
        }
        setSearchHistoryList(list);
    }
    useEffect(() => createSearchHistoryList, [vinForSearchHistory]);

    if (localStorage.getItem("searchHistoryResult1") && localStorage.getItem("searchHistoryResult1").length === 17) {
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