"use client";
import { useEffect, useState } from "react";
import styles from "../styles/Carousel3D.module.css";
import Link from "next/link";

interface CarouselItem {
  imageUrl: string;
  title: string;
  link?: string;
}

interface Carousel3DProps {
  items?: CarouselItem[];
  fixedRadius?: boolean;
}

const Carousel3D: React.FC<Carousel3DProps> = ({
  items = [],
  fixedRadius = true,
}) => {
  const [radius, setRadius] = useState(240);
  const [imageWidth, setImageWidth] = useState(200);
  const [imageHeight, setImageHeight] = useState(300);

  // Default carousel items if none provided
  const defaultItems: CarouselItem[] = [
    {
      imageUrl:
        "https://res.cloudinary.com/djuqnuesr/image/upload/v1746638924/sasun-bughdaryan-oA1aVtEcWaE-unsplash_bmf4ce.jpg",
      title: "Legal FAQ",
      link: "/community-hub/legal",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/djuqnuesr/image/upload/v1746638739/mike-erskine-S_VbdMTsdiA-unsplash_iqgjlg.jpg",
      title: "Cultural Exchange Events",
      link: "/community-hub/events",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/djuqnuesr/image/upload/v1746628369/maegan-martin-6nsGg3Iw37c-unsplash_rmkejz.jpg",
      title: "The Power of Story ",
      link: "/community-hub/stories",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/djuqnuesr/image/upload/v1746640099/austin-kehmeier-lyiKExA4zQA-unsplash_zqwlm0.jpg",
      title: "Give & Get Help",
      link: "/community-hub/help",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/djuqnuesr/image/upload/v1746640579/R_4_jz8tja.png",
      title: "Cominig Soon",
      link: "",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/djuqnuesr/image/upload/v1746640579/R_4_jz8tja.png",
      title: "Cominig Soon",
      link: "",
    },
  ];

  const displayItems = items.length > 0 ? items : defaultItems;

  // Update dimensions based on screen size
  const updateDimensions = () => {
    const width = window.innerWidth;

    if (width < 640) {
      // Mobile
      setRadius(140);
      setImageWidth(120);
      setImageHeight(180);
    } else if (width < 1024) {
      // Tablet
      setRadius(200);
      setImageWidth(160);
      setImageHeight(240);
    } else if (width < 1536) {
      // Desktop
      setRadius(240);
      setImageWidth(200);
      setImageHeight(300);
    } else {
      // Large Desktop
      setRadius(300);
      setImageWidth(250);
      setImageHeight(350);
    }
  };

  useEffect(() => {
    // Initial update
    updateDimensions();

    // Add resize listener
    window.addEventListener("resize", updateDimensions);

    // Clean up
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const autoRotate = true;
    const rotateSpeed = -60;

    setTimeout(init, 1000);

    const dragContainer = document.getElementById(
      "drag-container"
    ) as HTMLDivElement;
    const spinContainer = document.getElementById(
      "spin-container"
    ) as HTMLDivElement;
    if (!spinContainer || !dragContainer) return;

    const elements = Array.from(
      spinContainer.getElementsByClassName(styles["carousel-item"])
    ) as HTMLElement[];

    spinContainer.style.width = `${imageWidth}px`;
    spinContainer.style.height = `${imageHeight}px`;

    const ground = document.getElementById("ground");
    if (ground) {
      ground.style.width = `${radius * 3}px`;
      ground.style.height = `${radius * 3}px`;
    }

    function init() {
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.transform = `rotateY(${
          i * (360 / elements.length)
        }deg) translateZ(${radius}px)`;
        elements[i].style.transition = "transform 1s";
        elements[i].style.transitionDelay = `${(elements.length - i) / 4}s`;

        // Set width and height for each carousel item
        elements[i].style.width = `${imageWidth}px`;
        elements[i].style.height = `${imageHeight}px`;
      }
    }

    function applyTransform(obj: HTMLElement | null) {
      if (!obj) return;
      obj.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`;
    }

    function playSpin(yes: boolean) {
      if (spinContainer) {
        spinContainer.style.animationPlayState = yes ? "running" : "paused";
      }
    }

    let sX = 0,
      sY = 0,
      nX = 0,
      nY = 0,
      desX = 0,
      desY = 0,
      tX = 0,
      tY = 10;
    let timer: number | null = null;

    if (autoRotate) {
      const animationName = rotateSpeed > 0 ? styles.spin : styles.spinRevert;
      spinContainer.style.animation = `${animationName} ${Math.abs(
        rotateSpeed
      )}s infinite linear`;
    }

    document.onpointerdown = function (e) {
      clearInterval(timer as unknown as number);

      e = e || window.event;
      sX = e.clientX;
      sY = e.clientY;

      document.onpointermove = function (e) {
        e = e || window.event;
        nX = e.clientX;
        nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;

        applyTransform(dragContainer);

        sX = nX;
        sY = nY;
      };

      document.onpointerup = function () {
        timer = setInterval(function () {
          desX *= 0.95;
          desY *= 0.95;
          tX += desX * 0.1;
          tY += desY * 0.1;

          applyTransform(dragContainer);
          playSpin(false);

          if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
            clearInterval(timer as unknown as number);
            playSpin(true);
          }
        }, 17) as unknown as number;

        document.onpointermove = document.onpointerup = null;
      };

      return false;
    };

    if (!fixedRadius) {
      let wheelTimeout: number | null = null;

      dragContainer.addEventListener(
        "wheel",
        (e: WheelEvent) => {
          e.preventDefault();

          if (wheelTimeout) clearTimeout(wheelTimeout);

          wheelTimeout = setTimeout(() => {
            const maxChange = 20;
            const d = Math.max(-maxChange, Math.min(maxChange, e.deltaY / -10));

            const minRadius = 150;
            const maxRadius = 350;
            const newRadius = Math.max(
              minRadius,
              Math.min(maxRadius, radius + d)
            );
            setRadius(newRadius);

            init();
          }, 50) as unknown as number;
        },
        { passive: false }
      );
    }

    return () => {
      document.onpointerdown = null;
      document.onpointermove = null;
      document.onpointerup = null;
      if (timer) clearInterval(timer as unknown as number);

      if (!fixedRadius && dragContainer) {
        dragContainer.removeEventListener("wheel", () => {});
      }
    };
  }, [fixedRadius, radius, imageWidth, imageHeight]);

  return (
    <div id="drag-container" className={styles["drag-container"]}>
      <div id="spin-container" className={styles["spin-container"]}>
        {displayItems.map((item, index) => (
          <div
            key={`item-${index}`}
            className={styles["carousel-item"]}
            style={{
              backgroundImage: `url(${item.imageUrl})`,
              width: `${imageWidth}px`,
              height: `${imageHeight}px`,
            }}
          >
            <div className={styles["carousel-overlay"]}>
              <h3 className={styles["carousel-title"]}>{item.title}</h3>
              {item.link && (
                <Link href={item.link} className={styles["carousel-link"]}>
                  Discover More
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        id="ground"
        className={styles.ground}
        style={{ width: `${radius * 3}px`, height: `${radius * 3}px` }}
      ></div>
    </div>
  );
};

export default Carousel3D;
