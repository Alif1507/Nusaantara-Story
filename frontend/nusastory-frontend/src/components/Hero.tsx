import "@fontsource/inknut-antiqua/300.css";

const Hero = () => {
  return (
    <section className="flex w-full h-screen justify-center items-start pt-50">
      <div className="flex flex-col">
        <div className="flex items-end relative">
          <h1
            style={{ fontFamily: "Inknut Antiqua, serif" }}
            className="text-[100px] text-[#A02F1F]">
            Nusantara
          </h1>

      <div className="flex items-end">
        <img
          src="/gambar/Hero1.png"
          alt=""
          className="absolute bottom-19 right-6"
        />
        <p
          style={{ fontFamily: "Inknut Antiqua, serif" }}
          className="text-[#A02F1F] text-[12px] mb-9"
        >
          Buat Ceritamu <br /> Disini
        </p>
      </div>
    </div>

    <div className="flex relative">
      <p  style={{ fontFamily: "Inknut Antiqua, serif" }} className="max-w-[260px] text-right  text-sm text-[#A02F1F]">
        Baca Legenda, cerita rakyat, dongeng disini, ayo kita ketahui cerita
        dan legenda asli dari nusantara
      </p>

      <h1
        style={{ fontFamily: "Inknut Antiqua, serif" }}
        className="absolute right-25 -top-10 text-[100px] text-[#A02F1F]"
      >
        Story
      </h1>
    </div>
    <div className="flex  items-center justify-center">
      <h1 style={{ fontFamily: "Inknut Antiqua, serif" }} className="text-[40px] text-[#A02F1F]">Baca</h1>
      <img className="mx-3" src="/gambar/Hero2.png" alt="" />
      <h1 style={{ fontFamily: "Inknut Antiqua, serif" }} className="text-[40px] text-[#A02F1F]">Baca / Belajar</h1>
    </div>
  </div>

  
</section>

  )
}

export default Hero

