// GSAP
import gsap from 'gsap';

// Config
import { SLIDER_ANIMATION_TIME } from '../../config';

// Parent
import SliderSectionView from './SliderSectionView';

class insightsView extends SliderSectionView {
    _leftDiv = this._parentElement.querySelector('.left .insights');
    _rightDiv = this._parentElement.querySelector('.right .insights');
    _attendOrganizeDevtalksQuestion = this._leftDiv.querySelector('.attend-organize-devtalks-question');
    _errors = {
        attendOrganizeDevtalks: this._attendOrganizeDevtalksQuestion.querySelector('.error-message'),
        speakDevtalks: this._leftDiv.querySelector('.speak-devtalks-question .error-message'),
        special: this._leftDiv.querySelector('.special-question .error-message')
    }

    constructor() {
        super();
        this.addHandlerDisplaySpeakDevtalks();
    }

    addHandlerDisplaySpeakDevtalks() {
        this._attendOrganizeDevtalksQuestion.addEventListener('click', function(e) {
            const yesRadio = this.querySelector('input#attend-organize-devtalks-yes');
            const speakDevtalksQuestion = document.querySelector('.left .insights .speak-devtalks-question');
           
            // Avoid function running twice because of label (Guard Clause)
            if(e.target.tagName === 'LABEL') return;

            if(yesRadio.checked) {
                // Avoid animation running twice
                this.style.pointerEvents = 'none';

                speakDevtalksQuestion.style.display = 'block';

                // Transition using GSAP
                gsap.from(speakDevtalksQuestion, {
                    opacity: 0,
                    ease: 'Power2.easeOut',
                    duration: SLIDER_ANIMATION_TIME
                });
                setTimeout(() => {
                    this.style.pointerEvents = 'auto';
                }, SLIDER_ANIMATION_TIME * 1000)
                
            } else {
                // Avoid animation running twice
                this.style.pointerEvents = 'none';

                // Transition using GSAP
                gsap.to(speakDevtalksQuestion, {
                    opacity: 0,
                    ease: 'Power2.easeOut',
                    duration: SLIDER_ANIMATION_TIME
                });
                setTimeout(() => {
                    speakDevtalksQuestion.style.display = 'none'
                    speakDevtalksQuestion.style.opacity = 1
                    this.style.pointerEvents = 'auto';
                }, SLIDER_ANIMATION_TIME * 1000)
            }
        });
    }

    getData() {
        const data = {
            attendOrganizeDevtalks: (this._leftDiv.querySelector('input[name="attend-organize-devtalks"]:checked')?.value ?? ''),
            speakDevtalks: this._leftDiv.querySelector('textarea[name="speak-devtalks"]').value,
            special: this._leftDiv.querySelector('textarea[name="special"]').value,
        }
        return data;
    }

    validate() {
        const data = this.getData();
        let error = false;

        // Attend/Organize Devtalks Validation
        if(data.attendOrganizeDevtalks === '') {
            this._errors.attendOrganizeDevtalks.textContent = '* question required';
            error = true;
        } else {
            this._errors.attendOrganizeDevtalks.textContent = '';
        }

        if(data.attendOrganizeDevtalks === 'yes') {
            if(data.speakDevtalks === '') {
                this._errors.speakDevtalks.textContent = '* field required';
                error = true;
            } else {
                this._errors.speakDevtalks.textContent = '';
            }
        }

        // Something Special Validation
        if(data.special === '') {
            this._errors.special.textContent = '* field required';
            error = true;
        } else {
            this._errors.special.textContent = '';
        }

        return error;
    }
}

export default new insightsView();