import React from 'react';
const LIST = [
  { id:'logo', name:'AI Logo — Basic', desc:'3 concepts, 1 revision. PNG & SVG', price:'$50' },
  { id:'resume', name:'Resume Rewrite', desc:'ATS-optimized resume, 1 revision', price:'$35' },
  { id:'copy', name:'Landing Page Copy', desc:'High-converting 750 words', price:'$80' },
  { id:'art', name:'Character Art', desc:'High-res character portrait (1)', price:'$45' }
];
export default function Services(){
  return (
    <section id="services" className="mt-10">
      <h2 className="text-2xl font-semibold">Services & Pricing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        {LIST.map(s => (
          <div key={s.id} className="bg-white p-4 rounded-lg shadow border border-[#E2E3EA]">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-lg">{s.name}</div>
                <div className="text-sm text-[#6D6D7A]">{s.desc}</div>
              </div>
              <div className="text-lg font-bold">{s.price}</div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 rounded bg-brand-1 text-white">Buy</button>
              <button className="px-4 py-2 rounded border">More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
