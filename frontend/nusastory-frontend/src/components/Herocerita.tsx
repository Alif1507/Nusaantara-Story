import "@fontsource/inknut-antiqua/300.css";
import "@fontsource/poppins/500.css";

const Herocerita = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen pt-20 md:pt-0 px-4 md:px-0'>
      <img src="/gambar/bukuhero.png" alt="" className="w-3/4 md:w-auto" />
      <h1 style={{ fontFamily: "Inknut Antiqua, serif" }} className='text-[30px] md:text-[50px] mt-6 md:mt-10 text-[#A02F1F]'>Mari Membaca</h1>
      <button style={{ fontFamily: "Poppins, serif" }} className='bg-[#D72D27] w-[140px] md:w-[170px] h-[35px] md:h-[40px] mt-4 md:mt-5 shadow-xl text-white rounded-lg'>Lihat Cerita</button>
    </div>
  )
}

export default Herocerita
