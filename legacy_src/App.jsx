import React from 'react';
import { Helmet } from 'react-helmet';
import Header from './components/Header.jsx';
import Services from './components/Services.jsx';
import Portfolio from './components/Portfolio.jsx';
import Testimonials from './components/Testimonials.jsx';
import Footer from './components/Footer.jsx';

export default function App(){
  return (
    <div className="min-h-screen bg-[#F5F6FA] text-[#2E2E3A]">
      <Helmet>
        <title>AI-Powered Services — Fast AI Creative & Productivity Services</title>
        <meta name="description" content="AI-powered logos, resumes, copywriting, and character art. Fast turnaround." />
      </Helmet>
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <section className="mt-6">
          <div className="bg-white rounded-xl p-8 shadow border border-[#E2E3EA]">
            <h1 className="text-4xl font-bold">Transform your brand with AI</h1>
            <p className="mt-3 text-gray-600">Affordable AI-powered logos, resumes, landing page copy, and character art — delivered fast.</p>
            <div className="mt-6 flex gap-4">
              <a href="#services" className="px-5 py-3 rounded bg-brand-1 text-white">View Pricing</a>
              <a href="#contact" className="px-5 py-3 rounded border">Contact Us</a>
            </div>
          </div>
        </section>

        <Services />
        <Portfolio />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
