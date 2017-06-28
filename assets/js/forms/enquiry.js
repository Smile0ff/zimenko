const form = $('#enquiry-form');

form.validate();

class Enquiry{

    constructor(){
        this._UIevents();
    }
    _UIevents(){
        form.on('submit', (e) => this.handleForm(e));
    }
    handleForm(e){
        e.preventDefault();

        if(!form.valid()) return;

        

        return false;
    }
    
}

export default Enquiry;