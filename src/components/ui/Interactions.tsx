"use client";

import { useEffect } from "react";

/**
 * Pointer-reactive depth for every `[data-tilt]` card on the page.
 *
 * Mounted once in the root layout. One delegated listener drives every card,
 * rather than a wrapper component and a listener pair per card — there are
 * ~40 cards across the site and 80 listeners to accomplish this would be
 * silly. The CSS in globals.css (`card-3d`) does all the drawing; this file
 * only writes four numbers.
 *
 * Written straight to `style` rather than through React state on purpose:
 * this runs on every pointer frame, and routing it through a re-render would
 * reconcile the whole tree 60 times a second to move a card by four degrees.
 *
 * Opting a card in:
 *   <article data-tilt className="card-3d lift-hover ..."> — 6deg default
 *   <article data-tilt="4" ...>                            — custom max angle
 */
export function Interactions() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    // No hover on touch, so a tilt would fire on tap and then stick with
    // nothing to clear it. Under reduced motion the whole thing is off — this
    // is exactly the kind of incidental movement that preference is about.
    if (!fine.matches || still.matches) return;

    let frame = 0;
    let active: HTMLElement | null = null;
    let clientX = 0;
    let clientY = 0;

    const clear = (el: HTMLElement) => {
      delete el.dataset.tilting;
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
      el.style.removeProperty("--mx");
      el.style.removeProperty("--my");
    };

    const paint = () => {
      frame = 0;
      if (!active) return;

      const rect = active.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      // Pointer position within the card, 0–1 on each axis.
      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;

      const max = Number(active.dataset.tilt) || 6;

      // Rotate *toward* the pointer: X tilts on the vertical axis, so it takes
      // the Y offset, and it is negated — pointer below centre should push the
      // bottom edge away, not pull it forward.
      active.style.setProperty("--ry", `${(px - 0.5) * 2 * max}deg`);
      active.style.setProperty("--rx", `${(0.5 - py) * 2 * max}deg`);
      active.style.setProperty("--mx", `${px * 100}%`);
      active.style.setProperty("--my", `${py * 100}%`);
    };

    const onMove = (e: PointerEvent) => {
      const target = e.target;
      const card =
        target instanceof Element
          ? (target.closest<HTMLElement>("[data-tilt]") ?? null)
          : null;

      if (card !== active) {
        if (active) clear(active);
        active = card;
        // Marks the card as tracking, which shortens its transition so the
        // tilt follows the pointer instead of trailing half a second behind.
        if (active) active.dataset.tilting = "";
      }

      if (!active) return;
      clientX = e.clientX;
      clientY = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    // Pointer leaving the window never fires a move over a non-card, so the
    // last card would keep its tilt with the pointer gone.
    const onLeave = () => {
      if (active) clear(active);
      active = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (active) clear(active);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return null;
}
