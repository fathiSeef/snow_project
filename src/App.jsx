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

// Number of frames loaded immediately when page starts
const INITIAL_FRAMES = 12;

// Number of frames loaded in each background batch
const BATCH_SIZE = 15;

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

  const scrollFrameRef = useRef(0);

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
    // find the closest loaded frame.
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

      // Search forwards if needed
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

    // ----------------------------------------------------------
    // Canvas size
    // ----------------------------------------------------------

    const width = window.innerWidth;
    const height = window.innerHeight;

    if (
      canvas.width !== width ||
      canvas.height !== height
    ) {
      canvas.width = width;
      canvas.height = height;
    }

    // ----------------------------------------------------------
    // Image dimensions
    // ----------------------------------------------------------

    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    if (!imageWidth || !imageHeight) return;

    const imageRatio = imageWidth / imageHeight;
    const canvasRatio = width / height;

    let renderWidth;
    let renderHeight;
    let offsetX;
    let offsetY;

    // ----------------------------------------------------------
    // Cover behavior
    // ----------------------------------------------------------

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

    // ----------------------------------------------------------
    // Draw
    // ----------------------------------------------------------

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
  // LOAD SINGLE FRAME
  // ============================================================

  const loadFrame = (index, priority = false) => {
    return new Promise((resolve) => {
      // Already loaded
      const existingImage = imagesRef.current[index];

      if (
        existingImage &&
        existingImage.complete &&
        existingImage.naturalWidth > 0
      ) {
        resolve(existingImage);
        return;
      }

      // Already loading
      if (loadingRef.current.has(index)) {
        const checkExisting = () => {
          const image = imagesRef.current[index];

          if (
            image &&
            image.complete &&
            image.naturalWidth > 0
          ) {
            resolve(image);
            return;
          }

          if (!loadingRef.current.has(index)) {
            resolve(null);
            return;
          }

          requestAnimationFrame(checkExisting);
        };

        checkExisting();
        return;
      }

      loadingRef.current.add(index);

      const image = new Image();

      // --------------------------------------------------------
      // Browser fetch priority
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

        // Decode before using where supported
        if (image.decode) {
          try {
            await image.decode();
          } catch {
            // Image is still usable if decode fails
          }
        }

        // ------------------------------------------------------
        // Progress
        // ------------------------------------------------------

        const loadedCount = imagesRef.current.filter(
          (img) =>
            img &&
            img.complete &&
            img.naturalWidth > 0
        ).length;

        const percent = Math.floor(
          (loadedCount / TOTAL_FRAMES) * 100
        );

        setLoadedPercent((previous) =>
          Math.max(previous, percent)
        );

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
  // PROGRESSIVE PRELOADING
  // ============================================================

  useEffect(() => {
    let cancelled = false;

    imagesRef.current = [];
    loadingRef.current.clear();

    const loadInitialFrames = async () => {
      // ========================================================
      // STEP 1
      // Load first frame immediately
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
      // Load first 12 frames in parallel
      // ========================================================

      const initialIndexes = [];

      for (
        let i = 1;
        i < Math.min(INITIAL_FRAMES, TOTAL_FRAMES);
        i++
      ) {
        initialIndexes.push(i);
      }

      await Promise.all(
        initialIndexes.map((index) =>
          loadFrame(index, true)
        )
      );

      if (cancelled) return;

      // ========================================================
      // STEP 3
      // Background batches
      // ========================================================

      const loadBatch = async (startIndex) => {
        if (cancelled) return;

        const endIndex = Math.min(
          startIndex + BATCH_SIZE,
          TOTAL_FRAMES
        );

        const batch = [];

        for (let i = startIndex; i < endIndex; i++) {
          batch.push(i);
        }

        await Promise.all(
          batch.map((index) =>
            loadFrame(index, false)
          )
        );

        if (cancelled) return;

        // Small delay between batches
        await new Promise((resolve) => {
          setTimeout(resolve, 50);
        });

        // Continue
        if (endIndex < TOTAL_FRAMES) {
          loadBatch(endIndex);
        }
      };

      // Start after initial frames
      loadBatch(INITIAL_FRAMES);
    };

    // ==========================================================
    // Start loading
    // ==========================================================

    loadInitialFrames();

    return () => {
      cancelled = true;
      loadingRef.current.clear();
    };
  }, []);

  // ============================================================
  // SMART SCROLL PRELOADING
  // ============================================================

  useEffect(() => {
    let preloadTimeout = null;

    const preloadAroundFrame = (frameIndex) => {
      // Load frames around current scroll position
      const start = Math.max(
        0,
        frameIndex
      );

      const end = Math.min(
        TOTAL_FRAMES,
        frameIndex + 8
      );

      for (let i = start; i < end; i++) {
        if (!imagesRef.current[i]) {
          loadFrame(i, true);
        }
      }
    };

    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight;

      const viewportHeight =
        window.innerHeight;

      const scrollable =
        scrollHeight - viewportHeight;

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

      const frame =
        scrollFraction *
        (TOTAL_FRAMES - 1);

      targetFrameRef.current = frame;

      scrollFrameRef.current =
        Math.round(frame);

      // --------------------------------------------------------
      // Smart preload
      // --------------------------------------------------------

      clearTimeout(preloadTimeout);

      preloadTimeout = setTimeout(() => {
        preloadAroundFrame(
          scrollFrameRef.current
        );
      }, 30);
    };

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      handleScroll
    );

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

      clearTimeout(preloadTimeout);
    };
  }, []);

  // ============================================================
  // SMOOTH CANVAS ANIMATION LOOP
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
      // Only redraw when frame changes
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
        requestAnimationFrame(renderLoop);
    };

    animationFrameId =
      requestAnimationFrame(renderLoop);

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
  // RETURN
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