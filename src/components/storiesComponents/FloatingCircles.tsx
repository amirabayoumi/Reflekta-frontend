"use client";
import Link from "next/link";
import { useState, useMemo, useRef, useEffect } from "react";
import type { Story } from "@/types";

interface FloatingCirclesProps {
  stories: Story[];
}

const FloatingCircles: React.FC<FloatingCirclesProps> = ({ stories }) => {
  // Track if we're mounted on the client
  const [isMounted, setIsMounted] = useState(false);

  // Use deterministic initial positions instead of random
  const decorativeCircles = useMemo(() => {
    const numSmallCircles = 25;
    const numLargeCircles = 5;

    // Generate small decorative circles with deterministic positions
    const smallCircles = Array.from({ length: numSmallCircles }, (_, i) => {
      const size = 30 + ((i * 13) % 40);
      const opacity = 0.1 + ((i * 7) % 30) / 100;
      // Deterministic positions based on index
      const top = `${10 + (i % 8) * 10}%`;
      const left = `${5 + (i % 10) * 9}%`;
      return {
        id: `decorative-${i}`,
        size,
        opacity,
        top,
        left,
      };
    });

    // Generate story-sized decorative circles with deterministic positions
    const largeCircles = Array.from({ length: numLargeCircles }, (_, i) => {
      const size = 140;
      const opacity = 0.05 + ((i * 3) % 10) / 100;
      // Deterministic positions
      const top = `${15 + i * 15}%`;
      const left = `${10 + i * 18}%`;
      return {
        id: `decorative-large-${i}`,
        size,
        opacity,
        top,
        left,
      };
    });

    return [...smallCircles, ...largeCircles];
  }, []);

  const storyCircles = useMemo(() => {
    // Sort stories by created_at with newest first
    const sortedStories = [...stories].sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

    // Format date as "Month Day, Year" (e.g., June 6, 2025)
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    return sortedStories.map((story, idx) => {
      // Deterministic positions for stories
      const top = `${20 + ((idx * 15) % 50)}%`;
      const left = `${20 + ((idx * 20) % 60)}%`;

      // Calculate size based on recency - newer stories are bigger
      // First story (newest) will be 180px, and each subsequent story will be smaller
      const size = Math.max(120, 180 - idx * 15);

      return {
        ...story,
        top,
        left,
        size,
        formattedDate: formatDate(story.created_at),
      };
    });
  }, [stories]);

  // Use a ref for tracking frozen circles for immediate effect (not state)
  const [hoveredCircle, setHoveredCircle] = useState<string | null>(null);
  const frozenCirclesRef = useRef<Record<string, boolean>>({});
  const circleRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const positionsRef = useRef<{ [key: string]: { top: number; left: number } }>(
    {}
  );
  const velocitiesRef = useRef<{ [key: string]: { dx: number; dy: number } }>(
    {}
  );

  // Mark as client-mounted to enable animations
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize velocities only after client-side mounting
  useEffect(() => {
    if (!isMounted) return;

    stories.forEach((story) => {
      velocitiesRef.current[story.id] = {
        dx: Math.random() * 1.2 - 0.6,
        dy: Math.random() * 1.2 - 0.6,
      };
    });

    decorativeCircles.forEach((circle) => {
      velocitiesRef.current[circle.id] = {
        dx: Math.random() * 1.2 - 0.6,
        dy: Math.random() * 1.2 - 0.6,
      };
    });
  }, [isMounted, stories, decorativeCircles]);

  // Only run animation loop after client-side mounting
  useEffect(() => {
    if (!isMounted) return;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let initialized = false;

    // Animation setup with a delay
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      // Initialize positions
      Object.entries(circleRefs.current).forEach(([key, el]) => {
        if (!el || !containerRef.current) return;

        // Convert percentage to pixels for initial positions
        const containerRect = containerRef.current.getBoundingClientRect();

        // For story circles
        const story = storyCircles.find((s) => s.id.toString() === key);
        if (story) {
          const topPercent = parseFloat(story.top) / 100;
          const leftPercent = parseFloat(story.left) / 100;
          positionsRef.current[key] = {
            top: containerRect.height * topPercent,
            left: containerRect.width * leftPercent,
          };
          el.style.top = `${positionsRef.current[key].top}px`;
          el.style.left = `${positionsRef.current[key].left}px`;
          return;
        }

        // For decorative circles
        const decCircle = decorativeCircles.find((c) => c.id === key);
        if (decCircle) {
          const topPercent = parseFloat(decCircle.top) / 100;
          const leftPercent = parseFloat(decCircle.left) / 100;
          positionsRef.current[key] = {
            top: containerRect.height * topPercent,
            left: containerRect.width * leftPercent,
          };
          el.style.top = `${positionsRef.current[key].top}px`;
          el.style.left = `${positionsRef.current[key].left}px`;
        }
      });

      initialized = true;

      // Animation loop
      const animate = () => {
        if (!containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();

        Object.entries(circleRefs.current).forEach(([key, el]) => {
          if (!el) return;

          // Check ref directly for frozen state - this is the key change
          if (frozenCirclesRef.current[key]) {
            return; // Skip animation for frozen circles
          }

          // Get current dimensions
          const rect = el.getBoundingClientRect();
          const width = rect.width;
          const height = rect.height;

          // Update position with velocity
          const currentPos = positionsRef.current[key] || { top: 0, left: 0 };
          const velocity = velocitiesRef.current[key] || { dx: 0, dy: 0 };

          currentPos.top += velocity.dy;
          currentPos.left += velocity.dx;

          // Bounce off container walls
          if (
            currentPos.top <= 0 ||
            currentPos.top >= containerRect.height - height
          ) {
            velocity.dy *= -1;
            currentPos.top = Math.max(
              0,
              Math.min(currentPos.top, containerRect.height - height)
            );
          }

          if (
            currentPos.left <= 0 ||
            currentPos.left >= containerRect.width - width
          ) {
            velocity.dx *= -1;
            currentPos.left = Math.max(
              0,
              Math.min(currentPos.left, containerRect.width - width)
            );
          }

          // Store and apply updated position
          positionsRef.current[key] = currentPos;
          el.style.top = `${currentPos.top}px`;
          el.style.left = `${currentPos.left}px`;
        });

        animationFrameId.current = requestAnimationFrame(animate);
      };

      animationFrameId.current = requestAnimationFrame(animate);
    }, 500);

    return () => {
      clearTimeout(timer);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isMounted, storyCircles, decorativeCircles]);

  const handleMouseEnter = (id: string) => {
    // Update the ref directly for immediate effect
    frozenCirclesRef.current[id] = true;
    setHoveredCircle(id); // For visual feedback
  };

  const handleMouseLeave = (id: string) => {
    // Update the ref directly for immediate effect
    delete frozenCirclesRef.current[id];
    setHoveredCircle(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full flex items-center justify-center overflow-hidden"
    >
      {decorativeCircles.map((circle) => (
        <div
          key={circle.id}
          ref={(el) => {
            circleRefs.current[circle.id] = el;
          }}
          className="absolute rounded-full circle"
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            top: circle.top,
            left: circle.left,
            background: `radial-gradient(circle at 30% 30%, rgba(138,109,145,${
              circle.opacity + 0.1
            }), rgba(85,58,92,${circle.opacity}))`,
            boxShadow: `
              0 6px 10px rgba(0,0,0,0.15),
              0 0 6px rgba(0,0,0,0.05) inset,
              0 -3px 5px rgba(255,255,255,0.1) inset
            `,
            zIndex: 1,
            transform: "translateZ(0)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />
      ))}

      {storyCircles.map((story) => (
        <div
          key={story.id}
          ref={(el) => {
            circleRefs.current[story.id.toString()] = el;
          }}
          className={`absolute rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer circle
            ${
              hoveredCircle === story.id.toString()
                ? "scale-110 z-20 ring-4 ring-[#937195]"
                : "scale-100 z-10"
            }
          `}
          style={{
            width: `${story.size}px`,
            height: `${story.size}px`,
            top: story.top,
            left: story.left,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={() => handleMouseEnter(story.id.toString())}
          onMouseLeave={() => handleMouseLeave(story.id.toString())}
        >
          <Link href={`/community-hub/stories/${story.id}`} key={story.id}>
            <div className="flex flex-col items-center justify-center p-3 text-center w-full h-full">
              {/* Show author name instead of user ID */}
              <h4
                className={`font-semibold text-[#553a5c] mb-1 ${
                  story.size >= 150 ? "text-sm" : "text-xs"
                }`}
              >
                {story.user_name ||
                  (story.user && story.user.name) ||
                  "Unknown"}
              </h4>

              {/* Show date information */}
              <p
                className={`text-gray-400 ${
                  story.size >= 150 ? "text-sm" : "text-xs"
                }`}
              >
                {story.formattedDate}
              </p>

              {/* Only show title on larger circles */}
              {story.size > 140 && (
                <p className="text-xs text-gray-600 mt-2 line-clamp-1">
                  &quot;{story.title}&quot;
                </p>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FloatingCircles;
