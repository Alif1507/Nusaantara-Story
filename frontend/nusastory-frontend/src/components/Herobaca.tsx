import "@fontsource/poppins/500.css";

const Herobaca = () => {
  return (
    <div className='relative'>
        <div className='flex justify-start items-start absolute py-5 px-5 gap-3'>
          <h2 style={{ fontFamily: "Poppins, serif" }}>Origin Nusantara Story</h2>
          <img src="/gambar/Ceklis.png" alt="" />
        </div>

        <div style={{ fontFamily: "Inknut Antiqua, serif",}} className="flex justify-center items-center h-screen">
          <div className='flex justify-center items-end'>
            <img src="/gambar/Logocerita.png" alt="" />
            <p className="logo-text text-[45px] mb-5 text-[#825D00]">
              Nusantara<br />Story
            </p>
          </div>
      </div>
    </div>
  )
}

export default Herobaca
