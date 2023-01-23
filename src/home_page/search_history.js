
function SearchHistory(props) {
    if (props.vinForSearchHistory) {
            if ((props.vinForSearchHistory !== localStorage.getItem("searchHistoryResult1")) &&
            (props.vinForSearchHistory !== undefined)) {
            localStorage.setItem("searchHistoryResult5", localStorage.getItem("searchHistoryResult4"));
            localStorage.setItem("searchHistoryResult4", localStorage.getItem("searchHistoryResult3"));
            localStorage.setItem("searchHistoryResult3", localStorage.getItem("searchHistoryResult2"));
            localStorage.setItem("searchHistoryResult2", localStorage.getItem("searchHistoryResult1"));
            localStorage.setItem("searchHistoryResult1", props.vinForSearchHistory);
        }
    }

    const pushToSearchBar = (val) => {
        props.setVinNumber(val);
        props.setIsInputActive(true);
    }

    return localStorage.getItem("searchHistoryResult1") && (localStorage.getItem("searchHistoryResult1").length === 17) &&
        (<section className="search-history">
                <p>Search History</p>
                <div className="search-history__container">
                    <ul>
                        { (localStorage.getItem("searchHistoryResult1").length === 17) &&
                        <li onClick={ () => pushToSearchBar(localStorage.getItem("searchHistoryResult1")) }>
                            { localStorage.getItem("searchHistoryResult1") }
                        </li> }
                        { (localStorage.getItem("searchHistoryResult2").length === 17) &&
                        <li onClick={ () => pushToSearchBar(localStorage.getItem("searchHistoryResult2")) }>
                            { localStorage.getItem("searchHistoryResult2") }
                        </li> }
                        { (localStorage.getItem("searchHistoryResult3").length === 17) &&
                        <li onClick={ () => pushToSearchBar(localStorage.getItem("searchHistoryResult3")) }>
                            { localStorage.getItem("searchHistoryResult3") }
                        </li> }
                        { (localStorage.getItem("searchHistoryResult4").length === 17) &&
                        <li onClick={ () => pushToSearchBar(localStorage.getItem("searchHistoryResult4")) }>
                            { localStorage.getItem("searchHistoryResult4") }
                        </li> }
                        { (localStorage.getItem("searchHistoryResult5").length === 17) &&
                        <li onClick={ () => pushToSearchBar(localStorage.getItem("searchHistoryResult5")) }>
                            { localStorage.getItem("searchHistoryResult5") }
                        </li> }
                    </ul>
                </div>
            </section>
        );
}

export default SearchHistory;