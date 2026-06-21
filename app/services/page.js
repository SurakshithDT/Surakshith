import Link from 'next/link';

export default function Services() {
  return (
    <main className="bg-black text-white min-h-screen p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-400 mb-6">Services & Gigs</h1>
        <p className="text-gray-400 text-lg mb-8">
          Need freelance engineering? I offer specialized services via Fiverr and premium automation scripts on Gumroad.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-white/10 rounded-xl p-8 bg-black/40 backdrop-blur-md">
            <h2 className="text-2xl font-semibold mb-4">Fiverr Gigs</h2>
            <p className="text-gray-500 italic">Gigs loading...</p>
          </div>
          <div className="border border-white/10 rounded-xl p-8 bg-black/40 backdrop-blur-md">
            <h2 className="text-2xl font-semibold mb-4">Gumroad Scripts</h2>
            <p className="text-gray-500 italic">Store loading...</p>
          </div>
        </div>
        <Link href="/" className="inline-block mt-8 text-indigo-400 hover:text-indigo-300">
          &larr; Back to Ecosystem
        </Link>
      </div>
    </main>
  );
}
