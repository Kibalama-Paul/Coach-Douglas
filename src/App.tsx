import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Dumbbell,
  Package,
  User,
  Film,
  Phone,
  Home as HomeIcon,
  MessageCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { ScrollCanvas } from './components/ScrollCanvas';
import { BannerView } from './components/BannerView';
import { PackagesPage } from './components/PackagesPage';
import { AboutPage } from './components/AboutPage';
import { ProjectsPage } from './components/ProjectsPage';
import { ShowcaseSection } from './components/ShowcaseSection';
import { ContactSection } from './components/ContactSection';
import { BannerContent } from './types';

const INITIAL_CONTENT: BannerContent = {
  brandName: 'Coach Douglas',
  navLinks: ['Home', 'About', 'Services', 'Projects', 'Packages', 'Contact'],
  ctaText: 'Get in touch',
  greeting: '',
  titleLine1: 'BUILD THE BODY.',
  titleLine2: 'MASTER THE MIND.',
  quoteTitle: 'Dubai Personal Training • Worldwide Online Coaching',
  quoteDescription: 'Elite bespoke hypertrophy, strength, metabolic conditioning, and mindset coaching tailored for high-performing individuals.',
  services: [
    { id: '01', name: 'Dubai Personal Training' },
    { id: '02', name: 'Worldwide Online Coaching' },
    { id: '03', name: 'Nutritional Mastery' },
    { id: '04', name: '8 Years of Experience' },
  ],
  statusBadgeText: 'Accepting New 1-on-1 Dubai & Online Clients',
  showStatusBadge: true,
  themeStyle: 'pure-black',
};

type PageTab = 'home' | 'about' | 'services' | 'projects' | 'packages' | 'contact';

export default function App() {
  const [content] = useState<BannerContent>(INITIAL_CONTENT);
  const [currentPage, setCurrentPage] = useState<PageTab>('home');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedPackageForContact, setSelectedPackageForContact] = useState<string>('');

  const bannerRef = useRef<HTMLDivElement>(null);

  const handleGlobalNavigate = (page: string) => {
    const target = page.toLowerCase();
    if (target.includes('about')) {
      setCurrentPage('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target.includes('service') || target.includes('transform') || target.includes('showcase')) {
      setCurrentPage('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target.includes('project') || target.includes('gallery') || target.includes('motion')) {
      setCurrentPage('projects');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target.includes('package')) {
      setCurrentPage('packages');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target.includes('contact') || target.includes('touch')) {
      setCurrentPage('home');
      setTimeout(() => {
        const contactElem = document.getElementById('contact-section');
        if (contactElem) {
          contactElem.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 900, behavior: 'smooth' });
        }
      }, 50);
    } else {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems: { id: PageTab; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'about', label: 'About', icon: User },
    { id: 'services', label: 'Services', icon: Dumbbell },
    { id: 'projects', label: 'Projects', icon: Film },
    { id: 'packages', label: 'Packages', icon: Package },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <div className="relative min-h-screen bg-transparent text-white flex flex-col selection:bg-[#d4af37] selection:text-black">
      {/* 300-Frame Image Sequence Smooth Scroll Background */}
      <ScrollCanvas totalFrames={300} folderPath="ezgif-1751209da614e755-jpg" />

      {/* Clean Top Navigation Header Bar (Hidden on Mobile, Visible on Desktop) */}
      <header className="hidden md:block border-b border-neutral-800/60 bg-black/70 backdrop-blur-xl sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="relative group cursor-pointer flex items-center gap-3" 
            onClick={() => handleGlobalNavigate('home')}
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d4af37] to-[#2eb886] rounded-xl blur-xs opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-8 h-8 rounded-lg bg-black border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-bold text-sm shadow-sm logo-badge-glow">
                CD
              </div>
            </div>
            <span className="font-bingo text-lg sm:text-xl font-bold tracking-tight text-white logo-color-glow">
              {content.brandName}<span className="text-[#d4af37]">.</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2 max-w-[65vw] sm:max-w-none overflow-x-auto scrollbar-none py-1">
            <div className="flex bg-neutral-950/80 p-1 rounded-2xl border border-neutral-800/80 backdrop-blur-md shrink-0">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id || (item.id === 'contact' && currentPage === 'home');
                return (
                  <button
                    key={item.id}
                    onClick={() => handleGlobalNavigate(item.id)}
                    className={`px-2.5 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap ${
                      currentPage === item.id
                        ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                        : 'text-neutral-300 hover:text-white hover:bg-neutral-900/60'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${currentPage === item.id ? 'text-black' : 'text-[#d4af37]'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content Area - Render Active Page */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* HOME PAGE (Home Hero Banner + Packages Section + Contact Section together) */}
        {currentPage === 'home' && (
          <motion.div
            key="home-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-12"
          >
            {/* Transparent Hero Banner showing the scroll video animation behind */}
            <BannerView
              ref={bannerRef}
              content={content}
              height={900}
              onNavigate={handleGlobalNavigate}
              onGetInTouch={() => {
                const elem = document.getElementById('packages-section') || document.getElementById('contact-section');
                if (elem) {
                  elem.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setSelectedPackageForContact('1-on-1 Dubai & Online Coaching');
                  setContactModalOpen(true);
                }
              }}
            />

            {/* Packages Section (integrated between Banner and Contact) */}
            <div id="packages-section" className="bg-transparent backdrop-blur-[2px] rounded-3xl border border-neutral-900/60 p-2 sm:p-6 shadow-2xl">
              <PackagesPage
                content={content}
                isEmbedded={true}
                onNavigateToHome={() => handleGlobalNavigate('home')}
                onGetInTouch={(pkgName) => {
                  setSelectedPackageForContact(pkgName || 'Personal Training Program');
                  const elem = document.getElementById('contact-section');
                  if (elem) {
                    elem.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setContactModalOpen(true);
                  }
                }}
              />
            </div>

            {/* Contact Section at the bottom of the Home Page */}
            <div id="contact-section" className="bg-transparent backdrop-blur-[2px] rounded-3xl border border-neutral-900/60 p-2 sm:p-6 shadow-2xl">
              <ContactSection
                hideHomeButton={true}
                onNavigateHome={() => handleGlobalNavigate('home')}
              />
            </div>
          </motion.div>
        )}

        {/* ABOUT PAGE */}
        {currentPage === 'about' && (
          <motion.div
            key="about-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-black/60 backdrop-blur-xl rounded-3xl border border-neutral-800/80 p-4 sm:p-8 lg:p-10 shadow-2xl"
          >
            <AboutPage
              content={content}
              onNavigateToHome={() => handleGlobalNavigate('home')}
              onNavigateToPackages={() => handleGlobalNavigate('packages')}
              onGetInTouch={(serviceName) => {
                setSelectedPackageForContact(serviceName || 'Coach Douglas 1-on-1 Consultation');
                setContactModalOpen(true);
              }}
            />
          </motion.div>
        )}

        {/* SERVICES PAGE (Showcase & Core Training Capabilities) */}
        {currentPage === 'services' && (
          <motion.div
            key="services-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-black/60 backdrop-blur-xl rounded-3xl border border-neutral-800/80 p-4 sm:p-8 lg:p-10 shadow-2xl"
          >
            <ShowcaseSection
              onNavigate={handleGlobalNavigate}
              onGetInTouch={(serviceName) => {
                setSelectedPackageForContact(serviceName || 'Personal Training Program');
                setContactModalOpen(true);
              }}
            />
          </motion.div>
        )}

        {/* PROJECTS PAGE */}
        {currentPage === 'projects' && (
          <motion.div
            key="projects-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-black/60 backdrop-blur-xl rounded-3xl border border-neutral-800/80 p-4 sm:p-8 lg:p-10 shadow-2xl"
          >
            <ProjectsPage
              content={content}
              onNavigateHome={() => handleGlobalNavigate('home')}
              onNavigatePackages={() => handleGlobalNavigate('packages')}
              onGetInTouch={(serviceName) => {
                setSelectedPackageForContact(serviceName || 'Training Session Inquiry');
                setContactModalOpen(true);
              }}
            />
          </motion.div>
        )}

        {/* PACKAGES PAGE */}
        {currentPage === 'packages' && (
          <motion.div
            key="packages-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-black/60 backdrop-blur-xl rounded-3xl border border-neutral-800/80 p-4 sm:p-8 lg:p-10 shadow-2xl"
          >
            <PackagesPage
              content={content}
              onNavigateToHome={() => handleGlobalNavigate('home')}
              onGetInTouch={(pkgName) => {
                setSelectedPackageForContact(pkgName || 'Personal Training Program');
                setContactModalOpen(true);
              }}
            />
          </motion.div>
        )}

        {/* CONTACT PAGE (STANDALONE VIEW) */}
        {currentPage === 'contact' && (
          <motion.div
            key="contact-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-transparent backdrop-blur-[2px] rounded-3xl border border-neutral-900/60 p-2 sm:p-6 shadow-2xl"
          >
            <ContactSection
              onNavigateHome={() => handleGlobalNavigate('home')}
            />
          </motion.div>
        )}

      </main>

      {/* Contact / In Touch Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2eb886]" />
                <h3 className="text-lg font-bold text-white">Get in Touch with {content.brandName}</h3>
              </div>
              <button
                onClick={() => setContactModalOpen(false)}
                className="text-neutral-400 hover:text-white text-xs px-2 py-1 bg-neutral-900 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="py-5 space-y-3">
              {selectedPackageForContact && (
                <div className="p-3 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs text-[#d4af37] font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Selected Program: {selectedPackageForContact}
                </div>
              )}
              <p className="text-sm text-neutral-300">
                Ready to transform your physique and mental performance? Apply for VIP Dubai 1-on-1 training or Worldwide Online Coaching.
              </p>
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
                <p className="text-xs text-neutral-400">Direct Inquiries & WhatsApp</p>
                <p className="text-base font-mono font-bold text-white">+971 52 942 1132</p>
                <p className="text-xs text-neutral-400">heavenlydouglas@gmail.com • Dubai, UAE</p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={`https://wa.me/971529421132?text=${encodeURIComponent(
                  `Hi Coach Douglas! I'm interested in ${selectedPackageForContact || 'starting my body transformation and personal training program'}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Chat with Coach Douglas on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setContactModalOpen(false)}
                className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white font-medium text-xs rounded-xl transition-colors cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
