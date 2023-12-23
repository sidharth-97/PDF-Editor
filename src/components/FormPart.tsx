import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const FormPart = React.memo(({ pdf }) => {
const [value,setValue]=useState("")
  const formData = new FormData()
  console.log(pdf,"pdf in form");
    formData.append("file", pdf)
  formData.append("value", value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/pdf', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  console.log(data);
  }

  return (
      <>
          <form encType="multipart/form-data">
          <h1 className="text-lg mb-5">Title : {pdf.name}</h1>
            <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
          Pick an option
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group" onClick={(e)=>setValue(e.target.value)}
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="odd" control={<Radio />} label="Odd" />
          <FormControlLabel value="even" control={<Radio />} label="Even" />
          <div className="flex w-full">
            {" "}
            <FormControlLabel value="other" control={<Radio />} label="" />
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder="eg:1-5,8,10-15"
              variant="filled"
            />
          </div>
        </RadioGroup>
        </FormControl>
        <button onClick={handleSubmit}>Submit</button>
        </form>
     
    </>
  );
});
export default FormPart;
