import Image from 'next/image'
import PdfSelector from '@/components/pdfSelector'
import Navbar from '@/components/navbar'

export default function Home() {
  return (
    <div>
      <Navbar/>
      <PdfSelector />
    </div>
  )
}
