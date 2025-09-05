import React, { useState } from 'react'
import "@fontsource/poppins/500.css";
import Herobaca from './components/Herobaca';
import "@fontsource/inknut-antiqua/300.css";
import { useParams } from "react-router-dom";
import { div, h1 } from 'framer-motion/client';
import { Link } from "react-router-dom";

const Bacacerita = () => {
   const { id } = useParams<{ id: string }>();
   const [mode, setMode] = useState<"anak" | "dewasa" | null>(null);
   const [showModeOptions, setShowModeOptions] = useState(false);

  const dataBook = [
   {
      id: "malin-kundang",
      judul: "Malin Kundang",
      asal: "Sumatera Barat",
      imageHero: "/gambar/gambar-hero1.png",
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
        },
        {
          gambar: {
            dewasa: "/gambar/gambar2-dewasa.png",
            anak: "/gambar/gambar2-anak.png",
          },
          isi: {
            dewasa: "Ketika Malin mulai dewasa, ia merasa kampung halamannya terlalu sempit untuk mencapai cita-citanya. Suatu hari, sebuah kapal dagang berlabuh di pelabuhan dekat desa. Malin bertekad ikut berlayar, meski ibunya berat hati melepasnya. Dengan mata berkaca-kaca, ibunya berpesan, “Nak, jangan pernah lupa pada ibumu dan kampung halamanmu.” Malin pun berangkat, meninggalkan ibunya yang setiap hari berdoa dengan sabar agar anaknya selamat dan berhasil. Tahun demi tahun berlalu, Malin tidak pernah mengirim kabar. Meski begitu, ibunya tetap menanti, berdiri di tepi pantai hampir setiap sore dengan harapan anak yang dicintainya pulang membawa kebahagiaan.",
            anak: "Saat Malin sudah besar, ia ingin merantau. Ia berharap bisa menjadi orang kaya agar ibunya bahagia. Sang ibu sebenarnya berat melepas, tapi akhirnya mengizinkan dengan pesan, “Jangan lupakan ibumu.” Malin pun berangkat naik kapal dagang, sementara ibunya menunggu dengan doa setiap hari.",
          }
        },
        {
          gambar: {
            dewasa: "/gambar/gambar3-dewasa.png",
            anak: "/gambar/gambar3-anak.png",
          },
          isi: {
            dewasa: "Perjalanan panjang Malin ternyata membuahkan hasil. Ia menjadi saudagar kaya raya yang memiliki banyak kapal dagang. Berkat kecerdikan dan kerja kerasnya, ia dihormati banyak orang. Malin bahkan menikah dengan seorang gadis cantik dari keluarga bangsawan. Kehidupannya kini jauh berbeda dengan masa kecilnya yang miskin. Hingga suatu hari, kapalnya berlayar melewati kampung halamannya. Kabar tentang saudagar kaya bernama Malin Kundang segera tersebar ke seluruh desa. Sang ibu yang sudah tua renta mendengarnya. Dengan hati berdebar, ia bergegas ke pantai, meyakini bahwa anak yang dirindukannya selama ini akhirnya pulang.",
            anak: "Tahun demi tahun berlalu. Malin berhasil menjadi saudagar kaya. Ia punya banyak kapal dan menikah dengan wanita cantik dari keluarga bangsawan. Suatu hari, kapalnya singgah di dekat kampung halamannya. Kabar itu membuat ibunya sangat gembira. Ia segera pergi ke pantai untuk menyambut anaknya.",
          }
        },
        {
          gambar: {
            dewasa: "/gambar/gambar4-dewasa.png",
            anak: "/gambar/gambar4-anak.png",
          },
          isi: {
            dewasa: "Ketika bertemu di tepi pantai, sang ibu langsung berlari memeluk Malin sambil menangis bahagia. Ia bersyukur anaknya kembali dengan selamat. Namun, Malin yang kini berpakaian mewah merasa malu melihat ibunya yang tua, miskin, dan berpakaian lusuh. Ia khawatir istrinya dan para awak kapalnya akan meremehkannya. Dengan wajah angkuh, Malin menolak mengakui perempuan tua itu sebagai ibunya. “Wanita miskin ini bukan ibuku,” katanya dengan keras. Sang ibu kaget dan hancur hati mendengar kata-kata itu. Ia memohon berkali-kali, mengingatkan bagaimana dulu ia membesarkan Malin dengan penuh kasih sayang. Tetapi Malin tetap keras hati dan bahkan mengusir ibunya.",
            anak: "Namun, Malin malu pada ibunya yang miskin dan berpakaian lusuh. Ia tidak mau mengakui ibunya di depan istrinya dan para awak kapal. Sang ibu memohon sambil menangis, tapi Malin mengusirnya. Hati sang ibu hancur. Dengan sedih, ia berdoa agar Tuhan menghukum anak durhaka itu.",
          }
        },
        {
          gambar: {
            dewasa: "/gambar/gambar5-dewasa.png",
            anak: "/gambar/gambar5-anak.png",
          },
          isi: {
            dewasa: "Dengan hati yang sangat terluka, sang ibu akhirnya menengadah ke langit dan berdoa, “Ya Tuhan, jika benar dia anakku, maka hukumlah dia atas kedurhakaannya.” Tak lama kemudian, angin kencang bertiup, langit menjadi gelap, dan badai besar menghantam laut. Petir menyambar kapal Malin, ombak raksasa menghancurkan segalanya. Malin berusaha menyelamatkan diri, tetapi sia-sia. Tubuhnya perlahan berubah menjadi batu di tepi pantai. Batu itu kini dikenal sebagai Batu Malin Kundang, menjadi pengingat abadi bahwa sebesar apa pun kesuksesan seseorang, ia tidak boleh durhaka kepada orang tua.",
            anak: "Tidak lama kemudian, badai besar datang. Ombak menghantam kapal Malin dan angin meniup keras. Malin tak bisa melarikan diri. Tubuhnya perlahan berubah menjadi batu di tepi pantai. Batu itu kini disebut Batu Malin Kundang, sebagai pelajaran agar anak tidak durhaka pada orang tua.",
          }
        },
      ]
    },
    {
      id: "timun-mas",
      judul: "Timun Mas",
      asal: "Jawa Tengah",
      imageHero: "/gambar/gambar-hero2.png",
      steps: [
        {
          gambar: {
            dewasa: "/gambar/timun1-dewasa.png",
            anak: "/gambar/timun1-anak.png",
          },
          isi: {
            dewasa: "Di sebuah desa di Jawa Tengah, hiduplah seorang janda tua bernama Mbok Rondo yang setiap hari merasa kesepian karena tidak memiliki anak. Ia selalu berdoa agar Tuhan memberinya seorang putri. Suatu hari, Mbok Rondo bertemu dengan seorang raksasa menakutkan bernama Buto Ijo. Raksasa itu menjanjikan seorang anak bila Mbok Rondo mau menanam biji mentimun yang ia berikan. Namun, ada syarat berat: ketika anak itu tumbuh besar, ia harus diserahkan kepada sang raksasa. Karena sangat menginginkan seorang anak, Mbok Rondo pun menerima biji itu dengan hati yang diliputi rasa takut dan harapan sekaligus.",
            anak: "Di sebuah desa hiduplah seorang janda bernama Mbok Rondo. Ia sangat ingin punya anak. Suatu hari ia bertemu raksasa jahat bernama Buto Ijo. Raksasa itu memberi biji mentimun dan berjanji, jika mentimun itu tumbuh menjadi anak, maka anak itu harus diserahkan kepadanya kelak. Meski takut, Mbok Rondo menerima biji itu.",
          }
        },
        {
          gambar: {
            dewasa: "/gambar/timun2-dewasa.png",
            anak: "/gambar/timun2-anak.png",
          },
          isi: {
            dewasa: "Biji mentimun itu ditanam di kebun, dan tidak lama kemudian tumbuhlah sebuah mentimun raksasa. Saat mentimun itu dibelah, keluarlah seorang bayi perempuan yang cantik. Bayi itu diberi nama Timun Mas. Sejak saat itu, Mbok Rondo merawat Timun Mas dengan penuh kasih sayang, bagaikan anak kandung sendiri. Waktu pun berjalan, Timun Mas tumbuh menjadi gadis yang elok, rajin, dan baik hati. Namun, Mbok Rondo tidak bisa menghapus rasa cemas di hatinya, sebab ia tahu suatu saat Buto Ijo akan menagih janji.",
            anak: "Biji mentimun ditanam di kebun. Beberapa waktu kemudian tumbuhlah sebuah mentimun besar. Saat dibelah, keluarlah bayi perempuan cantik. Bayi itu diberi nama Timun Mas. Mbok Rondo merawat Timun Mas dengan penuh kasih sayang hingga ia tumbuh menjadi gadis cantik dan rajin.",
          }
        },
        {
          gambar: {
            dewasa: "/gambar/timun3-dewasa.png",
            anak: "/gambar/timun3-anak.png",
          },
          isi: {
            dewasa: "Benar saja, ketika Timun Mas mulai beranjak dewasa, Buto Ijo datang menemui Mbok Rondo. Ia menagih janji agar Timun Mas diserahkan kepadanya. Dengan hati gemetar, Mbok Rondo meminta penundaan beberapa waktu. Sang raksasa menyetujui, tetapi berjanji akan datang lagi. Dalam keputusasaan, Mbok Rondo mencari pertolongan dan mendaki gunung untuk menemui seorang pertapa sakti. Pertapa itu mendengarkan kisahnya, lalu memberikan empat benda pusaka: biji mentimun, jarum, garam, dan terasi. Ia berkata, benda-benda itu akan menyelamatkan Timun Mas dari kejaran Buto Ijo. Mbok Rondo pun pulang dengan harapan baru.",
            anak: "Ketika Timun Mas sudah remaja, Buto Ijo datang menagih janji. Mbok Rondo ketakutan dan meminta penundaan. Lalu ia pergi ke gunung untuk meminta pertolongan seorang pertapa. Pertapa itu memberi empat benda ajaib: biji mentimun, jarum, garam, dan terasi. Semua itu bisa dipakai Timun Mas untuk melawan Buto Ijo.",
          }
        },
        {
          gambar: {
            dewasa: "/gambar/timun4-dewasa.png",
            anak: "/gambar/timun4-anak.png",
          },
          isi: {
            dewasa: "Ketika hari yang ditakuti tiba, Buto Ijo benar-benar datang untuk menjemput Timun Mas. Gadis itu sangat ketakutan, tetapi Mbok Rondo memintanya berlari sekuat tenaga dan menggunakan benda-benda pusaka yang diberikan pertapa. Dengan langkah tergesa, Timun Mas berlari dikejar oleh Buto Ijo. Saat jarak semakin dekat, ia menaburkan biji mentimun. Seketika, tumbuhlah hutan mentimun yang lebat dan membuat raksasa itu terperangkap. Namun, dengan kekuatannya, Buto Ijo berhasil melewatinya dan melanjutkan pengejaran.",
            anak: "Beberapa hari kemudian, Buto Ijo kembali datang. Timun Mas lari sekuat tenaga. Saat hampir tertangkap, ia menaburkan biji mentimun. Seketika tumbuh hutan mentimun yang membuat Buto Ijo terhalang, tetapi raksasa itu bisa melewatinya.",
          }
        },
        {
          gambar: {
            dewasa: "/gambar/timun5-dewasa.png",
            anak: "/gambar/timun5-anak.png",
          },
          isi: {
            dewasa: "Timun Mas terus berlari sambil melempar benda kedua, yaitu jarum. Dalam sekejap, jarum itu berubah menjadi hutan bambu runcing yang tajam dan rapat. Buto Ijo berteriak kesakitan ketika tubuhnya tertusuk, tetapi dengan penuh amarah, ia tetap berhasil keluar dari hutan bambu tersebut. Timun Mas lalu menaburkan garam, dan tanah di belakangnya berubah menjadi lautan luas. Ombak bergemuruh menelan tubuh Buto Ijo. Namun, sang raksasa yang kuat itu masih mampu berenang dan kembali mengejar. Ketika ia hampir menangkap Timun Mas, gadis itu melemparkan benda terakhir, yaitu terasi. Seketika, tanah berguncang dan berubah menjadi lautan api serta lumpur panas. Kali ini, Buto Ijo benar-benar tidak bisa lolos. Tubuhnya ditelan bumi dan lenyap selamanya.",
            anak: "Timun Mas melempar jarum yang berubah jadi hutan bambu runcing. Buto Ijo terluka, namun masih mengejar. Ia lalu menaburkan garam, tanah pun berubah jadi lautan luas. Buto Ijo nyaris tenggelam, tapi berhasil berenang. Akhirnya Timun Mas melempar terasi, tanah pun berubah jadi lahar panas. Buto Ijo jatuh dan tidak bisa selamat.",
          }
        },
        {
          gambar: {
            dewasa: "/gambar/timun6-dewasa.png",
            anak: "/gambar/timun6-anak.png",
          },
          isi: {
            dewasa: "Setelah berhasil mengalahkan Buto Ijo, Timun Mas pulang dengan selamat. Mbok Rondo menyambutnya dengan tangisan haru dan pelukan erat. Mereka berdua bersyukur karena akhirnya terbebas dari ancaman raksasa yang menakutkan. Sejak saat itu, Timun Mas dan Mbok Rondo hidup bahagia, bekerja bersama di ladang, dan tak lagi merasa takut. Kisah Timun Mas pun menjadi legenda yang diceritakan turun-temurun, mengajarkan bahwa keberanian, kecerdikan, dan doa tulus mampu mengalahkan kekuatan sebesar apa pun.",
            anak: "Timun Mas kembali pulang dengan gembira. Mbok Rondo sangat bahagia melihat anaknya selamat. Mereka pun hidup tenang dan bahagia. Kisah ini mengajarkan bahwa kecerdikan dan keberanian bisa mengalahkan kekuatan yang jahat.",
          }
        },
      ]
    }
]


const book = dataBook.find((b) => b.id === id);

  if (!book) {
    return <p className="text-center mt-20">Cerita tidak ditemukan</p>;
  }

  return (
    <div className='relative'>
      <div className='z-40 right-20 top-1/12 fixed flex flex-col gap-1'>
        <button 
          style={{ fontFamily: "Poppins, serif" }} 
          onClick={() => setShowModeOptions(!showModeOptions)}  
          className='bg-[#A02F1F] text-white rounded-lg w-30 h-12 text-lg cursor-pointer'
        >
          Mode
        </button>

        {showModeOptions && (
          <div className='flex flex-col gap-2'>
            <button 
              onClick={() => { setMode("dewasa"); setShowModeOptions(false); }} 
              className='bg-[#D72D27] text-white rounded-lg w-30 h-12 text-lg cursor-pointer'
            >
              Basic
            </button>
            <button 
              onClick={() => { setMode("anak"); setShowModeOptions(false); }} 
              className='bg-[#D72D27] text-white rounded-lg w-30 h-12 text-lg cursor-pointer'
            >
              Anak
            </button>
          </div>
        )}
      </div>

        {/* Hero */}
       <Herobaca />
      <div className=''></div>
      <div>
            <div className='flex justify-center items-center'>
              <h1 style={{ fontFamily: "Inknut Antiqua, serif" }} className='text-[40px] text-[#A02F1F]'>{book.judul}</h1>
             </div>
             <div className='flex justify-center items-center mt-10'>
              <div className=''>
                <img src={book.imageHero} alt="" />
                <button style={{ fontFamily: "Inknut Antiqua, serif" }} className='bg-[#D72D27] text-white w-[190px] h-[60px] rounded-lg text-lg mt-3'>{book.asal}</button>
              </div>
             </div>

            <div className='mt-40'>
                <div className='flex justify-center items-center'>
                  <h1 style={{ fontFamily: "Kapakana, serif"}} className='text-[40px] text-[#A02F1F] '>Selamat Membaca</h1>
                </div>
                
                <div className='mt-20 relative'>
                  {mode ? (
                    book.steps.map((step, idx) => (
                      <div key={idx} className='relative'>
                        <img className='absolute bottom-0 right-0' src="/gambar/ujung-kanan.png" alt="" />
                        <div className='bg-[#D72D27] w-full h-[3px] '></div>
                        <img className='absolute' src="/gambar/ujungatas.png" alt="" />
                        <div style={{ fontFamily: "Inknut Aqua, serif" }} className='absolute px-5 py-5 text-white text-3xl'>{idx + 1}</div>

                        <div className='flex justify-center items-center gap-20 py-20'>
                          <img src={step.gambar[mode]} alt="" />
                          <div className='max-w-[600px]'>
                            <p style={{ fontFamily: "Poppins, serif" }} className='text-[#A02F1F] text-lg text-justify'>{step.isi[mode]}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='flex justify-center items-center'>
                      <h1 style={{ fontFamily: "Poppins, serif" }} className='text-4xl mt-20 text-[#A02F1F] pb-40'>Silahkan Pilih Mode Terlebih Dahulu</h1>
                    </div>
                  )};
                </div>
            <div>

            </div>
            </div>
            {mode && (
              <div>
                  <div className='bg-[#D72D27] w-full h-[3px] '></div>
                  <div className='flex justify-center items-center mt-16'>
                    <div className='flex flex-col justify-center items-center '>
                      <h1 style={{ fontFamily: "Inknut Aqua, serif" }} className='text-[80px] text-[#A02F1F]'>TAMAT</h1>
                      <p style={{ fontFamily: "Inknut Aqua, serif" }} className='text-[#A02F1F] text-[25px] '>Tetap melestarikan cerita asli Indoensia</p>
                      <Link to="/cerita">
                        <button style={{ fontFamily: "Poppins, serif" }} className='text-lg text-white bg-[#D72D27] rounded-lg w-30 h-10 mt-10 cursor-pointer'>Kembali</button>
                      </Link>
                    </div>
                  </div>
              </div>
            )}
          </div>
      </div>
  )
}

export default Bacacerita
