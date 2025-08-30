import React from 'react'
import "@fontsource/inknut-antiqua/300.css";
import "@fontsource/poppins/500.css";

const Heroabout = () => {
  return (
    <div className='h-screen'>
        <div className='h-screen flex justify-center items-center relative'>
            <img src="/gambar/gambar-about-hero.png" alt="" />
            <h1 style={{ fontFamily: "Inkut Antiqua, serif" }} className='absolute top-45 right-98 text-[65px] text-[#A02F1F] '>Membuat Cerita</h1>
            <div className='ml-10 w-[300px] mt-24'>
              <p style={{ fontFamily: "Poppins, serif" }} className='text-[#A02F1F]'>Cerita Nusantara adalah tempat dimana kalian bisa membaca cerita rakyat, dongeng, legenda , dari Indonesia. </p>
              <p style={{ fontFamily: "Poppins, serif" }} className='text-[#A02F1F] mt-4'>Bukan hanya membaca kamu bisa membuat cerita atau legenda disini agar masyarakat yang tidak tahu menjadi tahu tentang cerita, legenda , dongeng dari Indonesia</p>
            </div>
        </div>
    </div>
  )
}

export default Heroabout
