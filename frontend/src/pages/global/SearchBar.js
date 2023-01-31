import React from "react";

import { Paper, Input, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = (
    { inputValue, disabled, style, onRequestSearch}
  ) => {
    const [value, setValue] = React.useState(inputValue);

    const handleInput = 
      (e) => {
        setValue(e.target.value);
      };

    const handleKeyDown = (e)=>{
        if (e.key === 'Enter') {
            handleRequestSearch();
          }
    }

    const handleRequestSearch = () => {
        onRequestSearch(value);
    };

    return (
      
      <Paper style={{ margin: "10px", height:"30px", display: "flex", justifyContent: "space-between", ...style}}>
        <div style={{ width: `calc(100% - 25px)`, padding: "2px", paddingTop: "0"}}>
          <Input
            value={value} 
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            fullWidth
            style={{ width: "100%", paddingLeft: "3px"}}
            disableUnderline
            disabled={disabled}
          />
        </div>
        <IconButton
          onClick={handleRequestSearch}
          style={{transform: "scale(1, 1)",}}
          disabled={disabled}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  };

SearchBar.defaultProps = {
  inputValue: "",
  disabled: false,
  style: null,
  value: "",
};


export default SearchBar;