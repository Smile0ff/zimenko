const ESC_CODE = 27;

const page = $('#page');
const infoHolder = $('#info-holder');
const openBtn = $('#open-info-btn');
const closeBtn = infoHolder.find('#close-info-btn');

class CaseInfo{

    constructor(){
        this._UIevents();
    }
    _UIevents(){
        openBtn.on('click', (e) => this.handleOpen(e));
        closeBtn.on('click', (e) => this.handleClose(e));

        $(document).on('keydown', (e) => this.handleKeyDown(e));
    }
    handleOpen(e){
        page.addClass('__info-active');
        return false;
    }
    handleClose(e){
        page.removeClass('__info-active');
        return false;
    }
    handleKeyDown(e){
        let keyCode = e.originalEvent.keyCode;

        if(keyCode !== ESC_CODE) return;

        page.removeClass('__info-active');

        return false;
    }

}

export default CaseInfo;