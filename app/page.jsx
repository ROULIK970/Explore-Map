import Image from 'next/image'
import styles from './page.module.css'
import Map from './Components/map.jsx'


export default function Home() {
  return (
    <main className='homePage'>
      <Map />
    </main>
  )
}
