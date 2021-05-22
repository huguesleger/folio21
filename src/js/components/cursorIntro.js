import { gsap } from "gsap";

export class cursorEnter {
    constructor() {
        const intro = document.querySelector('.intro');
        intro.addEventListener('mousemove', this.cursorMove);
    }

    cursorMove(e) {
        const loaderCursor = document.querySelector('.intro-cursor');
        const tl = gsap.timeline();
        tl.set(loaderCursor, {
            x: e.clientX,
            y: e.clientY,
        })

        gsap.to(loaderCursor, {
            duration: 0.2,
            x: e.clientX,
            y: e.clientY,
            opacity: 1,
            visibility: "visible"
        });        
    }
}