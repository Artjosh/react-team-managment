import React, { useRef, useState } from 'react';
import './Searchbar.css';
import 'animate.css'
import { FaSearch } from 'react-icons/fa';
 
function Searchbar({onSearch}){
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef();

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
    setInputValue(searchTerm);
  };
  
  const handleBlur = (e) => {
    setInputValue(e.target.value);
  };
  
  return (
    <div className='InputContainer'>
      <input
        ref={inputRef}
        type="text"
        className="search-input"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder='Search'
      />
      <button className="search-button" disabled >
        <FaSearch color='#fff'/>
      </button>
    </div>
  );
}

export default Searchbar;
