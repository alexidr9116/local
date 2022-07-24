import { useEffect, useRef } from "react";
const BREAK_POINTS = { mobile: 768, tablet: 1024, laptop: 1280 };


export default function useResponsive() {
    const screenSize = useRef();

    useEffect(() => {
        window.addEventListener("resize", () => {
            screenSize.current = window.innerWidth;
        });
        return () => {
            window.removeEventListener("resize", () => {
                screenSize.current = window.innerWidth;
            })
        }
    }, []);

    return { 
        isMobile: screenSize.current < BREAK_POINTS.mobile, 
        isTablet: BREAK_POINTS.mobile < screenSize.current < BREAK_POINTS.tablet, 
        isLaptop: BREAK_POINTS.tablet < screenSize.current < BREAK_POINTS.laptop, 
        isDesktop: BREAK_POINTS.laptop < screenSize.current 
    }
}