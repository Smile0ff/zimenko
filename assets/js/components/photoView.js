const ANIMATION_TIME = 600;

const ESC_CODE = 27;

const page = $('#page');
const photoViewHolder = $('#photo-view');
const photoHolder = photoViewHolder.find('.photo-holder');
const photoContainer = $('#photo-container');

class PhotoView{

    constructor(src){
        if(!src)
            throw new Error('Path to original photo is required');

        this.isLoading = false;

        this.photoSize = {};
        this.dimension = this.getDimension();

        this.multiplier = 0;

        this._loadPhoto(src);

        this._UIevents();
    }
    _UIevents(){
        photoViewHolder.on('mousemove', (e) => this.handleMouseMove(e))
                       .on('click', '.close-photo-view', (e) => this.handleClose(e));

        $(document).on('keydown', (e) => this.handleKeyDown(e));
        $(window).on('resize', (e) => this.handleResize(e));
    }
    getDimension(){
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    }
    _loadPhoto(src){
        let photo = new Image();

        page.addClass('__photo-loading');

        photo.onload = () => {

            this.updatePhoto(photo);
            this.setPhotoSize(photo);
            this.setMultiplier();
            this.activatePhoto();

        };

        photo.src = src;
    }
    updatePhoto(photo){
        photoContainer.html(photo).removeClass('__loading');
    }
    setPhotoSize(photo){
        this.photoSize = {
            w: photo.clientWidth,
            h: photo.clientHeight
        }
    }
    setMultiplier(){
        this.multiplier = ((this.photoSize.h - this.dimension.h) / this.dimension.h) * -1;
    }
    activatePhoto(){
        let timer = setTimeout(() => {
            
            this.isLoading = true;
            page.removeClass('__photo-loading').addClass('__photo-active');

        }, ANIMATION_TIME);
    }
    handleMouseMove(e){
        if(!this.isLoading) return;

        let position = (e.pageY - this.dimension.h / 2) * this.multiplier;

        this.slide(position)

        return false;
    }
    handleClose(e){
        page.removeClass('__photo-active');

        return false;
    }
    handleKeyDown(e){
        let keyCode = e.originalEvent.keyCode;

        if(keyCode !== ESC_CODE) return;

        page.removeClass('__photo-active');

        return false;
    }
    handleResize(e){

        let photo = photoHolder.find('img')[0];

        this.setPhotoSize(photo);
        this.setMultiplier();
        this.activatePhoto();

        return false;
    }
    slide(position = 0){
        photoHolder.css({
            transition: 'all .4s @easing 0s',
            transform: 'translateY('+ position +'px)'
        });
    }

}

export default PhotoView;