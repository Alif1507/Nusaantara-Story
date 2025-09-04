import { useState } from "react";
import "@fontsource/inknut-antiqua/300.css";
import "@fontsource/poppins/500.css";

const Visimisi = () => {
    
  const [isVisi, setIsVisi] = useState(true);
  const [animate, setAnimate] = useState(false);

  const handleToggle = () => {
    setAnimate(true);
    setTimeout(() => {
      setIsVisi(!isVisi);
      setAnimate(false);
    }, 300)
  }

  return (
    <div className='mt-10 md:mt-20 px-4 md:px-0'>
      <div className='flex justify-center items-center'>
        <h1 style={{ fontFamily: "Inknut Antiqua, serif" }} className='text-[24px] md:text-[30px] text-[#A02F1F]'>VISI DAN MISI KAMI</h1>
      </div>
      <div className='flex justify-center items-center mt-10 md:mt-30'>
        <div className="flex flex-col justify-center items-center relative">
          <button onClick={handleToggle} className="mb-5 absolute -top-12 right-0 md:right-36 cursor-pointer">
            <img src="gambar/panahatas.png" alt="" className="w-8 md:w-auto" />
          </button>
          <div className="flex flex-col md:flex-row">
            <div>
              <img src="/gambar/gambarvisi.png" alt="" className="w-full md:w-auto" />
            </div>
            <div className='bg-gradient-to-tr from-[#A02F1F] via-[#D25247] to-[#FE706B] rounded-b-4xl md:rounded-b-none md:rounded-r-4xl h-auto md:h-[501px] relative py-6 md:py-0'>
              <div className={`w-full md:w-[300px] px-7 py-5 transform transition-all duration-300 ${animate ? "translate-y-[-50px] opacity-0 ": "translate-y-0 opacity-100"}`}>
                <h1 style={{ fontFamily: "Poppins, serif" }} className="text-[30px] md:text-[40px] font-semibold text-white tracking-widest text-center md:text-left">{isVisi ? "VISI" : "MISI"}</h1>
                <p style={{ fontFamily: "Poppins, serif" }} className="text-[15px] md:text-[17px] w-full md:w-[263px] text-white font-light mt-2 text-center md:text-left">
                  {isVisi ? "menjadi wadah digital yang melestarikan dan memperkenalkan kekayaan cerita rakyat Indonesia kepada generasi masa kini dan mendatang, dengan menghadirkan pengalaman interaktif melalui bacaan, audio book, dan karya cipta pengguna, sehingga budaya nusantara tetap hidup, relevan, dan menginspirasi dunia." : "menghadirkan ruang digital yang mudah diakses bagi semua orang untuk membaca, mendengarkan, dan menciptakan cerita rakyat Indonesia; membangun komunitas kreatif yang mendorong partisipasi aktif masyarakat dalam melestarikan budaya; serta memanfaatkan teknologi untuk memperkenalkan kekayaan warisan nusantara secara menarik, edukatif, dan berkelanjutan."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Visimisi
