import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
function Selectcountry(props) {
  const [data, setData] = React.useState("");

  function handleChange(event) {
    const { value } = event.target;
    setData(value);
  }
  function handleClick() {
    props.location(data);
  }

  return (
    <div className="input">
      <input className="inputField"onChange={handleChange} />
      <button className="button"onClick={handleClick}>Submit</button>
    </div>
  );
}

export default Selectcountry;
