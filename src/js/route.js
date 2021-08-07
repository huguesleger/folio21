import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import {toProjectTransition} from './transitions/project';
import { defaultTransition } from './transitions/default';
import {customCursor} from './components/cursor';
// import {initCursor} from './components/cursor';

export const prefetchPage = (href) => barba.prefetch(href);
export const getCurrentUrl = () => barba.url.getHref();
export const parseQuery = (url) => barba.url.parse(url).query;

export const goToPage = (href) => {
    if (barba.transitions.isRunning) {
      return null;
    } else {
      return barba.go(href);
    }
  };

  const initBarba = () => barba.init({
    debug: true,
    preventRunning: true,
    timeout: 20000,
    cacheIgnore: false,
    transitions: [
      toProjectTransition,
      defaultTransition
    ],
    prevent: ({el, event}) => {
      if (event.type === 'click') {
        if (el.href === window.location.href) {
          event.preventDefault();
          event.stopPropagation();
  
          return true;
        }
      }
    },
    // requestError: (trigger, action, url, response) => {
    //   if (action === 'click' && response.status && response.status === 404) {
    //     goToPage('/404')
    //   }
    //   return false;
    // },
  }); 
  
  export const initRouting = () => {
    const $html = document.querySelector('html');
    // barba.hooks.afterEnter(({next}) => {
    //   });
    barba.hooks.before(() => {
      $html.classList.add('transition-running');
    });
    barba.hooks.leave(() => {
      const cursor = new customCursor();
      cursor.initCursor();
    });
    // barba.hooks.afterLeave(() => {
    //     const cursor = new customCursor();
    //     cursor.initCursor();
    //   });
    barba.hooks.after(() => {
      $html.classList.remove('transition-running');
    });
    barba.use(barbaPrefetch);
    requestAnimationFrame(() => initBarba());
  };