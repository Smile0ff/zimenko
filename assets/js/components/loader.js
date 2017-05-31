const LOAD_TIME = 2000;

const body = $('body');
const loaderHolder = $('#loader-holder');

class Loader{

    constructor(){
        this._UIevents();       
    }

    _UIevents(){
        $(window).on('load', (e) => this.loaded(e));
    }

    loaded(e){

        body.removeClass('preload');

        let timer = setTimeout(() => {

            loaderHolder.addClass('__loaded');
            clearTimeout(timer);

        }, LOAD_TIME);

        return false;
    }
}

export default Loader;