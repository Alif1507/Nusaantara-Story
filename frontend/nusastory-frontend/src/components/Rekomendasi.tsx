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
    <div className='mt-20 md:mt-50 px-4 md:px-0'>
      <div className='justify-between flex flex-col md:flex-row relative items-center'>
        <h1 style={{ fontFamily: "Inknut Antiqua, serif" }} className='text-[30px] md:text-[40px] text-[#A02F1F] text-center md:text-left md:ml-20'>Rekomendasi <br />Cerita</h1>
        <div className="mt-6 md:mt-0">
          <h1 style={{ fontFamily: "Poppins, serif" }} className='text-[20px] md:text-[25px] text-[#EFA72C] md:absolute md:right-11 md:top-13'>SCROLL</h1>
          <img className='items-start mx-auto md:mx-0' src="/gambar/panah.png" alt="" />
        </div>
      </div>
      <div className='w-full flex justify-center md:justify-end 2xl:justify-center mt-10'>
        <div className='max-w-[1200px] w-full'>
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
            }}
          >
            {dataBuku.map((book) => (
              <SwiperSlide key={book.id}>
                <div className='bg-[#A02F1F] px-6 py-3 rounded-xl relative w-full md:w-90 text-right'>
                  <img src={book.image} alt="" className="w-full" />
                  <h2 style={{ fontFamily: "Poppins, serif" }} className='text-white mt-1 text-[15px] md:text-[17px]'>{book.title}</h2>
                  <p style={{ fontFamily: "Poppins, serif" }} className='text-white mt-1 text-[12px] md:text-[13px] font-light'>{book.from}</p>
                  <button className='bg-white rounded-md text-[#A02F1F] w-17 text-[13px] mt-1 font-medium'>Baca</button>
                  <img src="/gambar/awan-kuning.png" alt="" className='absolute left-0 bottom-0 w-16 md:w-23 h-16 md:h-21' />
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
