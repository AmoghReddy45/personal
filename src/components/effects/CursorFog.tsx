import React, { useEffect, useRef } from 'react';

interface CursorFogProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  density?: number;
  particleSize?: number;
  fadeSpeed?: number;
  blendMode?: string;
  pixelSize?: number;
  turbulence?: number;
  smokeIntensity?: number;
}

const CursorFog: React.FC<CursorFogProps> = ({ 
  children, 
  className,
  color = 'rgba(255, 255, 255, 1)',
  density = 3,
  particleSize = 12,
  fadeSpeed = 0.007,
  blendMode = 'soft-light',
  pixelSize = 3,  // Controls the pixelation level
  turbulence = 1.2, // Controls how chaotic the smoke movement is
  smokeIntensity = 0.85 // Controls smoke opacity and visual intensity
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelatedCanvasRef = useRef<HTMLCanvasElement>(null);
  const isHovering = useRef(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  const particles = useRef<Array<Particle>>([]);
  const animationFrameId = useRef<number | null>(null);
  
  // Extract base color for gradient
  const baseColor = color.replace(/[^,]+(?=\))/, smokeIntensity.toString());
  const transparentColor = color.replace(/[^,]+(?=\))/, '0');
  
  class Particle {
    x: number;
    y: number;
    startSize: number;
    size: number;
    maxSize: number;
    speedX: number;
    speedY: number;
    alpha: number;
    decreaseRate: number;
    spinAngle: number;
    spinSpeed: number;
    turbulencePhase: number;
    pixelOffset: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      // Start small and grow to create better fog effect
      this.startSize = Math.random() * 2 + 1;
      this.size = this.startSize;
      this.maxSize = Math.random() * particleSize + 5;
      // Random speed for more natural movement
      this.speedX = (Math.random() * 2 - 1) * 0.7;
      this.speedY = (Math.random() * 2 - 1) * 0.7 - 0.5; // General upward drift for smoke
      this.alpha = Math.random() * 0.2 + 0.7; // Variable initial opacity
      this.decreaseRate = fadeSpeed + Math.random() * 0.01;
      // Add spin for more dynamic smoke look
      this.spinAngle = Math.random() * Math.PI * 2;
      this.spinSpeed = (Math.random() * 2 - 1) * 0.02;
      // Add turbulence for more smoke-like behavior
      this.turbulencePhase = Math.random() * Math.PI * 2;
      // Add pixel offset for pixelated look
      this.pixelOffset = Math.floor(Math.random() * pixelSize);
    }

    update() {
      // Apply turbulence for smoke-like movement
      const turbulenceFactor = Math.sin(this.turbulencePhase) * 0.05 * turbulence;
      this.turbulencePhase += 0.05;
      
      // Grow particle to max size
      if (this.size < this.maxSize) {
        this.size += (this.maxSize - this.size) * 0.1;
      }
      
      this.x += this.speedX + turbulenceFactor;
      this.y += this.speedY;
      this.spinAngle += this.spinSpeed;
      
      // Only start fading after reaching certain size
      if (this.size > this.maxSize * 0.7) {
        this.alpha -= this.decreaseRate;
      }
      
      // Add slight randomness to movement for realistic smoke
      this.speedX += (Math.random() * 0.4 - 0.2) * 0.05 * turbulence;
      this.speedY += (Math.random() * 0.2 - 0.1) * 0.05 * turbulence;
      
      // Slow down particles over time, but maintain some upward drift
      this.speedX *= 0.98;
      this.speedY *= 0.98;
      this.speedY -= 0.01; // Slight upward acceleration for smoke effect
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (this.alpha <= 0) return;
      
      ctx.save();
      ctx.translate(
        Math.floor(this.x / pixelSize) * pixelSize + this.pixelOffset, 
        Math.floor(this.y / pixelSize) * pixelSize + this.pixelOffset
      );
      ctx.rotate(this.spinAngle);
      
      // Create smoke-like shape with irregular pixelated pattern
      for (let i = 0; i < 4; i++) {
        // Create fractal-like smoke pattern
        const offsetX = Math.cos(this.spinAngle * (i + 1) * 0.8) * this.size * 0.2;
        const offsetY = Math.sin(this.spinAngle * (i + 1) * 0.8) * this.size * 0.2;
        
        // Make some particles square for pixelated effect
        if (i % 2 === 0 && Math.random() > 0.5) {
          const pixelatedSize = Math.max(1, Math.floor(this.size / pixelSize)) * pixelSize;
          ctx.fillStyle = baseColor.replace('1)', `${this.alpha * 0.7})`);
          ctx.fillRect(
            Math.floor(offsetX / pixelSize) * pixelSize, 
            Math.floor(offsetY / pixelSize) * pixelSize, 
            pixelatedSize, 
            pixelatedSize
          );
        } else {
          // Others remain circular but pixelated
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(
            offsetX, offsetY, 0,
            offsetX, offsetY, this.size
          );
          gradient.addColorStop(0, baseColor.replace('1)', `${this.alpha})`));
          gradient.addColorStop(1, transparentColor);
          
          ctx.fillStyle = gradient;
          // Make circles pixelated by setting radius to multiple of pixelSize
          const radius = Math.max(1, Math.floor(this.size / pixelSize)) * pixelSize;
          ctx.arc(offsetX, offsetY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      ctx.restore();
    }
  }

  const createParticles = (x: number, y: number, vx: number, vy: number, count: number) => {
    for (let i = 0; i < count; i++) {
      const particle = new Particle(x, y);
      // Influence particle direction based on cursor movement
      particle.speedX += vx * 0.1;
      particle.speedY += vy * 0.1;
      particles.current.push(particle);
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const pixelatedCanvas = pixelatedCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    const pixelCtx = pixelatedCanvas?.getContext('2d');
    
    if (!ctx || !canvas || !pixelCtx || !pixelatedCanvas) return;
    
    // Clear canvas with transparent fill
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Add new particles if hovering
    if (isHovering.current) {
      const currentX = mousePosition.current.x;
      const currentY = mousePosition.current.y;
      
      // Calculate velocity for directional effect
      const velocityX = currentX - lastPosition.current.x;
      const velocityY = currentY - lastPosition.current.y;
      
      createParticles(currentX, currentY, velocityX, velocityY, density);
      
      // Update last position
      lastPosition.current = { x: currentX, y: currentY };
    }
    
    // Update and draw all particles
    for (let i = 0; i < particles.current.length; i++) {
      particles.current[i].update();
      particles.current[i].draw(ctx);
      
      // Remove particles that have faded out
      if (particles.current[i].alpha <= 0) {
        particles.current.splice(i, 1);
        i--; // Adjust index since we removed an item
      }
    }
    
    // Apply pixelation effect by drawing to smaller canvas and scaling back up
    pixelCtx.clearRect(0, 0, pixelatedCanvas.width, pixelatedCanvas.height);
    
    // Create a pixelated effect by reducing and then scaling back up
    const scaleFactor = 1 / pixelSize;
    pixelCtx.drawImage(
      canvas, 
      0, 0, canvas.width, canvas.height,
      0, 0, canvas.width * scaleFactor, canvas.height * scaleFactor
    );
    
    pixelCtx.imageSmoothingEnabled = false; // Disable smoothing for pixelated look
    pixelCtx.drawImage(
      pixelatedCanvas,
      0, 0, canvas.width * scaleFactor, canvas.height * scaleFactor,
      0, 0, canvas.width, canvas.height
    );
    
    // Apply smoke-like blending and effects
    pixelCtx.globalCompositeOperation = 'screen';
    pixelCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    pixelCtx.fillRect(0, 0, pixelatedCanvas.width, pixelatedCanvas.height);
    pixelCtx.globalCompositeOperation = 'source-over';
    
    // Continue animation
    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const pixelatedCanvas = pixelatedCanvasRef.current;
    
    if (!container || !canvas || !pixelatedCanvas) return;
    
    // Set canvas dimensions to match container
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      pixelatedCanvas.width = rect.width;
      pixelatedCanvas.height = rect.height;
    };
    
    // Initialize canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Start animation
    animationFrameId.current = requestAnimationFrame(animate);
    
    // Event handlers
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering.current) return;
      
      const rect = container.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    const handleMouseEnter = (e: MouseEvent) => {
      isHovering.current = true;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      lastPosition.current = { x, y };
      mousePosition.current = { x, y };
    };
    
    const handleMouseLeave = () => {
      isHovering.current = false;
    };
    
    // Attach event listeners
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`relative ${className || ''}`}
      style={{ overflow: 'hidden' }}
    >
      {/* Hidden canvas for drawing particles */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
      />
      
      {/* Visible pixelated canvas */}
      <canvas 
        ref={pixelatedCanvasRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ mixBlendMode: blendMode as any }}
      />
      
      {children}
    </div>
  );
};

export default CursorFog;