import { EventEmitter } from 'events';

import PhotoView from '@components/photoView';

import isMobile from '@utility/isMobile';
import { getPrefixed } from '@utility/vendor';

const galleryHolder = $('.gallery-holder');
const gallery = $('#gallery');
const galleryList = gallery.find('.gallery-list');
const galleryItems = gallery.find('.gallery-item');
const itemCount = galleryItems.length;

const arrows = galleryHolder.find('.arrow');

const KEY_LEFT = 37;
const KEY_RIGHT = 39;

const mousedown = isMobile() ? 'touchstart' : 'mousedown';
const mousemove = isMobile() ? 'touchmove' : 'mousemove';
const mouseup = isMobile() ? 'touchend' : 'mouseup';
const mouseleave = isMobile() ? 'touchleave' : 'mouseleave';

class Gallery extends EventEmitter{

    constructor(){
        super();
        
        this.isDragged = false;

        this.time = {};
        this.coords = {};
        
        this.direction = '';
        this.dimension = this.getDimension();

        this.current = 0;
        this.currentTarget = null;

        this.threshold = isMobile() ? 100 : 150;
        this.clickThreshold = 150;

        this.friction = 5;

        this.applyCommonCSS();

        this._UIevents();
    }
    _UIevents(){
        gallery.on(mousedown, (e) => this.handleMouseDown(e))
               .on(mousemove, (e) => this.handleMouseMove(e))
               .on(mouseup, (e) => this.handleMouseUp(e))
               .on(mouseleave, (e) => this.handleMouseUp(e));

        if(!isMobile()){
            gallery.on('click', '.photo-holder', (e) => this.handlePhotoView(e));
            arrows.on('click', (e) => this.handleArrow(e));

            $(document).on('keydown', (e) => this.handleKey(e));
        }
        
        $(window).on('resize', (e) => this.handleResize(e))
    }
    getDimension(){
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    }
    applyCommonCSS(){
        galleryList.css({ width: itemCount * 100 + '%' });
    }
    handleMouseDown(e){
        if(this.isAnimated) return;

        let x = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].pageX : e.pageX;

        this.isDragged = true;

        this.time.start = Date.now();

        this.coords.sx = x;

        return false;
    }
    handleMouseMove(e){
        if(!this.isDragged) return;

        let x = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].pageX : e.pageX;

        this.coords.dx = x - this.coords.sx;

        this.direction = (this.coords.dx < 0) ? 'left' : 'right';

        if((this.current <= 0 && this.direction === 'right') || (this.current >= itemCount - 1 && this.direction === 'left'))
            this.coords.dx /= this.friction;

        let position = this.calculatePosition(this.coords.dx);

        this.switchSlide(position, false);

        return false;
    }
    handleMouseUp(e){
        if(!this.isDragged || this.isAnimated) return;

        let x = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].pageX : e.pageX;

        this.time.diff = Date.now() - this.time.start;

        this.coords.ex = Math.abs(x - this.coords.sx);

        if((this.coords.ex >= this.threshold) && (this.time.diff >= this.clickThreshold)){

            this.updateCurrent();

            this.checkBoundaries();

        }

        let position = this.calculatePosition();

        this.isAnimated = true;
        this.switchSlide(position);
        this.clearAnimation();
        
        this.isDragged = false;

        return false;
    }
    handlePhotoView(e){
        if(this.time.diff >= this.clickThreshold) return;

        let target = $(e.currentTarget),
            src = target.data('src');

        new PhotoView(src);

        return false;
    }
    handleArrow(e){
        if(this.isAnimated) return;

        let target = $(e.currentTarget);

        this.direction = target.hasClass('arrow-right') ? 'left' : 'right';

        this.updateCurrent();

        this.checkBoundaries();

        let position = this.calculatePosition();

        this.isAnimated = true;
        this.switchSlide(position);
        this.clearAnimation();

        return false;
    }
    handleKey(e){
        if(this.isAnimated) return;

        let keyCode = e.originalEvent.keyCode;

        if(keyCode !== KEY_LEFT && keyCode !== KEY_RIGHT) return;

        this.direction = (keyCode === KEY_RIGHT) ? 'left' : 'right';

        this.updateCurrent();

        this.checkBoundaries();

        let position = this.calculatePosition();

        this.isAnimated = true;
        this.switchSlide(position);
        this.clearAnimation();

        return false;
    }
    handleResize(e){
        this.dimension = this.getDimension();

        let position = this.calculatePosition();

        this.switchSlide(position, false);

        return false;
    }
    updateCurrent(){
        if(this.direction === 'left') this.current++;
        if(this.direction === 'right') this.current--;
    }
    checkBoundaries(){
        if(this.current < 0) this.current = 0;
        if(this.current >= itemCount - 1) this.current = itemCount - 1;
    }
    calculatePosition(diff = 0){
        return ((this.current * this.dimension.w) - diff) * -1;
    }
    switchSlide(position = 0, hasTransition = true){
        galleryList.css({
            transition: hasTransition ? 'all .4s ease-in-out' : 'none',
            transform: 'translateX('+ position +'px)'
        });
    }
    clearAnimation(){
        let timer = setTimeout(() => {
            this.isAnimated = false;
            clearTimeout(timer);
        }, 400);
    }

}

export default Gallery;