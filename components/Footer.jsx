import React from 'react';
export default function Footer(){
  return (
    <footer className="mt-12 bg-white border-t border-[#E2E3EA]">
      <div className="max-w-6xl mx-auto p-6 text-sm text-[#6D6D7A] flex justify-between">
        <div>© {new Date().getFullYear()} AI-Powered Services</div>
        <div>Built with care • <a href="#" className="underline">Privacy</a></div>
      </div>
    </footer>
  );
}
