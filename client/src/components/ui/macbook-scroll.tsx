"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
} from "@tabler/icons-react";
import { IconSearch } from "@tabler/icons-react";
import { IconWorld } from "@tabler/icons-react";
import { IconCommand } from "@tabler/icons-react";
import { IconCaretLeftFilled } from "@tabler/icons-react";
import { IconCaretDownFilled } from "@tabler/icons-react";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mapProgress(value: number, from: number, to: number) {
  if (to === from) return 0;
  return Math.min(1, Math.max(0, (value - from) / (to - from)));
}

/**
 * Macbook scroll (Aceternity-style)
 * Wired from: client/src/sections/Hero.tsx
 * - Scroll opens the lid and shows the dashboard on screen
 * - Sticky under the navbar while the tall section scrolls
 * - Fades out before the next section
 */
export const MacbookScroll = ({
  src,
  screen,
  showGradient,
  title,
  badge,
}: {
  src?: string;
  screen?: React.ReactNode;
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportW, setViewportW] = useState(1024);

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      setViewportW(w);
      setIsMobile(w < 768);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const next = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      setProgress(next);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const openT = mapProgress(progress, 0, isMobile ? 0.28 : 0.32);
  // Mobile: keep lid nearly open so the dashboard is readable in the first viewport
  const scaleX = lerp(isMobile ? 1 : 1.15, isMobile ? 1 : 1.08, openT);
  const scaleY = lerp(isMobile ? 1 : 0.62, isMobile ? 1 : 1.05, openT);
  const rotate = isMobile
    ? 0
    : progress < 0.06
      ? -28
      : lerp(-28, 0, mapProgress(progress, 0.06, 0.3));
  const translate = lerp(0, isMobile ? 0 : 8, openT);
  const textOpacity = 1 - mapProgress(progress, 0, isMobile ? 0.22 : 0.16);
  const textY = lerp(0, 36, mapProgress(progress, 0, 0.2));
  const stageOpacity = 1 - mapProgress(progress, isMobile ? 0.5 : 0.58, isMobile ? 0.78 : 0.82);

  // Entire MacBook (lid + keyboard) fits viewport, then slight zoom as one piece
  const frameW = 512;
  const fitScale = Math.min(
    1.15,
    Math.max(0.48, (viewportW - (isMobile ? 40 : 56)) / frameW),
  );
  const zoomT = mapProgress(progress, 0.04, isMobile ? 0.35 : 0.36);
  const scrollZoom = lerp(1, isMobile ? 1.18 : 1.2, zoomT);
  const machineScale = fitScale * (isMobile ? Math.min(scrollZoom, 1.12) : Math.min(scrollZoom, 1.2));
  // Dashboard image larger again (like before); sticky top keeps the full laptop under the nav
  const screenContentScale = lerp(isMobile ? 0.92 : 0.72, isMobile ? 1.05 : 0.86, zoomT);

  // Lid spacer + keyboard height (full device), scaled
  const layoutH = (isMobile ? 500 : 520) * machineScale;
  const titleOpen = textOpacity >= 0.05;

  return (
    <div
      ref={ref}
      className={cn(
        "relative",
        isMobile ? "pb-[22vh]" : "min-h-[118vh]",
      )}
    >
      <div
        className={cn(
          "z-0 flex w-full flex-col items-center",
          isMobile
            ? "relative pt-2 pb-2"
            // Full laptop stop: clear of the h-24 navbar (not only the screen image)
            : "sticky top-36 justify-start pt-6 md:top-40 md:pt-8",
        )}
        style={{
          opacity: stageOpacity,
          visibility: stageOpacity < 0.03 ? "hidden" : "visible",
        }}
      >
        <motion.div
          style={{
            y: textY,
            opacity: textOpacity,
            maxHeight: titleOpen ? (isMobile ? 640 : 280) : 0,
            marginBottom: titleOpen ? undefined : 0,
            overflow: isMobile ? "visible" : "hidden",
          }}
          className={cn(
            "relative z-20 mx-auto w-full max-w-3xl shrink-0 px-5 text-center transition-[max-height,margin] duration-300 md:px-6",
            titleOpen ? (isMobile ? "mb-10" : "mb-6") : "mb-0",
          )}
        >
          {title || (
            <span className="text-3xl font-bold text-neutral-800 md:text-5xl">
              This Macbook is built with Tailwindcss.
            </span>
          )}
        </motion.div>

        <div
          className="relative z-0 mx-auto w-full max-w-full shrink-0 overflow-visible"
          style={{ height: layoutH }}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-0 flex flex-col items-center justify-start [perspective:800px] will-change-transform"
            style={{
              width: frameW,
              marginLeft: -frameW / 2,
              // Scale the whole device (bezel + screen + keyboard) as one unit
              transform: `scale(${machineScale})`,
              transformOrigin: "top center",
            }}
          >
            <Lid
              src={src}
              screen={screen}
              scaleX={scaleX}
              scaleY={scaleY}
              rotate={rotate}
              translate={translate}
              contentScale={screenContentScale}
              compact={isMobile}
            />
            <div
              className={cn(
                "relative -z-10 w-[32rem] overflow-hidden rounded-2xl bg-gray-200 dark:bg-[#272729]",
                isMobile ? "h-[11rem]" : "h-[20rem]",
              )}
            >
              <div className="relative h-10 w-full">
                <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
              </div>
              <div className="relative flex">
                <div className="mx-auto h-full w-[10%] overflow-hidden">
                  <SpeakerGrid />
                </div>
                <div className="mx-auto h-full w-[80%]">
                  <Keypad />
                </div>
                <div className="mx-auto h-full w-[10%] overflow-hidden">
                  <SpeakerGrid />
                </div>
              </div>
              {!isMobile && <Trackpad />}
              <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
              {showGradient && (
                <div className="absolute inset-x-0 bottom-0 z-50 h-40 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black" />
              )}
              {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Lid = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  contentScale = 0.62,
  compact = false,
  src,
  screen,
}: {
  scaleX: number;
  scaleY: number;
  rotate: number;
  translate: number;
  contentScale?: number;
  compact?: boolean;
  src?: string;
  screen?: React.ReactNode;
}) => {
  // Mobile uses a taller in-flow spacer so the absolute screen doesn't sit under the CTAs
  const baseH = compact ? "h-80" : "h-[12rem]";
  const screenH = compact ? "h-[22rem]" : "h-96";

  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: compact
            ? "perspective(800px) rotateX(-8deg) translateZ(0px)"
            : "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className={cn("relative w-[32rem] rounded-2xl bg-[#010101] p-2", baseH)}
      >
        <div
          style={{ boxShadow: "0px 2px #171717 inset" }}
          className="absolute inset-0 rounded-lg bg-[#010101]"
        />
      </div>
      <div
        style={{
          transform: `scaleX(${scaleX}) scaleY(${scaleY}) rotateX(${rotate}deg) translateY(${translate}px)`,
          transformOrigin: "top",
          transformStyle: "preserve-3d",
        }}
        className={cn("absolute inset-0 w-[32rem] rounded-2xl bg-[#010101] p-2", screenH)}
      >
        <div
          className="relative h-full w-full overflow-hidden rounded-lg bg-stone-50"
          style={{ transform: "translateZ(1px)" }}
        >
          {screen ? (
            <div
              className="pointer-events-none absolute left-0 top-0 origin-top-left"
              style={{
                width: `${100 / contentScale}%`,
                height: `${100 / contentScale}%`,
                transform: `scale(${contentScale})`,
              }}
            >
              {React.isValidElement(screen)
                ? React.cloneElement(
                    screen as React.ReactElement<{ compact?: boolean }>,
                    { compact },
                  )
                : screen}
            </div>
          ) : src ? (
            <img
              src={src}
              alt="NexusERP"
              className="absolute inset-0 h-full w-full object-cover object-left-top"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const Trackpad = () => {
  return (
    <div
      className="mx-auto my-1 h-32 w-[40%] rounded-xl"
      style={{
        boxShadow: "0px 1px #00000020 inset",
      }}
    ></div>
  );
};

export const Keypad = () => {
  return (
    <div className="mx-1 h-full [transform:translateZ(0)] rounded-md bg-[#050505] p-1 [will-change:transform]">
      {/* First Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-10 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          esc
        </KBtn>
        <KBtn>
          <IconBrightnessDown className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F1</span>
        </KBtn>
        <KBtn>
          <IconBrightnessUp className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F2</span>
        </KBtn>
        <KBtn>
          <IconTable className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F3</span>
        </KBtn>
        <KBtn>
          <IconSearch className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F4</span>
        </KBtn>
        <KBtn>
          <IconMicrophone className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F5</span>
        </KBtn>
        <KBtn>
          <IconMoon className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F6</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackPrev className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F7</span>
        </KBtn>
        <KBtn>
          <IconPlayerSkipForward className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F8</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackNext className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F8</span>
        </KBtn>
        <KBtn>
          <IconVolume3 className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F10</span>
        </KBtn>
        <KBtn>
          <IconVolume2 className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F11</span>
        </KBtn>
        <KBtn>
          <IconVolume className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F12</span>
        </KBtn>
        <KBtn>
          <div className="h-4 w-4 rounded-full bg-gradient-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px">
            <div className="h-full w-full rounded-full bg-black" />
          </div>
        </KBtn>
      </div>

      {/* Second row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn>
          <span className="block">~</span>
          <span className="mt-1 block">`</span>
        </KBtn>
        <KBtn>
          <span className="block">!</span>
          <span className="block">1</span>
        </KBtn>
        <KBtn>
          <span className="block">@</span>
          <span className="block">2</span>
        </KBtn>
        <KBtn>
          <span className="block">#</span>
          <span className="block">3</span>
        </KBtn>
        <KBtn>
          <span className="block">$</span>
          <span className="block">4</span>
        </KBtn>
        <KBtn>
          <span className="block">%</span>
          <span className="block">5</span>
        </KBtn>
        <KBtn>
          <span className="block">^</span>
          <span className="block">6</span>
        </KBtn>
        <KBtn>
          <span className="block">&</span>
          <span className="block">7</span>
        </KBtn>
        <KBtn>
          <span className="block">*</span>
          <span className="block">8</span>
        </KBtn>
        <KBtn>
          <span className="block">(</span>
          <span className="block">9</span>
        </KBtn>
        <KBtn>
          <span className="block">)</span>
          <span className="block">0</span>
        </KBtn>
        <KBtn>
          <span className="block">&mdash;</span>
          <span className="block">_</span>
        </KBtn>
        <KBtn>
          <span className="block">+</span>
          <span className="block"> = </span>
        </KBtn>
        <KBtn
          className="w-10 items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          delete
        </KBtn>
      </div>

      {/* Third row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-10 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          tab
        </KBtn>
        <KBtn>
          <span className="block">Q</span>
        </KBtn>
        <KBtn>
          <span className="block">W</span>
        </KBtn>
        <KBtn>
          <span className="block">E</span>
        </KBtn>
        <KBtn>
          <span className="block">R</span>
        </KBtn>
        <KBtn>
          <span className="block">T</span>
        </KBtn>
        <KBtn>
          <span className="block">Y</span>
        </KBtn>
        <KBtn>
          <span className="block">U</span>
        </KBtn>
        <KBtn>
          <span className="block">I</span>
        </KBtn>
        <KBtn>
          <span className="block">O</span>
        </KBtn>
        <KBtn>
          <span className="block">P</span>
        </KBtn>
        <KBtn>
          <span className="block">{`{`}</span>
          <span className="block">{`[`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`}`}</span>
          <span className="block">{`]`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`|`}</span>
          <span className="block">{`\\`}</span>
        </KBtn>
      </div>

      {/* Fourth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          caps lock
        </KBtn>
        <KBtn>
          <span className="block">A</span>
        </KBtn>
        <KBtn>
          <span className="block">S</span>
        </KBtn>
        <KBtn>
          <span className="block">D</span>
        </KBtn>
        <KBtn>
          <span className="block">F</span>
        </KBtn>
        <KBtn>
          <span className="block">G</span>
        </KBtn>
        <KBtn>
          <span className="block">H</span>
        </KBtn>
        <KBtn>
          <span className="block">J</span>
        </KBtn>
        <KBtn>
          <span className="block">K</span>
        </KBtn>
        <KBtn>
          <span className="block">L</span>
        </KBtn>
        <KBtn>
          <span className="block">{`:`}</span>
          <span className="block">{`;`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`"`}</span>
          <span className="block">{`'`}</span>
        </KBtn>
        <KBtn
          className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          return
        </KBtn>
      </div>

      {/* Fifth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          shift
        </KBtn>
        <KBtn>
          <span className="block">Z</span>
        </KBtn>
        <KBtn>
          <span className="block">X</span>
        </KBtn>
        <KBtn>
          <span className="block">C</span>
        </KBtn>
        <KBtn>
          <span className="block">V</span>
        </KBtn>
        <KBtn>
          <span className="block">B</span>
        </KBtn>
        <KBtn>
          <span className="block">N</span>
        </KBtn>
        <KBtn>
          <span className="block">M</span>
        </KBtn>
        <KBtn>
          <span className="block">{`<`}</span>
          <span className="block">{`,`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`>`}</span>
          <span className="block">{`.`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`?`}</span>
          <span className="block">{`/`}</span>
        </KBtn>
        <KBtn
          className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          shift
        </KBtn>
      </div>

      {/* sixth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <span className="block">fn</span>
          </div>
          <div className="flex w-full justify-start pl-1">
            <IconWorld className="h-[6px] w-[6px]" />
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <IconChevronUp className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">control</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <KBtn
          className="w-8"
          childrenClassName="h-full justify-between py-[4px]"
        >
          <div className="flex w-full justify-end pr-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="w-[8.2rem]"></KBtn>
        <KBtn
          className="w-8"
          childrenClassName="h-full justify-between py-[4px]"
        >
          <div className="flex w-full justify-start pl-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">
          <KBtn className="h-3 w-6">
            <IconCaretUpFilled className="h-[6px] w-[6px]" />
          </KBtn>
          <div className="flex">
            <KBtn className="h-3 w-6">
              <IconCaretLeftFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretDownFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretRightFilled className="h-[6px] w-[6px]" />
            </KBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export const KBtn = ({
  className,
  children,
  childrenClassName,
  backlit = true,
}: {
  className?: string;
  children?: React.ReactNode;
  childrenClassName?: string;
  backlit?: boolean;
}) => {
  return (
    <div
      className={cn(
        "[transform:translateZ(0)] rounded-[4px] p-[0.5px] [will-change:transform]",
        backlit && "bg-white/[0.2] shadow-xl shadow-white",
      )}
    >
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D]",
          className,
        )}
        style={{
          boxShadow:
            "0px -0.5px 2px 0 #0D0D0F inset, inset",
        }}
      >
        <div
          className={cn(
            "flex w-full flex-col items-center justify-center text-[5px] text-neutral-200",
            childrenClassName,
            backlit && "text-white",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const SpeakerGrid = () => {
  return (
    <div
      className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
      style={{
        backgroundImage:
          "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px",
      }}
    ></div>
  );
};

export const OptionKey = ({ className }: { className: string }) => {
  return (
    <svg
      fill="none"
      version="1.1"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 32"
      className={className}
    >
      <rect
        stroke="currentColor"
        strokeWidth={2}
        x="18"
        y="5"
        width="10"
        height="2"
      />
      <polygon
        stroke="currentColor"
        strokeWidth={2}
        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25"
      />
      <rect
        id="_Transparent_Rectangle_"
        className="st0"
        width="32"
        height="32"
        stroke="none"
      />
    </svg>
  );
};
