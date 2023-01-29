
const fetchDescription = (setDescriptionData, setDescriptionDataErrorMsg) => {
    const baseUrl = "https://vpic.nhtsa.dot.gov/api/";
    const endpoint = "/vehicles/getvehiclevariablelist?format=json";

    const controller = new AbortController();

    fetch(baseUrl + endpoint, { signal: controller.signal })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                setDescriptionDataErrorMsg("Could not fetch the description data!");
                throw Error("Could not fetch the description data!");
            }
        })
        .then(data => {
            const arrayForFetchedData =[];
            data["Results"].forEach(obj => arrayForFetchedData.push([obj["Name"], obj["Description"]]));
            setDescriptionData(arrayForFetchedData);
        })
        .catch(error => {
            if (error.name !== "AbortError") {
                setDescriptionDataErrorMsg(error.message);
                console.log(error.message);
            }
        });
    
    return () => controller.abort();
}

export default fetchDescription;