import gsap from "gsap";
import { SUBMITTED_ANIMATION_TIME } from "../config"

class submittedView {
    _parentElement = document.querySelector('#submitted');
    _animationRunning = false;

    addHandlerToggle() {
        this._parentElement.addEventListener('click', this._toggleApplication)
    }

    _toggleApplication(e) {
        const application = e.target.closest('.application');
        
        if(!application || this._animationRunning === true) return

        const applicationInfo = application.querySelector('.info');
        const applicationInfoWrapper = applicationInfo.querySelector('.wrapper');

        this._animationRunning = true;
        setTimeout(() => {
            this._animationRunning = false;
        }, (SUBMITTED_ANIMATION_TIME * 1000) * 2);
        
        if(!application.classList.contains('active')) {

            gsap.to(applicationInfo, {
                height: '1500px',
                ease: 'Power2.easeOut',
                duration: SUBMITTED_ANIMATION_TIME,
            })

            gsap.to(applicationInfoWrapper, {
                opacity: 1,
                ease: 'Power2.easeOut',
                duration: SUBMITTED_ANIMATION_TIME,
                delay: SUBMITTED_ANIMATION_TIME
            });

        } else {

            gsap.to(applicationInfoWrapper, {
                opacity: 0,
                ease: 'Power2.easeOut',
                duration: SUBMITTED_ANIMATION_TIME,
            });

            gsap.to(applicationInfo, {
                height: 0,
                ease: 'Power2.easeOut',
                duration: SUBMITTED_ANIMATION_TIME,
                delay: SUBMITTED_ANIMATION_TIME
            })

        }

        application.classList.toggle('active');
    }
}

export default new submittedView();