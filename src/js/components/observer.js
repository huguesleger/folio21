import { gsap } from "gsap";

export const observerEl = function() {

    const threshold = .1
    const options = {
      root: null,
      rootMargin: '0px',
      threshold
    }
    const bgDark = document.querySelector('.bg-dark');

    const tl = gsap.timeline();

    const handleIntersect = function (entries, observer) {

    const wrapper = document.querySelector('.wrap-content');  
      entries.forEach(function (entry) {
          console.log(entry)
        if (entry.intersectionRatio > threshold) {
          entry.target.classList.add('is-reveal');

          if(typeof bgDark !== "undefined"){
            tl.to(bgDark, {
                duration: 0.9,
                opacity: 0,
                onStart: () => {
                    wrapper.classList.add('is-light');
                } 
              })  
          } else {
            return false
          }
        } else {
            entry.target.classList.remove('is-reveal');

            if(typeof bgDark !== "undefined"){
                tl.to(bgDark, {
                    duration: 0.9,
                    opacity: 1,
                    onStart: () => {
                        wrapper.classList.remove('is-light');
                    }  
                  })
            } else {
                return false
            }
        }
      })
    }
    
    window.addEventListener("DOMContentLoaded", function () {
      const observer = new IntersectionObserver(handleIntersect, options)
      const targets = document.querySelectorAll("div[data-observer]");
      targets.forEach(function (target) {
        observer.observe(target)
      })
    }) 
}
observerEl();