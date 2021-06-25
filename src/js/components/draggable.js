import { gsap } from "gsap";
import {MathUtils} from "../utils/math";
const Draggabilly = require('draggabilly');

let containerSize;
const wrapper = document.querySelector('.wrap-picture');
if (wrapper) {
    const calcContainerSize = () => containerSize = {width: wrapper.offsetWidth, height: wrapper.offsetHeight};
    calcContainerSize();
    window.addEventListener('resize', calcContainerSize);
}

let cursor = document.querySelector('.custom-cursor');

class DraggyItem {
    constructor(el) {
        this.DOM = {el: el};
        this.DOM.image = this.DOM.el.querySelector('.draggy-img');
    }
}

export class Draggy {
    constructor(el) {
        this.DOM = {el: el};
        this.DOM.strip = this.DOM.el.querySelector('.draggy');
        this.items = [];
        
        [...this.DOM.strip.querySelectorAll('.draggy-item')].forEach(item => this.items.push(new DraggyItem(item)));

        // The draggable container
        this.DOM.draggable = this.DOM.el.querySelector('.draggable');
        // The width of the draggable container (also the strip container)
        this.draggableWidth = this.DOM.draggable.offsetWidth;
        // The total amount that we can drag the draggable container, so that both the first and last image stay next to the viewport boundary (left and right respectively)
        this.maxDrag = this.draggableWidth < containerSize.width ? 0 : this.draggableWidth - containerSize.width;
        // The current amount (in pixels) that was dragged
        this.dragPosition = 0;

        this.body = document.querySelector('body');
        // Initialize the Draggabilly
        this.draggie = new Draggabilly(this.DOM.draggable, { axis: 'x' });
        this.init();
        this.initEvents();
    }
    init() {
        this.renderedStyles = {
            position: {previous: 0, current: this.dragPosition},
            scale: {previous: 1, current: 1},
            imgScale: {previous: 1, current: 1},
        };

        this.render = () => {
            this.renderId = undefined;
            
            for (const key in this.renderedStyles ) {
                this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, 0.1);
            }
            
            gsap.set(this.DOM.strip, {x: this.renderedStyles.position.previous});
            for (const item of this.items) {
                gsap.set(item.DOM.el, {scale: this.renderedStyles.scale.previous});
                gsap.set(item.DOM.image, {scale: this.renderedStyles.imgScale.previous});
            }


            if ( !this.renderId ) {
                this.renderId = requestAnimationFrame(() => this.render());  
            }
        };
        this.renderId = requestAnimationFrame(() => this.render());
    }
    initEvents() {
        this.onDragStart = () => {
            this.renderedStyles.scale.current = 0.8;
            this.renderedStyles.imgScale.current = 1.6;
            this.body.classList.add('is-draggy');
        };

        this.onDragMove = (event, pointer, moveVector) => {
            // The possible range for the drag is draggie.position.x = [-maxDrag,0 ]
            if ( this.draggie.position.x >= 0 ) {
                // the max we will be able to drag is winsize.width/2
                this.dragPosition = MathUtils.lineEq(0.5*containerSize.width,0, containerSize.width, 0, this.draggie.position.x);
            }
            else if ( this.draggie.position.x < -1*this.maxDrag ) {
                // the max we will be able to drag is winsize.width/2
                this.dragPosition = MathUtils.lineEq(0.5*containerSize.width,0, this.maxDrag+containerSize.width, this.maxDrag, this.draggie.position.x);
            }
            else {
                this.dragPosition = this.draggie.position.x;
            }
            this.renderedStyles.position.current = this.dragPosition;

            cursor.style.transform = `translateX(${(event.clientX)}px) translateY(${event.clientY}px)`;
        };

        this.onDragEnd = () => {
            // reset draggable if out of bounds.
            if ( this.draggie.position.x > 0 ) {
                this.dragPosition = 0;
                this.draggie.setPosition(this.dragPosition, this.draggie.position.y);
            }
            else if ( this.draggie.position.x < -1*this.maxDrag ) {
                this.dragPosition = -1*this.maxDrag;
                this.draggie.setPosition(this.dragPosition, this.draggie.position.y);
            }
            this.renderedStyles.position.current = this.dragPosition;
            this.renderedStyles.scale.current = 1;
            this.renderedStyles.imgScale.current = 1;
            this.body.classList.remove('is-draggy');
        };

        this.draggie.on('pointerDown', this.onDragStart);
        this.draggie.on('dragMove', this.onDragMove);
        this.draggie.on('pointerUp', this.onDragEnd);

        window.addEventListener('resize', () => {
            this.maxDrag = this.draggableWidth < containerSize.width ? 0 : this.draggableWidth - containerSize.width;
            if ( Math.abs(this.dragPosition) + containerSize.width > this.draggableWidth ) {
                const diff = Math.abs(this.dragPosition) + containerSize.width - this.draggableWidth;
                // reset dragPosition
                this.dragPosition = this.dragPosition+diff;
                this.draggie.setPosition(this.dragPosition, this.draggie.position.y);
            }
        });
    }
}