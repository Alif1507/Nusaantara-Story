import "@fontsource/inknut-antiqua/300.css";
import "@fontsource/poppins/500.css";

const Heroabout = () => {
  return (
    <div className='min-h-screen pt-20 md:pt-0'>
      <div className='min-h-screen flex flex-col md:flex-row justify-center items-center relative px-4 md:px-0'>
        <img src="/gambar/gambar-about-hero.png" alt="" className="" />
        <h1 style={{ fontFamily: "Inkut Antiqua, serif" }} className='text-[40px] md:text-[65px] text-[#A02F1F] text-center md:text-left md:absolute md:top-45 md:right-98 2xl:right-140 2xl:top-58'>Membuat Cerita</h1>
        <div className='mt-6 md:mt-24 md:ml-10 w-full md:w-[300px]'>
          <p style={{ fontFamily: "Poppins, serif" }} className='text-[#A02F1F] text-center md:text-left'>Cerita Nusantara adalah tempat dimana kalian bisa membaca cerita rakyat, dongeng, legenda , dari Indonesia. </p>
          <p style={{ fontFamily: "Poppins, serif" }} className='text-[#A02F1F] mt-4 text-center md:text-left'>Bukan hanya membaca kamu bisa membuat cerita atau legenda disini agar masyarakat yang tidak tahu menjadi tahu tentang cerita, legenda , dongeng dari Indonesia</p>
        </div>
      </div>
    </div>
  )
}

export default Heroabout
