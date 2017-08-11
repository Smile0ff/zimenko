import { TOGGLE_MENU, TOGGLE_INFO } from '@constants/homeConstants';

import isMobile from '@utility/isMobile';

import Menu from '@components/menu';
import ToggleHeader from '@components/toggleHeader';
import Gallery from '@components/gallery';
import CaseInfo from '@components/caseInfo';

class AlbumContainer{

    constructor(){
        this.menu = new Menu();
        this.gallery = new Gallery();
        this.toggleHeader = new ToggleHeader();

        this.caseInfo = new CaseInfo();
            
        this.menu.on(TOGGLE_MENU, (e) => this.toggleHeader.setMenuState(e.isActive));
        this.caseInfo.on(TOGGLE_INFO, (e) => this.gallery.setInfoState(e.isActive));
    }

}

export default AlbumContainer;