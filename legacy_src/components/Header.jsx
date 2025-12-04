import React from 'react';
import logo from '/logo.png';
export default function Header(){
  return (
    <header className="bg-gradient-to-r from-brand-2 to-brand-3 p-6 text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={logo} alt="AI-Powered Services" className="w-16 h-16 rounded-lg shadow" />
          <div>
            <div className="font-bold text-xl">AI-Powered Services</div>
            <div className="text-sm opacity-90">Fast AI creative & productivity services</div>
          </div>
        </div>
        <nav className="flex gap-4">
          <a href="#services" className="hover:underline">Services</a>
          <a href="#portfolio" className="hover:underline">Portfolio</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </div>
    </header>
  );
}
