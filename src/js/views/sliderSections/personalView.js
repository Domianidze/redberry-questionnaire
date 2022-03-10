// Parent
import SliderSectionView from './SliderSectionView';

class personalView extends SliderSectionView {
    _leftDiv = this._parentElement.querySelector('.left .personal-information');
    _rightDiv = this._parentElement.querySelector('.right .personal-information');
    _inputs = {
        firstName: this._leftDiv.querySelector('.input-div.first-name input'),
        lastName: this._leftDiv.querySelector('.input-div.last-name input'),
        eMail: this._leftDiv.querySelector('.input-div.e-mail input'),
        tel: this._leftDiv.querySelector('.input-div.tel input')
    }
    _errors = {
        firstName: this._leftDiv.querySelector('.input-div.first-name .error-message'),
        lastName: this._leftDiv.querySelector('.input-div.last-name .error-message'),
        eMail: this._leftDiv.querySelector('.input-div.e-mail .error-message'),
        tel: this._leftDiv.querySelector('.input-div.tel .error-message')
    }

    constructor() {
        super();
        this._addHandlerMaxTel();
    }

    _addHandlerMaxTel() {
        const tel = this._leftDiv.querySelector('.input-div.tel input');
        tel.addEventListener('input', function() {
            // Check if telephone number is more than 8 digits and cut it off if needed
            if(tel.value.length > 8) {
                tel.value = tel.value.slice(0, 8);
            }
        });
    }
    
    getData() {
        const inputs = this._leftDiv.querySelectorAll('input');
        const data = Array.from(inputs).map(input => {
            return input.value;
        });
        
        return {
            firstName: data[0],
            lastName: data[1],
            eMail: data[2],
            tel: `+9955${data[3]}`
        }
    }
    
    validate() {
        const data = this.getData();
        let error = false;

        // First name Validation
        if(data.firstName === '') {
            this._errors.firstName.textContent = '* first name is required';
            this._errors.firstName.parentNode.classList.add("error");
            error = true;
        } else {
            this._errors.firstName.textContent = '';
            this._errors.firstName.parentNode.classList.remove("error");
        }

        if(data.firstName.length < 2 && data.firstName !== '') {
            this._errors.firstName.textContent = '* first name should include 2 or more characters';
            this._errors.firstName.parentNode.classList.add("error");
            error = true;
        } else if(data.firstName.length >= 2 && !data.firstName !== '') {
            this._errors.firstName.textContent = '';
            this._errors.firstName.parentNode.classList.remove("error");
        }

        // Last name Validation
        if(data.lastName === '') {
            this._errors.lastName.textContent = '* last name is required';
            this._errors.lastName.parentNode.classList.add("error");
            error = true;
        } else {
            this._errors.lastName.textContent = '';
            this._errors.lastName.parentNode.classList.remove("error");
        }

        if(data.lastName.length < 2 && data.lastName !== '') {
            this._errors.lastName.textContent = '* last name should include 2 or more characters';
            this._errors.lastName.parentNode.classList.add("error");
            error = true;
        } else if(data.lastName.length >= 2 && !data.lastName !== '') {
            this._errors.lastName.textContent = '';
            this._errors.lastName.parentNode.classList.remove("error");
        }

        // Email Validation
        const validateEmail= (email) => {
            var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(String(email).toLowerCase());
        }

        if(data.eMail === '') {
            this._errors.eMail.textContent = '* email is required';
            this._errors.eMail.parentNode.classList.add("error");
            error = true;
        } else {
            this._errors.eMail.textContent = '';
            this._errors.eMail.parentNode.classList.remove("error");
        }

        if(!validateEmail(data.eMail) && data.eMail !== '') {
            this._errors.eMail.textContent = '* please enter a valid email';
            this._errors.eMail.parentNode.classList.add("error");
            error = true;
        } else if(validateEmail(data.eMail) && data.eMail !== '') {
            this._errors.eMail.textContent = '';
            this._errors.eMail.parentNode.classList.remove("error");
        }

        // Phone number Validation
        if(data.tel.length > 5 && (!data.tel.startsWith('+9955') || data.tel.length !== 13)) {
            this._errors.tel.textContent = '* please enter a valid phone number';
            this._errors.tel.parentNode.classList.add("error");
            error = true;
        } else {
            this._errors.tel.textContent = '';
            this._errors.tel.parentNode.classList.remove("error");
        }   

        return error;
    }

    updateData(data) {
        data = data.personalInformation;
        
        // Check if data exists (Guard Clause)
        if(!data) return;
        
        this._inputs.firstName.value = data.firstName;
        this._inputs.lastName.value = data.lastName;
        this._inputs.eMail.value = data.eMail;
        this._inputs.tel.value = data.tel.length > 5 ? +data.tel.slice(5) : '';
    }

    clearErrors() {
        this._errors.firstName.textContent = '';
        this._errors.firstName.parentNode.classList.remove("error");
        this._errors.lastName.textContent = '';
        this._errors.lastName.parentNode.classList.remove("error");
        this._errors.eMail.textContent = '';
        this._errors.eMail.parentNode.classList.remove("error");
        this._errors.tel.textContent = '';
        this._errors.tel.parentNode.classList.remove("error");
    }
}       

export default new personalView();