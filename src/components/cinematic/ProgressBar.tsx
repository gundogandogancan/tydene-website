"use client";
export function ProgressBar({ progress }: { progress: number }) {
  return <div className="fixed top-0 left-0 h-[2px] z-[200]" style={{ width: `${progress*100}%`, background: "linear-gradient(90deg,#AE8C57,#C43520)" }}/>;
}
