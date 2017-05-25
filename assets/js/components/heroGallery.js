import { getPrefixed } from '@utility/vendor';

const galleryHolder = $('#hero-gallery');
const list = galleryHolder.find('.list-holder');
const items = galleryHolder.find('.item-holder');

const transition = getPrefixed('transition');
const transform = getPrefixed('transform');

class HeroGallery{

    constructor(){
        this.isDragging = false;

        this.threshold = 150;

        this.coords = {};
        this.dimension = {};
        this.positionY = '';

        this.direction = '';

        this.count = items.length;
        this.current = 1;

        this.setDimension();
        this.setPosition();
        this.switchSlide();

        this._events();
    }

    _events(){
        galleryHolder.on('mousedown', (e) => this.dragStart(e))
                     .on('mousemove', (e) => this.dragMove(e))
                     .on('mouseup mouseleave', (e) => this.dragEnd(e));

        $(window).on('resize', (e) => this.resize(e));
    }

    setDimension(){
        this.dimension = {
            w: items.innerWidth(),
            h: items.innerHeight()
        }
    }

    setPosition(diff = 0){
        this.positionY = ((this.current * this.dimension.h) - diff) * -1;
    }

    dragStart(e){
        this.isDragging = true;

        this.coords.sy = e.pageY;

        return false;
    }

    dragMove(e){
        if(!this.isDragging) return;

        this.coords.dy = e.pageY - this.coords.sy;

        this.direction = (this.coords.dy <= 0) ? 'bottom' : 'top';

        if((this.current === 0) && (this.direction === 'top')) this.coords.dy /= 5;
        if((this.current === this.count - 1) && (this.direction === 'bottom')) this.coords.dy /= 5;

        this.setPosition(this.coords.dy);

        this.switchSlide();

        return false;
    }

    dragEnd(e){
        if(!this.isDragging) return;

        this.isDragging = false;

        this.updateCurrent();        

        this.updateBoundaries();

        this.setPosition();

        this.switchSlide(true);

        return false;
    }

    resize(e){

        this.setDimension();
        this.setPosition();
        this.switchSlide(true);

        return false;
    }

    updateCurrent(){
        if((this.direction === 'bottom') && (Math.abs(this.coords.dy) >= this.threshold)) this.current++;
        if((this.direction === 'top') && (Math.abs(this.coords.dy) >= this.threshold)) this.current--;
    }

    updateBoundaries(){
        if(this.current <= 0) this.current = 0;
        if(this.current >= this.count - 1) this.current = this.count - 1;
    }

    switchSlide(hasTransition = false){
        list.css({
            transition: hasTransition ? 'all .4s ease-in-out 0s' : 'none',
            transform: 'translateY('+ this.positionY +'px)'
        });

        items.removeClass('active').eq(this.current).addClass('active');
    }

}

export default HeroGallery;