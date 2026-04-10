"use client";
export function CrateLayer({opacity,y,scale}:{opacity:number;y:string;scale:number}) {
  if(opacity<=0)return null;
  return <div className="absolute left-1/2 z-[18]" style={{ top:y, opacity, transform:`translateX(-50%) scale(${scale})` }}>
    <svg width="200" height="130" viewBox="0 0 220 140"><rect x="10" y="20" width="200" height="110" rx="4" fill="#5A4530"/><rect x="10" y="20" width="200" height="110" rx="4" fill="none" stroke="#7A6548" strokeWidth="2"/><line x1="10" y1="55" x2="210" y2="55" stroke="#7A6548" strokeWidth="1.5" opacity=".5"/><line x1="10" y1="90" x2="210" y2="90" stroke="#7A6548" strokeWidth="1.5" opacity=".5"/><text x="110" y="80" textAnchor="middle" fill="#AE8C57" opacity=".4" fontSize="14" fontFamily="serif" letterSpacing="4">TYDENE</text></svg>
  </div>;
}
