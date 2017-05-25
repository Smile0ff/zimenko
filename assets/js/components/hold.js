const HOLD_TIME = 2000;

const page = $('#page');

class Hold{

    constructor(){
        this.isHold = false;
        this.isActive = false;
        this.timer = null;

        this._events();
    }

    _events(){
        page.on('mousedown', '.intro-holder', (e) => this.start(e))
            .on('mouseup mouseleave', '.intro-holder', (e) => this.end(e))
            .on('click', '.hold-close', (e) => this.close(e));
    }

    start(e){
        this.isHold = true;

        page.addClass('__hold-start');

        this.timer = setTimeout(() => {

            this.isActive = true;
            page.addClass('__hold-active');

        }, HOLD_TIME);

        return false;
    }

    end(e){
        if(!this.isHold) return;

        page.removeClass('__hold-start');
        clearTimeout(this.timer);

        return false;
    }

    close(e){
        if(!this.isActive) return;

        page.removeClass('__hold-active');

        return false;
    }

}

export default Hold;