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
// FRAME SETTINGS
// ============================================================

// 001.webp is skipped.
// Animation uses 002.webp → 100.webp.
const TOTAL_FRAMES = 99;

const FRAME_URLS = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const frameNumber = String(i + 2).padStart(3, '0');
  return `/image-webp/${frameNumber}.webp`;
});

// Number of frames to load immediately.
const INITIAL_FRAMES = 15;

// How many images can load at the same time in background.
const MAX_CONCURRENT_LOADS = 6;

// How many frames around current scroll position to prioritize.
const PRELOAD_AHEAD = 10;
const PRELOAD_BEHIND = 5;

export default function App() {
  // ============================================================
  // REFS
  // ============================================================

  const canvasRef = useRef(null);

  const targetFrameRef = useRef(0);
  const smoothFrameRef = useRef(0);
  const currentDisplayedFrameRef = useRef(-1);

  const imagesRef = useRef([]);
  const loadingRef = useRef(new Set());
  const loadedRef = useRef(new Set());

  const loadQueueRef = useRef([]);
  const activeLoadsRef = useRef(0);

  const lastScrollFrameRef = useRef(0);

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

    let image = imagesRef.current[frameIndex];

    // ----------------------------------------------------------
    // If requested frame is not ready,
    // find nearest loaded frame.
    // ----------------------------------------------------------

    if (
      !image ||
      !image.complete ||
      image.naturalWidth === 0
    ) {
      let fallbackIndex = -1;

      // Search backwards
      for (let i = frameIndex; i >= 0; i--) {
        const candidate = imagesRef.current[i];

        if (
          candidate &&
          candidate.complete &&
          candidate.naturalWidth > 0
        ) {
          fallbackIndex = i;
          break;
        }
      }

      // Search forwards
      if (fallbackIndex === -1) {
        for (let i = frameIndex + 1; i < TOTAL_FRAMES; i++) {
          const candidate = imagesRef.current[i];

          if (
            candidate &&
            candidate.complete &&
            candidate.naturalWidth > 0
          ) {
            fallbackIndex = i;
            break;
          }
        }
      }

      if (fallbackIndex === -1) return;

      image = imagesRef.current[fallbackIndex];
    }

    // ==========================================================
    // CANVAS SIZE
    // ==========================================================

    const width = window.innerWidth;
    const height = window.innerHeight;

    if (
      canvas.width !== width ||
      canvas.height !== height
    ) {
      canvas.width = width;
      canvas.height = height;
    }

    // ==========================================================
    // IMAGE SIZE
    // ==========================================================

    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    if (!imageWidth || !imageHeight) return;

    const imageRatio = imageWidth / imageHeight;
    const canvasRatio = width / height;

    let renderWidth;
    let renderHeight;
    let offsetX;
    let offsetY;

    // ==========================================================
    // COVER
    // ==========================================================

    if (canvasRatio > imageRatio) {
      renderWidth = width;
      renderHeight = width / imageRatio;

      offsetX = 0;
      offsetY = (height - renderHeight) / 2;
    } else {
      renderWidth = height * imageRatio;
      renderHeight = height;

      offsetX = (width - renderWidth) / 2;
      offsetY = 0;
    }

    // ==========================================================
    // DRAW
    // ==========================================================

    ctx.clearRect(0, 0, width, height);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      offsetX,
      offsetY,
      renderWidth,
      renderHeight
    );
  };

  // ============================================================
  // UPDATE LOADING PROGRESS
  // ============================================================

  const updateProgress = () => {
    const loadedCount = loadedRef.current.size;

    const percent = Math.floor(
      (loadedCount / TOTAL_FRAMES) * 100
    );

    setLoadedPercent(percent);
  };

  // ============================================================
  // LOAD ONE FRAME
  // ============================================================

  const loadFrame = (index, priority = false) => {
    return new Promise((resolve) => {
      // --------------------------------------------------------
      // Already loaded
      // --------------------------------------------------------

      if (loadedRef.current.has(index)) {
        resolve(imagesRef.current[index]);
        return;
      }

      // --------------------------------------------------------
      // Already loading
      // --------------------------------------------------------

      if (loadingRef.current.has(index)) {
        resolve(null);
        return;
      }

      loadingRef.current.add(index);

      const image = new Image();

      // --------------------------------------------------------
      // Browser priority
      // --------------------------------------------------------

      if ('fetchPriority' in image) {
        image.fetchPriority = priority
          ? 'high'
          : 'low';
      }

      // --------------------------------------------------------
      // Async decoding
      // --------------------------------------------------------

      if ('decoding' in image) {
        image.decoding = 'async';
      }

      image.onload = async () => {
        loadingRef.current.delete(index);

        imagesRef.current[index] = image;

        // Decode image before using it
        if (image.decode) {
          try {
            await image.decode();
          } catch {
            // Ignore decode errors
          }
        }

        loadedRef.current.add(index);

        updateProgress();

        resolve(image);
      };

      image.onerror = () => {
        loadingRef.current.delete(index);

        resolve(null);
      };

      image.src = FRAME_URLS[index];
    });
  };

  // ============================================================
  // CONTROLLED BACKGROUND LOADER
  // ============================================================

  const processQueue = () => {
    while (
      activeLoadsRef.current < MAX_CONCURRENT_LOADS &&
      loadQueueRef.current.length > 0
    ) {
      const nextItem = loadQueueRef.current.shift();

      if (!nextItem) break;

      const {
        index,
        priority,
      } = nextItem;

      // Skip if already loaded/loading
      if (
        loadedRef.current.has(index) ||
        loadingRef.current.has(index)
      ) {
        continue;
      }

      activeLoadsRef.current++;

      loadFrame(index, priority)
        .finally(() => {
          activeLoadsRef.current--;

          // Continue queue
          processQueue();
        });
    }
  };

  // ============================================================
  // ADD FRAME TO QUEUE
  // ============================================================

  const queueFrame = (index, priority = false) => {
    if (index < 0 || index >= TOTAL_FRAMES) {
      return;
    }

    if (loadedRef.current.has(index)) {
      return;
    }

    if (loadingRef.current.has(index)) {
      return;
    }

    // Prevent duplicate queue entries
    const alreadyQueued =
      loadQueueRef.current.some(
        (item) => item.index === index
      );

    if (alreadyQueued) return;

    if (priority) {
      // Put priority frame at front
      loadQueueRef.current.unshift({
        index,
        priority: true,
      });
    } else {
      loadQueueRef.current.push({
        index,
        priority: false,
      });
    }

    processQueue();
  };

  // ============================================================
  // PRIORITIZE FRAMES AROUND CURRENT SCROLL
  // ============================================================

  const prioritizeAroundFrame = (frameIndex) => {
    const start = Math.max(
      0,
      frameIndex - PRELOAD_BEHIND
    );

    const end = Math.min(
      TOTAL_FRAMES - 1,
      frameIndex + PRELOAD_AHEAD
    );

    // ----------------------------------------------------------
    // First prioritize frames in scroll direction.
    // ----------------------------------------------------------

    for (let i = start; i <= end; i++) {
      queueFrame(i, true);
    }
  };

  // ============================================================
  // INITIAL FRAME LOADING
  // ============================================================

  useEffect(() => {
    let cancelled = false;

    // Reset
    imagesRef.current = [];
    loadingRef.current.clear();
    loadedRef.current.clear();
    loadQueueRef.current = [];
    activeLoadsRef.current = 0;

    const startLoading = async () => {
      // ========================================================
      // STEP 1
      // FIRST FRAME
      // ========================================================

      const firstImage = await loadFrame(0, true);

      if (cancelled) return;

      if (firstImage) {
        imagesRef.current[0] = firstImage;

        requestAnimationFrame(() => {
          if (!cancelled) {
            drawFrame(0);
          }
        });

        // Show website immediately
        setLoadedPercent(1);
        setIsLoaded(true);
      }

      // ========================================================
      // STEP 2
      // FIRST 15 FRAMES
      // ========================================================

      for (
        let i = 1;
        i < Math.min(INITIAL_FRAMES, TOTAL_FRAMES);
        i++
      ) {
        queueFrame(i, true);
      }

      // ========================================================
      // STEP 3
      // Queue remaining frames
      // ========================================================

      for (
        let i = INITIAL_FRAMES;
        i < TOTAL_FRAMES;
        i++
      ) {
        queueFrame(i, false);
      }

      // ========================================================
      // Start processing
      // ========================================================

      processQueue();
    };

    startLoading();

    return () => {
      cancelled = true;

      loadQueueRef.current = [];
      loadingRef.current.clear();
    };
  }, []);

  // ============================================================
  // SCROLL HANDLER
  // ============================================================

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      // --------------------------------------------------------
      // Prevent too many calculations per frame
      // --------------------------------------------------------

      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const scrollHeight =
          document.documentElement.scrollHeight;

        const viewportHeight =
          window.innerHeight;

        const scrollable =
          scrollHeight - viewportHeight;

        if (scrollable <= 0) {
          targetFrameRef.current = 0;
          rafId = null;
          return;
        }

        // ------------------------------------------------------
        // Scroll percentage
        // ------------------------------------------------------

        const scrollFraction = Math.min(
          1,
          Math.max(
            0,
            window.scrollY / scrollable
          )
        );

        // ------------------------------------------------------
        // Convert scroll → frame
        // ------------------------------------------------------

        const frame =
          scrollFraction *
          (TOTAL_FRAMES - 1);

        targetFrameRef.current = frame;

        const currentFrame = Math.round(frame);

        // ------------------------------------------------------
        // Only prioritize when frame changes enough
        // ------------------------------------------------------

        if (
          Math.abs(
            currentFrame -
              lastScrollFrameRef.current
          ) >= 2
        ) {
          lastScrollFrameRef.current =
            currentFrame;

          prioritizeAroundFrame(
            currentFrame
          );
        }

        rafId = null;
      });
    };

    // ----------------------------------------------------------
    // Events
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

    // Initial
    handleScroll();

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );

      window.removeEventListener(
        'resize',
        handleScroll
      );

      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // ============================================================
  // SMOOTH FRAME ANIMATION
  // ============================================================

  useEffect(() => {
    let animationFrameId;

    const renderLoop = () => {
      const target =
        targetFrameRef.current;

      const current =
        smoothFrameRef.current;

      const difference =
        target - current;

      // --------------------------------------------------------
      // Smooth interpolation
      // --------------------------------------------------------

      if (Math.abs(difference) > 0.01) {
        smoothFrameRef.current +=
          difference * 0.16;
      } else {
        smoothFrameRef.current = target;
      }

      // --------------------------------------------------------
      // Frame index
      // --------------------------------------------------------

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(
          0,
          Math.round(
            smoothFrameRef.current
          )
        )
      );

      // --------------------------------------------------------
      // Draw only if changed
      // --------------------------------------------------------

      if (
        frameIndex !==
        currentDisplayedFrameRef.current
      ) {
        drawFrame(frameIndex);

        currentDisplayedFrameRef.current =
          frameIndex;
      }

      animationFrameId =
        requestAnimationFrame(
          renderLoop
        );
    };

    animationFrameId =
      requestAnimationFrame(
        renderLoop
      );

    return () => {
      cancelAnimationFrame(
        animationFrameId
      );
    };
  }, []);

  // ============================================================
  // BOOKING
  // ============================================================

  const openBookingWithItem = (item) => {
    setSelectedItem(item);
    setBookingModalOpen(true);
  };

  // ============================================================
  // SECTION ANIMATION
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
    <div
      className="
        relative
        min-h-screen
        text-slate-100
        selection:bg-amber-500/30
        selection:text-amber-200
      "
    >
      {/* ======================================================
          BACKGROUND CANVAS
          ====================================================== */}

      <canvas
        ref={canvasRef}
        className="bg-canvas"
      />

      {/* ======================================================
          VIGNETTE
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
          LOADER
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
          WEBSITE CONTENT
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