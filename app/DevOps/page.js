import Link from 'next/link';

export default function DevOps() {
  return (
    <main className="bg-black text-white min-h-screen p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-emerald-400 mb-6">DevOps & Homelab</h1>
        <p className="text-gray-400 text-lg mb-8">
          Welcome to my infrastructure hub. Here you'll find deep dives into Proxmox, Kubernetes (K3s), Argo CD, and my AIOps automations.
        </p>
        <div className="border border-white/10 rounded-xl p-8 bg-black/40 backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-4">Latest Articles</h2>
          <p className="text-gray-500 italic">Content coming soon...</p>
        </div>
        <Link href="/" className="inline-block mt-8 text-emerald-400 hover:text-emerald-300">
          &larr; Back to Ecosystem
        </Link>
      </div>
    </main>
  );
}
