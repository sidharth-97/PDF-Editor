import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {toast} from 'react-toastify'

const FormPart = React.memo(({ pdf,pages }) => {
  const [value, setValue] = useState("");
  const[nums,setNum]=useState()
  const { data: session } = useSession();
  const router = useRouter();
  const formData = new FormData();
 
  formData.append("file", pdf);
  if (nums) {
    formData.append("value", nums);
  } else {
    formData.append("value", value);
  }

  
  
  
  if (session?.user?.id) formData.append("id", session.user.id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nums) {
      const exceedingPages = nums.split(/[,-]/).filter((a) => parseInt(a) > parseInt(pages));
      
      if (exceedingPages.length > 0) {
        toast.error(`${pages} is the last page`);
        return
      }
    }
    console.log(value,"this is the value")
    if(value=="other"&&!nums)return toast.error("Enter the page numbers")
    if (!nums && !value) return toast.error("Pick something")

    const response = await fetch("/api/pdf", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    router.push(data);
  };

  return (
    <div className="flex flex-col">
      <form encType="multipart/form-data">
        <div className="flex flex-col">
          <h1 className="text-lg mb-5">Title : {pdf.name}</h1>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Pick an option
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              onClick={(e) => setValue(e.target.value)}
            >
              <FormControlLabel value="odd" control={<Radio />} label="Odd" />
              <FormControlLabel value="even" control={<Radio />} label="Even" />
              <div className="flex w-full">
                {" "}
                <FormControlLabel value="other" control={<Radio />} label="" />
                <TextField
                  onChange={(e)=>setNum(e.target.value)}
                  hiddenLabel
                  id="filled-hidden-label-normal"
                  placeholder="eg:1-5,8,10-15"
                  variant="filled"
                />
              </div>
            </RadioGroup>
          </FormControl>

          <button
            className="mt-3 bg-black text-white w-1/2 p-2 font-semibold rounded-md text-base"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
});
FormPart.displayName = "FormPart";
export default FormPart;
