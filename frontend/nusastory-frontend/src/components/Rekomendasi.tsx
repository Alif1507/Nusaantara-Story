import React from 'react'
import "@fontsource/inknut-antiqua/300.css";
import "@fontsource/poppins/300.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const Rekomendasi = () => {
  const dataBuku = [
    {
    id: "malin-kundang",
    title: "Malin Kundang",
    from: "Sumatera Barat",
    image: "gambar/image1.png",
},
    {
    id: "timun-mas",
    title: "Timun Mas",
    from: "Jawa Tengah",
    image: "gambar/image2.png",
},
    {
    id: "danau-toba",
    title: "Asal Muasal Danau Toba",
    from: "Sumatera Utara",
    image: "gambar/image3.png",
},
    {
    id: "sangkuriang",
    title: "Sangkuriang",
    from: "Jawa Barat",
    image: "gambar/image4.png",
},
    {
    id: "si-pitung",
    title: "Si Pitung",
    from: "Jakarta/Betawi",
    image: "gambar/image5.png",
},
]

  return (
    <div className='mt-50'>
      <div className='justify-between flex relative items-center'>
        <h1 style={{ fontFamily: "Inknut Antiqua, serif" }} className='text-[40px] text-[#A02F1F] ml-20'>Rekomendasi <br />Cerita</h1>
        <div>
            <h1 style={{ fontFamily: "Poppins, serif" }} className='text-[25px] text-[#EFA72C] absolute right-11 top-13'>SCROLL</h1>
            <img className='items-start' src="/gambar/panah.png" alt="" />
        </div>
      </div>
      <div className='w-full flex justify-end 2xl:justify-center mt-10'>
        <div className='max-w-[1200px]'>
          <Swiper
          spaceBetween={1}
          slidesPerView={3}
          grabCursor={true}
          breakpoints={{
          0: {       
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {    
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {    
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}>
              {dataBuku.map((book) => (
              <SwiperSlide>
                <div key={book.id} className='bg-[#A02F1F] px-6 py-3 rounded-xl relative w-90 text-right'>
                    <img src={book.image} alt=""/>
                    <h2 style={{ fontFamily: "Poppins, serif" }} className='text-white mt-1 text-[17px]'>{book.title}</h2>
                    <p style={{ fontFamily: "Poppins, serif" }} className='text-white mt-1 text-[13px] font-light'>{book.from}</p>
                    <button className='bg-white rounded-md text-[#A02F1F] w-17 text-[13px] mt-1 font-medium'>Baca</button>
                    <img src="/gambar/awan-kuning.png" alt="" className='absolute left-0 bottom-0 w-23 h-21' />
                </div>
              </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default Rekomendasi
