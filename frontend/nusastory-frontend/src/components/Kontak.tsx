import "@fontsource/poppins/300.css";

const Kontak = () => {
  return (
    <div className='mt-50'>
        <div className='flex justify-center items-center'>
            <h1 style={{ fontFamily: "Inkut Antiqua, serif" }} className='text-[40px] text-[#A02F1F]'>Kontak Kami</h1>
            <img src="/gambar/robot.png" alt="" />
        </div>
        <div className='flex flex-col justify-center items-center gap-2'>
            <h1 style={{ fontFamily: "Poppins, serif" }} className='text-[#A02F1F] text-[25px] font-semibold'>Ingin menanyakan sesuatu? Atau ingin memberikan saran?</h1>
            <p style={{ fontFamily: "Poppins, serif" }} className='text-[#A02F1F] text-[20px] font-semibold'>Kontak kami dibawah sini!</p>
        </div>

         <div className="mt-10 bg-[#F9F9ED] flex justify-center items-center">
      <form className="w-full max-w-3xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col ">
            <label style={{ fontFamily: "Poppins, serif" }} className=" mb-1 text-[20px] font-light">Email</label>
            <input
              type="email"
              style={{ fontFamily: "Poppins, serif" }}
              placeholder="Masukan email anda"
              className="p-3 rounded-xl border  border-red-200 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div className="flex flex-col">
            <label style={{ fontFamily: "Poppins, serif" }} className=" mb-1 text-[20px] font-light">Nama</label>
            <input
              type="text"
              style={{ fontFamily: "Poppins, serif" }}
              placeholder="Masukan nama anda"
              className="p-3 rounded-xl border text- border-red-200 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
        </div>

        {/* Textarea */}
        <div>
          <textarea
            rows={5}
            placeholder="Masukan email anda"
            style={{ fontFamily: "Poppins, serif" }}
            className="w-full p-3 rounded-lg border border-red-200 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Tombol Submit */}
        <button
          style={{ fontFamily: "Poppins, serif" }}
          className="w-full py-3 rounded-xl bg-[#D72D27] text-white font-bold text-lg shadow-md hover:bg-red-700 transition cursor-pointer"
        >
          Kirim
        </button>
      </form>
    </div>
       
    </div>
  )
}

export default Kontak
