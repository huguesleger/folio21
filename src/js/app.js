import {intro} from './components/intro';
import {sliderWork} from "./components/lastWorks";
import LocomotiveScroll from 'locomotive-scroll';
import {Draggy} from './components/draggable';
// import {observerEl} from './components/observer';
import {navImg} from './components/nav';
import {navOpen} from './components/nav';
import {initRouting} from './route';

window.App = {};

export const App = window.App;

App.init = function() {
    intro();
    navImg();
    navOpen();
    initRouting();

    const slideShow = document.querySelector('.work-slider');
    if (slideShow) {
        this.scene = new sliderWork(slideShow);
    }

    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
    });
    // window.addEventListener("refresh", () => locoScroll.update());


    const draggy = document.querySelector('.draggy-container');
    if (draggy) {
        this.dragEl = new Draggy(draggy);
    }

    // observerEl();

}


/*--------------------------------------------
    load function
---------------------------------------------*/    
window.addEventListener('load', function() {
    App.init();
});