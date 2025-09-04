import "@fontsource/inknut-antiqua/300.css";

const Hero = () => {
  return (
    <section className="flex w-full min-h-screen justify-center items-start pt-20 md:pt-50 px-4 md:px-0">
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row md:items-end relative">
          <h1
            style={{ fontFamily: "Inknut Antiqua, serif" }}
            className="text-[40px] md:text-[100px] text-[#A02F1F] text-center md:text-left">
            Nusantara
          </h1>

          <div className="flex items-end justify-center md:justify-start mt-4 md:mt-0">
            <img
              src="/gambar/Hero1.png"
              alt=""
              className="w-20 md:w-auto md:absolute md:bottom-19 md:right-6"
            />
            <p
              style={{ fontFamily: "Inknut Antiqua, serif" }}
              className="text-[#A02F1F] text-[12px] mb-2 md:mb-9"
            >
              Buat Ceritamu <br /> Disini
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row relative mt-6 md:mt-0">
          <p style={{ fontFamily: "Inknut Antiqua, serif" }} className="max-w-[260px] text-center md:text-right mx-auto md:mx-0 text-sm text-[#A02F1F]">
            Baca Legenda, cerita rakyat, dongeng disini, ayo kita ketahui cerita
            dan legenda asli dari nusantara
          </p>

          <h1
            style={{ fontFamily: "Inknut Antiqua, serif" }}
            className="text-[40px] md:text-[100px] text-[#A02F1F] text-center md:text-left md:absolute md:right-25 md:-top-10"
          >
            Story
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center mt-8 md:mt-0">
          <h1 style={{ fontFamily: "Inknut Antiqua, serif" }} className="text-[30px] md:text-[40px] text-[#A02F1F]">Baca</h1>
          <img className="mx-3 my-4 md:my-0" src="/gambar/Hero2.png" alt="" />
          <h1 style={{ fontFamily: "Inknut Antiqua, serif" }} className="text-[30px] md:text-[40px] text-[#A02F1F]">Baca / Belajar</h1>
        </div>
      </div>
    </section>
  )
}

export default Hero

