const LOAD_TIME = 2000;
const loaderHolder = $('#loader-holder');

class Loader{

    constructor(){
        this._UIevents();       
    }

    _UIevents(){
        $(window).on('load', (e) => this.loaded(e));
    }

    loaded(e){

        let timer = setTimeout(() => {

            loaderHolder.addClass('__loaded');
            clearTimeout(timer);

        }, LOAD_TIME);

        return false;
    }
}

export default Loader;