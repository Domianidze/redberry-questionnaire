class landingView {
    _parentElement = document.querySelector('#landing');
    _startBtn = this._parentElement.querySelector('.start-btn');

    updateStartBtn() {
        this._startBtn.textContent = 'Continue Questionnaire'
    }
}

export default new landingView();