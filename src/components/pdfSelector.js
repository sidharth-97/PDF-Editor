"use client";
import { ChangeEvent, useRef, useState } from "react";
import Button from "@mui/material/Button";
import ViewPdf from "./ViewPdf";
import { useSession } from "next-auth/react";
import {toast} from 'react-toastify'

const PdfSelector= () => {
  const { data: session } = useSession();
    const [file,setFile]=useState(null)
  const fileRef = useRef(null);
  const handleClick = () => {
    if(!session)return toast.error("Please login to continue")
    if (fileRef.current) {
      fileRef?.current?.click();
    } 
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile) 
    };
    
  return (
    //       <div>
    //       <Button className="text-white bg-red-500 font-semibold" variant="contained" onClick={handleClick}>
    //   Select your pdf
    // </Button>

    //            <input ref={fileRef} className="hidden" type="file" onChange={handleFileChange}/>

    //     </div>
    <section className="h-full overflow-auto p-8 w-full  flex flex-col">
      {!file&&<header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
        <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
          <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
        </p>
        <input
          ref={fileRef}
          className="hidden"
          type="file"
          onChange={handleFileChange}
        />
        <Button
          style={{ backgroundColor: '#e53e3e', color: 'white' }}
          variant="contained"
          onClick={handleClick}
        >
          Select your pdf
        </Button>
          </header>}
          {file && <ViewPdf pdf={file} />}
          
    </section>
  );
};

export default PdfSelector;
