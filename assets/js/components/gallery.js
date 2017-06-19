import { EventEmitter } from 'events';

import PhotoView from '@components/photoView';

import isMobile from '@utility/isMobile';
import { getPrefixed } from '@utility/vendor';

const gallery = $('#gallery');
const galleryList = gallery.find('.gallery-list');
const galleryItems = gallery.find('.gallery-item');
const itemCount = galleryItems.length;

const mousedown = isMobile() ? 'touchstart' : 'mousedown';
const mousemove = isMobile() ? 'touchmove' : 'mousemove';
const mouseup = isMobile() ? 'touchend' : 'mouseup';
const mouseleave = isMobile() ? 'touchleave' : 'mouseleave';

const click = isMobile() ? 'touchstart' : 'click';

class Gallery extends EventEmitter{

    constructor(){
        super();
        
        this.isDragged = false;

        this.coords = {};
        
        this.direction = '';
        this.dimension = this.getDimension();

        this.current = 0;

        this.threshold = 150;

        this.applyCommonCSS();

        this._UIevents();
    }
    _UIevents(){
        gallery.on(mousedown, (e) => this.handleMouseDown(e))
               .on(mousemove, (e) => this.handleMouseMove(e))
               .on(mouseup, (e) => this.handleMouseUp(e))
               .on(mouseleave, (e) => this.handleMouseUp(e));
        
        if(!isMobile())
            gallery.on(click, '.photo-holder', (e) => this.handleClick(e));

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

        this.isDragged = true;

        this.coords.sx = e.pageX;

        return false;
    }
    handleMouseMove(e){
        if(!this.isDragged) return;

        this.coords.dx = e.pageX - this.coords.sx;
        this.direction = (this.coords.dx < 0) ? 'left' : 'right';

        let position = this.calculatePosition(this.coords.dx);

        this.switchSlide(position, false);

        return false;
    }
    handleMouseUp(e){
        if(!this.isDragged || this.isAnimated) return;

        this.coords.ex = Math.abs(e.pageX - this.coords.sx);

        if(this.coords.ex >= this.threshold){

            if(this.direction === 'left') this.current++;
            if(this.direction === 'right') this.current--;

            if(this.current < 0) this.current = 0;
            if(this.current >= itemCount - 1) this.current = itemCount - 1;

        }

        let position = this.calculatePosition();

        this.isAnimated = true;
        this.switchSlide(position);
        this.clearAnimation();
        
        this.isDragged = false;

        return false;
    }
    handleClick(e){
        let target = $(e.currentTarget),
            src = target.data('src');

        new PhotoView(src);

        return false;
    }
    handleResize(e){
        this.dimension = this.getDimension();

        let position = this.calculatePosition();

        this.switchSlide(position, false);

        return false;
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