import { TOGGLE_MENU } from '@constants/homeConstants';

import Menu from '@components/menu';
import Scroller from '@components/scroller';
import ToggleHeader from '@components/toggleHeader';
import ColorizeLookbook from '@components/ColorizeLookbook';

import isMobile from '@utility/isMobile';

class LookbookContainer{

    constructor(){
        this.menu = new Menu();
        this.toggleHeader = new ToggleHeader();

        if(!isMobile())
            this.scroller = new Scroller();

        if(isMobile())
            this.colorizeLookbook = new ColorizeLookbook();

        this.menu.on(TOGGLE_MENU, (e) => this.toggleHeader.setMenuState(e.isActive));
    }

}

export default LookbookContainer;