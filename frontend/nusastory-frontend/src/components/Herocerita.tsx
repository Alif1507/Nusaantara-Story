import "@fontsource/inknut-antiqua/300.css";
import "@fontsource/poppins/500.css";

const Herocerita = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <img  src="/gambar/bukuhero.png" alt="" />
      <h1 style={{ fontFamily: "Inknut Antiqua, serif" }} className='text-[50px] mt-10 text-[#A02F1F]'>Mari Membaca</h1>
      <button style={{ fontFamily: "Poppins, serif" }} className='bg-[#D72D27] w-[170px] h-[40px] mt-5 shadow-xl text-white rounded-lg'>Lihat Cerita</button>
    </div>
  )
}

export default Herocerita
