import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view' | 'spin'>('default');
  const [isVisible, setIsVisible] = useState(false);

  // Raw coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring inertia settings
  const springConfig = { damping: 30, stiffness: 240, mass: 0.8 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on devices that have a hover-capable mouse
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check custom attribute values in target or closest ancestor
      const customCursor = target.closest('[data-cursor]')?.getAttribute('data-cursor');

      if (customCursor === 'view') {
        setCursorType('view');
      } else if (customCursor === 'spin') {
        setCursorType('spin');
      } else {
        // Detect standard clickable tags
        const isClickable = 
          target.closest('a') || 
          target.closest('button') || 
          target.closest('.cursor-pointer') ||
          target.closest('[role="button"]') ||
          window.getComputedStyle(target).cursor === 'pointer';

        setCursorType(isClickable ? 'pointer' : 'default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    // Initial check for visibility
    setIsVisible(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Central focus dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
        style={{
          x: mouseX,
          y: mouseY,
          scale: cursorType !== 'default' ? 0 : 1,
        }}
      />

      {/* Smooth fluid outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 border-2 border-white mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          width: cursorType === 'view' || cursorType === 'spin' ? 74 : cursorType === 'pointer' ? 52 : 24,
          height: cursorType === 'view' || cursorType === 'spin' ? 74 : cursorType === 'pointer' ? 52 : 24,
          backgroundColor: cursorType === 'view' || cursorType === 'spin' ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.08)',
          borderColor: cursorType === 'view' || cursorType === 'spin' ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 1)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      >
        {(cursorType === 'view' || cursorType === 'spin') && (
          <span className="text-[9px] font-black font-mono tracking-widest text-[#000000] uppercase select-none">
            {cursorType === 'view' ? 'Ver' : 'Girar'}
          </span>
        )}
      </motion.div>
    </>
  );
}
