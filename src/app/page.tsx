"use client"
import PdfSelector from '@/components/pdfSelector'
import Navbar from '@/components/navbar'
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <div>
      <SessionProvider>
         <Navbar/>
      </SessionProvider>
      <PdfSelector />
    </div>
  )
}
