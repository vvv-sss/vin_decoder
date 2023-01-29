
const fetchVinData = (props, setVinData, setVinIsCheckedMsg, setVinDataErrorMsg, SearchIcon) => {
    const baseUrl = "https://vpic.nhtsa.dot.gov/api/";
    const endpoint = `/vehicles/decodevin/${props.vinNumber}?format=json`;

    fetch(baseUrl + endpoint)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                setVinDataErrorMsg("Could not fetch the data for this resource!");
                throw Error("Could not fetch the data for this resource!");
            }
        })
        .then(data => {
            const dataFiltered = data["Results"].filter(obj => obj["Value"]);
            const arrayForFetchedData =[];
            dataFiltered.forEach(obj => arrayForFetchedData.push([obj["Variable"], obj["Value"]]));
            setVinData(arrayForFetchedData);
            setVinIsCheckedMsg(props.vinNumber);
            props.setStartFetching(false);
            props.setIsInputActive(false);
            props.setVinForSearchHistory(props.vinNumber);
            sessionStorage.setItem("searchBtnClicked", "true");
            sessionStorage.setItem("aboutPageVisited", "true");
            setTimeout(() => props.setSearchIconChange(SearchIcon), 1000);
        })
        .catch(error => {
            setTimeout(() => props.setSearchIconChange(SearchIcon), 1000);
            setVinDataErrorMsg(error.message);
            console.log(error.message);
        });
}

export default fetchVinData;