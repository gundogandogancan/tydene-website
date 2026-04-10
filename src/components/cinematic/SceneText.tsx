"use client";

interface Props {
  eyebrow: string;
  headline: string;
  subtext: string;
  active: boolean;
}

/**
 * SceneText — Editorial text overlay for each cinematic stage.
 * Controlled opacity/position from the scroll engine.
 * Premium typography with intentional spacing rhythm.
 */
export function SceneText({ eyebrow, headline, subtext, active }: Props) {
  return (
    <div
      className="absolute left-[5.5%] md:left-[6%] top-[28%] md:top-[30%] max-w-[85%] md:max-w-[42%] z-20 pointer-events-none"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Eyebrow + rule */}
      <div className="flex flex-col gap-3 mb-7">
        <span className="font-sans text-[10px] md:text-[11px] font-medium tracking-[0.3em] uppercase text-[#AE8C57]">
          {eyebrow}
        </span>
        <div className="w-10 h-[1.5px] rounded-full bg-[#AE8C57]/60" />
      </div>

      {/* Headline — large serif, cinematic weight */}
      <h2 className="font-serif text-[clamp(1.75rem,4.5vw,3.5rem)] font-bold leading-[1.06] tracking-[-0.01em] whitespace-pre-line text-[#F5EFE3]">
        {headline}
      </h2>

      {/* Subtext — editorial body */}
      <p className="font-sans text-[13px] md:text-[15px] leading-[1.75] mt-5 md:mt-6 whitespace-pre-line text-[#F5EFE3]/55 max-w-[360px]">
        {subtext}
      </p>
    </div>
  );
}
