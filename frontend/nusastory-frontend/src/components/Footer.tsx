import "@fontsource/poppins/300.css";
import "@fontsource/inknut-antiqua/300.css";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className='mt-20 md:mt-60 relative'>
      <div className="absolute z-30 bottom-0 left-0 w-full h-[150px] md:h-[200px] bg-[#D72D27] rounded-t-[30px] md:rounded-t-[56px]"></div>
      <img className='absolute bottom-0 w-full z-40' src="/gambar/batik-footer.png" alt="" />
      <div className="absolute z-40 bottom-0 left-0 w-full h-[120px] md:h-[170px] bg-gradient-to-b from-[#A02F1F]/0 via-[#A02F1F]/100 to-[#A02F1F]"></div>
      <div className='flex justify-center px-4 md:px-0'>
        <div className='bg-white z-40 rounded-2xl w-full max-w-[1000px] py-8 md:py-12 shadow-[0_4px_6px_0_rgba(0,0,0,0.1),0_-4px_6px_0_rgba(0,0,0,0.1)]'>
          <div className='flex flex-col md:flex-row mx-6 md:mx-20 justify-between gap-8 md:gap-0'>
            {/* Footer Left */}
            <div className='max-w-100'>
              <div className='flex items-end justify-center md:justify-start'>
                <img src="/gambar/Logo.png" alt="" />
                <p style={{ fontFamily: "Inknut Antiqua, serif",}} className="text-[13px] text-[#825D00] mb-2">
                  Nusantara<br />Story
                </p>
              </div>
              <p style={{ fontFamily: "Poppins, serif" }} className='font-light mt-6 md:mt-10 text-center md:text-left'>Nusantara Story, tempat kamu membaca dan membuat serta melestarikan cerita rakyat Indonesia</p>
              <div className="flex space-x-4 text-xl md:text-2xl text-gray-600 mt-5 justify-center md:justify-start">
                <FaFacebook className="hover:text-blue-600 cursor-pointer" />
                <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                <FaYoutube className="hover:text-red-600 cursor-pointer" />
                <FaTwitter className="hover:text-sky-500 cursor-pointer" />
              </div>
            </div>
            {/* Footer Right */}
            <div className='mt-6 md:mt-0'>
              <h1 style={{ fontFamily: "Poppins, serif" }} className='text-[18px] text-center md:text-left'>Quick Links</h1>
              <div style={{ fontFamily: "Poppins, serif" }} className="space-y-2 text-gray-700 mt-5">
                <div className='flex flex-col md:flex-row justify-center md:justify-start'>
                  <div className="flex items-center space-x-2 cursor-pointer justify-center md:justify-start">
                    <FaChevronRight size={14} />
                    <span>Home</span>
                  </div>

                  <div className="flex items-center space-x-2 cursor-pointer md:ml-8 justify-center md:justify-start mt-2 md:mt-0">
                    <FaChevronRight size={14} />
                    <span>Information</span>
                  </div>
                </div>

                <div className='flex flex-col md:flex-row justify-center md:justify-start'>
                  <div className="flex items-center space-x-2 cursor-pointer justify-center md:justify-start">
                    <FaChevronRight size={14} />
                    <span>About</span>
                  </div>

                  <div className="flex items-center space-x-2 cursor-pointer md:ml-8 justify-center md:justify-start mt-2 md:mt-0">
                    <FaChevronRight size={14} />
                    <span>Quiz</span>
                  </div>
                </div>
              </div>
              <h1 style={{ fontFamily: "Poppins, serif" }} className='text-[18px] mt-8 text-center md:text-left'>Contact Us</h1>
              <div className="space-y-4 text-gray-700 mt-5">
                {/* WhatsApp */}
                <div className="flex items-center space-x-3 justify-center md:justify-start">
                  <FaWhatsapp size={22} className="text-gray-700" />
                  <span>+764-887-904</span>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3 justify-center md:justify-start">
                  <MdEmail size={22} className="text-gray-700" />
                  <span>NusantaraStory@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className='mx-6 md:mx-15'>
            <div className='bg-black h-[1px] mt-7 my-5'></div>
            <div className='flex flex-col md:flex-row justify-center md:justify-around items-center gap-4 md:gap-0 mt-2 md:mt-6'>
              <div>
                <p style={{ fontFamily: "Poppins, serif" }} className='font-light text-center'>Copyrigth 2024 Mingers. All rights reserved</p>
              </div>
              <div className='flex flex-col md:flex-row gap-3 md:gap-5 items-center'>
                <div>
                  <p style={{ fontFamily: "Poppins, serif" }} className='font-light'>Term Of Service</p>
                </div>
                <div>
                  <p style={{ fontFamily: "Poppins, serif" }} className='font-light'>Privecy Policy</p>
                </div>
                <div>
                  <p style={{ fontFamily: "Poppins, serif" }} className='font-light'>Cookies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
