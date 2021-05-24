import { gsap } from "gsap";

export class customCursor {
    constructor(cursor, label) {
        this.cursor = cursor;
        this.cursor = document.querySelector('.custom-cursor');
        this.label = label;
        this.label = document.querySelector('.cursor-label');

        this.events();
    }

    events() {
        document.body.addEventListener('mousemove', this.onMouseMove.bind(this));

        const el = document.querySelectorAll([
            "button",
            "a",
            "[data-label-cursor]"
        ]);

        for (var i = 0; i < el.length; i++) {
            el[i].addEventListener('mouseenter', this.onMouseEnter.bind(this));
            el[i].addEventListener('mouseleave', this.onMouseLeave.bind(this));
          }
    }

    onMouseMove(e) {
        const tl = gsap.timeline();
        tl.set(this.cursor, {
            x: e.clientX,
            y: e.clientY,
        })
        .to(this.cursor, {
            duration: 0.2,
            x: e.clientX,
            y: e.clientY,
            opacity: 1,
            visibility: "visible"
        });    
    }

    onMouseEnter(e) {
        this.cursor.classList.add('active');
        
        if (e.target.getAttribute('data-cursor-label')) {
            this.cursor.classList.add('has-label');
            this.label.innerHTML = e.target.getAttribute('data-cursor-label');
        }
    }

    onMouseLeave(e) {
        this.cursor.classList.remove('active');
        
        if (e.target.getAttribute('data-cursor-label')) {
            this.cursor.classList.remove('has-label');
            this.label.innerHTML = "";
        }        
    }
}