import Navbar from './components/Navbar'
import Herocerita from './components/Herocerita'
import Rekomendasi from './components/Rekomendasi'
import Caricerita from './components/Caricerita'
import Footer from './components/Footer'
import AudioBookPlayer from './components/AudioBookPlayer'

const Cerita = () => {
  return (
    <main className='h-[2000px]'>
        <Navbar />
        <Herocerita />
        <Rekomendasi />
        <Caricerita />
        <AudioBookPlayer />
        <Footer />
    </main>
  )
}

export default Cerita
