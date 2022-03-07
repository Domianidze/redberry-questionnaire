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
        this._attendOrganizeDevtalksQuestion.addEventListener('click', function() {
            const yesRadio = this.querySelector('#attend-organize-devtalks-yes');
            const speakDevtalksQuestion = document.querySelector('.left .insights .speak-devtalks-question');

            if(yesRadio.checked) {
                speakDevtalksQuestion.style.display = 'block';
            } else {
                speakDevtalksQuestion.style.display = 'none'
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