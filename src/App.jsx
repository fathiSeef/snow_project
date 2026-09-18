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

// ============================================================
// FRAME CONFIGURATION
// ============================================================

// 001.webp is skipped because it is a black frame.
// Animation starts from 002.webp and ends at 100.webp.
const TOTAL_FRAMES = 99;

const FRAME_URLS = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const frameNum = String(i + 2).padStart(3, '0');
  return `/image-webp/${frameNum}.webp`;
});

export default function App() {
  // ============================================================
  // REFS
  // ============================================================

  const canvasRef = useRef(null);

  // Target frame based on page scroll
  const targetFrameRef = useRef(0);

  // Smooth animated frame position
  const smoothFrameRef = useRef(0);

  // Currently displayed frame
  const currentDisplayedFrameRef = useRef(-1);

  // All preloaded images
  const preloadedImagesRef = useRef([]);

  // Prevent duplicate frame loading
  const loadingFramesRef = useRef(new Set());

  // ============================================================
  // STATE
  // ============================================================

  const [loadedPercent, setLoadedPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // ============================================================
  // DRAW FRAME
  // ============================================================

  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // ----------------------------------------------------------
    // Find requested frame
    // ----------------------------------------------------------

    let img = preloadedImagesRef.current[frameIndex];

    // ----------------------------------------------------------
    // If requested frame isn't loaded yet,
    // find the nearest already-loaded frame.
    // ----------------------------------------------------------

    if (!img || !img.complete || img.naturalWidth === 0) {
      let nearestFrame = -1;

      // Search backwards first
      for (let i = frameIndex; i >= 0; i--) {
        const candidate = preloadedImagesRef.current[i];

        if (
          candidate &&
          candidate.complete &&
          candidate.naturalWidth > 0
        ) {
          nearestFrame = i;
          break;
        }
      }

      // If no previous frame exists, search forward
      if (nearestFrame === -1) {
        for (let i = frameIndex + 1; i < TOTAL_FRAMES; i++) {
          const candidate = preloadedImagesRef.current[i];

          if (
            candidate &&
            candidate.complete &&
            candidate.naturalWidth > 0
          ) {
            nearestFrame = i;
            break;
          }
        }
      }

      if (nearestFrame === -1) return;

      img = preloadedImagesRef.current[nearestFrame];
    }

    // ----------------------------------------------------------
    // Canvas dimensions
    // ----------------------------------------------------------

    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    // ----------------------------------------------------------
    // Image dimensions
    // ----------------------------------------------------------

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    if (!imgWidth || !imgHeight) return;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = width / height;

    let renderWidth;
    let renderHeight;
    let offsetX;
    let offsetY;

    // ----------------------------------------------------------
    // Cover behavior
    // Similar to:
    // background-size: cover
    // ----------------------------------------------------------

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

    // ----------------------------------------------------------
    // Draw
    // ----------------------------------------------------------

    ctx.clearRect(0, 0, width, height);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      img,
      offsetX,
      offsetY,
      renderWidth,
      renderHeight
    );
  };

  // ============================================================
  // PROGRESSIVE FRAME PRELOADING
  // ============================================================

  useEffect(() => {
    let cancelled = false;

    const images = [];

    preloadedImagesRef.current = images;

    // ----------------------------------------------------------
    // Load one image
    // ----------------------------------------------------------

    const loadImage = (index, priority = false) => {
      return new Promise((resolve) => {
        // Already loaded
        const existing = images[index];

        if (
          existing &&
          existing.complete &&
          existing.naturalWidth > 0
        ) {
          resolve(existing);
          return;
        }

        // Already being loaded
        if (loadingFramesRef.current.has(index)) {
          const waitForExisting = () => {
            if (cancelled) {
              resolve(null);
              return;
            }

            const loadedImage = images[index];

            if (
              loadedImage &&
              loadedImage.complete &&
              loadedImage.naturalWidth > 0
            ) {
              resolve(loadedImage);
            } else {
              requestAnimationFrame(waitForExisting);
            }
          };

          waitForExisting();
          return;
        }

        loadingFramesRef.current.add(index);

        const img = new Image();

        // ------------------------------------------------------
        // Browser loading priority
        // ------------------------------------------------------

        if ('fetchPriority' in img) {
          img.fetchPriority = priority ? 'high' : 'low';
        }

        // ------------------------------------------------------
        // Async image decoding
        // ------------------------------------------------------

        if ('decoding' in img) {
          img.decoding = 'async';
        }

        img.onload = () => {
          loadingFramesRef.current.delete(index);

          if (cancelled) {
            resolve(null);
            return;
          }

          images[index] = img;

          // ----------------------------------------------------
          // Update progress
          // ----------------------------------------------------

          setLoadedPercent((previous) => {
            const loadedFrames = images.filter(
              (image) =>
                image &&
                image.complete &&
                image.naturalWidth > 0
            ).length;

            const percent = Math.floor(
              (loadedFrames / TOTAL_FRAMES) * 100
            );

            return Math.max(previous, percent);
          });

          resolve(img);
        };

        img.onerror = () => {
          loadingFramesRef.current.delete(index);

          // Don't let one failed image stop the whole animation
          resolve(null);
        };

        img.src = FRAME_URLS[index];
      });
    };

    // ----------------------------------------------------------
    // Load first frame immediately
    // ----------------------------------------------------------

    const startLoading = async () => {
      // ========================================================
      // STEP 1
      // Load only the first frame
      // ========================================================

      const firstImage = await loadImage(0, true);

      if (cancelled) return;

      if (firstImage) {
        images[0] = firstImage;

        // Draw first frame immediately
        requestAnimationFrame(() => {
          if (!cancelled) {
            drawFrame(0);
          }
        });

        setLoadedPercent(1);

        // IMPORTANT:
        // Don't make the user wait for all 99 frames.
        setIsLoaded(true);
      }

      // ========================================================
      // STEP 2
      // Load first 10 frames
      // ========================================================

      const priorityFrames = [];

      for (let i = 1; i < Math.min(10, TOTAL_FRAMES); i++) {
        priorityFrames.push(i);
      }

      await Promise.all(
        priorityFrames.map((index) =>
          loadImage(index, true)
        )
      );

      if (cancelled) return;

      // ========================================================
      // STEP 3
      // Load remaining frames gradually
      // ========================================================

      const loadRemainingFrames = async () => {
        for (let i = 10; i < TOTAL_FRAMES; i++) {
          if (cancelled) return;

          await loadImage(i, false);

          // Small delay so the browser gets breathing room
          await new Promise((resolve) => {
            setTimeout(resolve, 15);
          });
        }
      };

      // ========================================================
      // Use browser idle time
      // ========================================================

      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(
          () => {
            if (!cancelled) {
              loadRemainingFrames();
            }
          },
          {
            timeout: 2000,
          }
        );
      } else {
        setTimeout(() => {
          if (!cancelled) {
            loadRemainingFrames();
          }
        }, 100);
      }
    };

    startLoading();

    // ----------------------------------------------------------
    // Cleanup
    // ----------------------------------------------------------

    return () => {
      cancelled = true;
      loadingFramesRef.current.clear();
    };
  }, []);

  // ============================================================
  // SCROLL → FRAME CONTROL
  // ============================================================

  useEffect(() => {
    let animationFrameId;

    // ----------------------------------------------------------
    // Calculate target frame from scroll
    // ----------------------------------------------------------

    const handleScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (scrollable <= 0) {
        targetFrameRef.current = 0;
        return;
      }

      const scrollFraction = Math.min(
        1,
        Math.max(
          0,
          window.scrollY / scrollable
        )
      );

      targetFrameRef.current =
        scrollFraction * (TOTAL_FRAMES - 1);
    };

    // ----------------------------------------------------------
    // Event listeners
    // ----------------------------------------------------------

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      handleScroll
    );

    // Initial calculation
    handleScroll();

    // ----------------------------------------------------------
    // Smooth rendering loop
    // ----------------------------------------------------------

    const renderLoop = () => {
      const target = targetFrameRef.current;

      const current = smoothFrameRef.current;

      const diff = target - current;

      // Smoothness
      if (Math.abs(diff) > 0.001) {
        smoothFrameRef.current += diff * 0.12;
      } else {
        smoothFrameRef.current = target;
      }

      // Convert to actual frame index
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(
          0,
          Math.round(smoothFrameRef.current)
        )
      );

      // Only redraw when frame changes
      if (
        frameIndex !==
        currentDisplayedFrameRef.current
      ) {
        drawFrame(frameIndex);

        currentDisplayedFrameRef.current =
          frameIndex;
      }

      animationFrameId =
        requestAnimationFrame(renderLoop);
    };

    animationFrameId =
      requestAnimationFrame(renderLoop);

    // ----------------------------------------------------------
    // Cleanup
    // ----------------------------------------------------------

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );

      window.removeEventListener(
        'resize',
        handleScroll
      );

      cancelAnimationFrame(
        animationFrameId
      );
    };
  }, []);

  // ============================================================
  // BOOKING MODAL
  // ============================================================

  const openBookingWithItem = (item) => {
    setSelectedItem(item);
    setBookingModalOpen(true);
  };

  // ============================================================
  // FRAMER MOTION SECTION ANIMATION
  // ============================================================

  const sectionVariant = {
    hidden: {
      opacity: 0,
      y: 40,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // ============================================================
  // JSX
  // ============================================================

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">

      {/* ======================================================
          BACKGROUND FRAME ANIMATION
          002.webp → 100.webp
          ====================================================== */}

      <canvas
        ref={canvasRef}
        className="bg-canvas"
      />

      {/* ======================================================
          SUBTLE EDGE VIGNETTE
          ====================================================== */}

      <div
        className="
          fixed
          inset-0
          bg-radial
          from-transparent
          via-transparent
          to-[#030712]/70
          pointer-events-none
          z-[1]
        "
      />

      {/* ======================================================
          INITIAL LOADER
          Only waits for first frame.
          ====================================================== */}

      {!isLoaded && (
        <div
          className="
            fixed
            inset-0
            bg-[#030712]
            z-50
            flex
            flex-col
            items-center
            justify-center
          "
        >
          <div
            className="
              w-12
              h-12
              rounded-full
              border-2
              border-amber-500/20
              border-t-amber-400
              animate-spin
              mb-4
            "
          />

          <p
            className="
              font-serif-luxury
              text-amber-200
              text-sm
              tracking-widest
              uppercase
            "
          >
            Loading Experience...
          </p>
        </div>
      )}

      {/* ======================================================
          FOREGROUND WEBSITE CONTENT
          ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          gap-12
        "
      >

        {/* Navbar */}
        <Navbar
          onOpenBooking={() =>
            openBookingWithItem(null)
          }
        />

        {/* Hero */}
        <Hero />

        {/* About Us */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: '-80px',
          }}
          variants={sectionVariant}
        >
          <AboutUs />
        </motion.div>

        {/* Experiences */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: '-80px',
          }}
          variants={sectionVariant}
        >
          <Experiences />
        </motion.div>

        {/* Industries */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: '-80px',
          }}
          variants={sectionVariant}
        >
          <Industries />
        </motion.div>

        {/* Palace Stays */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: '-80px',
          }}
          variants={sectionVariant}
        >
          <PalaceStays
            onBookHotel={(hotel) =>
              openBookingWithItem(hotel)
            }
          />
        </motion.div>

        {/* Itinerary Builder */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: '-80px',
          }}
          variants={sectionVariant}
        >
          <ItineraryBuilder />
        </motion.div>

        {/* Concierge Packages */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: '-80px',
          }}
          variants={sectionVariant}
        >
          <ConciergePackages />
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: '-80px',
          }}
          variants={sectionVariant}
        >
          <Testimonials />
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: '-80px',
          }}
          variants={sectionVariant}
        >
          <FAQ />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: '-80px',
          }}
          variants={sectionVariant}
        >
          <CTA
            onOpenBooking={() =>
              openBookingWithItem(null)
            }
          />
        </motion.div>

        {/* Footer */}
        <Footer />

      </div>

      {/* ======================================================
          BOOKING MODAL
          ====================================================== */}

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() =>
          setBookingModalOpen(false)
        }
        selectedItem={selectedItem}
      />

    </div>
  );
}