import isMobile from '@utility/isMobile';
import configureImages from '@utility/imgOrienation';

import Menu from '@components/menu';
import Gallery from '@components/gallery';
import CaseInfo from '@components/caseInfo';

class AlbumContainer{

    constructor(){
        this.menu = new Menu();
        this.gallery = new Gallery();

        if(!isMobile())
            this.caseInfo = new CaseInfo();

        if(isMobile())
            configureImages();
    }

}

export default AlbumContainer;