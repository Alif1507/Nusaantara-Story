import React from 'react'
import "@fontsource/poppins/500.css";
import Herobaca from './components/Herobaca';
import "@fontsource/inknut-antiqua/300.css";
import "@fontsource/kapakana/300.css";

const Bacacerita = () => {
  const dataBook = [
    {
      id: "malin-kundang",
      judul: "Malin Kundang",
      asal: "Sumatera Barat",
      imageHero: "gambar/gambar-hero1.png",
      steps: [
        {
          gambar: {
            dewasa: "/gambar/gambar1-dewasa.png",
            anak: "/gambar/gambar1-anak.png",
          },
          isi: {
            dewasa: "Di sebuah kampung nelayan di pesisir Sumatra Barat, hiduplah seorang janda miskin bersama anaknya, Malin Kundang. Sejak kecil, Malin tumbuh tanpa ayah karena sang ayah meninggal saat ia masih bayi. Kehidupan mereka serba kekurangan, ibunya bekerja keras menjual kue dan mencari kayu bakar untuk bertahan hidup. Walau begitu, kasih sayang sang ibu kepada Malin tidak pernah berkurang sedikit pun. Malin tumbuh menjadi anak yang rajin, cerdas, dan berbakti. Ia sering membantu ibunya dan juga melaut bersama nelayan lain agar mereka bisa makan setiap hari. Dalam hati kecilnya, Malin berjanji suatu hari nanti ia akan mengubah nasib mereka agar tidak hidup miskin selamanya.",
            anak: "Di tepi pantai Sumatra Barat, hiduplah seorang ibu miskin bersama anaknya, Malin Kundang. Sejak kecil Malin tumbuh tanpa ayah, tapi ibunya merawatnya dengan penuh kasih sayang. Walau hidup sederhana, mereka saling menyayangi dan selalu berusaha bersama.",
          }
        }
      ]
    }
];

  return (
    <div className='h-[2000px]'>
      <Herobaca />
      <div className=''>
        {dataBook.map((book) => (
          <div>
            <div className='flex justify-center items-center'>
              <h1 style={{ fontFamily: "Inknut Antiqua, serif" }} className='text-[40px] text-[#A02F1F]'>{book.judul}</h1>
            </div>

            <div className='flex justify-center items-center mx-5'>
              <div className='mt-10'>
               <img src={book.imageHero} alt="" />
               <div className='mt-5 bg-[#D72D27] w-[220px] h-[50px] flex justify-center items-center rounded-lg text-white'>
                  <h1 style={{ fontFamily: "Inknut Antiqua, serif" }} className='text-xl'>{book.asal}</h1>
               </div>
              </div>
            </div>

            <div className='mt-40'>
              <div className='flex justify-center items-center'>
                <h1 style={{ fontFamily: "Kapakana" }} className='text-[40px] '>Selamat Membaca</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Bacacerita
