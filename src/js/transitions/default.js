import { gsap } from "gsap";
import {sliderWork} from "../components/lastWorks";
import Splitting from "splitting";
import {customCursor} from '../components/cursor';
import {Draggy} from '../components/draggable';


export const defaultTransition = {
    name: 'default-transition',
    leave() {
        const pageTransition = document.querySelector('.page-transition-backdrop');
      return gsap.to(pageTransition, {
        duration: 1.2,
        ease: 'Power4.easeInOut',
        visibility: 'visible',
        scaleY: 1,
        transformOrigin: 'center bottom'
      })
      
    },
    afterLeave({next, current}) {
      return (current.container).remove();
    },
    beforeEnter() {
        this.cursorCustom = new customCursor;  
        Splitting();
        const slideShow = document.querySelector('.work-slider');
        if (slideShow) {
            this.scene = new sliderWork(slideShow);
        }
        const draggy = document.querySelector('.draggy-container');
        if (draggy) {
            this.dragEl = new Draggy(draggy);
        }
    },
    enter() {
      const $backdrop = document.querySelector('.page-transition-backdrop');
      return gsap.to($backdrop, {
        duration: 1.2,
        ease: 'Power4.easeInOut',
        scaleY: 0,
        transformOrigin: 'center top',
        onComplete: () => gsap.set($backdrop, {clearProps: 'transform,transformOrigin,visibility'})
      })
    }
  };