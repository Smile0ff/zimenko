import 'social-likes'

import { TOGGLE_MENU } from '@constants/homeConstants';

import Menu from '@components/menu';
import ToggleHeader from '@components/toggleHeader';

import isMobile from '@utility/isMobile';

class ArticleContainer{

    constructor(){
        this.menu = new Menu();
        this.toggleHeader = new ToggleHeader();

        this.menu.on(TOGGLE_MENU, (e) => this.toggleHeader.setMenuState(e.isActive));
    }

}

export default ArticleContainer;