"use client"
import { useThemeContext } from '@/context/themeContext';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

export default function BlurAnimation({ position }) {
    const { theme } = useThemeContext();

    // Define gradient class based on the theme
    const gradientClass = theme === 'dark' ? 'gradient-dark' : 'gradient-light';

    // Define position-specific styles
    const positionStyles = {
        'top right': 'top-0 right-[100px]',
        'top left': 'top-0 left-0',
        'bottom left': 'bottom-0 left-0',
        'bottom right': 'bottom-0 right-[100px]',
    };

    // Get the appropriate class for the given position
    const positionClass = positionStyles[position] || '';

    // Render nothing if the theme is not 'dark'
    if (theme !== 'dark') return null;

    return (
        <ParallaxProvider>
            <Parallax speed={-10}>
                <div className={`gradient ${positionClass} ${gradientClass}`}></div>
            </Parallax>
        </ParallaxProvider>
    )
}
