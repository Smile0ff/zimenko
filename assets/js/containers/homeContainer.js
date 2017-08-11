import * as homeConstants from '@constants/homeConstants';

import Menu from '@components/menu';
import Hold from '@components/hold';
import HeroGallery from '@components/heroGallery';
import ToggleHeader from '@components/toggleHeader';

const page = $('#page');

class HomeContainer{

    constructor(){
        this.menu = new Menu();
        this.hold = new Hold();
        this.gallery = new HeroGallery();
        this.toggleHeader = new ToggleHeader();

        this._listenChanges();
    }

    _listenChanges(){
        this.hold.on(homeConstants.HOLD_ACTIVE, (state) => this.holdState(state));
        this.menu.on(homeConstants.TOGGLE_MENU, (e) => this.toggleHeader.setMenuState(e.isActive));
    }

    holdState(state){
        this.gallery.isEnabled = state.isActive ? true : false;
    }

}

export default HomeContainer;