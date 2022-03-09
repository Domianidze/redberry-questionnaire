class landingView {
    _parentElement = document.querySelector('#landing');
    _startBtn = this._parentElement.querySelector('.start-btn');

    updateStartBtn(completed) {
        if(completed > 1) {
            this._startBtn.textContent = 'Continue Questionnaire'
        } else {
            this._startBtn.textContent = 'Start Questionnaire'
        }
    }
}

export default new landingView();