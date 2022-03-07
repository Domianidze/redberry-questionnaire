// GSAP
import gsap from "gsap";

// Config
import { SUBMIT_ANIMATION_TIME } from "../config";

class submitView {
    _parentElement = document.querySelector('#submit');
    _submitBtn = this._parentElement.querySelector('.submit-btn');

    addHandlerSubmit(handler) {
        this._submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handler();
        })
    }
    
    displaySuccessMessage() {
        const btns = this._parentElement.querySelector('.btns');
        const text = this._parentElement.querySelector('p');

        // Transition using GSAP
        gsap.to(btns, {
            opacity: 0,
            ease: 'Power2.easeOut',
            duration: SUBMIT_ANIMATION_TIME,
        })

        setTimeout(function() {
            btns.style.display = 'none';
            text.style.display = 'flex';
        }, SUBMIT_ANIMATION_TIME * 1000)
        
        gsap.to(text, {
            opacity: 1,
            ease: 'Power2.easeOut',
            duration: SUBMIT_ANIMATION_TIME,
            delay: SUBMIT_ANIMATION_TIME,
        })
    }
}

export default new submitView();