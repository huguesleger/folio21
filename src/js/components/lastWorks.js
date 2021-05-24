import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin.js"
import * as PIXI from 'pixi.js';
import fit from "math-fit";
import {loadImages} from "./loadImages";
import Splitting from "splitting";

gsap.registerPlugin(TextPlugin);

Splitting();

export class sliderWork {
    constructor(container) {
        this.container = container;

        this.app = new PIXI.Application({ 
            width: this.viewport.width,
            height: this.viewport.height,
            resolution: window.devicePixelRatio,
            backgroundAlpha: 0,
            autoDensity: true,
            autoResize: true,
           });

        this.containerSlider = document.querySelector('.work-slider');
        this.containerSlider.appendChild(this.app.view);
        this.currentIndex = 0;
        this.isAnimating = false;
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);
        
        const spriteImages 	= document.querySelectorAll( '.work-slider .thumb' );
        const spriteImagesSrc = [];
        
        for ( var i = 0; i < spriteImages.length; i++ ) {
            var image = spriteImages[i];
            spriteImagesSrc.push( image.getAttribute('src' ) );
          }  

        this.images = spriteImagesSrc;
                
        loadImages(this.images,(images)=> {
            this.loadedImages = images;
            this.add();
            this.animateFilter();
            this.showItemWork();
            this.events();
            this.render();
        }); 

        this.slides = this.images.length;
        const SliderItem = document.querySelectorAll('.slider-item');
        SliderItem.forEach(el => el.remove());                 
    }

    add() {

        let parent = {
            w: this.width,
            h: this.height,
          }
          
          this.thumbs = [];
          this.loadedImages.forEach((img, i)=> {
            let texture = PIXI.Texture.from(img.img);
            const sprite = new PIXI.Sprite(texture);
            let container = new PIXI.Container();
            let spriteContainer = new PIXI.Container();
    
            let mask = new PIXI.Sprite(PIXI.Texture.WHITE);
            mask.width = this.width;
            mask.height = this.height;
            
            sprite.mask = mask;
    
            sprite.anchor.set(0.5);
            sprite.position.set(
              sprite.texture.orig.width/2,
              sprite.texture.orig.height/2,
            )
    
            let image = {
              w: sprite.texture.orig.width,
              h: sprite.texture.orig.height,
            }
    
            let cover = fit(image, parent);
    
            spriteContainer.position.set(cover.left,cover.top);
            spriteContainer.scale.set(cover.scale,cover.scale);
    
            container.x = 0;
            container.y = i === 0 ? 0 : -this.height;
          
            spriteContainer.addChild(sprite);
            container.interactive = true;
            container.addChild(spriteContainer);
            container.addChild(mask);
            this.container.addChild(container);
            this.thumbs.push(container);
          });          
    }

    animateFilter() {
        this.displacementSprite = new PIXI.Sprite.from('https://res.cloudinary.com/cdn-data/image/upload/v1513024988/awzuINU_qrktxk.jpg');
        this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
  
        this.displacementFilter.scale.x = 20;
        this.displacementFilter.scale.y = 10;
        this.displacementFilter.autoFit = true;
  
        this.container.filters = [this.displacementFilter];
        this.app.stage.addChild(this.displacementSprite);

    }

    onMoveSliderUp(newIndex) {
        let title = document.querySelectorAll('.item-title .title');
        const currentTitle = title[this.currentIndex];
        const nextTitle = title[newIndex];
        const currentChars = currentTitle.querySelectorAll('.item-title .title .word > .char, .item-title .title .whitespace');
        const nextChars = nextTitle.querySelectorAll('.item-title .title .word > .char, .item-title .title .whitespace');
        const paginationBar = document.querySelector('.work-pagination .bar-line');
        const paginationItem = document.querySelector('.work-pagination .pagination-number-first');
        const currentItem = '0'+[newIndex + 1];
        const currentItemString = currentItem.toString();  

        this.isAnimating = true;

        const tlSettings = {
            staggerVal: 0.018,
            charsDuration: 0.7
        }  

        const tl = gsap.timeline({
            onStart: () => {
                nextTitle.classList.add('active');
                currentTitle.classList.remove('active');
            },
            onComplete: () => {
                this.isAnimating = false;
                this.currentIndex = newIndex;
            }
        });

        tl.clear();

        if(tl.isActive()) {
            return;
          }        

        tl.to(this.thumbs[this.currentIndex], {
            y: -this.height,
            duration: 1.5,
            ease: 'Expo.easeInOut',
        }, 0)
        .fromTo(this.thumbs[newIndex], {
            y: this.height,
        },{
            y: 0,
            ease: 'Expo.easeInOut',
            duration: 1.5,
        }, 0) 
        .to(currentChars, {
            yPercent: -100,
            ease: "Expo.easeInOut",
            duration: tlSettings.charsDuration,
            stagger: tlSettings.staggerVal            
        }, 0)
        .fromTo(nextChars, {
            yPercent: 100,
            },{
            yPercent: 0,
            ease: "Expo.easeInOut",
            duration: tlSettings.charsDuration,
            stagger: tlSettings.staggerVal  
        }, "-=0.5")
        .to(paginationBar, {
            scaleY: (this.currentIndex + 2) / this.images.length,
            duration: 0.5,
            ease: "Expo.easeInOut"
        }, "-=0.9")
        .to(paginationItem, {
            text: currentItemString,
            duration: 0.5,
            ease: "Expo.easeInOut"
        }, "-=0.9")           
    }

    onMoveSliderDown(newIndex) {
        let title = document.querySelectorAll('.item-title .title');
        const currentTitle = title[this.currentIndex];
        const prevTitle = title[newIndex];
        const currentChars = currentTitle.querySelectorAll('.item-title .title .word > .char, .whitespace');
        const prevChars = prevTitle.querySelectorAll('.item-title .title .word > .char, .whitespace');
        const paginationBar = document.querySelector('.work-pagination .bar-line');
        const paginationItem = document.querySelector('.work-pagination .pagination-number-first');
        const currentItem = '0'+[this.currentIndex];
        const currentItemString = currentItem.toString();  

        const tlSettings = {
            staggerVal: 0.018,
            charsDuration: 0.7
        }  

        this.isAnimating = true;
        const tl = gsap.timeline({
            onStart: () => {
                prevTitle.classList.add('active');
                currentTitle.classList.remove('active');
            },
            onComplete: () => {
                this.isAnimating = false;
                this.currentIndex = newIndex;
            }
        });

        tl.clear();

        if(tl.isActive()) {
            return;
          }        

        tl.to(this.thumbs[this.currentIndex], {
            y: this.height,
            duration: 1.5,
            ease: 'Expo.easeInOut',
        }, 0)
        .fromTo(this.thumbs[newIndex], {
            y: -this.height,
        },{
            y: 0,
            ease: 'Expo.easeInOut',
            duration: 1.5,
        }, 0)
        .to(currentChars, {
            yPercent: 100,
            ease: "Expo.easeInOut",
            duration: tlSettings.charsDuration,
            stagger: tlSettings.staggerVal            
        }, 0)
        .fromTo(prevChars, {
            yPercent: -100,
            },{
            yPercent: 0,
            ease: "Expo.easeInOut",
            duration: tlSettings.charsDuration,
            stagger: tlSettings.staggerVal  
        }, "-=0.5")
        .to(paginationBar, {
            scaleY: this.currentIndex / this.images.length,
            duration: 0.5,
            ease: "Expo.easeInOut"
        }, "-=0.9")
        .to(paginationItem, {
            text: currentItemString,
            duration: 0.5,
            ease: "Expo.easeInOut"
        }, "-=0.9")                                     
    }

    showItemWork() {
        const title = document.querySelectorAll('.item-title .title');
        const currentTitle = title[this.currentIndex];
        const currentCharsTitle = currentTitle.querySelectorAll('.item-title .title .word > .char, .item-title .title .whitespace');
        const charsTitle = document.querySelectorAll('.item-title .title .word > .char, .item-title .title .whitespace');
        const paginationBar = document.querySelector('.work-pagination .bar-line');

        const tlSettings = {
            staggerVal: 0.018,
            charsDuration: 0.7
        }

        const tl = gsap.timeline();
        tl.set(charsTitle, {
            yPercent: 100,
        }) 
        .set(paginationBar, {
            scaleY: (this.currentIndex + 1) / this.images.length
          })       
        .to(currentCharsTitle, {
            yPercent: 0,
            ease: "Expo.easeInOut",
            duration: tlSettings.charsDuration,
            stagger: tlSettings.staggerVal
        })        
    }

    onMouseWheel(e) {
        if (this.isAnimating) {
            return false;
        }

        if(e.deltaY > 0) {
            if(this.currentIndex >= 0 && this.currentIndex < this.images.length - 1 ) {
              this.onMoveSliderUp(this.currentIndex + 1 );
            } else {
            //   App.scrollToSection();
            }
        } else {
            if(this.currentIndex > 0 && this.currentIndex < this.images.length) {
                this.onMoveSliderDown(this.currentIndex - 1);
            }
        }        
    }

    events() {
        const wrapper = document.querySelector('.last-works');

        wrapper.addEventListener('mousewheel', this.onMouseWheel.bind(this), {passive: true});
    }

    render() {
        this.app.ticker.add((delta) => {
            this.app.renderer.render(this.container);
            this.displacementSprite.x += 2 * delta;
            this.displacementSprite.y += 5;
        });
    }
    
    get viewport() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        return {
          width,
          height
        };
      }    
}