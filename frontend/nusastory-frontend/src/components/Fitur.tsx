import "@fontsource/inknut-antiqua/300.css";
import "@fontsource/poppins/300.css";
import { Link } from 'react-router-dom';

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
            link: "/cerita"
        },
        {
            id: 2,
            image1: "/gambar/fitur2.png",
            title: "Audio Book",
            description: "Baca dan dengarkan cerita rakyat dengan bantuan audio membuat pengalaman yang lebih baik ",
            button: "Dengarkan",
            image2: "gambar/fitur-bawah2.png",
            color: "#A02F1F",
            link: "/audiobook"
        },
        {
            id: 3,
            image1: "/gambar/fitur3.png",
            title: "Buat Cerita",
            description: "Buat cerita dari daerah mu atau dari daerah lain dengan kata kata cerita yang manarik",
            button: "Buat",
            image2: "gambar/fitur-bawah3.png",
            color: "#D72D27",
            link: "/dashboard"
        },
    ];

  return (
    <div className='mt-20 md:mt-60 px-4 md:px-0'>
        <div className='flex justify-center'>
            <h1 style={{ fontFamily: "Inkut Antiqua, serif" }} className='text-[30px] md:text-[40px] text-[#A02F1F]'>Fitur Nusantara</h1>
        </div>
        <div className='flex flex-col md:flex-row gap-10 justify-center items-center mt-10 md:mt-18'>
            {fiturData.map((fitur) => (
                <div key={fitur.id} style={{backgroundColor: fitur.color }} className='shadow-2xl w-full max-w-[250px] h-auto md:h-[478px] rounded-xl relative hover:-translate-y-5 md:hover:-translate-y-10 hover:transition-all duration-300 mb-10 md:mb-0'>
                    <div className='flex justify-center mt-10 items-center'>
                        <img src={fitur.image1} alt="" className="w-3/4 md:w-auto" />
                    </div>
                    <div className='flex justify-center items-center'>
                        <h1 style={{ fontFamily: "Poppins, serif" }} className='text-[18px] md:text-[20px] text-white mt-5'>{fitur.title}</h1>
                    </div>
                    <div className='mx-5 pb-10 md:pb-0'>
                        <div className='bg-white mt-5 h-[1px]'></div>
                        <div className='flex justify-center items-center'>
                            <p style={{ fontFamily: "Poppins, serif" }} className='text-[11px] md:text-[12px] text-white mt-3 text-left '>{fitur.description}</p>
                        </div>
                        <div className='bg-white mt-5 h-[1px]'></div>
                        <Link to={fitur.link}>
                            <button style={{ fontFamily: "Poppins, serif" }} className='border border-white mt-5 text-sm text-white w-[100px] h-[30px] text-center rounded-lg cursor-pointer'>{fitur.button}</button>
                        </Link>
                    </div>
                    <img className='absolute bottom-0 right-0 w-1/3 md:w-auto' src={fitur.image2} alt="" />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Fitur
