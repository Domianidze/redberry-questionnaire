// GSAP
import gsap from "gsap";

// Config
import { APPLICATIONS_ANIMATION_TIME } from "../config";

// IMG
import alertImg from '../../img/icons/alert.png'
import arrowImg from '../../img/submitted-applications/icons/arrow.png';
import radioImg from '../../img/submitted-applications/icons/radio.png';
import radioSelectedImg from '../../img/submitted-applications/icons/radio-selected.png';
import calendarImg from '../../img/submitted-applications/icons/calendar.png';

class submittedView {
    _parentElement = document.querySelector('#applications');
    _applications = this._parentElement.querySelector('.applications');
    _alertMessage = 'No applications found. Please add an application and try again.';
    _animationRunning = false;

    constructor() {
        this._addHandlerToggle()
    }

    renderSpinner() {
        this._applications.innerHTML = `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="spinner">
                <circle cx="50" cy="50" r="46"/>
            </svg>
        `
    }

    renderAlert() {
        this._applications.innerHTML = `
            <div class="alert">
                <img src="${alertImg}" alt="alert icon">
                <p>${this._alertMessage}</p>
            </div> 
        `
    }

    renderApplications(data, skills) {
        this._applications.innerHTML = '';

        if(data.length > 0) {
            data.forEach((application, index) => {
                this._applications.insertAdjacentHTML('beforeend', `
                <div class="application">
                    <div class="header">
                    <p>${index + 1}</p>
                    <img src="${arrowImg}" alt="arrow">
                </div>
                <div class="info">
                    <div class="wrapper">
                        <section class="personal-information">
                            <h6>Personal Information</h6>
                            <div class="questions-answers">
                                <div class="questions">
                                    <p>First Name</p>
                                    <p>Last Name</p>
                                    <p>E Mail</p>
                                    <p>Phone</p>
                                </div>
                                <div class="answers">
                                    <p>${application.first_name}</p>
                                    <p>${application.last_name}</p>
                                    <p>${application.email}</p>
                                    <p>${application.phone}</p>
                                </div>
                            </div>
                        </section>
                        <section class="skillset">
                            <h6>Skillset</h6>

                            ${application.skills.map(skill => {
                                return `
                                <div class="skill">
                                    <p class="skill-name">${skills.filter(skillName => skillName.id === +skill.id)[0].title}</p>
                                    <p class="skill-experience">Years of Experience: ${skill.experience}</p>
                                </div>
                                `
                            }).join('')}

                        </section>
                        <section class="covid">
                            <h6>Covid Situation</h6>
                            <div class="work-space-question question">
                                <p>How would you prefer to work?</p>
                                <div class="office answer">
                                    <img src="${application.work_preference === "from_office" ? radioSelectedImg : radioImg}" alt="radio ${!application.work_preference === "from_office" ? 'selected' : ''}">
                                    <p>From Sairme Office</p>
                                </div>
                                <div class="home answer">
                                    <img src="${application.work_preference === "from_home" ? radioSelectedImg : radioImg}" alt="radio ${!application.work_preference === "from_home" ? 'selected' : ''}">
                                    <p>From Home</p>
                                </div>
                                <div class="hybrid answer">
                                    <img src="${application.work_preference === "hybrid" ? radioSelectedImg : radioImg}" alt="radio ${!application.work_preference === "hybrid" ? 'selected' : ''}">
                                    <p>Hybrid</p>
                                </div>
                            </div>
                            <div class="covid-contact-question question">
                                <p>Did you have covid 19?</p>
                                <div class="yes answer">
                                    <img src="${application.had_covid ? radioSelectedImg : radioImg}" alt="radio ${application.had_covid ? 'selected' : ''}">
                                    <p>Yes</p>
                                </div>
                                <div class="no answer">
                                    <img src="${!application.had_covid ? radioSelectedImg : radioImg}" alt="radio ${!application.had_covid ? 'selected' : ''}">
                                    <p>No</p>
                                </div>
                                
                                ${application.had_covid 
                                    ? 
                                    `
                                    <div class="when">
                                        <p>When did you have covid 19?</p>
                                        <div class="date">
                                            <p class="covid-contact-date">${this._formatDate(application.had_covid_at)}</p>
                                            <img src="${calendarImg}" alt="calendar">
                                        </div>
                                    </div>
                                    `
                                    :
                                    ''
                                }

                            </div>
                            <div class="vaccinate-question question">
                                <p>Have you been vaccinated?</p>
                                <div class="yes answer">
                                    <img src="${application.vaccinated ? radioSelectedImg : radioImg}" alt="radio ${application.vaccinated ? 'selected' : ''}">
                                    <p>Yes</p>
                                </div>
                                <div class="no answer">
                                    <img src="${!application.vaccinated ? radioSelectedImg : radioImg}" alt="radio ${!application.vaccinated ? 'selected' : ''}">
                                    <p>No</p>
                                </div>

                                ${application.vaccinated
                                    ? 
                                    `
                                    <div class="when">
                                        <p>When did you get covid vaccine?</p>
                                        <div class="date">
                                            <p>${this._formatDate(application.vaccinated_at)}</p>
                                            <img src="${calendarImg}" alt="calendar">
                                        </div>
                                    </div>
                                    `
                                    :
                                    ''
                                }
                            </div>
                        </section>
                        <section class="insights">
                            <h6>Insights</h6>
                            <div class="attend-organize-devtalks-question question">
                                <p>Would you attend Devtalks and maybe also organize your own?</p>
                                <div class="yes answer">
                                    <img src="${application.will_organize_devtalk ? radioSelectedImg : radioImg}" alt="radio ${application.will_organize_devtalk ? 'selected' : ''}">
                                    <p>Yes</p>
                                </div>
                                <div class="no answer">
                                    <img src="${!application.will_organize_devtalk ? radioSelectedImg : radioImg}" alt="radio ${!application.will_organize_devtalk ? 'selected' : ''}">
                                    <p>No</p>
                                </div>
                            </div>
                            ${application.will_organize_devtalk
                                ? 
                                `
                                <div class="speak-devtalks-question question">
                                    <p>What would you speak about at Devtalk?</p>
                                    <div class="text-answer">
                                        <p>${application.devtalk_topic}</p>
                                    </div>
                                </div>
                                `
                                :
                                ''
                            }
                            <div class="speak-devtalks-question question">
                                <p>Tell us somthing special</p>
                                <div class="text-answer">
                                    <p>${application.something_special}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
                `);
            })
        }
    }

    _formatDate(date) {
        if(!date) return
        const dateArr = date.split('-');
        return `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
    }

    _addHandlerToggle() {
        this._parentElement.addEventListener('click', this._toggleApplication)
    }

    _toggleApplication(e) {
        // Check if user clicked on something else than the header (Guard Clause)
        if(!e.target.closest('.header')) return;

        const application = e.target.closest('.application');
        
        // Check if application exists and if animation is currently running (Guard Clause)
        if(!application || this._animationRunning === true) return

        const applicationInfo = application.querySelector('.info');
        const applicationInfoWrapper = applicationInfo.querySelector('.wrapper');

        // Set animation running to true temporarily
        this._animationRunning = true;
        setTimeout(() => {
            this._animationRunning = false;
        }, (APPLICATIONS_ANIMATION_TIME * 1000) * 2);
        
        // Toggle
        if(!application.classList.contains('active')) {

            // Transition using GSAP
            gsap.to(applicationInfo, {
                height: 'auto',
                ease: 'Power2.easeOut',
                duration: APPLICATIONS_ANIMATION_TIME,
            })

            gsap.to(applicationInfoWrapper, {
                opacity: 1,
                ease: 'Power2.easeOut',
                duration: APPLICATIONS_ANIMATION_TIME,
                delay: APPLICATIONS_ANIMATION_TIME
            });

        } else {

            // Transition using GSAP
            gsap.to(applicationInfoWrapper, {
                opacity: 0,
                ease: 'Power2.easeOut',
                duration: APPLICATIONS_ANIMATION_TIME,
            });

            gsap.to(applicationInfo, {
                height: 0,
                ease: 'Power2.easeOut',
                duration: APPLICATIONS_ANIMATION_TIME,
                delay: APPLICATIONS_ANIMATION_TIME
            })

        }

        application.classList.toggle('active');
    }
}

export default new submittedView();