import Navbar from './components/Navbar'
import Herocerita from './components/Herocerita'
import Rekomendasi from './components/Rekomendasi'
import Caricerita from './components/Caricerita'
import Footer from './components/Footer'

const Cerita = () => {
  return (
    <main className='h-[2000px]'>
        <Navbar />
        <Herocerita />
        <Rekomendasi />
        <Caricerita />
        <Footer />
    </main>
  )
}

export default Cerita
