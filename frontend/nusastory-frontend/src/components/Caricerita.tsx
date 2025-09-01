import { Search } from "lucide-react";
import "@fontsource/poppins/300.css";
import { Link } from "react-router-dom";

const Caricerita = () => {
      const dataBuku = [
    {
    id: 1,
    title: "Malin Kundang",
    from: "Sumatera Barat",
    image: "gambar/image1.png",
},
    {
    id: 2,
    title: "Timun Mas",
    from: "Jawa Tengah",
    image: "gambar/image2.png",
},
    {
    id: 3,
    title: "Asal Muasal Danau Toba",
    from: "Sumatera Utara",
    image: "gambar/image3.png",
},
    {
    id: 4,
    title: "Sangkuriang",
    from: "Jawa Barat",
    image: "gambar/image4.png",
},
    {
    id: 5,
    title: "Si Pitung",
    from: "Jakarta/Betawi",
    image: "gambar/image5.png",
},
]
  return (
    <div className='mt-40'>
        <div className="flex justify-center items-center ">
            <div className='bg-[#A02F1F] flex justify-center items-center w-[350px] h-[50px] rounded-xl shadow-xl gap-4 cursor-pointer'>
                <h1 style={{ fontFamily: "Poppins, serif" }} className="text-white text-lg">Cari Rekomendasi Cerita</h1>
                <Search className="w-6 h-6 text-white" />
            </div>
        </div>
                <div className='flex justify-center items-center'>
                    <div className='grid grid-cols-2 gap-10 mt-20 mb-20'>
                        {dataBuku.map((book) => (
                            <div key={book.id} className='bg-[#A02F1F] px-6 py-3 rounded-xl relative w-90 text-right'>
                                <img src={book.image} alt=""/>
                                <h2 style={{ fontFamily: "Poppins, serif" }} className='text-white mt-1 text-[17px]'>{book.title}</h2>
                                <p style={{ fontFamily: "Poppins, serif" }} className='text-white mt-1 text-[13px] font-light'>{book.from}</p>
                                <Link to="/baca">
                                    <button className='bg-white rounded-md text-[#A02F1F] w-17 text-[13px] mt-1 font-medium cursor-pointer'>Baca</button>
                                </Link>
                                <img src="/gambar/awan-kuning.png" alt="" className='absolute left-0 bottom-0 w-23 h-21' />
                            </div>
                        ))}
                    </div>
                </div>
    </div>
  )
}

export default Caricerita
