"use client";
interface Props { color?: string; size?: number }
export function TYMonogram({ color = "#F5EFE3", size = 24 }: Props) {
  return (
    <svg viewBox="0 0 100 130" fill="none" style={{ width: size, height: size * 1.3 }}>
      <rect x="16" y="0" width="66" height="8" rx="1.5" fill={color}/>
      <rect x="45" y="8" width="9" height="28" fill={color}/>
      <rect x="46" y="34" width="7" height="26" fill={color}/>
      <line x1="49" y1="63" x2="20" y2="80" stroke={color} strokeWidth="8" strokeLinecap="round"/>
      <line x1="51" y1="63" x2="80" y2="82" stroke={color} strokeWidth="7" strokeLinecap="round"/>
      <line x1="24" y1="95" x2="76" y2="95" stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.5"/>
      <line x1="16" y1="104" x2="84" y2="104" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.28"/>
      <line x1="6" y1="113" x2="94" y2="113" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.12"/>
    </svg>
  );
}
