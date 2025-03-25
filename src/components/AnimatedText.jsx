'use client'

import React, { useCallback, useEffect } from 'react';
import anime from 'animejs';

const AnimatedHeading = ({ text }) => {
  const runAnimation = useCallback(() => {
    const textWrapper = document.querySelector('.ml1 .letters');
    if (textWrapper) {
      // Wrap each character in a span
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span className='letter'>$&</span>");

      // Run the animation
      anime.timeline()
        .add({
          targets: '.ml1 .letter',
          scale: [0.3, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: 'easeOutExpo',
          duration: 600,
          delay: (el, i) => 70 * (i + 1),
        })
        .add({
          targets: '.ml1',
         // opacity: 0,
          duration: 1000,
          easing: 'easeOutExpo',
          delay: 1000,
        });
    }
  }, [text]); // Added text as a dependency to rerun animation on text change

  useEffect(() => {
    runAnimation();
  }, [runAnimation]);

  return (
    <span className="ml1">
      <span className="text-wrapper">
        <span className="letters">{text}</span>
      </span>
    </span>
  );
};

export default AnimatedHeading;
