import React, { useEffect, useRef, useState } from 'react';

interface ScrollCanvasProps {
  totalFrames?: number;
  folderPath?: string;
}

export const ScrollCanvas: React.FC<ScrollCanvasProps> = ({
  totalFrames = 300,
  folderPath = 'ezgif-1751209da614e755-jpg',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loadedPercent, setLoadedPercent] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);

  // Generate frame path
  const getFrameSrc = (index: number) => {
    const frameNum = String(index).padStart(3, '0');
    return `/${folderPath}/ezgif-frame-${frameNum}.jpg`;
  };

  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    // Preload all frames
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      
      const onImageFinish = () => {
        loadedCount++;
        const pct = Math.floor((loadedCount / totalFrames) * 100);
        setLoadedPercent(pct);

        if (loadedCount === totalFrames) {
          setIsLoaded(true);
        }
      };

      img.onload = onImageFinish;
      img.onerror = onImageFinish;

      imgArray.push(img);
    }

    imagesRef.current = imgArray;

    return () => {
      // Cleanup
      imgArray.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [totalFrames, folderPath]);

  // Main canvas render and scroll tracking logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(Math.round(currentFrameRef.current));
    };

    const drawFrame = (frameIndex: number) => {
      const clampedIndex = Math.max(0, Math.min(totalFrames - 1, frameIndex));
      const img = imagesRef.current[clampedIndex];

      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Dark background fill
      ctx.fillStyle = '#030303';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawW: number, drawH: number;

      // Cover scaling math
      if (canvasRatio > imgRatio) {
        drawW = canvasWidth;
        drawH = canvasWidth / imgRatio;
      } else {
        drawH = canvasHeight;
        drawW = canvasHeight * imgRatio;
      }

      const drawX = (canvasWidth - drawW) / 2;
      const drawY = (canvasHeight - drawH) / 2;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    const updateTargetFrame = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );

      const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
      targetFrameRef.current = scrollFraction * (totalFrames - 1);
    };

    let lastFrameRendered = -1;
    const lerpAlpha = 0.09; // Smooth interpolation factor

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;

      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * lerpAlpha;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameToDraw = Math.round(currentFrameRef.current);
      if (frameToDraw !== lastFrameRendered) {
        drawFrame(frameToDraw);
        lastFrameRendered = frameToDraw;
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    // Initialize
    resizeCanvas();
    updateTargetFrame();
    currentFrameRef.current = targetFrameRef.current;
    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    window.addEventListener('scroll', updateTargetFrame, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('scroll', updateTargetFrame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [totalFrames]);

  return (
    <>
      {/* Preloading bar */}
      <div
        className={`fixed top-0 left-0 w-full h-1 bg-neutral-900 z-50 transition-opacity duration-500 pointer-events-none ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className="h-full bg-gradient-to-r from-[#d4af37] via-[#2eb886] to-[#d4af37] transition-all duration-150"
          style={{ width: `${loadedPercent}%` }}
        />
      </div>

      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none block"
      />
    </>
  );
};
