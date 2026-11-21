"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroSlide = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
};

export default function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || slides.length < 2) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isPaused, slides.length]);

  const activeSlide = slides[activeIndex];

  return (
    <div
      className="home-hero-image"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <Image
          key={slide.image}
          src={slide.image}
          alt={slide.alt}
          fill
          priority={index === 0}
          sizes="(max-width: 900px) 100vw, 60vw"
          className={`hero-slide-image${index === activeIndex ? " is-active" : ""}`}
        />
      ))}
      <div className="hero-image-note" aria-live="polite">
        <span>{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        <strong>{activeSlide.eyebrow}<br />{activeSlide.title}</strong>
      </div>
      <div className="hero-slide-controls" aria-label="Hero slideshow controls">
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            className={index === activeIndex ? "is-active" : ""}
            aria-label={`Show slide ${index + 1}: ${slide.title}`}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
