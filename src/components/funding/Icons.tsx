/**
 * Line icons for the funding page. Drawn inline so they take `currentColor`
 * and cost no request. Stroke weight matches the rest of the site (1.6).
 */
const paths: Record<string, string> = {
  card: "M2.5 5h19v14h-19zM2.5 9.5h19M6 15h4",
  wallet: "M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V7zM4 7l11-3v3M16 13.5h.01",
  bank: "M3 10h18M5 10v8m4.5-8v8m5-8v8M19 10v8M3 20h18M12 3l9 5H3l9-5z",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z",
  crypto: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.5 7.5v9M9.5 7.5h3.8a2.2 2.2 0 0 1 0 4.4H9.5h4.3a2.3 2.3 0 0 1 0 4.6H9.5M11 6v1.5M11 16.5V18",
  lock: "M5 10h14v10H5zM8 10V7a4 4 0 0 1 8 0v3M12 15h.01",
  shield: "M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3zM8.5 12l2.5 2.5 4.5-5",
  id: "M3 5h18v14H3zM9 8.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4zM5.5 16.5c.8-1.7 2-2.5 3.5-2.5s2.7.8 3.5 2.5M14.5 10h4M14.5 13.5h3",
  sync: "M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4",
};

export function Icon({ name, className = "size-[22px]" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
