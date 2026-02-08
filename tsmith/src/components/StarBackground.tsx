import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import type { IconType } from "react-icons/lib";

// stars are a list of objects of the below properties.
// id, size, x, y, opacity, animationDuration

// Define the star interface
interface Star {
  id: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
  animationDuration: number | any;
}

// ShootingStar
interface ShootingStar {
  id: number;
  icon: IconType;
  size: number;
  x: number;
  y: number;
  delay: number | any;
  animationDuration: number | any;
}

export const StarBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    generateStars();
    generateShootingStars();

    const handleResize = () => {
      generateStars();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 10000,
    );

    const newStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
      });
    }

    setStars(newStars);
  };

  const generateShootingStars = () => {
    const numberOfShootingStars = 4;
    const newShootingStars = [];

    for (let i = 0; i < numberOfShootingStars; i++) {
      newShootingStars.push({
        id: i,
        size: 20,
        icon: FaStar,
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: Math.random() * 15,
        animationDuration: Math.random() * 3 + 3,
      });
    }
    setShootingStars(newShootingStars);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationDuration,
          }}
        />
      ))}

      {shootingStars.map((shootingStar) => {
        const IconComponent = shootingStar.icon;

        return (
          <div
            key={shootingStar.id}
            className="absolute animate-meteor"
            style={{
              left: shootingStar.x + "%",
              top: shootingStar.y + "%",
              animationDelay: shootingStar.delay,
              animationDuration: shootingStar.animationDuration,
            }}
          >
            <IconComponent
              className="animate-shootingStar"
              size={shootingStar.size}
              color="white"
            />
          </div>
        );
      })}
    </div>
  );
};
