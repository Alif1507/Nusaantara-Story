import Navbar from './components/Navbar'
import Herocerita from './components/Herocerita'
import Rekomendasi from './components/Rekomendasi'
import Caricerita from './components/Caricerita'

const Cerita = () => {
  return (
    <main className='h-[2000px]'>
        <Navbar />
        <Herocerita />
        <Rekomendasi />
        <Caricerita />
    </main>
  )
}

export default Cerita
