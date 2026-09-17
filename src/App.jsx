import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Experiences from './components/Experiences';
import Industries from './components/Industries';
import PalaceStays from './components/PalaceStays';
import ItineraryBuilder from './components/ItineraryBuilder';
import ConciergePackages from './components/ConciergePackages';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

import './App.css';

// Skipping 001.png (black frame) and starting sequence from 002.png to 100.png
const TOTAL_FRAMES = 99;

const FRAME_URLS = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const frameNum = String(i + 2).padStart(3, '0');
  return `/image-webp/${frameNum}.webp`;
});

export default function App() {
  const canvasRef = useRef(null);
  const targetFrameRef = useRef(0);
  const smoothFrameRef = useRef(0);
  const currentDisplayedFrameRef = useRef(-1);
  const preloadedImagesRef = useRef([]);

  const [loadedPercent, setLoadedPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Draw frame to canvas
  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = preloadedImagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = width / height;

    let renderWidth, renderHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      renderWidth = width;
      renderHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - renderHeight) / 2;
    } else {
      renderWidth = height * imgRatio;
      renderHeight = height;
      offsetX = (width - renderWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  };

  // Preload PNG frames starting from 002.png
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    const handleSingleLoad = (idx) => {
      loadedCount++;
      const percent = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
      setLoadedPercent(percent);

      if (idx === 0) {
        drawFrame(0);
      }

      if (loadedCount >= 5 || loadedCount === TOTAL_FRAMES) {
        setIsLoaded(true);
      }
    };

    FRAME_URLS.forEach((url, idx) => {
      const img = new Image();
      img.src = url;

      if (img.complete && img.naturalWidth > 0) {
        handleSingleLoad(idx);
      } else {
        img.onload = () => handleSingleLoad(idx);
        img.onerror = () => handleSingleLoad(idx);
      }

      images.push(img);
    });

    preloadedImagesRef.current = images;

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
      drawFrame(0);
    }, 400);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Smooth scroll animation loop
  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const scrollFraction = Math.min(1, Math.max(0, window.scrollY / scrollable));
      targetFrameRef.current = scrollFraction * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    let animationFrameId;

    const renderLoop = () => {
      const diff = targetFrameRef.current - smoothFrameRef.current;

      if (Math.abs(diff) > 0.001) {
        smoothFrameRef.current += diff * 0.12;
      } else {
        smoothFrameRef.current = targetFrameRef.current;
      }

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(smoothFrameRef.current))
      );

      if (frameIndex !== currentDisplayedFrameRef.current) {
        drawFrame(frameIndex);
        currentDisplayedFrameRef.current = frameIndex;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const openBookingWithItem = (item) => {
    setSelectedItem(item);
    setBookingModalOpen(true);
  };

  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Frame Animation - Full High Quality PNG HTML5 Canvas (Skipping 001.png) */}
      <canvas ref={canvasRef} className="bg-canvas" />

      {/* Subtle edge vignette */}
      <div className="fixed inset-0 bg-radial from-transparent via-transparent to-[#030712]/70 pointer-events-none z-[1]" />

      {/* Initial Loader */}
      {!isLoaded && (
        <div className="fixed inset-0 bg-[#030712] z-50 flex flex-col items-center justify-center transition-opacity duration-500">
          <div className="w-12 h-12 rounded-full border-2 border-amber-500/20 border-t-amber-400 animate-spin mb-4" />
          <p className="font-serif-luxury text-amber-200 text-sm tracking-widest uppercase">
            Loading Clean Sanctuary • {loadedPercent}%
          </p>
        </div>
      )}

      {/* Foreground Website Content */}
      <div className="relative z-10 flex flex-col gap-12">
        <Navbar onOpenBooking={() => openBookingWithItem(null)} />

        <Hero />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={sectionVariant}
        >
          <AboutUs />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={sectionVariant}
        >
          <Experiences />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={sectionVariant}
        >
          <Industries />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={sectionVariant}
        >
          <PalaceStays onBookHotel={(hotel) => openBookingWithItem(hotel)} />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={sectionVariant}
        >
          <ItineraryBuilder />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={sectionVariant}
        >
          <ConciergePackages />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={sectionVariant}
        >
          <Testimonials />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={sectionVariant}
        >
          <FAQ />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={sectionVariant}
        >
          <CTA onOpenBooking={() => openBookingWithItem(null)} />
        </motion.div>

        <Footer />
      </div>

      {/* Reservation Drawer/Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedItem={selectedItem}
      />
    </div>
  );
}
