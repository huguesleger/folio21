import { gsap } from "gsap";

export const showSection = function() {
    const sections = document.querySelector('.sections');
    const sectionParts = document.querySelector('.scroll-content');
    let anim = false;
    window.addEventListener('scroll', onMouseWheel);
    sectionParts.addEventListener('mousewheel', onMouseWheel, {passive: true});

    const tl = gsap.timeline();

    anim = true;
    tl.to(sections, {
        yPercent: -100,
        duration: 1.5,
        ease: 'Expo.easeInOut',
        onComplete: () => {
            anim = false;
        }
    })

     function onMouseWheel(e) {
        const wrapper = document.querySelector('.scroll-content');
        const pos = wrapper.getBoundingClientRect();
        if(anim) {
            return false;
        }
        if(e.deltaY <=0 && pos.top == 0) {
            anim = true;
            tl.to(sections, {
                yPercent: 0,
                duration: 1.5,
                ease: 'Expo.easeInOut',
                onComplete: () => {
                    anim = false;
                }
            })
        }
    }
}