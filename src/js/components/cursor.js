import { gsap } from "gsap";

export class customCursor {
    constructor(cursor, label) {
        this.cursor = cursor;
        this.cursor = document.querySelector('.custom-cursor');
        this.label = label;
        this.label = document.querySelector('.cursor-label');
        this.icon = document.querySelector('.cursor-icon');
        this.cursorDrag = document.querySelector('.cursor-drag');

        this.events();
        this.initCursor();
    }

    events() {
        document.body.addEventListener('mousemove', this.onMouseMove.bind(this));

        const el = document.querySelectorAll([
            "button",
            "a",
            "[data-cursor-label]",
            "[data-cursor-drag]"
        ]);

        for (var i = 0; i < el.length; i++) {
            el[i].addEventListener('mouseenter', this.onMouseEnter.bind(this));
            el[i].addEventListener('mouseleave', this.onMouseLeave.bind(this));
          }
    }

    initCursor() {
        if(this.cursor.classList.contains('active') || this.cursor.classList.contains('has-label')) {
            this.cursor.classList.remove('active');
            this.cursor.classList.remove('has-label');
            this.label.innerHTML = "";
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
        // if (e.target.getAttribute('data-cursor-drag')) {
        //     this.cursor.classList.add('has-icon');
        //     this.img = document.createElement('img');
        //     this.img.src = img;
        //     this.icon.appendChild(this.img)
        // }
        if (e.target.hasAttribute('data-cursor-drag')) {
            this.cursor.classList.add('has-drag');
            this.arrowLeft = document.createElement('div');
            this.arrowLeft.classList.add('arrow-left');
            this.arrowRight = document.createElement('div');
            this.arrowRight.classList.add('arrow-right');
            this.cursorDrag.appendChild(this.arrowLeft);
            this.cursorDrag.appendChild(this.arrowRight);

        }
    }

    onMouseLeave(e) {
        this.cursor.classList.remove('active');
        
        if (e.target.getAttribute('data-cursor-label')) {
            this.cursor.classList.remove('has-label');
            this.label.innerHTML = "";
        }
        if (e.target.hasAttribute('data-cursor-drag')) {
            this.cursor.classList.remove('has-drag');
            this.arrowLeft = document.querySelector('.arrow-left');
            this.arrowRight = document.querySelector('.arrow-right');
            this.cursorDrag.removeChild(this.arrowLeft);
            this.cursorDrag.removeChild(this.arrowRight);
            // this.img.src = img;
            // this.icon.removeChild(this.img)
        }        
    }
}