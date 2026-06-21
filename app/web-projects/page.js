import Link from 'next/link';

export default function WebProjects() {
  return (
    <main className="bg-black text-white min-h-screen p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">Web Projects</h1>
        <p className="text-gray-400 text-lg mb-8">
          A collection of my interactive 3D Spline experiences, classic frontend builds, and funky-creative demos.
        </p>
        <div className="border border-white/10 rounded-xl p-8 bg-black/40 backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-4">Project Gallery</h2>
          <p className="text-gray-500 italic">Gallery coming soon...</p>
        </div>
        <Link href="/" className="inline-block mt-8 text-blue-400 hover:text-blue-300">
          &larr; Back to Ecosystem
        </Link>
      </div>
    </main>
  );
}
