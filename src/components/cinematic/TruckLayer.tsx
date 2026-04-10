"use client";
export function TruckLayer({opacity,x,roadOpacity,roadX}:{opacity:number;x:string;roadOpacity:number;roadX:string}) {
  if(opacity<=0&&roadOpacity<=0)return null;
  return <>
    <div className="absolute bottom-[25%] z-[18]" style={{left:x,opacity}}>
      <svg width="180" height="90" viewBox="0 0 200 100"><rect x="0" y="10" width="140" height="65" rx="4" fill="#E8E0D4"/><rect x="140" y="25" width="55" height="50" rx="3" fill="#D4CCC0"/><rect x="145" y="32" width="30" height="22" rx="2" fill="#8EAAC4" opacity=".6"/><circle cx="35" cy="80" r="12" fill="#333"/><circle cx="35" cy="80" r="6" fill="#555"/><circle cx="115" cy="80" r="12" fill="#333"/><circle cx="115" cy="80" r="6" fill="#555"/><circle cx="170" cy="80" r="10" fill="#333"/><circle cx="170" cy="80" r="5" fill="#555"/><text x="70" y="48" textAnchor="middle" fill="#183C2E" opacity=".25" fontSize="10" fontFamily="serif" letterSpacing="3">TYDENE</text></svg>
    </div>
    <div className="absolute bottom-[18%] h-[3px] w-[400%] z-[15] flex gap-5" style={{left:roadX,opacity:roadOpacity}}>
      {Array.from({length:30}).map((_,i)=><div key={i} className="w-[30px] h-full rounded-sm flex-shrink-0 bg-[#F5EFE3]/[0.15]"/>)}
    </div>
  </>;
}
