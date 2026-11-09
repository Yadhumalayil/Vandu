import React, { useState, useRef, useEffect } from 'react';

interface Logo3DProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  interactive?: boolean;
  floating?: boolean;
  withGlow?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo3D: React.FC<Logo3DProps> = ({
  size = 'md',
  interactive = true,
  floating = true,
  withGlow = true,
  className = '',
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });

  // Size mapping
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-28 h-28 md:w-36 md:h-36',
    xl: 'w-48 h-48 md:w-60 md:h-60',
    hero: 'w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 18; // Max 18 deg tilt
    const rotY = ((x - centerX) / centerX) * 18;

    setRotateX(rotX);
    setRotateY(rotY);

    // Light reflection position
    setLightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setLightPos({ x: 50, y: 50 });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotateX(-((y - centerY) / centerY) * 14);
    setRotateY(((x - centerX) / centerX) * 14);
    setLightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none perspective-1000 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* Dynamic Golden Ambient Glow Behind Logo */}
      {withGlow && (
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF9900]/25 via-[#FFD700]/30 to-amber-300/10 blur-2xl pointer-events-none transition-all duration-700 ${
            isHovered ? 'scale-125 opacity-90' : 'opacity-60 scale-100'
          }`}
          style={{
            transform: `translate(${rotateY * -1.5}px, ${rotateX * -1.5}px)`,
          }}
        />
      )}

      {/* Rotating & Tilting 3D Stage */}
      <div
        className={`relative z-10 ${sizeClasses[size]} preserve-3d transition-transform duration-200 ease-out ${
          floating && !isHovered ? 'animate-float-gentle' : ''
        }`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${
            isHovered ? '25px' : '0px'
          })`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Soft Drop Shadow Layer */}
        <div
          className="absolute inset-x-4 -bottom-4 h-6 rounded-full bg-black/60 blur-md pointer-events-none transition-transform duration-300"
          style={{
            transform: `translate(${rotateY * 0.8}px, ${rotateX * 0.8 + 10}px) scale(${
              isHovered ? 0.9 : 1
            })`,
          }}
        />

        {/* The Original Golden Bee Logo Image */}
        <img
          src="/vandu-bee-logo.png"
          onError={(e) => {
            // Fallback to original uploaded asset path if needed
            (e.target as HTMLImageElement).src =
              '/assets/aistudio/Picsart_26-11-05_03-45-34-935_89934389.png';
          }}
          alt="VANDU DIGITAL ADS Golden Bee Logo"
          className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] pointer-events-none"
          draggable={false}
          referrerPolicy="no-referrer"
        />

        {/* Metallic Gold Specular Light Reflection Sweep Overlay */}
        <div
          className="absolute inset-0 z-20 pointer-events-none rounded-full mix-blend-color-dodge transition-opacity duration-300 opacity-60 hover:opacity-90"
          style={{
            background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 215, 0, 0.25) 25%, transparent 60%)`,
          }}
        />

        {/* Subtle Edge Light Halo */}
        <div
          className="absolute inset-0 z-15 pointer-events-none rounded-full mix-blend-overlay opacity-50"
          style={{
            boxShadow: `inset 0 0 20px rgba(255, 215, 0, ${isHovered ? '0.6' : '0.25'})`,
          }}
        />
      </div>
    </div>
  );
};
