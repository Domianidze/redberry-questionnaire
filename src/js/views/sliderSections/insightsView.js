class insightsView {
    _parentElement = document.querySelector('#slider');
    _leftDiv = this._parentElement.querySelector('.left .wrapper');
    _rightDiv = this._parentElement.querySelector('.right .wrapper');
    
    display() {
        const leftDivMarkup = `
            <section class="insights">
                <div class="header">
                    <h4>What about you?</h4>
                </div>
                <div class="info">
                    <form>
                        <div class="attend-organize-devtalks-question question">
                            <p>Would you attend Devtalks and maybe also organize your own?</p>
                            <label for="yes">
                                <input type="radio" id="yes" name="attend-organize-devtalks" value="yes"> Yes
                            </label>
                            <label for="no">
                                <input type="radio" id="no" name="attend-organize-devtalks" value="no"> No
                            </label>
                        </div>
                        <div class="speak-devtalks-question question">
                            <p>What would you speak about at Devtalk?</p>
                            <div class="input-div">
                                <textarea name="speak-devtalks" id="speak-devtalks" placeholder="I would..."></textarea>
                                <p class="error-message"></p>
                            </div>
                        </div>
                        <div class="special-question question">
                            <div class="input-div">
                                <p>Tell us something special</p>
                                <textarea name="special" id="special" placeholder="I..."></textarea>
                                <p class="error-message"></p>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        `

        const rightDivMarkup = `
            <section class="insights">
                <div class="header">
                    <h4>Redberrian Insights</h4>
                </div>
                <div class="info">
                    <p>We were soo much fun before the pandemic started! Parties almost every weekend and lavish employee birthday celebrations! Unfortunately, covid ruined that fun like it did almost everything else in the world. But we try our best to zhuzh it up a bit. For example, we host biweekly Devtalks where our senior and lead developers talk about topics they are passionate about. Previous topics have included Web3, NFT, Laravel 9, Kubernetes, etc. We hold these talks in the office but you can join our Zoom broadcast as well. Feel free to join either as an attendee or a speaker!</p>
                </div>
            </section>
        `

        this._leftDiv.innerHTML = leftDivMarkup;
        this._rightDiv.innerHTML = rightDivMarkup;
    }

    getData() {
        const section = this._leftDiv.querySelector('.insights');
        const data = {
            attendOrganizeDevtalks: (section.querySelector('input[name="attend-organize-devtalks"]:checked')?.value ?? ''),
            speakDevtalks: section.querySelector('textarea[name="speak-devtalks"]').value,
            special: section.querySelector('textarea[name="special"]').value,
        }
        return data;
    }
}

export default new insightsView();