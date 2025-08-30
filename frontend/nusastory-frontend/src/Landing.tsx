import Book from './components/Book'
import Fitur from './components/Fitur'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Kontak from './components/Kontak'
import Navbar from './components/Navbar'
import Rekomendasi from './components/Rekomendasi'

const Landing = () => {
  return (
    <main className=''>
      <Navbar />
      <Hero />
      <Book />
      <Rekomendasi />
      <Fitur />
      <Kontak />
      <Footer />
    </main>
  )
}

export default Landing
