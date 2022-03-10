// GSAP
import gsap from "gsap";

// Config
import { SUBMIT_ANIMATION_TIME } from "../config";

class submitView {
    _parentElement = document.querySelector('#submit');
    _submitBtn = this._parentElement.querySelector('.submit-btn');
    _btns = this._parentElement.querySelector('.btns');
    _text = this._parentElement.querySelector('p');

    addHandlerSubmit(handler) {
        this._submitBtn.addEventListener('click', e => {
            e.preventDefault();
            if(!this._submitted) {
                handler();
            }
        })
    }
    
    displaySuccessMessage() {
        // Transition using GSAP
        gsap.to(this._btns, {
            opacity: 0,
            ease: 'Power2.easeOut',
            duration: SUBMIT_ANIMATION_TIME,
        })

        setTimeout(() => {
            this._btns.style.display = 'none';
            this._text.style.display = 'flex';
        }, SUBMIT_ANIMATION_TIME * 1000)
        
        gsap.to(this._text, {
            opacity: 1,
            ease: 'Power2.easeOut',
            duration: SUBMIT_ANIMATION_TIME,
            delay: SUBMIT_ANIMATION_TIME,
        })
    }

    reset() {
        this._btns.style.display = 'flex';
        this._btns.style.opacity = 1;
        this._text.style.display = 'none';
        this._text.style.opacity = 0;
    }
}

export default new submitView();