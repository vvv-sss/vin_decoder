import ValidationClientSide from './searchbar_client_validation';
import LoadingIcon from './icons/loading_icon.svg';

function SearchBar(props) {
    const changeVinNumber = event => {
        const vin = event.target.value.toUpperCase();
        props.setVinNumber(vin);
    }

    return (
        <section className="search-bar">
            <div className="search-bar__data-input">
                <input 
                    type="text" 
                    placeholder="Enter your VIN number" 
                    onChange={ event => changeVinNumber(event) }
                    onClick={ () => props.setIsInputActive(true) }
                    value={ props.vinNumber }
                    maxLength="17" />
                <div>
                    <button onClick={() => {
                        props.setStartFetching(true);
                        props.setSearchIconChange(LoadingIcon);
                        }
                    }>
                        Click to search...
                    </button>
                    <img 
                        src={ props.searchIconChange }
                        alt="Search Icon"
                        { ...props.searchIconChange === LoadingIcon && { style : {animation: "loading 0.5s ease infinite"} } } />
                </div>
            </div>
            <ValidationClientSide 
                isInputActive={ props.isInputActive }
                vinToValidate={ props.vinNumber } />
        </section>
    );
}

export default SearchBar;