"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  EASE,
  DUR,
  STAGGER,
  REVEAL_FROM,
  TRIGGER_START,
  canAnimate,
} from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * The house scroll reveal.
 *
 * Two things matter here and both are easy to get wrong:
 *
 * 1. It is a `gsap.from()`. The resting state is what's already in the DOM, so
 *    the animation only ever *removes* a start state. If JS fails or the tab
 *    is hidden while the trigger fires, the content is still on screen. Never
 *    invert this to a `to()` off an `opacity-0` class — that ships blank
 *    sections to anyone whose bundle didn't load.
 *
 * 2. `matchMedia` gates the whole thing on prefers-reduced-motion. Under
 *    reduce, no tween is ever created, so there is no start state to get
 *    stuck in.
 *
 * `stagger` reveals direct children instead of the container — use it for
 * lists and grids, where the cascade fits what's being revealed.
 */
export function Reveal({
  as: Tag = "div",
  stagger = false,
  delay = 0,
  className = "",
  children,
}: {
  as?: ElementType;
  stagger?: boolean;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!canAnimate()) return;
        const el = ref.current!;
        const targets = stagger ? Array.from(el.children) : el;
        if (stagger && !el.children.length) return;

        gsap.from(targets, {
          ...REVEAL_FROM,
          duration: DUR.reveal,
          ease: EASE,
          delay,
          stagger: stagger ? STAGGER.tight : 0,
          scrollTrigger: { trigger: el, start: TRIGGER_START, once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
