import {intro} from './components/intro';

window.App = {};

export const App = window.App;

App.init = function() {
    intro();
}


/*--------------------------------------------
    load function
---------------------------------------------*/    
window.addEventListener('load', function() {
    App.init();
});