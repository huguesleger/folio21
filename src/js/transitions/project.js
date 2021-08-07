import { gsap } from "gsap";
// import {customCursor} from '../components/cursor';

// const blockTransition = () => {
//   const block = document.querySelectorAll('.wrap-transition .transition-block');
//   const tl = gsap.timeline();

//   return new Promise(resolve => {
//   // tl.set(block, {
//   //   scaleX: 0,
//   //   transformOrigin: 'center left',
//   //   ease: "Power2.easeInOut",
//   // })    
//     tl.to(block, {
//       scaleX: 1,
//       transformOrigin: 'center left',
//       duration: 0.4,
//       ease: "Power2.easeInOut",
//       onComplete: () => resolve(),
//     })
// })
// }

export const toProjectTransition = {
    name: 'to-project-transition',
    to: {
      namespace: ['project']
    },
    beforeLeave() {
    },
    leave({next}) {
      const app = document.querySelector('#app');
      app.append(next.container);
      const block = document.querySelectorAll('.wrap-transition .transition-block');
      return gsap.to(block, {
        scaleX: 1,
        transformOrigin: 'center left',
        duration: 1.2,
        ease: "Power2.easeInOut",
      })

    },
    afterLeave({current}) {
        // new customCursor;
      return (current.container).remove();
    },
    enter() {
      const $backdrop = document.querySelector('.page-transition-backdrop');
      return gsap.to($backdrop, {
        duration: 0.6,
        ease: 'none',
        opacity: 0,
        onComplete: () => gsap.set($backdrop, {clearProps: 'transform,transformOrigin,visibility,backgroundColor,opacity'})
      })
    }
  };