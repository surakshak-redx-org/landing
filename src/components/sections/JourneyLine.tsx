'use client';

import {
  motion,
  useTransform,
  type MotionValue,
} from 'framer-motion';

export interface JourneyRoadmapProps {
  scrollProgress: MotionValue<number>;
  prefersReducedMotion: boolean | null;
  totalChapters?: number;
}

export function JourneyRoadmap({
  scrollProgress,
  prefersReducedMotion,
  totalChapters = 8,
}: JourneyRoadmapProps): React.JSX.Element {
  const linePathLength = prefersReducedMotion ? 1 : scrollProgress;
  const headX = useTransform(scrollProgress, [0, 1], [28, 692]);
  const headOpacity = useTransform(scrollProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 1]);

  const handleNodeClick = (chapterIndex: number): void => {
    const el = document.getElementById(`chapter-${chapterIndex + 1}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div
      aria-label="Chapter Journey Progress"
      className="mx-auto mt-6 w-full max-w-2xl px-2 sm:px-4"
    >
      <div className="flex items-center justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#7954A5]/15 bg-white/80 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#7954A5] shadow-xs backdrop-blur-xs">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C16B9B]"
          />
          Interactive Journey · 8 Chapters
        </span>
      </div>

      <div className="relative mt-4">
        <svg
          viewBox="0 0 720 54"
          fill="none"
          className="h-12 w-full overflow-visible sm:h-14"
        >
          <defs>
            <linearGradient
              id="roadmap-line-grad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#7954A5" />
              <stop offset="50%" stopColor="#C16B9B" />
              <stop offset="100%" stopColor="#A34E83" />
            </linearGradient>

            <filter id="roadmap-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background dashed guide track */}
          <line
            x1="28"
            y1="22"
            x2="692"
            y2="22"
            stroke="#E9DFEF"
            strokeWidth="2"
            strokeDasharray="4 5"
            strokeLinecap="round"
          />

          {/* Active SVG journey line drawing with scroll percentage */}
          <motion.path
            d="M 28 22 L 692 22"
            stroke="url(#roadmap-line-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: linePathLength }}
          />

          {/* Traveling beacon head tracking scroll position */}
          {!prefersReducedMotion && (
            <motion.g style={{ opacity: headOpacity }}>
              <motion.circle
                cx={headX}
                cy="22"
                r="9"
                fill="#C16B9B"
                className="opacity-40 blur-[2px]"
              />
              <motion.circle
                cx={headX}
                cy="22"
                r="4.5"
                fill="#C16B9B"
              />
              <motion.circle
                cx={headX}
                cy="22"
                r="1.75"
                fill="#FFFFFF"
              />
            </motion.g>
          )}

          {/* 8 Chapter Milestone Nodes */}
          {Array.from({ length: totalChapters }, (_, i) => {
            const nodeX = 28 + (i / (totalChapters - 1)) * 664;
            const threshold = i / (totalChapters - 1);
            return (
              <RoadmapNode
                key={i}
                index={i}
                nodeX={nodeX}
                threshold={threshold}
                scrollProgress={scrollProgress}
                prefersReducedMotion={prefersReducedMotion}
                onClick={() => handleNodeClick(i)}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

interface RoadmapNodeProps {
  index: number;
  nodeX: number;
  threshold: number;
  scrollProgress: MotionValue<number>;
  prefersReducedMotion: boolean | null;
  onClick: () => void;
}

function RoadmapNode({
  index,
  nodeX,
  threshold,
  scrollProgress,
  prefersReducedMotion,
  onClick,
}: RoadmapNodeProps): React.JSX.Element {
  const isReached = useTransform(scrollProgress, (value) => value >= threshold - 0.03);
  const ringOpacity = useTransform(scrollProgress, [threshold - 0.03, threshold], [0, 0.7], {
    clamp: true,
  });

  const chapterNum = String(index + 1).padStart(2, '0');

  return (
    <g
      onClick={onClick}
      className="cursor-pointer group focus-visible:outline-none"
      role="button"
      tabIndex={0}
      aria-label={`Jump to Chapter ${chapterNum}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Outer subtle glow ring when passed */}
      {!prefersReducedMotion && (
        <motion.circle
          cx={nodeX}
          cy="22"
          r="8"
          fill="#C16B9B"
          style={{ opacity: ringOpacity }}
          className="blur-[1.5px]"
        />
      )}

      {/* Main node dot */}
      <circle
        cx={nodeX}
        cy="22"
        r="4.5"
        fill="#FFFFFF"
        stroke="#7954A5"
        strokeWidth="2"
        className="transition-all duration-300 group-hover:scale-125 group-hover:stroke-[#C16B9B]"
      />

      {/* Inner filled dot */}
      <circle
        cx={nodeX}
        cy="22"
        r="2"
        fill="#7954A5"
        className="transition-colors duration-300 group-hover:fill-[#C16B9B]"
      />

      {/* Chapter index label */}
      <text
        x={nodeX}
        y="42"
        textAnchor="middle"
        className="fill-[#796B86] text-[10px] font-bold tracking-wider group-hover:fill-[#7954A5] transition-colors select-none"
      >
        {chapterNum}
      </text>
    </g>
  );
}

export interface JourneyConnectorProps {
  index: number;
  isReversed: boolean;
  prefersReducedMotion: boolean | null;
  scrollProgress: MotionValue<number>;
}

// 7 segments corresponding to the journey steps between the 8 chapters
const SEGMENTS: [number, number][] = [
  [0.00, 0.16], // Ch 1 -> Ch 2
  [0.14, 0.30], // Ch 2 -> Ch 3
  [0.28, 0.44], // Ch 3 -> Ch 4
  [0.42, 0.58], // Ch 4 -> Ch 5
  [0.56, 0.72], // Ch 5 -> Ch 6
  [0.70, 0.86], // Ch 6 -> Ch 7
  [0.84, 1.00], // Ch 7 -> Ch 8
];

export function JourneyConnector({
  index,
  isReversed,
  prefersReducedMotion,
  scrollProgress,
}: JourneyConnectorProps): React.JSX.Element {
  const [start, end] = SEGMENTS[index] ?? [0, 1];

  const connectorProgress = useTransform(scrollProgress, [start, end], [0, 1], {
    clamp: true,
  });

  const arrivalPulse = useTransform(connectorProgress, [0.85, 1], [0, 1], {
    clamp: true,
  });

  const nodeScale = useTransform(connectorProgress, [0.8, 1], [0.6, 1], {
    clamp: true,
  });

  const lineOpacity = useTransform(connectorProgress, [0, 0.05], [0.25, 1], {
    clamp: true,
  });

  const pathLength = prefersReducedMotion ? 1 : connectorProgress;

  return (
    <>
      {/* Desktop connector: Left card -> Right card */}
      {!isReversed && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-14 top-1/2 z-20 hidden w-14 lg:block"
        >
          <svg
            viewBox="0 0 56 64"
            fill="none"
            className="h-16 w-14 overflow-visible"
          >
            <defs>
              <linearGradient
                id={`connector-lr-${index}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#7954A5" />
                <stop offset="50%" stopColor="#C16B9B" />
                <stop offset="100%" stopColor="#A34E83" />
              </linearGradient>
            </defs>

            {/* Base dashed guide line */}
            <path
              d="M 0 0 C 28 0, 28 64, 56 64"
              stroke="#E9DFEF"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeLinecap="round"
            />

            {/* Active animated journey line */}
            <motion.path
              d="M 0 0 C 28 0, 28 64, 56 64"
              stroke={`url(#connector-lr-${index})`}
              strokeWidth="2.75"
              strokeLinecap="round"
              style={{
                pathLength,
                opacity: lineOpacity,
              }}
            />

            {/* Origin waypoint dot */}
            <circle cx="0" cy="0" r="4" fill="#7954A5" />
            <circle cx="0" cy="0" r="1.75" fill="#FFFFFF" />

            {/* Destination arrival beacon */}
            <motion.circle
              cx="56"
              cy="64"
              r="9"
              fill="#C16B9B"
              style={{
                opacity: useTransform(arrivalPulse, [0, 1], [0, 0.5]),
              }}
              className="blur-[2px]"
            />
            <motion.circle
              cx="56"
              cy="64"
              r="4"
              fill="#C16B9B"
              style={{ scale: prefersReducedMotion ? 1 : nodeScale }}
            />
            <circle cx="56" cy="64" r="1.75" fill="#FFFFFF" />
          </svg>
        </div>
      )}

      {/* Desktop connector: Right card -> Next Left card */}
      {isReversed && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-14 z-20 hidden h-16 w-14 lg:block"
        >
          <svg
            viewBox="0 0 56 64"
            fill="none"
            className="h-full w-full overflow-visible"
          >
            <defs>
              <linearGradient
                id={`connector-rl-${index}`}
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#A34E83" />
                <stop offset="50%" stopColor="#C16B9B" />
                <stop offset="100%" stopColor="#7954A5" />
              </linearGradient>
            </defs>

            {/* Base dashed guide line */}
            <path
              d="M 56 0 C 28 0, 28 64, 0 64"
              stroke="#E9DFEF"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeLinecap="round"
            />

            {/* Active animated journey line */}
            <motion.path
              d="M 56 0 C 28 0, 28 64, 0 64"
              stroke={`url(#connector-rl-${index})`}
              strokeWidth="2.75"
              strokeLinecap="round"
              style={{
                pathLength,
                opacity: lineOpacity,
              }}
            />

            {/* Origin waypoint dot */}
            <circle cx="56" cy="0" r="4" fill="#A34E83" />
            <circle cx="56" cy="0" r="1.75" fill="#FFFFFF" />

            {/* Destination arrival beacon */}
            <motion.circle
              cx="0"
              cy="64"
              r="9"
              fill="#7954A5"
              style={{
                opacity: useTransform(arrivalPulse, [0, 1], [0, 0.5]),
              }}
              className="blur-[2px]"
            />
            <motion.circle
              cx="0"
              cy="64"
              r="4"
              fill="#7954A5"
              style={{ scale: prefersReducedMotion ? 1 : nodeScale }}
            />
            <circle cx="0" cy="64" r="1.75" fill="#FFFFFF" />
          </svg>
        </div>
      )}

      {/* Mobile / Tablet vertical connector */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-1/2 z-20 flex h-8 w-8 -translate-x-1/2 items-center justify-center lg:hidden"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="h-8 w-8 overflow-visible"
        >
          <defs>
            <linearGradient
              id={`connector-m-${index}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#7954A5" />
              <stop offset="100%" stopColor="#C16B9B" />
            </linearGradient>
          </defs>

          {/* Base dashed guide line */}
          <path
            d="M 16 0 L 16 32"
            stroke="#E9DFEF"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />

          {/* Active animated journey line */}
          <motion.path
            d="M 16 0 L 16 32"
            stroke={`url(#connector-m-${index})`}
            strokeWidth="2.75"
            strokeLinecap="round"
            style={{
              pathLength,
              opacity: lineOpacity,
            }}
          />

          {/* Origin waypoint dot */}
          <circle cx="16" cy="0" r="3.5" fill="#7954A5" />
          <circle cx="16" cy="0" r="1.5" fill="#FFFFFF" />

          {/* Destination arrival beacon */}
          <motion.circle
            cx="16"
            cy="32"
            r="7"
            fill="#C16B9B"
            style={{
              opacity: useTransform(arrivalPulse, [0, 1], [0, 0.5]),
            }}
            className="blur-[2px]"
          />
          <motion.circle
            cx="16"
            cy="32"
            r="3.5"
            fill="#C16B9B"
            style={{ scale: prefersReducedMotion ? 1 : nodeScale }}
          />
          <circle cx="16" cy="32" r="1.5" fill="#FFFFFF" />
        </svg>
      </div>
    </>
  );
}
