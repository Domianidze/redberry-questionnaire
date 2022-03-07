// GSAP
import gsap from "gsap";

// Config
import { SUBMITTED_APPLICATIONS_ANIMATION_TIME } from "../config"

class submittedView {
    _parentElement = document.querySelector('#submitted');
    _animationRunning = false;

    addHandlerToggle() {
        this._parentElement.addEventListener('click', this._toggleApplication)
    }

    _toggleApplication(e) {
        const application = e.target.closest('.application');
        
        // Check if application exists and if animation is currently running (Guard Clause)
        if(!application || this._animationRunning === true) return

        const applicationInfo = application.querySelector('.info');
        const applicationInfoWrapper = applicationInfo.querySelector('.wrapper');

        // Set animation running to true temporarily
        this._animationRunning = true;
        setTimeout(() => {
            this._animationRunning = false;
        }, (SUBMITTED_APPLICATIONS_ANIMATION_TIME * 1000) * 2);
        
        // Toggle
        if(!application.classList.contains('active')) {

            // Transition using GSAP
            gsap.to(applicationInfo, {
                height: '1500px',
                ease: 'Power2.easeOut',
                duration: SUBMITTED_APPLICATIONS_ANIMATION_TIME,
            })

            gsap.to(applicationInfoWrapper, {
                opacity: 1,
                ease: 'Power2.easeOut',
                duration: SUBMITTED_APPLICATIONS_ANIMATION_TIME,
                delay: SUBMITTED_APPLICATIONS_ANIMATION_TIME
            });

        } else {

            // Transition using GSAP
            gsap.to(applicationInfoWrapper, {
                opacity: 0,
                ease: 'Power2.easeOut',
                duration: SUBMITTED_APPLICATIONS_ANIMATION_TIME,
            });

            gsap.to(applicationInfo, {
                height: 0,
                ease: 'Power2.easeOut',
                duration: SUBMITTED_APPLICATIONS_ANIMATION_TIME,
                delay: SUBMITTED_APPLICATIONS_ANIMATION_TIME
            })

        }

        application.classList.toggle('active');
    }
}

export default new submittedView();