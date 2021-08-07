import { gsap } from "gsap";
import Splitting from "splitting";
import {cursorEnter} from './cursorIntro';
import {customCursor} from './cursor';

Splitting();

export const intro = function() {  
    const charsName = document.querySelectorAll('.wrap-content.content-name .word > .char, .wrap-content.content-name .whitespace');
    const charsJob = document.querySelectorAll('.wrap-content.content-job .word > .char, .wrap-content.content-job .whitespace');
    const cursor = document.querySelector('.cursor');
    const intro = document.querySelector('.intro');
    const wrapContent = document.querySelectorAll('.wrap-content');

    const tlSettings = {
        staggerVal: 0.015,
        charsDuration: 0.7
    }

    const tl = gsap.timeline();

    tl.set(charsName, {
        yPercent: 100,
        opacity: 0,
    })
    .set(charsJob, {
        yPercent: 100,
        opacity: 0,
    })
    .to(wrapContent, {
        opacity: 1
    })
    .to(charsName, {
        yPercent: 0,
        opacity: 1,
        ease: "Power2.easeInOut",
        duration: tlSettings.charsDuration,
        stagger: tlSettings.staggerVal
    })
    .to(charsName, {
        yPercent: -100,
        opacity: 0,
        delay: 1.2,
        ease: "Power2.easeInOut",
        duration: tlSettings.charsDuration,
        stagger: tlSettings.staggerVal,
        onComplete: function() {
            tl_part2.play();
        }   
    })

    const tl_part2 = gsap.timeline({
        paused: true
    });

    tl.to(charsJob, {
        yPercent: 0,
        opacity: 1,
        ease: "Power2.easeInOut",
        duration: tlSettings.charsDuration,
        stagger: tlSettings.staggerVal,
        onComplete: function() {
            this.cursor = new cursorEnter;
            progressLine();
        }
    })

     function progressLine() {
        const loaderCursor = document.querySelector('.intro-cursor');
        const progressLine = document.querySelector('.circle-line-progress');
        const cursorTxt = document.querySelector('.cursor-txt');
        const colorProgress = '#44ed9b';
        let tl = gsap.timeline({
            paused: true,
            onComplete: (function() {
                loaderCursor.addEventListener('mouseup', animStop);
                loaderCursor.addEventListener('touchend', animStop);
                gsap.to(cursor, {
                    opacity: 0
                })
                gsap.to(charsJob, {
                    yPercent: -100,
                    opacity: 0,
                    ease: "Power2.easeInOut",
                    duration: tlSettings.charsDuration,
                    stagger: tlSettings.staggerVal,
                    onComplete: function() {
                        gsap.to(intro, {
                            opacity: 0,
                            duration: 0.9,
                            onComplete: function() {
                                intro.remove();
                                this.cursorCustom = new customCursor;                         
                            }
                        })
                    }
                })
            }),
        });
    
        tl.fromTo(progressLine, {
            transformOrigin:"center",
            duration: 2
        }, {
            strokeDasharray: "189",
            stroke: colorProgress,
            duration: 2,
            onComplete: function() {
                cursorTxt.remove();
            }
        });
    
        loaderCursor.addEventListener('mousedown', function(e){
            if(e.buttons == 1) {
                tl.play();
                cursorTxt.innerHTML = "Enter";
            } else {
                cursorTxt.innerHTML = "Press";
                return false;
            }
        });
        loaderCursor.addEventListener('touchstart', function(e){
                tl.play();
                cursorTxt.innerHTML = "Enter";
        });

        loaderCursor.addEventListener('touchleave', function(e){
                cursorTxt.innerHTML = "Press";
                return false;
        });
        
        loaderCursor.addEventListener('mouseup', animStop);
        loaderCursor.addEventListener('touchend', animStop);
    
        function animStop() {
            cursorTxt.innerHTML = "Press";
            tl.pause();
          } 
    }
}