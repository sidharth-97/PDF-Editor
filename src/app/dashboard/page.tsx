"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Link from 'next/link';

const Dashboard = () => {
    const { data: session } = useSession()
    const [Data,setData]=useState([])
    useEffect(() => {
       async function yourPdf() {
           const response = await fetch(`/api/users/${session?.user.id}/dashboard`)
           const Data = await response.json()
           console.log(Data,"data from dashboard");
           setData(Data)
        }
        yourPdf()
    },[session])
  return (
      <div>
          <h1>Your pdf</h1>
          {
              Data?.length > 0 ? (
                  Data.map((item) => (
                      <div>
                          <Link href={item}>
                             <span>
                                  <InsertDriveFileIcon />
                                  
                     </span>
                          </Link>
                       
                 </div>
                  ))
             ):(<p>Nothing to show here</p>)
}
    </div>
  )
}

export default Dashboard