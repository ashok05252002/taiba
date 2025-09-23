import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';

const FlyingImage: React.FC = () => {
  const { animationState, clearAnimation } = useCart();
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (animationState) {
      const cartIcon = document.getElementById('header-cart-icon');
      if (!cartIcon) return;

      const cartRect = cartIcon.getBoundingClientRect();
      const startRect = animationState.startRect;

      const animateFly = async () => {
        setIsVisible(true);
        // Start position
        controls.set({
          x: startRect.left,
          y: startRect.top,
          width: startRect.width,
          height: startRect.height,
          opacity: 1,
          scale: 1,
        });

        // Animate to cart
        await controls.start({
          x: cartRect.left + cartRect.width / 2,
          y: cartRect.top + cartRect.height / 2,
          width: 0,
          height: 0,
          opacity: 0.5,
          scale: 0.2,
          transition: { duration: 0.6, ease: 'easeInOut' },
        });

        setIsVisible(false);
        clearAnimation();
      };

      animateFly();
    }
  }, [animationState, controls, clearAnimation]);

  if (!isVisible || !animationState) return null;

  return (
    <motion.img
      src={animationState.image}
      className="fixed top-0 left-0 rounded-lg shadow-lg z-[9999]"
      style={{
        objectFit: 'cover',
      }}
      animate={controls}
    />
  );
};

export default FlyingImage;
