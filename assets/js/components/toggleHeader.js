import { EventEmitter } from 'events';

import isMobile from '@utility/isMobile';

const header = $('#header');

const scroll = isMobile() ? 'touchmove' : 'scroll';

class ToggleHeader extends EventEmitter{

    constructor(){
        super();

        this.menuState = false;
        
        this.delta = 15;
        this.lastScroll = 0;

        this.headerHeight = 0;

        this.windowHeight = this.getWindowHeight();
        this.totalPageHeight = this.getPageFullHeight();

        this.setHeaderHeight();

        this._UIevents();
    }
    setHeaderHeight(){
        this.headerHeight = header.height();
    }
    setMenuState(state){
        this.menuState = state;
    }
    getWindowHeight(){
        return window.innerHeight;
    }
    getPageFullHeight(){
        let body = document.body,
            html = document.documentElement;

        return Math.max(body.offsetHeight, body.clientHeight, html.offsetHeight, html.clientHeight, html.scrollHeight);
    }
    _UIevents(){
        $(window)
            .on(scroll, (e) => this.handleScroll(e))
            .on('resize', (e) => this.handleResize(e));
    }
    handleScroll(e){
        let scrollTop = $(window).scrollTop(),
            scrollBottom = scrollTop + this.windowHeight;
        
        if(this.menuState || (Math.abs(this.lastScroll - scrollTop) < this.delta)) return;

        if(scrollTop > this.lastScroll && scrollTop > this.headerHeight){

            header.addClass('__hidden');

        } else{

            if(scrollBottom < this.totalPageHeight)
                header.removeClass('__hidden');

        }

        this.lastScroll = scrollTop;
    }
    handleResize(e){
        this.setHeaderHeight();

        this.windowHeight = this.getWindowHeight();
        this.totalPageHeight = this.getPageFullHeight();

        return false;
    }

}

export default ToggleHeader;