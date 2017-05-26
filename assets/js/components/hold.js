import bindEmitter from '@decorators/bindEmitter';

import * as homeConstants from '@constants/homeConstants';

const HOLD_TIME = 2000;

const page = $('#page');

@bindEmitter
class Hold{

    constructor(){
        this.isHold = false;
        this.isActive = false;
        this.timer = null;

        this._UIevents();
    }

    _UIevents(){
        page.on('mousedown', '.intro-holder', (e) => this.start(e))
            .on('mouseup mouseleave', '.intro-holder', (e) => this.end(e))
            .on('click', '.hold-close', (e) => this.close(e));
    }

    start(e){
        this.isHold = true;

        page.addClass('__hold-start');

        this.timer = setTimeout(() => {

            this.toggleActive();

            page.addClass('__hold-active');

            this.emitChange();

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

        this.toggleActive();

        page.removeClass('__hold-active');

        this.emitChange();

        return false;
    }

    toggleActive(){
        this.isActive = !this.isActive;
    }

    emitChange(){
        this.emit(homeConstants.HOLD_ACTIVE, {
            isActive: this.isActive
        });
    }

}

export default Hold;