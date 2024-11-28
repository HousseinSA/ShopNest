import { gsap } from 'gsap';

export const animateModal = (ref: React.RefObject<HTMLDivElement>, isEntering: boolean) => {
    const animationProps = isEntering 
        ? { scale: 0.8, opacity: 0 } 
        : { scale: 1, opacity: 1 };
    const targetProps = isEntering 
        ? { scale: 1, opacity: 1, duration: 0.75, ease: "power3.out" } 
        : { scale: 0.8, opacity: 0, duration: 0.75, ease: "power3.in" };

    gsap.fromTo(ref.current, animationProps, targetProps);
};