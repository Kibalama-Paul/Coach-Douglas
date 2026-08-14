import React, { useEffect, useRef, useState } from 'react';

export const DOUGLAS_SCROLL_IMAGES = [
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.48 (1).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.48.jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.49 (1).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.49 (2).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.49.jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.50 (1).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.50 (2).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.50.jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.51 (1).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.51 (2).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.51 (3).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.51.jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.52 (1).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.52 (2).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.52 (3).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.52.jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.53 (1).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.53 (2).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.53 (3).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.53.jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.54 (1).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.54 (2).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.54 (3).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.54.jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.55 (1).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.55 (2).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.55 (3).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.55 (4).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.55.jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.56 (1).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.56 (2).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.56 (3).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.56.jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.57 (1).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.57 (2).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.57 (3).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.57.jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.58 (1).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.58 (2).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.58.jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.59 (1).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.59 (2).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.59 (3).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.41.59.jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.42.00 (1).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.42.00 (2).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.42.00 (3).jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.42.00.jpeg",
  "/douglas-scroll/WhatsApp Image 2026-08-14 at 13.42.01.jpeg"
];

interface ScrollCanvasProps {
  imageUrls?: string[];
  totalFrames?: number;
  folderPath?: string;
}

export const ScrollCanvas: React.FC<ScrollCanvasProps> = ({
  imageUrls = DOUGLAS_SCROLL_IMAGES,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loadedPercent, setLoadedPercent] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);

  const totalFrames = imageUrls.length;

  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    // Preload all custom Coach Douglas scroll images
    imageUrls.forEach((src) => {
      const img = new Image();
      img.src = src;

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
    });

    imagesRef.current = imgArray;

    return () => {
      imgArray.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [imageUrls, totalFrames]);

  // Main canvas render and scroll tracking logic with LERP & Cross-fade
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
      drawContinuousFrame(currentFrameRef.current);
    };

    const drawSingleImage = (img: HTMLImageElement, opacity: number = 1) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawW: number, drawH: number;

      if (canvasRatio > imgRatio) {
        drawW = canvasWidth;
        drawH = canvasWidth / imgRatio;
      } else {
        drawH = canvasHeight;
        drawW = canvasHeight * imgRatio;
      }

      const drawX = (canvasWidth - drawW) / 2;
      const drawY = (canvasHeight - drawH) / 2;

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();
    };

    const drawContinuousFrame = (fractionalIndex: number) => {
      const clampedIndex = Math.max(0, Math.min(totalFrames - 1, fractionalIndex));
      const baseIndex = Math.floor(clampedIndex);
      const nextIndex = Math.min(totalFrames - 1, baseIndex + 1);
      const crossFadeProgress = clampedIndex - baseIndex;

      // Dark background fill
      ctx.fillStyle = '#030303';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const baseImg = imagesRef.current[baseIndex];
      const nextImg = imagesRef.current[nextIndex];

      if (baseImg) {
        drawSingleImage(baseImg, 1 - crossFadeProgress * 0.75);
      }

      if (nextImg && nextIndex !== baseIndex && crossFadeProgress > 0.01) {
        drawSingleImage(nextImg, crossFadeProgress * 0.85);
      }

      // Vignette Overlay for dark atmosphere
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 0.3,
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 0.95
      );
      gradient.addColorStop(0, 'rgba(3, 3, 3, 0.45)');
      gradient.addColorStop(1, 'rgba(3, 3, 3, 0.88)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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

    const lerpAlpha = 0.08; // Smooth LERP factor

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;

      if (Math.abs(diff) > 0.0005) {
        currentFrameRef.current += diff * lerpAlpha;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      drawContinuousFrame(currentFrameRef.current);
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
          className="h-full bg-gradient-to-r from-[#FF6B35] via-[#EC4899] to-[#10B981] transition-all duration-150"
          style={{ width: `${loadedPercent}%` }}
        />
      </div>

      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none block opacity-85"
      />
    </>
  );
};
