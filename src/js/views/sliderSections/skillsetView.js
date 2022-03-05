// IMGS
import dropdownImg from '../../../img/slider/icons/dropdown.png'
import removeImg from '../../../img/slider/icons/remove.png'

class skillsetView {
    _parentElement = document.querySelector('#slider');
    _leftDiv = this._parentElement.querySelector('.left .wrapper');
    _rightDiv = this._parentElement.querySelector('.right .wrapper');

    display() {
        const leftDivMarkup = `
            <section class="technical-skillset">
                <div class="header">
                    <h4>Tell us about your skills</h4>
                </div>
                <div class="info">
                    <form>
                        <div class="custom-select">
                            <select id="skills" name="skills" place>
                                <option value="hide" class="select-hidden">Skills</option>
                                <option value="html">HTML</option>
                                <option value="css">CSS</option>
                                <option value="javascript">JAVASCRIPT</option>
                            </select>
                            <img src="${dropdownImg}" alt="arrow">
                        </div>
                        <div class="input-div">
                            <input type="text" id="experience" name="experience" placeholder="Experience Duration in Years">
                            <p class="error-message"></p>
                        </div>
                        <button>Add Programming Language</button>
                    </form>
                    <div class="skill-set">
                        <div class="skill">
                            <div class="skill-text">
                                <p class="skill-name">PHP</p>
                                <p class="skill-experience">Years of Experience: 3</p>
                            </div>
                            <img src="${removeImg}" alt="remove">
                        </div>
                        <div class="skill">
                            <div class="skill-text">
                                <p class="skill-name">React</p>
                                <p class="skill-experience">Years of Experience: 2</p>
                            </div>
                            <img src="${removeImg}" alt="remove">
                        </div>
                    </div>
                </div>
            </section>
        `

        const rightDivMarkup = `
            <section class="technical-skillset">
                <div class="header">
                    <h4>A bit about our battles</h4>
                </div>
                <div class="info">
                    <p>As we said, Redberry has been on the field for quite some time now, and we have touched and embraced a variety of programming languages, technologies, philosophies, and frameworks. We are battle-tested in PHP Laravel Stack with Vue.js, refined in React, and allies with Serverside technologies like Docker and Kubernetes, and now we have set foot in the web3 industry.</p>
                </div>
            </section>
        `

        this._leftDiv.innerHTML = leftDivMarkup;
        this._rightDiv.innerHTML = rightDivMarkup;
    }

    getData() {
        const section = this._leftDiv.querySelector('.technical-skillset');
        const skills = section.querySelectorAll('.skill');
        const data = Array.from(skills).map(skill => {
            const skillName = skill.querySelector('.skill-name').textContent;
            const skilkExperience = skill.querySelector('.skill-experience').textContent;

            return [skillName, skilkExperience]
        });
        return data;
    }
}

export default new skillsetView();