// GSAP
import gsap from "gsap";

// Config
import { AMOUNT_OF_SLIDER_PAGES } from "../config";
import { SLIDER_ANIMATION_TIME } from "../config";

// Sections
import personalView from "./sliderSections/personalView";
import technicalView from "./sliderSections/technicalView";
import covidView from "./sliderSections/covidView";
import insightsView from "./sliderSections/insightsView";

class sliderView {
    _parentElement = document.querySelector('#slider');
    _allSections = [personalView, technicalView, covidView, insightsView];
    _allSectionsDOM = this._parentElement.querySelectorAll('section');
    _allForms = this._parentElement.querySelectorAll('form');

    slideAnimation(direction) {
        // Animation using GSAP

        gsap.to(this._allSectionsDOM, {
            transform: `translateX(${direction === 'right' ? '-' : ''}125%)`,
            ease: 'Power1.easeOut',
            duration: SLIDER_ANIMATION_TIME
        })
        gsap.to(this._allSectionsDOM, {
            transform: `translateX(${direction === 'left' ? '-' : ''}125%)`,
            duration: 0,
            delay: SLIDER_ANIMATION_TIME
        })
        gsap.to(this._allSectionsDOM, {
            transform: 'translateX(0)',
            ease: 'Power1.easeOut',
            duration: SLIDER_ANIMATION_TIME,
            delay: SLIDER_ANIMATION_TIME
        })
    }

    errorAniamtion() {
        // Animation using GSAP

        gsap.fromTo(this._allForms, 0.1,{
            x: -3,
        }, 
        {
            x: 3,
            repeat: 5,
            yoyo: true,
        });
    }
    
    displaySection(section = 1) {
        setTimeout(() => {
            // Check if section is valid
            if(section >= 1 && section <= AMOUNT_OF_SLIDER_PAGES) {
                this._allSections.forEach(section => section.hide());
            }

            // Display correct section
            if(section === 1) {
                personalView.display();
            } else if(section === 2) {
                technicalView.display();
            } else if(section === 3) {
                covidView.display();
            } else if(section === 4) {
                insightsView.display();
            }
        }, SLIDER_ANIMATION_TIME * 1000)
    }

    getData(section) {
        // Get data from the correct section
        if(section === 1) {
            return personalView.getData();
        } else if(section === 2) {
            return technicalView.getData();
        } else if(section === 3) {
            return covidView.getData();
        } else if(section === 4) {
            return insightsView.getData();
        }
    }    
    
    valdiateData(section) {
        // Valide data of the correct section
        if(section === 1) {
            return personalView.validate();
        } else if(section === 2) {
            return technicalView.validate();
        } else if(section === 3) {
            return covidView.validate();
        } else if(section === 4) {
            return insightsView.validate();
        }
    }

    updateData(data, skills) {
        this._allSections.forEach(section => {
            if(section === technicalView) {
                section.updateData(data, skills);
            } else {
                section.updateData(data);
            }
        })
    }

    clearErrors(section) {
        // Clear erros of the correct section
        if(section === 1) {
            personalView.clearErrors();
        } else if(section === 2) {
            technicalView.clearErrors();
        } else if(section === 3) {
            covidView.clearErrors();
        } else if(section === 4) {
            insightsView.clearErrors();
        }
    }

    resetForms() {
        this._allSections.forEach(section => section.resetForm())
        technicalView.resetSkills();
        covidView.resetWhen();
        insightsView.resetQuestion();
    }
}

export default new sliderView();