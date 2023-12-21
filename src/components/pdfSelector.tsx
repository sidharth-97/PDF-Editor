"use client";
import { ChangeEvent, useRef } from "react";
import Button from "@mui/material/Button";

const PdfSelector: React.FC = () => {
  const fileRef = useRef(null);
  const handleClick = () => {
    if (fileRef.current) {
      fileRef?.current?.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log(selectedFile);
  };
  return (
    //       <div>
    //       <Button className="text-white bg-red-500 font-semibold" variant="contained" onClick={handleClick}>
    //   Select your pdf
    // </Button>

    //            <input ref={fileRef} className="hidden" type="file" onChange={handleFileChange}/>

    //     </div>
    <section className="h-full overflow-auto p-8 w-full  flex flex-col">
      <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
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
          className="text-white bg-red-500 font-semibold hover:bg-red-400"
          variant="contained"
          onClick={handleClick}
        >
          Select your pdf
        </Button>
      </header>
    </section>
  );
};

export default PdfSelector;
