import { EventEmitter } from 'events';

import isMobile from '@utility/isMobile';
import { getPrefixed } from '@utility/vendor';

const galleryHolder = $('#gallery-holder');
const galleryList = $('#gallery-list');
const galleryItems = galleryList.find('.gallery-item');
const galleryItemsCount = galleryItems.length;

const mousedown = isMobile() ? 'touchstart' : 'mousedown';
const mousemove = isMobile() ? 'touchmove' : 'mousemove';
const mouseup = isMobile() ? 'touchend' : 'mouseup';
const mouseleave = isMobile() ? 'touchleave' : 'mouseleave';

const transition = getPrefixed('transition');
const transform = getPrefixed('transform');

class Gallery extends EventEmitter{

    constructor(){
        super();

        this.isDragged = false;
        this.isAnimated = false;

        this.dimension = this.getDimension();

        this.coords = {};
        this.direction = null;

        this.current = 0;
        this.currentPosition = 0;

        this._UIevents();
    }
    getDimension(){
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    }
    _UIevents(){
        galleryHolder.on(mousedown, (e) => this.dragStart(e))
                     .on(mousemove, (e) => this.dragMove(e))
                     .on(mouseup, (e) => this.dragEnd(e))
                     .on(mouseleave, (e) => this.dragEnd(e));
    }
    dragStart(e){
        if(this.isAnimated) return;

        this.isDragged = true;

        this.coords.sx = e.pageX;

        return false;
    }
    dragMove(e){
        if(!this.isDragged || this.isAnimated) return;

        this.coords.dx = e.pageX - this.coords.sx;

        this.direction = (this.coords.dx < 0) ? 'left' : 'right';

        this.setCurrentPosition(this.coords.dx);

        this.switchSlide();

        return false;
    }
    dragEnd(e){
        if(!this.isDragged  || this.isAnimated) return;

        this.isDragged = false;

        this.updateCurrent();
        this.checkBoundaries();

        this.setCurrentPosition();

        this.switchSlide(true);

        return false;
    }
    setCurrentPosition(diff = 0){
        this.currentPosition = ((this.current * this.dimension.w) - diff) * -1;
    }
    updateCurrent(){
        if(this.direction === 'left') this.current++;
        if(this.direction === 'right') this.current--;
    }
    checkBoundaries(){
        if(this.current <= 0) this.current = 0;
        if(this.current >= galleryItemsCount - 1) this.current = galleryItemsCount - 1;
    }
    switchSlide(hasTransition = false){

        galleryList.css({
            transition: hasTransition ? 'all .2s ease-in-out' : 'none',
            transform: 'translateX('+ this.currentPosition +'px)'
        });

    }

}

export default Gallery;