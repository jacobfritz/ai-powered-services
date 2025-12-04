import React from 'react';
const T = [
  {name:'S. Miller', text:'Fast and professional — my logo looks great.'},
  {name:'J. Lee', text:'Resume helped me land interviews.'}
];
export default function Testimonials(){
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {T.map((t,i)=>(
          <div key={i} className="bg-white p-4 rounded-lg shadow border border-[#E2E3EA]">
            <div className="text-sm text-[#6D6D7A]">{t.text}</div>
            <div className="mt-3 font-medium">— {t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
