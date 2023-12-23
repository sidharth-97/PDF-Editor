"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Button } from "@mui/material";

const Navbar = () => {
  const{data:session}=useSession()
  const [providers, setProviders] = useState(null)
  const [toggleDropdown,setToggleDropdown]=useState(false)
  useEffect(() => {
      const setUpProviders = async ()=>  {
          const response = await getProviders()
          setProviders(response) 
      }
      setUpProviders()
  },[])
  return (
    <nav className="relative select-none bg-gray-200 lg:flex lg:items-stretch w-full">
  <div className="flex flex-no-shrink items-stretch h-12">
    <a href="#" className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-gray-300">PDF Editor</a>
   
    <button className="block lg:hidden cursor-pointer ml-auto relative w-12 h-12 p-4">
      <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
    </button>
      </div>
      {session?.user ? (
        <div className="lg:flex lg:items-stretch lg:flex-no-shrink lg:flex-grow">
          <div className="lg:flex lg:items-stretch lg:justify-end ml-auto">
            <a href="#" className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-gray-300">Your pdfs</a>
            <Button onClick={signOut} className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-gray-300">Sign out</Button>
          </div>
        </div>) : (
        <div className="lg:flex lg:items-stretch lg:flex-no-shrink lg:flex-grow">
          <div className="lg:flex lg:items-stretch lg:justify-end ml-auto">
          {
                              providers && Object.values(providers).map((provider)=>(
                          <button type="button" key={provider.name} onClick={()=>signIn(provider.id)} className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-gray-300">
                              Sign In
                          </button>
                              ))
                        }  
          </div>
        </div>
      )}
</nav>
  )
}

export default Navbar