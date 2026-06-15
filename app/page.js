import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col">
        <h1 className="text-4xl font-bold mb-8">Surakshith's Portfolio Ecosystem</h1>
        <p className="text-xl mb-12 text-center text-gray-400 max-w-2xl">
          Network Engineer, Software Developer, and Web Developer specialized in DevOps, MLOps, and AIOps.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="border border-white/10 p-8 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">DevOps & Automation</h2>
            <p className="text-gray-400 mb-6">High-value technical tutorials on Proxmox, Argo CD, and Homelab clusters.</p>
            <span className="text-sm text-gray-500 italic">Coming Soon</span>
          </div>
          
          <Link 
            href="/web-projects/interactive-3d/3d-remote-product-marketing-page"
            className="border border-white/20 p-8 rounded-xl bg-white/5 hover:bg-white/20 transition-all group"
          >
            <h2 className="text-2xl font-semibold mb-4 text-purple-400 group-hover:text-purple-300 transition-colors">Web Projects</h2>
            <p className="text-gray-400 mb-6">Interactive 3D experiences and modern web applications.</p>
            <div className="flex items-center text-purple-400 group-hover:translate-x-2 transition-transform">
              <span>View Demo</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
