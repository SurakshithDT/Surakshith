import Link from 'next/link';
import ScrollVideo from '../components/ScrollVideo';
import HeroSequence from '../components/HeroSequence';

export default function Home() {
  return (
    <main className="bg-black text-white w-full min-h-screen font-sans">
      <ScrollVideo>
        <section className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen px-4">
          <HeroSequence />
        </section>
      </ScrollVideo>
    </main>
  );
}
