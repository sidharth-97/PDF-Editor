"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Link from "next/link";

const Dashboard = () => {
  const { data: session } = useSession();
  const [Data, setData] = useState([]);
  useEffect(() => {
    async function yourPdf() {
      const response = await fetch(`/api/users/${session?.user.id}/dashboard`);
      const Data = await response.json();
      console.log(Data, "data from dashboard");
      setData(Data);
    }
    yourPdf();
  }, [session]);
  return (
    <div>
      <h1>Your pdf</h1>
      {Data?.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-y-4 gap-x-4 mt-10 p-2">
          {Data.map((item, index) => (
            <Link key={index} href={item?.url || ""}>
              <div className="flex flex-col items-center p-4 border border-gray-300 rounded-md">
                <InsertDriveFileIcon style={{ color: "red", fontSize: 51 }} />
                <span className="mt-2">{item?.name}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>Nothing to show here</p>
      )}
    </div>
  );
};

export default Dashboard;
