import RecoWidget from '../components/RecoWidget'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const Recomendasi = () => {
  return (
    <section className='w-screen h-screen bg-white overflow-x-hidden'>
      <div className='flex justify-between mt-10 mx-10'>
        <Link to="/"  className='text-2xl font-bold  cursor-pointer w-[130px] flex items-center gap-3 '><ArrowLeft /> Back</Link>
        <img src="/img/logo3.png" className='h-[74px] w-auto' alt="" />
      </div>
      <div className='mx-80 pt-40'>
      <RecoWidget />
    </div>
    </section>
  )
}

export default Recomendasi
