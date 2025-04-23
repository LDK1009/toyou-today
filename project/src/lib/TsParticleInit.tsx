"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

const TsParticleInit = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
      await loadConfettiPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={{
          preset: "confetti",
          fullScreen: {
            enable: true,
            zIndex: 1,
          },
          particles: {
            color: {
              value: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"],
            },
            shape: {
              type: ["circle", "square", "triangle"],
            },
            opacity: {
              value: { min: 0.3, max: 0.8 },
            },
            size: {
              value: { min: 1, max: 5 },
            },
            move: {
              direction: "top",
              enable: true,
              speed: { min: 3, max: 5 },
            },
          },
          emitters: {
            direction: "top",
            position: {
              x: 50,
              y: 0,
            },
            rate: {
              delay: 0.1,
              quantity: 5,
            },
          },
        }}
      />
    );
  }

  return <></>;
};

export default TsParticleInit;
