"use client";
function Leaf({ style, size, blur, delay, dur }: any) {
  return <div style={{ position:"absolute", width:size, height:size*1.4, transformOrigin:"50% 0%", pointerEvents:"none", filter:blur?`blur(${blur}px)`:"none", animation:`leafSway ${dur}s ease-in-out ${delay}s infinite alternate, leafDrift ${dur*1.3}s ease-in-out ${delay}s infinite alternate`, ...style }}>
    <svg viewBox="0 0 80 112" fill="none" className="w-full h-full"><path d="M40 4C20 20 6 50 10 80C14 95 25 108 40 110C55 108 66 95 70 80C74 50 60 20 40 4Z" fill="#2D5A1E" opacity=".75"/><path d="M40 10V100" stroke="#1A3A10" strokeWidth="1.5" opacity=".4"/></svg>
  </div>;
}
export function LeavesLayer({ opacity, translateX }: { opacity: number; translateX: number }) {
  return <div className="absolute inset-0" style={{ opacity, transform:`translateX(${translateX}px)` }}>
    <Leaf style={{top:"10%",left:"15%",opacity:.4}} size={120} blur={4} delay={0} dur={6}/>
    <Leaf style={{top:"25%",right:"10%",opacity:.35}} size={140} blur={5} delay={1.2} dur={7}/>
    <Leaf style={{bottom:"20%",left:"8%",opacity:.3}} size={110} blur={4} delay={2.5} dur={5.5}/>
    <Leaf style={{top:"15%",left:"35%",opacity:.55}} size={90} blur={1.5} delay={.5} dur={4.5}/>
    <Leaf style={{top:"45%",right:"25%",opacity:.5}} size={85} blur={1} delay={1.8} dur={5}/>
    <Leaf style={{top:"5%",left:"55%",opacity:.65}} size={65} blur={0} delay={.3} dur={3.5}/>
    <Leaf style={{bottom:"15%",right:"15%",opacity:.6}} size={55} blur={0} delay={1} dur={3}/>
  </div>;
}
