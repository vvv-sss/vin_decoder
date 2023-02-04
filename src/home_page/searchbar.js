import ValidationClientSide from './SearchBar__ValidationClientSide';
import SearchIcon from './icons/search_icon.svg';
import LoadingIcon from './icons/loading_icon.svg';
import { useState, useEffect } from 'react';

const SearchBar = ({ vinNumber, setVinNumber, startFetching, setStartFetching }) => {
    const [isInputActive, setIsInputActive] = useState(false);
    const [searchIconChange, setSearchIconChange] = useState(SearchIcon);

    const handleInputChange = e => {
        const vin = e.target.value.toUpperCase();
        setVinNumber(vin);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setStartFetching(true);
    }

    // Function to change icon during fetching the data
    useEffect(() => {
        if (startFetching) {
            setSearchIconChange(LoadingIcon);
        } else {
            const t = window.setTimeout(() => setSearchIconChange(SearchIcon), 1000);
            return () => {
                window.clearTimeout(t);
            };
        }
    },[startFetching]);

    return (
        <section className="search-bar">
            <form className="search-bar__data-input" onSubmit={ (e) => handleSubmit(e) }>
                <input 
                    type="text" 
                    name="vin"
                    placeholder="Enter your VIN number" 
                    onChange={ e => handleInputChange(e) }
                    onFocus={ () => setIsInputActive(true) }
                    value={ vinNumber }
                    maxLength="17" />
                <div>
                    <button>Click to search...</button>
                    <img 
                        src={ searchIconChange }
                        alt="Search Icon"
                        { ...searchIconChange === LoadingIcon && { style : {animation: "loading 0.5s ease infinite"} } }
                    />
                </div>
            </form>
            <ValidationClientSide 
                isInputActive={ isInputActive }
                vinToValidate={ vinNumber }
            />
        </section>
    );
}

export default SearchBar;