export const observerEl = function() {

    const threshold = .1
    const options = {
      root: null,
      rootMargin: '0px',
      threshold
    }
    const header = document.querySelector('.header');

    const handleIntersect = function (entries, observer) {
      entries.forEach(function (entry) {
          console.log(entry)
        if (entry.isIntersecting == true) {
          header.classList.add('is-light');
        } else {
          header.classList.remove('is-light');
        }
      })
    }
    
    window.addEventListener("DOMContentLoaded", function () {
      const observer = new IntersectionObserver(handleIntersect, options)
      const targets = document.querySelectorAll(".section-dark");
      targets.forEach(function (target) {
        observer.observe(target)
      })
    }) 
}
observerEl();