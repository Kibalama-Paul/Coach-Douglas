import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  X, 
  Sparkles, 
  Dumbbell, 
  Flame, 
  Target, 
  Globe, 
  MapPin, 
  Award, 
  Activity, 
  CheckCircle2, 
  ArrowUpRight,
  Filter,
  Eye,
  Camera,
  Image as ImageIcon,
  Video as VideoIcon,
  Layers,
  ZoomIn,
  Home,
  ChevronRight,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import { BannerContent } from '../types';

interface VideoItem {
  id: string;
  number: string;
  category: string;
  categoryTag: string;
  title: string;
  description: string;
  videoUrl: string;
  tiktokId?: string;
  tiktokUrl?: string;
  posterUrl: string;
  duration: string;
  intensity: string;
  focus: string;
  location: string;
}

interface ImageItem {
  id: string;
  number: string;
  category: string;
  categoryTag: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  stats: string;
  location: string;
}

const GALLERY_VIDEOS: VideoItem[] = [
  {
    id: 'vid-01',
    number: '01',
    category: 'Personal Training',
    categoryTag: 'Video 01 — 1-ON-1 COACHING',
    title: 'COACH DOUGLAS 1-ON-1 MASTERCLASS',
    description: 'A high-intensity personal training masterclass centered on progressive overload, strict form, and explosive athletic output.',
    videoUrl: 'https://res.cloudinary.com/dirfcqs1f/video/upload/v1786675862/WhatsApp_Video_2026-08-11_at_13.55.21_f81sl8.mp4',
    tiktokUrl: 'https://www.tiktok.com/@d.u.b.a.i7/video/7670492902161779988',
    posterUrl: 'https://res.cloudinary.com/dirfcqs1f/image/upload/v1786673200/WhatsApp_Image_2026-08-14_at_04.15.31_whic4o.jpg',
    duration: '45-60 min',
    intensity: 'Targeted Hypertrophy',
    focus: 'Biomechanics & Overload',
    location: 'Private Athletic Suite'
  },
  {
    id: 'vid-02',
    number: '02',
    category: 'Strength',
    categoryTag: 'Video 02 — STRENGTH & CONSISTENCY',
    title: 'HARD WORK & CONSISTENCY',
    description: 'Bodybuilding & strength coaching session demonstrating core discipline, perfect biomechanical execution, and unrelenting grit.',
    videoUrl: 'https://res.cloudinary.com/dirfcqs1f/video/upload/v1786675881/WhatsApp_Video_2026-08-11_at_13.55.39_codczc.mp4',
    tiktokUrl: 'https://www.tiktok.com/@d.u.b.a.i7/video/7670492902161779988',
    posterUrl: 'https://res.cloudinary.com/dirfcqs1f/image/upload/v1786673197/WhatsApp_Image_2026-08-14_at_04.15.49_1_jxmzuq.jpg',
    duration: '60 min',
    intensity: 'Heavy Compound',
    focus: 'Raw Power & Density',
    location: 'Elite Strength Facility'
  },
  {
    id: 'vid-03',
    number: '03',
    category: 'Transformation',
    categoryTag: 'Video 03 — TRANSFORMATION',
    title: 'THE TRANSFORMATION JOURNEY',
    description: 'Behind every transformation is consistency, discipline, and a periodized program designed specifically for the individual.',
    videoUrl: 'https://res.cloudinary.com/dirfcqs1f/video/upload/v1786675870/WhatsApp_Video_2026-08-11_at_13.55.29_vrlcn4.mp4',
    tiktokUrl: 'https://www.tiktok.com/@d.u.b.a.i7/video/7664965664737660180',
    posterUrl: 'https://res.cloudinary.com/dirfcqs1f/image/upload/v1786673202/WhatsApp_Image_2026-08-14_at_04.15.46_rp6fls.jpg',
    duration: '12-Week Block',
    intensity: 'High Discipline',
    focus: 'Fat Loss & Recomposition',
    location: 'Worldwide Virtual & 1-on-1'
  },
  {
    id: 'vid-04',
    number: '04',
    category: 'Conditioning',
    categoryTag: 'Video 04 — CONDITIONING',
    title: 'PUSH YOUR LIMITS',
    description: 'High-intensity metabolic conditioning designed to improve endurance, anaerobic threshold, and total work capacity.',
    videoUrl: 'https://res.cloudinary.com/dirfcqs1f/video/upload/v1786675881/WhatsApp_Video_2026-08-11_at_13.55.39_codczc.mp4',
    tiktokUrl: 'https://www.tiktok.com/@d.u.b.a.i7/video/7669295843870297364',
    posterUrl: 'https://res.cloudinary.com/dirfcqs1f/image/upload/v1786674278/converted_image_disamn.jpg',
    duration: '35 min',
    intensity: 'Peak Heart Rate',
    focus: 'VO2 Max & Stamina',
    location: 'Performance Studio'
  },
  {
    id: 'vid-05',
    number: '05',
    category: 'Technique',
    categoryTag: 'Video 05 — TECHNIQUE & FORM',
    title: 'MASTER THE MOVEMENT',
    description: 'Training is not just about weight lifted; it is about how cleanly you move. Form perfection protects joints and accelerates gains.',
    videoUrl: 'https://res.cloudinary.com/dirfcqs1f/video/upload/v1786676253/WhatsApp_Video_2026-08-12_at_02.27.58_ifqzsa.mp4',
    tiktokUrl: 'https://www.tiktok.com/@d.u.b.a.i7/video/7672890839202336020',
    posterUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop',
    duration: 'Full Session',
    intensity: 'Form Perfection',
    focus: 'Joint Longevity & Form',
    location: '1-on-1 Coaching'
  },
  {
    id: 'vid-06',
    number: '06',
    category: 'Strength',
    categoryTag: 'Video 06 — EXPLOSIVE POWER',
    title: 'EXPLOSIVE LIFTING PROTOCOL',
    description: 'Maximizing motor unit recruitment with progressive compound lifts and high-velocity muscular contractions.',
    videoUrl: 'https://res.cloudinary.com/dirfcqs1f/video/upload/v1786676253/WhatsApp_Video_2026-08-12_at_02.59.08_r2qfi7.mp4',
    tiktokUrl: 'https://www.tiktok.com/@d.u.b.a.i7/video/7444842588412185874',
    posterUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
    duration: '50 min',
    intensity: 'Maximum Velocity',
    focus: 'Neural Drive & Strength',
    location: 'Private Athletic Suite'
  },
  {
    id: 'vid-07',
    number: '07',
    category: 'Technique',
    categoryTag: 'Video 07 — MOBILITY & DRILLS',
    title: 'ATHLETIC READINESS & RESTORE',
    description: 'Functional range conditioning, active mobility drills, and tissue restoration sustaining long-term athletic health.',
    videoUrl: 'https://res.cloudinary.com/dirfcqs1f/video/upload/v1786676247/WhatsApp_Video_2026-08-12_at_03.07.58_tofkpr.mp4',
    tiktokUrl: 'https://www.tiktok.com/@d.u.b.a.i7/video/7662634204580154644',
    posterUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop',
    duration: '30 min',
    intensity: 'Active Recovery',
    focus: 'Joint Decompression & Flow',
    location: 'Mobility & Recovery Suite'
  },
  {
    id: 'vid-08',
    number: '08',
    category: 'Strength',
    categoryTag: 'Video 08 — HYPERTROPHY DENSITY',
    title: 'SCULPTING LEAN MUSCLE DENSITY',
    description: 'Targeted time-under-tension and mechanical tension protocols engineered for clean muscle fullness, symmetry, and V-taper aesthetics.',
    videoUrl: 'https://res.cloudinary.com/dirfcqs1f/video/upload/v1786676244/WhatsApp_Video_2026-08-12_at_02.59.55_zl6ueo.mp4',
    tiktokUrl: 'https://www.tiktok.com/@d.u.b.a.i7/video/7670467970375683348',
    posterUrl: 'https://res.cloudinary.com/dirfcqs1f/image/upload/v1786673197/WhatsApp_Image_2026-08-14_at_04.15.49_1_jxmzuq.jpg',
    duration: '50 min',
    intensity: 'High Volume Density',
    focus: 'Upper Back & Shoulder Width',
    location: 'Private Athletic Suite'
  },
  {
    id: 'vid-09',
    number: '09',
    category: 'Conditioning',
    categoryTag: 'Video 09 — METABOLIC DRIVE',
    title: 'METABOLIC WORK CAPACITY & AGILITY',
    description: 'Kinetic chain drills, sprint mechanics, and plyometric force production for elite athletic responsiveness and high stamina.',
    videoUrl: 'https://res.cloudinary.com/dirfcqs1f/video/upload/v1786676241/WhatsApp_Video_2026-08-12_at_03.00.28_qt0avy.mp4',
    tiktokUrl: 'https://www.tiktok.com/@d.u.b.a.i7/video/7462659859197070599',
    posterUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop',
    duration: '45 min',
    intensity: 'Explosive Stamina',
    focus: 'Fast-Twitch Motor Drive',
    location: 'Performance Studio'
  },
  {
    id: 'vid-10',
    number: '10',
    category: 'Online Coaching',
    categoryTag: 'Video 10 — GLOBAL ONLINE COACHING',
    title: 'DAILY DISCIPLINE & MINDSET',
    description: 'Structured daily habits, macro periodization, and weekly check-in accountability keeping global clients winning all year round.',
    videoUrl: 'https://res.cloudinary.com/dirfcqs1f/video/upload/v1786676235/WhatsApp_Video_2026-08-12_at_02.31.57_rzlvow.mp4',
    tiktokUrl: 'https://www.tiktok.com/@d.u.b.a.i7/video/7673069797403413781',
    posterUrl: 'https://res.cloudinary.com/dirfcqs1f/image/upload/v1786674083/guy-training-home_mjofzm.jpg',
    duration: '24/7 Habit App',
    intensity: 'Mindset Protocol',
    focus: 'Weekly Strategy Audits',
    location: 'Worldwide Virtual'
  }
];

const GALLERY_IMAGES: ImageItem[] = [
  {
    id: 'img-01',
    number: '01',
    category: 'Transformation',
    categoryTag: 'Photo 01 — TRANSFORMATION',
    title: '12-WEEK RECOMPOSITION',
    subtitle: 'Body Fat: 22% → 11% • Lean Mass Preservation',
    description: 'Dedicated 12-week nutritional periodization combined with 4x weekly progressive hypertrophy sessions.',
    imageUrl: 'https://res.cloudinary.com/dirfcqs1f/image/upload/v1786673202/WhatsApp_Image_2026-08-14_at_04.15.46_rp6fls.jpg',
    stats: 'Client Result: -11kg Fat / +3.5kg Muscle',
    location: '1-on-1 & Online'
  },
  {
    id: 'img-02',
    number: '02',
    category: 'Personal Training',
    categoryTag: 'Photo 02 — PRIVATE FACILITY',
    title: 'PRIVATE ATHLETIC TRAINING SUITE',
    subtitle: 'Exclusive 1-on-1 Gym Environment',
    description: 'State-of-the-art biomechanical equipment in a distraction-free, fully climate-controlled luxury training space.',
    imageUrl: 'https://res.cloudinary.com/dirfcqs1f/image/upload/v1786673200/WhatsApp_Image_2026-08-14_at_04.15.31_whic4o.jpg',
    stats: '1-on-1 VIP Athletic Suite',
    location: 'Private Studio'
  },
  {
    id: 'img-03',
    number: '03',
    category: 'Technique',
    categoryTag: 'Photo 03 — BIOMECHANICS',
    title: 'DEADLIFT FORM CALIBRATION',
    subtitle: 'Posterior Chain & Spinal Alignment',
    description: 'Real-time velocity tracking and joint angle optimization to maximize deadlift load without lumbar fatigue.',
    imageUrl: 'https://res.cloudinary.com/dirfcqs1f/image/upload/v1786673197/WhatsApp_Image_2026-08-14_at_04.15.49_1_jxmzuq.jpg',
    stats: 'Biomechanical Kinematic Review',
    location: '1-on-1 Facility'
  },
  {
    id: 'img-04',
    number: '04',
    category: 'Conditioning',
    categoryTag: 'Photo 04 — PEAK STAMINA',
    title: 'ATHLETIC WORK CAPACITY',
    subtitle: 'HIIT & Anaerobic Threshold Drills',
    description: 'Multi-stage metabolic conditioning routines engineered for peak stamina and cardiovascular resilience.',
    imageUrl: 'https://res.cloudinary.com/dirfcqs1f/image/upload/v1786673197/WhatsApp_Image_2026-08-11_at_14.00.03_bs6pnf.jpg',
    stats: 'Zone 4/5 Peak Output Conditioning',
    location: 'Performance Studio'
  },
  {
    id: 'img-05',
    number: '05',
    category: 'Strength',
    categoryTag: 'Photo 05 — HYPERTROPHY',
    title: 'V-TAPER UPPER BODY PROTOCOL',
    subtitle: 'Shoulder & Lat Proportions',
    description: 'Strategic lateral and vertical pulling angles to cultivate an aesthetic, proportional V-taper physique.',
    imageUrl: 'https://res.cloudinary.com/dirfcqs1f/image/upload/v1786674278/converted_image_disamn.jpg',
    stats: 'Volume: 18 Sets Progressive Volume',
    location: 'Private Strength Gym'
  },
  {
    id: 'img-06',
    number: '06',
    category: 'Online Coaching',
    categoryTag: 'Photo 06 — ONLINE COACHING',
    title: 'DIGITAL COACHING & CHECK-IN HUB',
    subtitle: 'Weekly Video Audits & Macro Tracker',
    description: 'Seamless global communication, habit adherence scoring, and weekly video consultations anywhere in the world.',
    imageUrl: 'https://res.cloudinary.com/dirfcqs1f/image/upload/v1786674083/guy-training-home_mjofzm.jpg',
    stats: '28+ Countries Globally Supported',
    location: 'Worldwide Virtual'
  }
];

interface VideoCardProps {
  video: VideoItem;
  onOpenModal: (video: VideoItem) => void;
  onGetInTouch?: (serviceName: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onOpenModal, onGetInTouch }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Auto-playing IntersectionObserver: Plays when visible, pauses when scrolled away
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoRef.current) {
              const playPromise = videoRef.current.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => setIsPlaying(true))
                  .catch(() => {
                    if (videoRef.current) {
                      videoRef.current.muted = true;
                      videoRef.current.play().catch(() => {});
                    }
                  });
              }
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-3xl bg-[#0d0d0f] border border-neutral-800 hover:border-neutral-700 transition-all duration-300 shadow-2xl overflow-hidden flex flex-col justify-between"
    >
      {/* Top Media Viewport with subtle dark gradient overlay */}
      <div 
        onClick={() => onOpenModal(video)}
        className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black cursor-pointer"
      >
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.posterUrl}
          loop
          muted={isMuted}
          playsInline
          autoPlay
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
        />

        {/* Cinematic dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-black/20 to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-black/60 pointer-events-none" />

        {/* Top Badges: Category & Video Number */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-auto">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[#d4af37] text-[11px] font-mono font-semibold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            {video.categoryTag}
          </span>

          <div className="flex items-center gap-1.5">
            {/* Sound Toggle Button */}
            <button
              onClick={toggleSound}
              title={isMuted ? 'Unmute Video' : 'Mute Video'}
              className="w-8 h-8 rounded-full bg-black/75 backdrop-blur-md border border-white/15 hover:border-white/40 text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[#2eb886] animate-pulse" />
              )}
            </button>

            {video.tiktokUrl && (
              <a
                href={video.tiktokUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={(e) => e.stopPropagation()}
                title="Watch on TikTok @d.u.b.a.i7"
                className="px-2.5 py-1 rounded-full bg-[#ff0050]/20 hover:bg-[#ff0050]/40 text-[#ff4b72] hover:text-white border border-[#ff0050]/40 text-[10px] font-bold font-mono transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>TikTok</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}

            {/* Expand / Maximize Button */}
            <button
              onClick={() => onOpenModal(video)}
              title="Expand Video"
              className="w-8 h-8 rounded-full bg-black/75 backdrop-blur-md border border-white/15 hover:border-white/40 text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
              aria-label="Expand video"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center Play indicator overlay on hover / paused */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 ${
            isPlaying ? 'opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100' : 'opacity-100 scale-100'
          }`}>
            {isPlaying ? (
              <Pause className="w-5 h-5 text-[#d4af37]" />
            ) : (
              <Play className="w-5 h-5 text-[#d4af37] fill-[#d4af37] translate-x-0.5" />
            )}
          </div>
        </div>

        {/* Bottom subtle auto-play status badge */}
        <div className="absolute bottom-3 left-3.5 flex items-center gap-2 pointer-events-none">
          <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-300/80 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-[#2eb886] animate-ping' : 'bg-neutral-500'}`} />
            {isPlaying ? 'Auto-Playing' : 'Paused Preview'}
          </span>
        </div>
      </div>

      {/* Content & Details Section */}
      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Subtitle / Headline */}
          <h3 className="font-sugo text-lg sm:text-xl font-black uppercase tracking-tight text-white group-hover:text-[#d4af37] transition-colors leading-snug">
            {video.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            {video.description}
          </p>
        </div>

        {/* Metrics Row */}
        <div className="pt-3 border-t border-neutral-800/80 grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded-xl bg-black/40 border border-neutral-800/60">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">Focus</span>
            <span className="font-semibold text-neutral-200 text-[11px] truncate block">{video.focus}</span>
          </div>
          <div className="p-2 rounded-xl bg-black/40 border border-neutral-800/60">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">Location</span>
            <span className="font-semibold text-[#d4af37] text-[11px] truncate block">{video.location}</span>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            onClick={() => onOpenModal(video)}
            className="text-xs font-bold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Watch Video</span>
          </button>

          <button
            onClick={() => onGetInTouch && onGetInTouch(video.title)}
            className="px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-[#d4af37] text-neutral-300 hover:text-black font-semibold text-xs tracking-tight transition-all border border-neutral-800 hover:border-[#d4af37] flex items-center gap-1 cursor-pointer"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

interface ImageCardProps {
  image: ImageItem;
  onOpenModal: (image: ImageItem) => void;
  onGetInTouch?: (serviceName: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onOpenModal, onGetInTouch }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-3xl bg-[#0d0d0f] border border-neutral-800 hover:border-neutral-700 transition-all duration-300 shadow-2xl overflow-hidden flex flex-col justify-between"
    >
      {/* Top Image Viewport */}
      <div 
        onClick={() => onOpenModal(image)}
        className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black cursor-pointer"
      >
        <img
          src={image.imageUrl}
          alt={image.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
        />

        {/* Cinematic dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-black/20 to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-black/60 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-auto">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[#48d89e] text-[11px] font-mono font-semibold tracking-wider uppercase">
            <Camera className="w-3 h-3 text-[#2eb886]" />
            {image.categoryTag}
          </span>

          <button
            onClick={() => onOpenModal(image)}
            title="Zoom Photo"
            className="w-8 h-8 rounded-full bg-black/75 backdrop-blur-md border border-white/15 hover:border-white/40 text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
            aria-label="Zoom Photo"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subtle bottom stat tag */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded-md border border-[#d4af37]/30">
            {image.stats}
          </span>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="font-sugo text-lg sm:text-xl font-black uppercase tracking-tight text-white group-hover:text-[#d4af37] transition-colors leading-snug">
            {image.title}
          </h3>
          <p className="text-xs font-semibold text-[#48d89e] uppercase tracking-wide">
            {image.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            {image.description}
          </p>
        </div>

        <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-3">
          <button
            onClick={() => onOpenModal(image)}
            className="text-xs font-bold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#2eb886]" />
            <span>High-Res View</span>
          </button>

          <button
            onClick={() => onGetInTouch && onGetInTouch(image.title)}
            className="px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-[#d4af37] text-neutral-300 hover:text-black font-semibold text-xs tracking-tight transition-all border border-neutral-800 hover:border-[#d4af37] flex items-center gap-1 cursor-pointer"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

interface ProjectsPageProps {
  content: BannerContent;
  onNavigateHome?: () => void;
  onNavigatePackages?: () => void;
  onGetInTouch?: (serviceName?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  content,
  onNavigateHome,
  onNavigatePackages,
  onGetInTouch,
}) => {
  const [activeMediaFilter, setActiveMediaFilter] = useState<'ALL' | 'VIDEOS' | 'PHOTOS'>('ALL');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedVideoModal, setSelectedVideoModal] = useState<VideoItem | null>(null);
  const [selectedImageModal, setSelectedImageModal] = useState<ImageItem | null>(null);
  const [modalMuted, setModalMuted] = useState<boolean>(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const categories = ['ALL', 'Personal Training', 'Strength', 'Transformation', 'Conditioning', 'Technique', 'Online Coaching'];

  const filteredVideos = GALLERY_VIDEOS.filter((v) => {
    const matchesCat = activeCategory === 'ALL' || v.category === activeCategory;
    return matchesCat;
  });

  const filteredImages = GALLERY_IMAGES.filter((img) => {
    const matchesCat = activeCategory === 'ALL' || img.category === activeCategory;
    return matchesCat;
  });

  const handleOpenModal = (video: VideoItem) => {
    setSelectedVideoModal(video);
    setModalMuted(false);
  };

  const handleCloseModal = () => {
    setSelectedVideoModal(null);
  };

  const handleOpenImageModal = (image: ImageItem) => {
    setSelectedImageModal(image);
  };

  const handleCloseImageModal = () => {
    setSelectedImageModal(null);
  };

  return (
    <div className="space-y-8 sm:space-y-12 pb-12">
      {/* ================= TOP BREADCRUMB & NAVIGATION BAR ================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-[#0e0e11] border border-neutral-800/80 shadow-lg">
        {/* Home Navigation Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateHome && onNavigateHome()}
            className="group relative px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-[#d4af37] text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md"
            title="Return to Home Banner"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d4af37]/30 to-[#2eb886]/30 rounded-xl blur-xs opacity-0 group-hover:opacity-100 transition-opacity" />
            <Home className="relative w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
            <span className="relative font-semibold">Home</span>
          </button>

          {/* Breadcrumb path */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-white font-semibold">Projects</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-neutral-400 font-mono text-[11px]">Training Gallery (16 Assets)</span>
          </div>
        </div>

        {/* Quick Route Shortcuts */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigatePackages && onNavigatePackages()}
            className="px-3.5 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Packages</span>
            <ArrowUpRight className="w-3 h-3 text-[#d4af37]" />
          </button>

          <button
            onClick={() => onGetInTouch && onGetInTouch('General Inquiry')}
            className="px-3.5 py-1.5 rounded-xl bg-[#2eb886]/10 hover:bg-[#2eb886]/20 border border-[#2eb886]/30 text-[#48d89e] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Flame className="w-3 h-3 text-[#2eb886]" />
            <span>Get In Touch</span>
          </button>
        </div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-black border border-neutral-900 shadow-2xl p-6 sm:p-10 md:p-14 text-white text-center"
      >
        {/* Glow ambient background rings */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#2eb886]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          {/* Eyebrow badge and Home pill */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              3. PROJECTS → TRAINING GALLERY
            </div>

            <button
              onClick={() => onNavigateHome && onNavigateHome()}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-[#d4af37] text-neutral-300 hover:text-white text-xs font-medium transition-all cursor-pointer"
            >
              <Home className="w-3 h-3 text-[#d4af37]" />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="font-sugo text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              TRAINING IN <span className="text-[#d4af37]">MOTION</span>
            </h1>
            <p className="text-base sm:text-xl font-bold tracking-wide text-[#48d89e] uppercase">
              Strength. Discipline. Transformation.
            </p>
          </div>

          {/* Description */}
          <p className="text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            A visual collection of Coach Douglas Sebugwawo’s training sessions, client transformations, workouts, and coaching moments.
          </p>

          {/* Tagline / Location pills */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
              1-on-1 Personal Training
            </span>
            <span className="text-neutral-600">•</span>
            <span className="px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-semibold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Worldwide Online Coaching
            </span>
          </div>

          {/* Total Assets Badges */}
          <div className="pt-2 flex items-center justify-center gap-4 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-neutral-800">
              <VideoIcon className="w-3.5 h-3.5 text-[#d4af37]" />
              <strong className="text-white">10</strong> Auto-Play Videos
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-neutral-800">
              <ImageIcon className="w-3.5 h-3.5 text-[#2eb886]" />
              <strong className="text-white">6</strong> Photo Cards
            </span>
          </div>
        </div>
      </motion.section>

      {/* ================= MEDIA TYPE SELECTOR & CATEGORY FILTERS ================= */}
      <div className="space-y-4 border-b border-neutral-900 pb-5">
        {/* Media Selector Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1 rounded-2xl bg-neutral-900 border border-neutral-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveMediaFilter('ALL')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeMediaFilter === 'ALL'
                  ? 'bg-white text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Media (16)</span>
            </button>

            <button
              onClick={() => setActiveMediaFilter('VIDEOS')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeMediaFilter === 'VIDEOS'
                  ? 'bg-[#d4af37] text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <VideoIcon className="w-3.5 h-3.5" />
              <span>Videos (10)</span>
            </button>

            <button
              onClick={() => setActiveMediaFilter('PHOTOS')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeMediaFilter === 'PHOTOS'
                  ? 'bg-[#2eb886] text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Photos (6)</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Filter className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Category Filter:</span>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 font-black'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-850 border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= AUTO-PLAYING VIDEO GALLERY SECTION ================= */}
      {(activeMediaFilter === 'ALL' || activeMediaFilter === 'VIDEOS') && filteredVideos.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-pulse" />
              <h2 className="font-sugo text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                Auto-Playing Video Gallery <span className="text-[#d4af37]">({filteredVideos.length})</span>
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500 hidden sm:inline-block">
              Plays automatically on scroll
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onOpenModal={handleOpenModal}
                onGetInTouch={onGetInTouch}
              />
            ))}
          </div>
        </section>
      )}

      {/* ================= PHOTO & TRANSFORMATION GALLERY SECTION ================= */}
      {(activeMediaFilter === 'ALL' || activeMediaFilter === 'PHOTOS') && filteredImages.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2eb886] animate-pulse" />
              <h2 className="font-sugo text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                Client Transformations & Facility Gallery <span className="text-[#2eb886]">({filteredImages.length})</span>
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500 hidden sm:inline-block">
              High-resolution photo captures
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredImages.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                onOpenModal={handleOpenImageModal}
                onGetInTouch={onGetInTouch}
              />
            ))}
          </div>
        </section>
      )}

      {/* ================= MODAL FULLSCREEN VIDEO PLAYER ================= */}
      <AnimatePresence>
        {selectedVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl rounded-3xl bg-[#0e0e11] border border-neutral-800 shadow-2xl overflow-hidden text-white"
            >
              {/* Header inside modal */}
              <div className="p-4 sm:p-5 border-b border-neutral-800/80 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded-md border border-[#d4af37]/30 uppercase">
                    {selectedVideoModal.categoryTag}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight">
                    {selectedVideoModal.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (modalVideoRef.current) {
                        const next = !modalVideoRef.current.muted;
                        modalVideoRef.current.muted = next;
                        setModalMuted(next);
                      }
                    }}
                    className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 hover:border-white text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Toggle Sound"
                  >
                    {modalMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-[#2eb886]" />}
                  </button>

                  <button
                    onClick={handleCloseModal}
                    className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 hover:border-red-500/60 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Video Player frame */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
                <video
                  ref={modalVideoRef}
                  src={selectedVideoModal.videoUrl}
                  poster={selectedVideoModal.posterUrl}
                  controls
                  autoPlay
                  loop
                  muted={modalMuted}
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Modal Footer with Coach Details and Booking action */}
              <div className="p-5 sm:p-6 bg-[#0a0a0c] border-t border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {selectedVideoModal.description}
                  </p>
                  <p className="text-xs text-neutral-500 font-mono">
                    Focus: <span className="text-neutral-300">{selectedVideoModal.focus}</span> • Location: <span className="text-[#d4af37]">{selectedVideoModal.location}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  {selectedVideoModal.tiktokUrl && (
                    <a
                      href={selectedVideoModal.tiktokUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#ff0050]/20 hover:bg-[#ff0050]/40 text-[#ff4b72] hover:text-white border border-[#ff0050]/40 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Watch On TikTok</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  <button
                    onClick={() => {
                      handleCloseModal();
                      if (onGetInTouch) {
                        onGetInTouch(selectedVideoModal.title);
                      }
                    }}
                    className="get-in-touch-glow w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Train Like This</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#d4af37]" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL FULLSCREEN IMAGE LIGHTBOX ================= */}
      <AnimatePresence>
        {selectedImageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl rounded-3xl bg-[#0e0e11] border border-neutral-800 shadow-2xl overflow-hidden text-white"
            >
              <div className="p-4 sm:p-5 border-b border-neutral-800/80 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono text-[#48d89e] bg-[#2eb886]/10 px-2.5 py-1 rounded-md border border-[#2eb886]/30 uppercase">
                    {selectedImageModal.categoryTag}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight">
                    {selectedImageModal.title}
                  </h3>
                </div>

                <button
                  onClick={handleCloseImageModal}
                  className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 hover:border-red-500/60 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative aspect-[16/10] sm:aspect-video w-full bg-black">
                <img
                  src={selectedImageModal.imageUrl}
                  alt={selectedImageModal.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-5 sm:p-6 bg-[#0a0a0c] border-t border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <p className="text-xs font-bold text-[#48d89e] uppercase tracking-wide">
                    {selectedImageModal.subtitle}
                  </p>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {selectedImageModal.description}
                  </p>
                  <p className="text-xs text-neutral-400 font-mono">
                    {selectedImageModal.stats} • <span className="text-[#d4af37]">{selectedImageModal.location}</span>
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleCloseImageModal();
                    if (onGetInTouch) {
                      onGetInTouch(selectedImageModal.title);
                    }
                  }}
                  className="get-in-touch-glow w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Inquire About Program</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#d4af37]" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= BOTTOM CTA BANNER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-neutral-950 border border-neutral-800 p-8 sm:p-10 text-center space-y-6 relative overflow-hidden"
      >
        <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
          <h3 className="font-sugo text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
            Ready To Train With Purpose?
          </h3>
          <p className="text-sm text-neutral-400">
            Book private 1-on-1 sessions or join our worldwide digital coaching roster today.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigateHome && onNavigateHome()}
            className="px-5 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-[#d4af37] text-white text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Home className="w-4 h-4 text-[#d4af37]" />
            <span>Return to Home</span>
          </button>

          <button
            onClick={() => onGetInTouch && onGetInTouch('Training Gallery Booking')}
            className="get-in-touch-glow px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Start Training With Douglas</span>
            <ArrowUpRight className="w-4 h-4 text-[#d4af37]" />
          </button>

          <button
            onClick={() => onNavigatePackages && onNavigatePackages()}
            className="px-6 py-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-sm font-semibold transition-all cursor-pointer"
          >
            <span>View Packages & Pricing</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

