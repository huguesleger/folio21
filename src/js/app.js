import {intro} from './components/intro';
import {sliderWork} from "./components/lastWorks";
import LocomotiveScroll from 'locomotive-scroll';
import {Draggy} from './components/draggable';

window.App = {};

export const App = window.App;

App.init = function() {
    intro();
    const slideShow = document.querySelector('.work-slider');
    this.scene = new sliderWork(slideShow);
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
    });

    const draggy = document.querySelector('.draggy-container');
    this.dragEl = new Draggy(draggy);

}


/*--------------------------------------------
    load function
---------------------------------------------*/    
window.addEventListener('load', function() {
    App.init();
});