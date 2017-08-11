import { TOGGLE_MENU } from '@constants/homeConstants';

import Menu from '@components/menu';
import Scroller from '@components/scroller';
import ToggleHeader from '@components/toggleHeader';

import isMobile from '@utility/isMobile';

class BlogContainer{

    constructor(){
        this.menu = new Menu();
        this.toggleHeader = new ToggleHeader();

        if(!isMobile())
            this.scroller = new Scroller();

        this.menu.on(TOGGLE_MENU, (e) => this.toggleHeader.setMenuState(e.isActive));        
    }

}

export default BlogContainer;