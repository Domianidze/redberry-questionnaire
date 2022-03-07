// Parent
import SliderSectionView from './SliderSectionView';

class covidView extends SliderSectionView {
    _leftDiv = this._parentElement.querySelector('.left .covid');
    _rightDiv = this._parentElement.querySelector('.right .covid');
    _covidContactQuestion = this._leftDiv.querySelector('.covid-contact-question');
    _vaccinateQuestion = this._leftDiv.querySelector('.vaccinate-question');
    _errors = {
        workSpace: this._leftDiv.querySelector('.error-message.work-space'),
        covidContact: this._leftDiv.querySelector('.error-message.covid-contact'),
        covidContactWhen: this._covidContactQuestion.querySelector('.when .error-message'),
        vaccinate: this._leftDiv.querySelector('.error-message.vaccinate'),
        vaccinateWhen: this._vaccinateQuestion.querySelector('.when .error-message')
    }

    constructor() {
        super();
        this.addHandlerDisplayWhen();
    }

    addHandlerDisplayWhen() {
        this._covidContactQuestion.addEventListener('click', function() {
            const yesRadio = this.querySelector('#covid-contact-yes');
            const whenInput = this.querySelector('.when');

            if(yesRadio.checked) {
                whenInput.style.display = 'block';
            } else {
                whenInput.style.display = 'none'
            }
        });

        this._vaccinateQuestion.addEventListener('click', function() {
            const yesRadio = this.querySelector('#vaccinate-yes');
            const whenInput = this.querySelector('.when');

            if(yesRadio.checked) {
                whenInput.style.display = 'block';
            } else {
                whenInput.style.display = 'none'
            }
        });
    }

    getData() {
        const data = {
            workSpace: (this._leftDiv.querySelector('input[name="work-space"]:checked')?.value ?? ''),
            covidContact: (this._leftDiv.querySelector('input[name="covid-contact"]:checked')?.value ?? ''),
            covidContactDate: this._leftDiv.querySelector('input[name="covid-contact-date"]').value,
            vaccinate: (this._leftDiv.querySelector('input[name="vaccinate"]:checked')?.value ?? ''),
            vaccinateDate: this._leftDiv.querySelector('input[name="vaccinate-date"]').value
        }
        return data
    }

    validate() {
        const data = this.getData();
        let error = false;

        if(data.workSpace === '') {
            this._errors.workSpace.textContent = '* question required';
            error = true;
        } else {
            this._errors.workSpace.textContent = '';
        }

        if(data.covidContact === '') {
            this._errors.covidContact.textContent = '* question required';
            error = true;
        } else {
            this._errors.covidContact.textContent = '';
        }

        if(data.covidContact === 'yes') {
            if(data.covidContactDate === '') {
                this._errors.covidContactWhen.textContent = '* date required';
                error = true;
            } else if(!this._validateDate(data.covidContactDate)) {
                this._errors.covidContactWhen.textContent = '* please enter valid date';
                error = true;
            } else {
                this._errors.covidContactWhen.textContent = '';
            }
        }

        if(data.vaccinate === '') {
            this._errors.vaccinate.textContent = '* question required';
            error = true;
        } else {
            this._errors.vaccinate.textContent = '';
        }

        if(data.vaccinate === 'yes') {
            if(data.vaccinateDate === '') {
                this._errors.vaccinateWhen.textContent = '* date required';
                error = true;
            } else if(!this._validateDate(data.vaccinateDate)) {
                this._errors.vaccinateWhen.textContent = '* please enter valid date';
                error = true;
            } else {
                this._errors.vaccinateWhen.textContent = ''
            }
        }

        return error;
    }

    _validateDate(date) {
        const curDate = new Date();
        const dateArr = date.split('-');
        const dateArrInt = dateArr.map(el => {
           return parseInt(el);
        }) 

        if(dateArr.length !== 3 || dateArr[1].length !== 2 || dateArr[2].length !== 2 || dateArr[0].length !== 4) {
            return false
        } else if(dateArrInt[0] > curDate.getFullYear()) {
            return false
        } else if(dateArrInt[0] === curDate.getFullYear() && dateArrInt[1] > (curDate.getMonth() + 1)) {
            return false
        } else if(dateArrInt[0] === curDate.getFullYear() && dateArrInt[1] === (curDate.getMonth() + 1) && dateArrInt[2] > curDate.getDate()) {
            return false
        } else {
            return true
        }
    }
}

export default new covidView();