// GSAP
import gsap from 'gsap';

// Config
import { SLIDER_ANIMATION_TIME } from '../../config';

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
        this._addHandlerDisplayWhen();
    }

    _addHandlerDisplayWhen() {
        const gsapTransition = function(e, radioName) {
            const yesRadio = this.querySelector(radioName);
            const whenInput = this.querySelector('.when');
            whenInput.style.opacity = '1'

            // Avoid function running unless the radio is clicked (Guard Clause)
            if(e.target.type !== 'radio') return;
    
            if(yesRadio.checked) {
                // Avoid animation running twice
                this.style.pointerEvents = 'none';
    
                whenInput.style.display = 'block';
    
                // Transition using GSAP
                gsap.from(whenInput, {
                    opacity: 0,
                    ease: 'Power2.easeOut',
                    duration: SLIDER_ANIMATION_TIME
                });
                setTimeout(() => {
                    this.style.pointerEvents = 'auto';
                }, SLIDER_ANIMATION_TIME * 1000)
            } else {
                this.style.pointerEvents = 'none';
    
                // Transition using GSAP
                gsap.to(whenInput, {
                    opacity: 0,
                    ease: 'Power2.easeOut',
                    duration: SLIDER_ANIMATION_TIME
                });
                setTimeout(() => {
                    whenInput.style.display = 'none'
                    this.style.pointerEvents = 'auto';
                }, SLIDER_ANIMATION_TIME * 1000)
            }
        }

        this._covidContactQuestion.addEventListener('click', function(e) {
            gsapTransition.call(this, e, '#covid-contact-yes');
        });

        this._vaccinateQuestion.addEventListener('click', function(e) {
            gsapTransition.call(this, e, '#vaccinate-yes');
        })
    }

    resetWhen() {
        this._covidContactQuestion.querySelector('.when').style.display = 'none';
        this._vaccinateQuestion.querySelector('.when').style.display = 'none';
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

        // Workspace Valdiation
        if(data.workSpace === '') {
            this._errors.workSpace.textContent = '* question required';
            error = true;
        } else {
            this._errors.workSpace.textContent = '';
        }
        
        // Covid Contact Validation
        if(data.covidContact === '') {
            this._errors.covidContact.textContent = '* question required';
            error = true;
        } else {
            this._errors.covidContact.textContent = '';
        }

        // Covid Contact Date Validation
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

        // Vaccinate Validation
        if(data.vaccinate === '') {
            this._errors.vaccinate.textContent = '* question required';
            error = true;
        } else {
            this._errors.vaccinate.textContent = '';
        }

        // Vaccinate Date Validation
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

    clearErrors() {
        this._errors.workSpace.textContent = '';
        this._errors.covidContact.textContent = '';
        this._errors.covidContactWhen.textContent = '';
        this._errors.vaccinate.textContent = '';
        this._errors.vaccinateWhen.textContent = ''
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