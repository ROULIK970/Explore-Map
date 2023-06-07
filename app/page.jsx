import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('./Components/map'), { ssr: false });

export default function Home() {
  return (
    <main className='homePage'>
      <MapWithNoSSR />
    </main>
  );
}
