import "@fontsource/poppins/500.css";

const Herobaca = () => {
  return (
    <div className='relative pt-20 md:pt-0'>
      <div className='flex justify-start items-start absolute py-3 md:py-5 px-3 md:px-5 gap-2 md:gap-3'>
        <h2 style={{ fontFamily: "Poppins, serif" }} className="text-sm md:text-base">Origin Nusantara Story</h2>
        <img src="/gambar/Ceklis.png" alt="" className="w-4 md:w-auto" />
      </div>

      <div style={{ fontFamily: "Inknut Antiqua, serif",}} className="flex justify-center items-center min-h-screen">
        <div className='flex justify-center items-end'>
          <img src="/gambar/Logocerita.png" alt="" className="w-20 md:w-auto" />
          <p className="logo-text text-[30px] md:text-[45px] mb-3 md:mb-5 text-[#825D00]">
            Nusantara<br />Story
          </p>
        </div>
      </div>
    </div>
  )
}

export default Herobaca
