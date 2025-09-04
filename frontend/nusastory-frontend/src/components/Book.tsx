import "@fontsource/inknut-antiqua/300.css";
import "@fontsource/poppins/500.css";
import { Link } from 'react-router-dom';

const Book = () => {
  return (
    <section className=' md:bg-[#A02F1F] w-full  h-auto md:h-[1400px] mb-50 relative rounded-[30px] md:rounded-[63px] flex items-center justify-center py-16 md:py-0 px-4 md:px-0 mt-10 md:mt-0'>
      <div className='absolute w-full h-full object-contain top-1/2 left-1/2 hidden md:block  -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(to_bottom,transparent_0%,#A02F1F_20%,#A02F1F_80%,transparent_100%)] z-20'></div>
      <img src="/img/awans.png" className='absolute hidden md:block w-full h-full object-contain top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30' alt="" />
      <img src="/img/atas-batik.png" className='w-full hidden md:block absolute top-0' alt="" />
      <img src="/img/bukui.png" className='top-1/2 hidden md:block left-1/2 w-full max-w-[300px] md:max-w-[778px] h-auto -translate-x-1/2 -translate-y-1/2 z-40 absolute' alt="" />
      <img src="/img/bawa-batik.png" className='w-full hidden md:block absolute bottom-0' alt="" />
      <div className="absolute top-1/2 left-1/2  flex flex-col md:flex-row gap-8 md:gap-30 -translate-x-1/2 -translate-y-1/2 z-50 ayam">
        {/* First block */}
        {/* Container opsional: beri jarak antar card di mobile, hilang di desktop */}
<div className="flex flex-col items-center gap-4 md:gap-0">

  {/* First block */}
  <div className="
    flex flex-col items-center
    w-full max-w-sm rounded-2xl bg-white/90 backdrop-blur-sm p-4 shadow-lg ring-1 ring-black/10
    transition-transform duration-200 active:scale-[0.98]
    md:bg-transparent md:backdrop-blur-0 md:shadow-none md:ring-0 md:p-0 md:rounded-none
  ">
    <h1
      style={{ fontFamily: "Inknut Antiqua, serif" }}
      className="text-center text-base md:text-lg mb-4"
    >
      Minta Saran Nasa Untuk <br /> Rekomendasi Cerita Rakyat
    </h1>

    <Link to="/recomendasi">
      <button
        style={{ fontFamily: "Poppins, serif" }}
        className="bg-[#A02F1F] cursor-pointer text-white text-[13px] w-[94px] h-[25px] md:w-[120px] md:h-[35px] rounded-lg text-center"
      >
        Minta Saran
      </button>
    </Link>
  </div>

  {/* Second block */}
  <div className="
    flex flex-col items-center
    w-full max-w-sm rounded-2xl bg-white/90 backdrop-blur-sm p-4 shadow-lg ring-1 ring-black/10
    transition-transform duration-200 active:scale-[0.98]
    md:bg-transparent md:backdrop-blur-0 md:shadow-none md:ring-0 md:p-0 md:rounded-none
  ">
    <h1
      style={{ fontFamily: "Inknut Antiqua, serif" }}
      className="text-center text-base md:text-lg mb-4"
    >
      Minta Saran Nasa <br /> Untuk lebih lengkap
    </h1>

    <Link to="/nasa">
      <button
        style={{ fontFamily: "Poppins, serif" }}
        className="bg-[#A02F1F] cursor-pointer text-white text-[13px] w-[94px] h-[25px] md:w-[120px] md:h-[35px] rounded-lg text-center"
      >
        ChatBot
      </button>
    </Link>
  </div>

</div>

      </div>
    </section>
  )
}

export default Book