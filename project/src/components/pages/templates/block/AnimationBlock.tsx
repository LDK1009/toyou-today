import { motion, useInView } from "motion/react";
import { ReactNode, useRef } from "react";

// 애니메이션 타입 정의
type AnimationType = "none" | "fadeInToLeft" | "fadeInToRight" | "fadeInToTop" | "fadeInToBottom" | "rotate";

// 애니메이션 블록 속성 정의
interface AnimationBlockProps {
  children: ReactNode;
  animationType: AnimationType;
  duration?: number;
  delay?: number;
}

// 애니메이션 변형(variants) 정의
const variants = {
  none: {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
    transition: {
      duration: 0.5,
      delay: 0,
      ease: "easeInOut",
    },
  },
  fadeInToLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
    transition: {
      duration: 0.5,
      delay: 0,
      ease: "easeInOut",
    },
  },
  fadeInToRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
    transition: {
      duration: 0.5,
      delay: 0,
      ease: "easeInOut",
    },
  },
  fadeInToTop: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      delay: 0,
      ease: "easeInOut",
    },
  },
  fadeInToBottom: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      delay: 0,
      ease: "easeInOut",
    },
  },
  rotate: {
    hidden: { rotate: 360 },
    visible: { rotate: 0 },
    transition: {
      duration: 0.3,
      delay: 0,
      ease: "easeInOut",
    },
  },
};

export const AnimationBlock = ({ children, animationType }: AnimationBlockProps) => {
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef);

  // 다른 모든 애니메이션 타입
  return (
    <div ref={inViewRef}>
      <motion.div
        key={animationType}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants[animationType]}
        transition={variants[animationType].transition}
      >
        {children}
      </motion.div>
    </div>
  );
};
