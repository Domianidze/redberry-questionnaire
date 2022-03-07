// Parent
import SliderSectionView from './SliderSectionView';

class personalView extends SliderSectionView {
    _leftDiv = this._parentElement.querySelector('.left .personal-information');
    _rightDiv = this._parentElement.querySelector('.right .personal-information');
    _errors = {
        firstName: this._leftDiv.querySelector('.input-div.first-name .error-message'),
        lastName: this._leftDiv.querySelector('.input-div.last-name .error-message'),
        eMail: this._leftDiv.querySelector('.input-div.e-mail .error-message'),
        tel: this._leftDiv.querySelector('.input-div.tel .error-message')
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

        // First name
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

        // Last name
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

        // Email
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

        // Phone number
        if(data.tel.length > 5 && (!data.tel.startsWith('+9955') || data.tel.length !== 12)) {
            this._errors.tel.textContent = '* please enter a valid phone number';
            this._errors.tel.parentNode.classList.add("error");
            error = true;
        } else {
            this._errors.tel.textContent = '';
            this._errors.tel.parentNode.classList.remove("error");
        }   

        return error;
    }
}       

export default new personalView();