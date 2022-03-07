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
    _addSkillBtn = this._leftDiv.querySelector('.add-skill-btn');
    _skillDiv = this._leftDiv.querySelector('.skill-set');
    _errors = {
        selectError: this._leftDiv.querySelector('.custom-select .error-message'),
        inputError: this._leftDiv.querySelector('.input-div .error-message'),
        skillsError: this._leftDiv.querySelector('form > .error-message')
    }


    constructor() {
        super();
        this.addHandlerRemove();
    }

    addHandlerAddSkill(handler) {
        this._addSkillBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handler();
        });
    }

    addHandlerRemove() {
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

    addSkill() {;
        const skillName = this._leftDiv.querySelector('select').value;
        const skillExperience = this._leftDiv.querySelector('input').value;
        let error = false;

        const data = this.getData().map(skill => skill[0]);

        // Skill Name Validation
        if(skillName === 'hide') {
            this._errors.selectError.textContent = '* please select a skill';
            this._errors.selectError.parentNode.classList.add("error");
            error = true;
        } else if(data.includes(skillName)) {
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
            <div class="skill ${skillName}">
            <div class="skill-text">
            <p class="skill-name">${skillName}</p>
            <p class="skill-experience">Years of Experience: ${skillExperience}</p>
            </div>
            <img src="${removeImg}" alt="remove" class="remove-btn">
            </div>
        `

        this._skillDiv.insertAdjacentHTML('beforeend', markup);

        // Transition using GSAP
        const skill = this._skillDiv.querySelector(`.${skillName}`);
        gsap.from(skill, {
            opacity: 0,
            ease: 'Power2.easeOut',
            duration: SLIDER_ANIMATION_TIME
        });
    }
    
    getData() {
        const skills = this._skillDiv.querySelectorAll('.skill');
        const data = Array.from(skills).map(skill => {
            const skillName = skill.querySelector('.skill-name').textContent;
            const skilkExperience = skill.querySelector('.skill-experience').textContent;

            return [skillName, skilkExperience]
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
}

export default new skillsetView();