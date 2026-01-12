/**
 * AiAutomatiza - Scroll Animation System
 *
 * Lightweight scroll-triggered animations using IntersectionObserver
 * No external dependencies required - pure vanilla JS
 *
 * Usage:
 * 1. Add data-animate attribute to elements:
 *    <div data-animate="fade-up">...</div>
 *
 * 2. Available animations:
 *    - fade-up (default)
 *    - fade-left
 *    - fade-right
 *    - scale
 *
 * 3. For staggered children, add data-animate-stagger to parent:
 *    <div data-animate-stagger>
 *      <div data-animate>Item 1</div>
 *      <div data-animate>Item 2</div>
 *    </div>
 *
 * 4. Custom delay: data-animate-delay="200" (in ms)
 */

// Configuration
const ANIMATION_CONFIG = {
  // Intersection Observer options
  threshold: 0.1, // Trigger when 10% of element is visible
  rootMargin: "0px 0px -50px 0px", // Start animation slightly before fully in view

  // Animation timings
  staggerDelay: 100, // ms between staggered items

  // Debounce for scroll events (parallax)
  debounceMs: 10,
};

/**
 * Initialize scroll-triggered animations
 * Call this function when the DOM is ready
 */
export function initScrollAnimations(): void {
  if (typeof window === "undefined") return;

  // Get all elements with data-animate attribute
  const animatedElements = document.querySelectorAll("[data-animate]");

  if (animatedElements.length === 0) return;

  // Create intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;

          // Apply custom delay if specified
          const delay = element.dataset.animateDelay;
          if (delay) {
            element.style.transitionDelay = `${delay}ms`;
          }

          // Add visible class to trigger animation
          element.classList.add("is-visible");

          // Unobserve after animation (performance optimization)
          observer.unobserve(element);
        }
      });
    },
    {
      threshold: ANIMATION_CONFIG.threshold,
      rootMargin: ANIMATION_CONFIG.rootMargin,
    }
  );

  // Observe all animated elements
  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // Handle staggered children
  initStaggeredAnimations();
}

/**
 * Initialize staggered animations for children
 */
function initStaggeredAnimations(): void {
  const staggerContainers = document.querySelectorAll("[data-animate-stagger]");

  staggerContainers.forEach((container) => {
    const children = container.querySelectorAll("[data-animate]");

    children.forEach((child, index) => {
      const element = child as HTMLElement;
      const delay = index * ANIMATION_CONFIG.staggerDelay;
      element.style.transitionDelay = `${delay}ms`;
    });
  });
}

/**
 * Initialize parallax effects
 * Elements with data-parallax attribute will move at different scroll speeds
 *
 * Usage: <div data-parallax="0.5">...</div>
 * Value is the speed multiplier (0.5 = 50% slower than scroll)
 */
export function initParallaxEffects(): void {
  if (typeof window === "undefined") return;

  const parallaxElements = document.querySelectorAll("[data-parallax]");

  if (parallaxElements.length === 0) return;

  let ticking = false;

  function updateParallax(): void {
    const scrollY = window.scrollY;

    parallaxElements.forEach((el) => {
      const element = el as HTMLElement;
      const speed = parseFloat(element.dataset.parallax || "0.5");
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;

      // Only apply parallax when element is near viewport
      if (
        scrollY + window.innerHeight > elementTop - 200 &&
        scrollY < elementTop + rect.height + 200
      ) {
        const offset = (scrollY - elementTop) * speed * 0.1;
        element.style.transform = `translateY(${offset}px)`;
      }
    });

    ticking = false;
  }

  function onScroll(): void {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  // Initial calculation
  updateParallax();
}

/**
 * Initialize counter animation for statistics
 *
 * Usage: <span data-counter="40">0</span>
 * The element will animate from 0 to the target value
 */
export function initCounterAnimations(): void {
  if (typeof window === "undefined") return;

  const counterElements = document.querySelectorAll("[data-counter]");

  if (counterElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const target = parseInt(element.dataset.counter || "0", 10);
          const suffix = element.dataset.counterSuffix || "";

          animateCounter(element, target, suffix);
          observer.unobserve(element);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  counterElements.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * Animate a number from 0 to target
 */
function animateCounter(
  element: HTMLElement,
  target: number,
  suffix: string
): void {
  const duration = 1200; // ms
  const startTime = performance.now();
  const startValue = 0;

  function easeOutQuart(t: number): number {
    return 1 - Math.pow(1 - t, 4);
  }

  function update(currentTime: number): void {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);
    const currentValue = Math.floor(
      startValue + (target - startValue) * easedProgress
    );

    element.textContent = `${currentValue}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = `${target}${suffix}`;
    }
  }

  requestAnimationFrame(update);
}

/**
 * Initialize all animation systems
 * Call this once when the page loads
 */
export function initAllAnimations(): void {
  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initScrollAnimations();
      initParallaxEffects();
      initCounterAnimations();
    });
  } else {
    initScrollAnimations();
    initParallaxEffects();
    initCounterAnimations();
  }
}

/**
 * Smooth scroll to element
 *
 * Usage: onClick={() => scrollToElement('#section-id')}
 */
export function scrollToElement(selector: string, offset: number = 80): void {
  const element = document.querySelector(selector);

  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }
}

// Auto-initialize when script loads (for direct import in Astro)
if (typeof window !== "undefined") {
  initAllAnimations();
}
