import Menu from '@components/menu';

import Gallery from '@components/gallery';

import CaseInfo from '@components/caseInfo';

class AlbumContainer{

    constructor(){
        this.menu = new Menu();
        this.gallery = new Gallery();
        this.caseInfo = new CaseInfo();
    }

}

export default AlbumContainer;