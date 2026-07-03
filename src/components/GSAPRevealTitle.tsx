import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GSAPRevealTitleProps {
  text: string;
  className?: string;
}

export default function GSAPRevealTitle({ text, className = '' }: GSAPRevealTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Clear previous content to avoid duplications on hot-reloading
    el.innerHTML = '';

    // Split text by words
    const words = text.split(' ');

    words.forEach((word) => {
      // Word container that wraps letters to prevent breaking issues on mobile
      const wordSpan = document.createElement('span');
      wordSpan.className = 'inline-block overflow-hidden whitespace-nowrap';
      wordSpan.style.marginRight = '0.25em';

      // Split word by letters
      const letters = word.split('');
      letters.forEach((letter) => {
        const letterSpan = document.createElement('span');
        letterSpan.className = 'char-span inline-block transform translate-y-[110%]';
        letterSpan.textContent = letter;
        wordSpan.appendChild(letterSpan);
      });

      el.appendChild(wordSpan);
    });

    const targets = el.querySelectorAll('.char-span');

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        y: '0%',
        duration: 1.1,
        stagger: 0.025,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%', // Starts animating when 12% in view
          toggleActions: 'play none none none',
        }
      });
    }, el);

    return () => ctx.revert();
  }, [text]);

  return (
    <h2
      ref={containerRef}
      className={className}
    />
  );
}
