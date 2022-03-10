// GSAP
import gsap from 'gsap';

// Config
import { SLIDER_ANIMATION_TIME } from '../../config';

// Parent view
import SliderSectionView from './SliderSectionView';

// IMG
import removeImg from '../../../img/slider/icons/remove.png'

class skillsetView extends SliderSectionView {
    _leftDiv = this._parentElement.querySelector('.left .technical');
    _rightDiv = this._parentElement.querySelector('.right .technical');
    _skillSelect = this._leftDiv.querySelector('.custom-select #skills');
    _addSkillBtn = this._leftDiv.querySelector('.add-skill-btn');
    _skillDiv = this._leftDiv.querySelector('.skill-set');
    _errors = {
        selectError: this._leftDiv.querySelector('.custom-select .error-message'),
        inputError: this._leftDiv.querySelector('.input-div .error-message'),
        skillsError: this._leftDiv.querySelector('form > .error-message')
    }


    constructor() {
        super();
        this._addHandlerRemove();
        this._addHandlerAddSkill();
    }

    renderSkills(data) {
        this._skillSelect.innerHTML = '<option value="hide" class="select-hidden">Skills</option>',

        data.forEach(skill => {
            this._skillSelect.insertAdjacentHTML('beforeend', `
                <option value="${skill.id}">${skill.title}</option>
            `);
        })
    }

    _addHandlerAddSkill() {
        this._addSkillBtn.addEventListener('click', e => {
            e.preventDefault();
            this._addSkill();
        });
    }

    _addHandlerRemove() {
        this._skillDiv.addEventListener('click', function(e) {
            const removeBtn = e.target.closest('.remove-btn');

            // Guard Clase
            if(!removeBtn) return

            const skill = removeBtn.parentNode;

            // Transition using GSAP
            gsap.to(skill, {
                opacity: 0,
                ease: 'Power2.easeOut',
                duration: SLIDER_ANIMATION_TIME
            });
            setTimeout(function() {
                skill.parentNode.removeChild(skill);
            }, SLIDER_ANIMATION_TIME * 1000)
        });
    }

    _addSkill() {
        const skillSelect = this._leftDiv.querySelector('select');
        const skillID = skillSelect.value;
        const skillName = skillSelect.options[skillSelect.selectedIndex].text;
        const skillNameClass = skillName.toLowerCase().replace('.', '-');
        const skillExperience = this._leftDiv.querySelector('input').value;
        let error = false;

        // Get data and check if we already have the same skill
        const data = this.getData().filter(skill => skill.id === +skillID);

        // Skill Name Validation
        if(skillName === 'Skills') {
            this._errors.selectError.textContent = '* please select a skill';
            this._errors.selectError.parentNode.classList.add("error");
            error = true;
        } else if(data.length !== 0) {
            this._errors.selectError.textContent = '* you can only select the same skill once';
            this._errors.selectError.parentNode.classList.add("error");
            error = true;
        } else {
            this._errors.selectError.textContent = '';
            this._errors.selectError.parentNode.classList.remove("error");
        }

        // Skill Experience Validation
        if(skillExperience === '') {
            this._errors.inputError.textContent = '* please enter skill experience'
            this._errors.inputError.parentNode.classList.add("error");
            error = true;
        } else if(+skillExperience < 1) {
            this._errors.inputError.textContent = '* skill experience has to be at least 1'
            this._errors.inputError.parentNode.classList.add("error");
            error = true;
        } else {
            this._errors.inputError.textContent = ''
            this._errors.inputError.parentNode.classList.remove("error");
        }

        // Guard Clause
        if(error) return
        
        const markup = `
            <div class="skill ${skillNameClass}" data-id="${skillID}">
                <div class="skill-text">
                    <p class="skill-name">${skillName}</p>
                    <p class="skill-experience" data-skillexperience="${skillExperience}">Years of Experience: ${skillExperience}</p>
                </div>
                <img src="${removeImg}" alt="remove" class="remove-btn">
            </div>
        `

        this._skillDiv.insertAdjacentHTML('beforeend', markup);

        // Transition using GSAP
        const skill = this._skillDiv.querySelector(`.${skillNameClass}`);
        gsap.from(skill, {
            opacity: 0,
            ease: 'Power2.easeOut',
            duration: SLIDER_ANIMATION_TIME
        });
    }

    resetSkills() {
        this._skillDiv.innerHTML = ''
    }
    
    getData() {
        const skills = this._skillDiv.querySelectorAll('.skill');
        const data = Array.from(skills).map(skill => {
            const skillID = skill.dataset.id;
            const skillExperience = skill.querySelector('.skill-experience').dataset.skillexperience;

            return {
                id: +skillID, 
                experience: +skillExperience
            }
        });
        return data;
    }

    validate() {
        const data = this.getData();
        let error = false;

        // Validate
        if(data.length < 1) {
            this._errors.skillsError.textContent = '* please add atleast 1 skill';
            error = true;
        } else {
            this._errors.skillsError.textContent = '';
        }

        return error;
    }

    async updateData(data, skills) {
        data = data.skills;
        skills = await skills;
        
        // Check if data exists (Guard Clause)
        if(!data) return;

        data.forEach(skill => {
            const skillName = skills.filter(skillName => skillName.id === +skill.id)[0].title;

            this._skillDiv.insertAdjacentHTML('beforeend', `
                <div class="skill ${skillName}" data-id="${skill.id}">
                    <div class="skill-text">
                        <p class="skill-name">${skillName}</p>
                        <p class="skill-experience" data-skillexperience="${skill.experience}">Years of Experience: ${skill.experience}</p>
                    </div>
                    <img src="${removeImg}" alt="remove" class="remove-btn">
                </div>
            `);
        })
    }

    clearErrors() {
        this._errors.selectError.textContent = '';
        this._errors.selectError.parentNode.classList.remove("error");
        this._errors.inputError.textContent = ''
        this._errors.inputError.parentNode.classList.remove("error");
        this._errors.skillsError.textContent = '';
    }
}

export default new skillsetView();