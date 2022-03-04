import gsap from "gsap";
import { SECTION_ANIMATION_TIME } from "../config"

class sectionView {
    addHandlerDisplaySection(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler))
    }

    hideSection(section) {
        section = document.querySelector(`#${section}`);

        gsap.to(section, {
            opacity: 0,
            ease: 'Power2.easeOut',
            duration: SECTION_ANIMATION_TIME,
        })

        setTimeout(function() {
            section.style.display = 'none';
        }, SECTION_ANIMATION_TIME * 1000)
    }

    displaySection(section) {
        section = document.querySelector(`#${section}`);

        setTimeout(function() {
            section.style.display = 'flex';
        
            gsap.to(section, {
                opacity: 1,
                ease: 'Power2.easeOut',
                duration: SECTION_ANIMATION_TIME,
            })
        }, SECTION_ANIMATION_TIME * 1000)
    }
}

export default new sectionView();