import gsap from "gsap";
import { ANIMATION_TIME } from "../config"

class sectionView {
    addHandlerDisplaySection(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler))
    }

    hideSection(section) {
        section = document.querySelector(`#${section}`);

        gsap.to(section, {
            opacity: 0,
            ease: 'Power2.easeOut',
            duration: ANIMATION_TIME,
        })

        setTimeout(function() {
            section.style.display = 'none';
        }, ANIMATION_TIME * 1000)
    }

    displaySection(section) {
        section = document.querySelector(`#${section}`);

        setTimeout(function() {
            section.style.display = 'flex';
        
            gsap.to(section, {
                opacity: 1,
                ease: 'Power2.easeOut',
                duration: ANIMATION_TIME,
            })
        }, ANIMATION_TIME * 1000)
    }
}

export default new sectionView();