import {intro} from './components/intro';
import {sliderWork} from "./components/lastWorks";

window.App = {};

export const App = window.App;

App.init = function() {
    intro();
    const slideShow = document.querySelector('.work-slider');
    this.scene = new sliderWork(slideShow);
}


/*--------------------------------------------
    load function
---------------------------------------------*/    
window.addEventListener('load', function() {
    App.init();
});