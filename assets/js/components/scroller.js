import { EventEmitter } from 'events';

import '@utility/requestFrame';

import { normalizeScroll } from '@utility/normalizeScroll';
import { getPrefixed } from '@utility/vendor';

const mouseAccelerator = 40;
const scrollAccelerator = 40;

const galleryHolder = $('#gallery-holder');
const galleryList = $('#gallery-list');
const galleryItems = galleryList.find('.gallery-item');
const galleryItemsCount = galleryItems.length;

const scrollProgress = $('#scroll-progress');

const transition = getPrefixed('transition');
const transform = getPrefixed('transform');

class Scroller extends EventEmitter{

    constructor(){
        super();
        
        this.isPressed = false;
        this.isAnimated = false;

        this.dimension = this.getDimension();
        this.totalWidth = this.getTotalWidth();

        this.coords = {};
        this.direction = null;
        this.position = 0;
        this.scrolledPercent = 0;

        this.eventType = '';

        this.loopID = null;

        this._UIevents();

        this.setCSS();    
    }
    _UIevents(){
        galleryHolder.on('mousedown', (e) => this.handleMouseDown(e))
                     .on('mousemove', (e) => this.handleMouseMove(e))
                     .on('mouseup mouseleave', (e) => this.handleMouseUp(e));

        $(document).on('mousewheel DOMMouseScroll', (e) => this.handleMouseWheel(e));

        $(window).on('resize', (e) => this.handleResize(e));
    }
    getDimension(){
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    }
    getTotalWidth(){
        return this.dimension.w * (galleryItemsCount - 1);
    }
    setCSS(){
        let width = galleryItemsCount * 100;

        galleryList.css({ width: width + '%' });
    }
    handleMouseDown(e){
        if(this.isAnimated) return;

        this.isPressed = true;

        this.eventType = 'drag';

        this.coords.sx = e.pageX;

        return false;
    }
    handleMouseMove(e){
        if(!this.isPressed) return;

        this.coords.dx = e.pageX - this.coords.sx;

        this.direction = (this.coords.dx > 0) ? 'right' : 'left';

        this.showDirection();

        if(!this.isAnimated){
            this.isAnimated = true;
            this.loop();
        }

        return false;
    }
    handleMouseUp(e){
        if(!this.isPressed) return;

        this.clearDirection();

        this.stopLoop();

        this.isPressed = false;
        this.isAnimated = false;

        return false;
    }
    handleMouseWheel(e){
        let delta = normalizeScroll(e.originalEvent);

        this.eventType = 'wheel';

        this.direction = (delta < 0) ? 'right' : 'left';

        this.updatePosition();

        this.checkBoundaries();

        this.updateScrolledPercent();

        this.animate();

        return false;
    }
    handleResize(e){
        this.dimension = this.getDimension();
        this.totalWidth = this.getTotalWidth();

        this.position = this.totalWidth / 100 * this.scrolledPercent;

        this.animate();

        return false;
    }
    updatePosition(){
        let accelerator = (this.eventType === 'wheel') ? scrollAccelerator : mouseAccelerator;

        this.position += (this.direction === 'right') ? accelerator : accelerator * -1;
    }
    checkBoundaries(){
        if(this.position <= 0) this.position = 0;
        if(this.position >= this.totalWidth) this.position = this.totalWidth;
    }
    updateScrolledPercent(){
        this.scrolledPercent = (this.position / this.totalWidth) * 100;
    }
    showDirection(){
        if(this.direction === 'left')
            galleryHolder.removeClass('__moving-right').addClass('__moving-left');

        if(this.direction === 'right')
            galleryHolder.removeClass('__moving-left').addClass('__moving-right');
    }
    clearDirection(){
        galleryHolder.removeClass('__moving-left __moving-right');
    }
    animate(){
        galleryList.css({ transform: 'translateX('+ (this.position * -1) +'px)' });
        scrollProgress.css({ transform: 'translateX('+ (this.scrolledPercent - 100) +'%)' });
    }
    loop(){
        this.updatePosition();

        this.checkBoundaries();

        this.updateScrolledPercent();

        this.animate();

        this.loopID = requestAnimationFrame(() => this.loop());
    }
    stopLoop(){
        cancelAnimationFrame(this.loopID)
    }

}

export default Scroller;