import { TOGGLE_MENU } from '@constants/homeConstants';

import Menu from '@components/menu';
import ToggleHeader from '@components/toggleHeader';

class AboutContainer{

    constructor(){
        this.menu = new Menu();
        this.toggleHeader = new ToggleHeader();

        this.menu.on(TOGGLE_MENU, (e) => this.toggleHeader.setMenuState(e.isActive));
    }

}

export default AboutContainer;