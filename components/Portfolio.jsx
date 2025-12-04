import React from 'react';
export default function Portfolio(){
  return (
    <section id="portfolio" className="mt-10">
      <h2 className="text-2xl font-semibold">Portfolio</h2>
      <p className="text-sm text-[#6D6D7A] mt-2">Sample outputs and before/after examples.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <div className="bg-white rounded-lg p-4 shadow border border-[#E2E3EA]">Sample Logo</div>
        <div className="bg-white rounded-lg p-4 shadow border border-[#E2E3EA]">Sample Resume</div>
        <div className="bg-white rounded-lg p-4 shadow border border-[#E2E3EA]">Sample Art</div>
      </div>
    </section>
  );
}
