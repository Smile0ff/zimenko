const page = $('#page');
const photoViewHolder = $('#photo-view');
const photoContainer = $('#photo-container');

class PhotoView{

    constructor(src){
        if(!src)
            throw new Error('Path to original photo is required');

        page.addClass('__photo-active');
        photoContainer.addClass('__loading');

        this._loadPhoto(src);
    }
    _loadPhoto(src){
        let photo = new Image();

        photo.onload = () => this.updatePhoto(photo);

        photo.src = src;
    }
    updatePhoto(photo){
        photoContainer.html(photo).removeClass('__loading');
    }
}

export default PhotoView;