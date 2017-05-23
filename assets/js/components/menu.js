const page = $('#page');
const openButton = $('#open-menu-button');
const closeButton = $('#close-menu-button');

class Menu{

    constructor(){
        
        this._events();
    }

    _events(){
        openButton.on('click', (e) => this.open(e));
        closeButton.on('click', (e) => this.close(e));
    }

    open(e){
        page.addClass('__menu-active');

        return false;
    }

    close(e){
        page.removeClass('__menu-active');

        return false;
    }

}

export default Menu;