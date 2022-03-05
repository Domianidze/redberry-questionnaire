// IMGS
import calendarImg from '../../../img/slider/icons/calendar.png'

class covidView {
    _parentElement = document.querySelector('#slider');
    _leftDiv = this._parentElement.querySelector('.left .wrapper');
    _rightDiv = this._parentElement.querySelector('.right .wrapper');

    display() {
        const leftDivMarkup = `
            <section class="covid">
                <div class="header">
                    <h4>Covid Stuff</h4>
                </div>
                <div class="info">
                    <form>
                        <div class="work-space-question question">
                            <p>How would you prefer to work?</p>
                            <label for="office">
                                <input type="radio" id="office" name="work-space" value="office"> From Sairme Office
                            </label>
                            <label for="home">
                                <input type="radio" id="home" name="work-space" value="home"> From Home
                            </label>
                            <label for="hybrid">
                                <input type="radio" id="hybrid" name="work-space" value="hybrid"> Hybrid
                            </label>
                        </div>
                        <div class="covid-contact-question question">
                            <p>Did you contact Covid-19? :(</p>
                            <label for="yes">
                                <input type="radio" id="yes" name="covid-contact" value="yes"> Yes
                            </label>
                            <label for="no">
                                <input type="radio" id="no" name="covid-contact" value="no"> No
                            </label>
                            
                            <div class="when">
                                <p>When?</p>
                                <div class="input-div custom-date-input">
                                    <input type="date" id="covid-contact-date" name="covid-contact-date">
                                    <img src="${calendarImg}" alt="calendar">
                                    <p class="error-message"></p>
                                </div>
                            </div>
                        </div>
                        <div class="vaccinate-question question">
                            <p>Have you been vaccinated?</p>
                            <label for="yes">
                                <input type="radio" id="yes" name="vaccinate" value="yes"> Yes
                            </label>
                            <label for="no">
                                <input type="radio" id="no" name="vaccinate" value="no"> No
                            </label>
                            
                            <div class="when">
                                <p>When did you get your last covid vaccine?</p>
                                <div class="input-div custom-date-input">
                                    <input type="date" id="vaccinate-date" name="vaccinate-date">
                                    <img src="${calendarImg}" alt="calendar">
                                    <p class="error-message"></p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            `

            const rightDivMarkup = `
            <section class="covid">
                <div class="header">
                    <h4>Redberry Covid Policies</h4>
                </div>
                <div class="info">
                    <p>As this infamous pandemic took over the world, we adjusted our working practices so that our employees can be as safe and comfortable as possible. We have a hybrid work environment, so you can either work from home or visit our lovely office on Sairme Street. If it was up to us, we would love you to see us in the office because we think face-to-face communications > Zoom meetings. Both on the fun and productivity scales.</p>
                </div>
            </section>
            `

            this._leftDiv.innerHTML = leftDivMarkup;
            this._rightDiv.innerHTML = rightDivMarkup;
    }

    getData() {
        const section = this._leftDiv.querySelector('.covid');
        const data = {
            workSpace: (section.querySelector('input[name="work-space"]:checked')?.value ?? ''),
            covidContact: (section.querySelector('input[name="covid-contact"]:checked')?.value ?? ''),
            covidContactDate: section.querySelector('input[name="covid-contact-date"]').value,
            vaccinate: (section.querySelector('input[name="vaccinate"]:checked')?.value ?? ''),
            vaccinateDate: section.querySelector('input[name="vaccinate-date"]').value
        }
        return data
    }
}

export default new covidView();