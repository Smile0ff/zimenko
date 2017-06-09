import Menu from '@components/menu';
import Scroller from '@components/scroller';

import isMobile from '@utility/isMobile';

class BlogContainer{

    constructor(){
        this.menu = new Menu();

        if(!isMobile())
            this.scroller = new Scroller();
        
    }

}

export default BlogContainer;