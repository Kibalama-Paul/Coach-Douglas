import React, { useEffect, useRef, useState } from 'react';

const DOUGLAS_SCROLL_IMAGES = [
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
}

export const ScrollCanvas: React.FC<ScrollCanvasProps> = ({
  imageUrls = DOUGLAS_SCROLL_IMAGES,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [firstFrameReady, setFirstFrameReady] = useState<boolean>(false);
  const [allLoaded, setAllLoaded] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(10);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const isLoopActiveRef = useRef<boolean>(false);
  const animationFrameIdRef = useRef<number | null>(null);

  const totalFrames = imageUrls.length;

  // Fallback: returns the closest loaded image so canvas NEVER flashes black
  const getBestAvailableImage = (index: number): HTMLImageElement | null => {
    const list = imagesRef.current;
    if (!list.length) return null;

    const clamped = Math.max(0, Math.min(list.length - 1, index));
    if (list[clamped] && list[clamped].complete && list[clamped].naturalWidth > 0) {
      return list[clamped];
    }

    // Search outwards for nearest loaded frame
    for (let offset = 1; offset < list.length; offset++) {
      const prev = clamped - offset;
      if (prev >= 0 && list[prev]?.complete && list[prev]?.naturalWidth > 0) {
        return list[prev];
      }
      const next = clamped + offset;
      if (next < list.length && list[next]?.complete && list[next]?.naturalWidth > 0) {
        return list[next];
      }
    }
    return null;
  };

  // Preload strategy: Priority load frame 0 immediately, then batch the rest smoothly
  useEffect(() => {
    let isCancelled = false;
    const imgArray: HTMLImageElement[] = new Array(totalFrames);
    let loadedCount = 0;

    const createPreloadedImage = async (src: string, index: number, priority = false): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        if (priority) {
          // @ts-ignore fetchPriority standard support in modern browsers
          img.fetchPriority = 'high';
        }

        const onDone = async () => {
          if (isCancelled) return;
          try {
            // Asynchronously decode image to prevent main thread hitching during scroll
            if ('decode' in img) {
              await img.decode();
            }
          } catch {
            // Ignore decode failures on older engines
          }

          imgArray[index] = img;
          loadedCount++;

          if (index === 0 && !isCancelled) {
            setFirstFrameReady(true);
          }

          const pct = Math.min(100, Math.max(15, Math.floor((loadedCount / totalFrames) * 100)));
          setProgressPercent(pct);

          if (loadedCount >= totalFrames && !isCancelled) {
            setAllLoaded(true);
          }
          resolve();
        };

        img.onload = onDone;
        img.onerror = onDone;
        img.src = src;
      });
    };

    imagesRef.current = imgArray;

    const runProgressiveLoad = async () => {
      // 1. Load initial frame with immediate priority
      await createPreloadedImage(imageUrls[0], 0, true);
      if (isCancelled) return;

      // 2. Load the next 4 frames so initial scroll is buffered
      const earlyBatch = imageUrls.slice(1, 5).map((src, i) => createPreloadedImage(src, i + 1));
      await Promise.all(earlyBatch);
      if (isCancelled) return;

      // 3. Smoothly load remaining frames in small batches (prevents network choke)
      const batchSize = 6;
      for (let i = 5; i < totalFrames; i += batchSize) {
        if (isCancelled) break;
        const chunk = imageUrls.slice(i, i + batchSize).map((src, offset) => {
          return createPreloadedImage(src, i + offset);
        });
        await Promise.all(chunk);
      }
    };

    runProgressiveLoad();

    return () => {
      isCancelled = true;
    };
  }, [imageUrls, totalFrames]);

  // Main canvas rendering & intelligent idle-sleep render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Cap devicePixelRatio to 1.5 to maintain retina crispness while saving 50%+ GPU fill-rate
    const getDpr = () => Math.min(window.devicePixelRatio || 1, 1.5);

    const resizeCanvas = () => {
      const dpr = getDpr();
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
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

    // Smooth zero-dip crossfade rendering
    const drawContinuousFrame = (fractionalIndex: number) => {
      const clampedIndex = Math.max(0, Math.min(totalFrames - 1, fractionalIndex));
      const baseIndex = Math.floor(clampedIndex);
      const nextIndex = Math.min(totalFrames - 1, baseIndex + 1);
      const crossFadeProgress = clampedIndex - baseIndex;

      // Dark baseline fill
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const baseImg = getBestAvailableImage(baseIndex);
      const nextImg = (nextIndex !== baseIndex && crossFadeProgress > 0.005) 
        ? getBestAvailableImage(nextIndex) 
        : null;

      // Always draw base image at full 1.0 opacity: eliminates the luminance dip / beating pulse
      if (baseImg) {
        drawSingleImage(baseImg, 1.0);
      }

      // Smooth cosine ease-in-out blend for next frame
      if (nextImg && nextImg !== baseImg) {
        const smoothAlpha = (1 - Math.cos(crossFadeProgress * Math.PI)) / 2;
        drawSingleImage(nextImg, smoothAlpha);
      }
    };

    const updateTargetFrame = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );

      const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
      targetFrameRef.current = scrollFraction * (totalFrames - 1);

      // Wake up the render loop only when active scrolling happens
      if (!isLoopActiveRef.current) {
        isLoopActiveRef.current = true;
        animationFrameIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

    const lerpFactor = 0.12; // Silky responsive interpolation

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;

      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * lerpFactor;
        drawContinuousFrame(currentFrameRef.current);
        animationFrameIdRef.current = requestAnimationFrame(renderLoop);
      } else {
        currentFrameRef.current = targetFrameRef.current;
        drawContinuousFrame(currentFrameRef.current);
        // Idle state reached: PAUSE the RAF loop to save 100% of GPU/CPU while stationary
        isLoopActiveRef.current = false;
        animationFrameIdRef.current = null;
      }
    };

    resizeCanvas();
    updateTargetFrame();
    currentFrameRef.current = targetFrameRef.current;
    drawContinuousFrame(currentFrameRef.current);

    window.addEventListener('scroll', updateTargetFrame, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('scroll', updateTargetFrame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [totalFrames, firstFrameReady]);

  return (
    <>
      {/* Silky Smooth Top Preloading Progress Indicator */}
      <div
        className={`fixed top-0 left-0 w-full h-[3px] z-50 pointer-events-none transition-opacity duration-700 ease-out ${
          allLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className="h-full bg-gradient-to-r from-[#FF6B35] via-[#EC4899] to-[#10B981] shadow-[0_0_12px_rgba(255,107,53,0.7)] transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Background Canvas: Fades in gracefully upon first frame decode */}
      <canvas
        ref={canvasRef}
        className={`fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none block transition-opacity duration-700 ease-out ${
          firstFrameReady ? 'opacity-85' : 'opacity-0'
        }`}
      />

      {/* Hardware-accelerated GPU Vignette (replaces 60fps canvas gradient calculation) */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(3, 3, 3, 0.40) 25%, rgba(3, 3, 3, 0.85) 90%, rgba(3, 3, 3, 0.98) 100%)',
        }}
      />
    </>
  );
};
