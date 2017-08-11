import { TOGGLE_MENU } from '@constants/homeConstants';

import Menu from '@components/menu';
import Enquiry from '@forms/enquiry';
import ToggleHeader from '@components/toggleHeader';

class ContactContainer{

    constructor(){
        this.menu = new Menu();
        this.enquiry = new Enquiry();
        this.toggleHeader = new ToggleHeader();

        this.menu.on(TOGGLE_MENU, (e) => this.toggleHeader.setMenuState(e.isActive));
    }

}

export default ContactContainer;

