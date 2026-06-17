# SurakshithDT - Web Ecosystem & Portfolio

Welcome to the source code of my centralized web ecosystem. This repository serves as a public-facing portfolio, an interactive 3D showcase, and the frontend hub for my DevOps, MLOps, and automation projects.

Live Site: **[surakshithdt.vercel.app](https://surakshithd.vercel.app)** *(Link will be active post-deployment)*

---

## 🎯 Project Vision

This is not a simple static site; it is a systematic ecosystem built to:
1. **Showcase Expertise:** Demonstrate skills in Network Engineering, DevOps, and advanced Web Development.
2. **Drive Organic Traffic:** House high-value technical tutorials (Proxmox, Argo CD) and tech blogs optimized for SEO.
3. **Convert:** Act as a centralized funnel linking to my freelance services (Fiverr) and advanced scripts (Gumroad).
4. **Push Technical Boundaries:** Seamlessly integrate interactive 3D experiences without sacrificing Core Web Vitals or SEO.

## 🏗️ Architecture & Zero-Cost Infrastructure

A core philosophy of this project is achieving enterprise-grade architecture using a **$0 infrastructure overhead**.

*   **Frontend Hosting (Public Edge):** Deployed globally via **Vercel (Hobby Tier)**. A full CI/CD pipeline ensures every commit to the `main` branch is built and deployed automatically.
*   **Backend Hosting (The Homelab):** Heavy ML models, AIOps proofs of concept, and the FastAPI backend run locally on a **K3s/Proxmox Kubernetes cluster**. Managed via **Argo CD**.
*   **The Bridge (Cloudflare Tunnels):** Secure `cloudflared` tunnels connect the public Vercel Next.js edge directly to the local Kubernetes pods, completely bypassing traditional NAT/firewall port-forwarding issues.

## 🛠️ Core Tech Stack

*   **Framework:** Next.js (App Router)
*   **3D Engine:** Spline (`@splinetool/react-spline`) - Heavily optimized `.glb` assets (decimated to <5MB).
*   **Animation:** GSAP (ScrollTrigger) - Used for complex scroll-scrubbing, canvas animations, and synchronizing Spline state-change tripwires.
*   **Content:** MDX (Markdown + JSX) for SSG blogs.
*   **Backend Integration:** Containerized FastAPI via Cloudflare Tunnels.

## 🚀 Key Technical Highlights

### 1. SEO-Safe 3D Implementations
Strictly avoiding "No-Code" builders that break SSR. All critical text content is rendered as standard React HTML DOM overlaid on top of the 3D canvases. Spline 3D text is avoided to ensure 100% search engine indexability.

### 2. Scroll-Driven 3D Effects
Utilizing GSAP and `position: fixed` to pin scenes. Complex nested layer hierarchies in Spline coordinate with GSAP scroll velocity to transition seamlessly between linear scroll animations and infinite looping resting states.

### 3. "Video-to-Canvas" Scrubbing (Upcoming)
For immersive homestay tours, bypassing heavy Gaussian Splats in favor of extracting 4K walkthrough videos into JPEG sequences via FFmpeg. These are scrubbed on an HTML5 canvas via GSAP and overlaid with interactive Spline elements (e.g., interactive appliances in paused frames) using React `z-index` layering.

## 📂 Project Structure (App Router)

The site structure is consolidated under a single domain to maximize domain authority:

*   `/` - The Main Hub (Landing page, interactive 3D profile).
*   `/DevOps` - Technical blogs, K8s demos, and homelab tutorials.
*   `/web-projects` - Live demos of complex frontend builds (Interactive 3D, creative landing pages).
*   `/services` - Direct access to freelance offerings and Gumroad.

## 👨‍💻 About Me (Surakshith DT)

I am a **Network Engineer, Full-Stack Web Developer, and UI/UX Designer**. While I have a strong foundation in building visually stunning, high-performance web applications, my current focus and deep expertise lie in **DevOps, MLOps, AIOps, and intelligent automation**.

I build robust, enterprise-grade architectures that bridge edge computing with local infrastructure, combining backend reliability with cutting-edge frontend design.

*   **Freelance Services:** I offer professional services via Fiverr for complex deployments, automation, and full-stack development.
*   **Knowledge Sharing:** I actively document my homelab experiments, Kubernetes setups, and development workflows through technical tutorials and blogs.

---
*Built with precision to act as the bridge between Edge Computing and Local Infrastructure.*
