import React from 'react'
import "@fontsource/inknut-antiqua/300.css";
import "@fontsource/poppins/500.css";

const Book = () => {
  return (
    <section className='bg-[#A02F1F] w-full h-[920px] relative rounded-[63px]'>
      {/* background batik */}
      <div className="absolute bottom-0 left-0 w-full h-[210px] bg-gradient-to-b from-[#A02F1F] via-[#A02F1F]/100 to-transparent z-40"></div>
      <img className='absolute z-30 bottom-0 w-full ' src="/gambar/batik-bawah.png" alt="" />
      <div className="absolute z-40 top-0 left-0 w-full h-[220px]  bg-gradient-to-b from-[#A02F1F]/0 via-[#A02F1F]/100 to-[#A02F1F]"></div>
      <img className='absolute z-30 top-0 w-full ' src="/gambar/batik-atas.png" alt="" />

      {/* background awan */}
        <img className='absolute z-40 left-40 top-20' src="/gambar/Awan.png" alt="" />
        <img className='absolute z-40 left-0 top-70' src="/gambar/Awan.png" alt="" />
        <img className='absolute z-40 left-80 top-70' src="/gambar/Awan.png" alt="" />
        <img className='absolute z-40 left-40 top-120' src="/gambar/Awan.png" alt="" />
        <img className='absolute z-40 left-120 top-37' src="/gambar/Awan.png" alt="" />
        <img className='absolute z-40 right-120 top-30' src="/gambar/Awan.png" alt="" />
        <img className='absolute z-40 right-0 top-60' src="/gambar/Awan.png" alt=""  />
        <img className='absolute z-40 right-45 top-90' src="/gambar/Awan.png" alt=""  />
        <img className='absolute z-40 right-0 top-120' src="/gambar/Awan.png" alt=""  />
        
`     <div className='flex justify-center items-center'>
        <div>
          <img className='mt-10' src="/gambar/buku.png" alt="" />
          <h1 style={{ fontFamily: "Inknut Antiqua, serif" }} className='absolute text-center text-lg left-111 top-105'>
            Lihat Rekomendasi <br /> Untuk Mulai Membaca
          </h1>
          <button style={{ fontFamily: "Poppins, serif" }} className='bg-[#A02F1F] absolute text-white text-[13px] w-[94px] h-[25px] rounded-lg text-center left-126 top-124'>
            Lihat Saran
          </button>
          <h1 style={{ fontFamily: "Inknut Antiqua, serif" }} className='absolute text-center text-lg left-182 top-105'>
            Minta Saran Nasa <br /> Untuk lebih lengkap
          </h1>
          <button style={{ fontFamily: "Poppins, serif" }} className='bg-[#A02F1F] absolute text-white text-[13px] w-[94px] h-[25px] rounded-lg text-center left-196 top-124'>
            ChatBot
          </button>
        </div>
      </div>
    </section>
  )
}

export default Book
