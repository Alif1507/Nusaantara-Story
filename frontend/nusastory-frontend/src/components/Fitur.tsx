import React from 'react'
import "@fontsource/inknut-antiqua/300.css";
import "@fontsource/poppins/300.css";

const Fitur = () => {
    const fiturData = [
        {
            id: 1,
            image1: "/gambar/fitur1.png",
            title: "Baca Cerita",
            description: "Baca Cerita rakyat dari kami dan dari orang orang yang membuatnya.",
            button: "Baca",
            image2: "gambar/fitur-bawah1.png",
            color: "#D72D27",
        },
        {
            id: 2,
            image1: "/gambar/fitur2.png",
            title: "Audio Book",
            description: "Baca dan dengarkan cerita rakyat dengan bantuan audio membuat pengalaman yang lebih baik ",
            button: "Dengarkan",
            image2: "gambar/fitur-bawah2.png",
            color: "#A02F1F",
        },
        {
            id: 3,
            image1: "/gambar/fitur3.png",
            title: "Buat Cerita",
            description: "Buat cerita dari daerah mu atau dari daerah lain dengan kata kata cerita yang manarik",
            button: "Buat",
            image2: "gambar/fitur-bawah3.png",
            color: "#D72D27",
        },
    ];

  return (
    <div className='mt-60'>
        <div className='flex justify-center'>
            <h1 style={{ fontFamily: "Inkut Antiqua, serif" }} className='text-[40px] text-[#A02F1F] '>Fitur Nusantara</h1>
        </div>
        <div className='flex flex-row gap-10 justify-center items-center mt-18'>
            {fiturData.map((fitur) => (
                <div key={fitur.id} style={{backgroundColor: fitur.color }} className='shadow-2xl w-[250px] h-[478px] rounded-xl relative hover:translate-y-10 hover:transition-all duration-300'>
                    <div className='flex justify-center mt-10 items-center'>
                        <img src={fitur.image1} alt="" />
                    </div>
                    <div className='flex justify-center items-center'>
                        <h1 style={{ fontFamily: "Poppins, serif" }} className='text-[20px] text-white mt-5'>{fitur.title}</h1>
                    </div>
                    <div className='mx-5'>
                        <div className='bg-white mt-5 h-[1px]'></div>
                        <div className='flex justify-center items-center'>
                            <p style={{ fontFamily: "Poppins, serif" }} className='text-[12px] text-white mt-3 text-left '>{fitur.description}</p>
                        </div>
                        <div className='bg-white mt-5 h-[1px]'></div>
                        <button style={{ fontFamily: "Poppins, serif" }} className='border border-white mt-5 text-sm text-white w-[100px] h-[30px] text-center rounded-lg'>{fitur.button}</button>
                    </div>
                    <img className='absolute bottom-0 right-0' src={fitur.image2} alt="" />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Fitur
