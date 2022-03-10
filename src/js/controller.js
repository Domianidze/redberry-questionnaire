// Model
import * as model from "./model";

// Views
import sectionView from "./views/sectionView";
import landingView from "./views/landingView";
import applicationsView from "./views/applicationsView";
import sliderView from "./views/sliderView";
import navbarView from "./views/navbarView";
import submitView from "./views/submitView";
import technicalView from "./views/sliderSections/technicalView";

// Config
import { THANK_YOU_MESSAGE_TIME } from "./config";
import { SECTIONS_ANIMATION_TIME } from "./config";

const controlSection = function(e) {
    let section = window.location.hash.slice(1);

    // Check if section is valid or not (Guard Clause)
    if((section !== 'landing' && section !== 'applications' && section !== 'slider' && (section === '' && e.type === 'load')) || section === model.state.curPage) return;

    // Check if section is not given and set it to landing
    if(section === '') section = 'landing';

    // Check if section is 'Applications' and render Applications data
    if(section === 'applications') {
        initApplications();
    }

    // Check if section is 'Submit', if 'Slider' has not yet been completed, Return to 'Slider'
    if(section ==='submit' && (model.state.slider.completed !== 4 || sliderView.valdiateData(model.state.slider.curPage))) {
        section = 'slider';
        window.location.hash = '#slider';
    }
 
    // 1) Hide current section
    sectionView.hideSection(model.state.curPage);

    // 2) Display new section
    sectionView.displaySection(section);

    // 3) Change current page in the state
    model.updateCurPage(section);

}

const controlSlider = function(goTo = model.state.slider.curPage, init) {

    // 1) Format the goTo number
    if(goTo === 'previous') {
        goTo = model.state.slider.curPage - 1;
    } else if(goTo === 'next') {
        goTo = model.state.slider.curPage + 1;
    }

    // Check if goTo goes to the landing page
    if(goTo < 1) {
        window.location.hash = '#landing';
        return
    }
    
    // Check if goTo page is accessible
    if(goTo - model.state.slider.completed <= 1) {
        let data;

        // 1) Get and validate data from the correct page {

            const error = sliderView.valdiateData(model.state.slider.curPage);

            // Check if we have an error and play error animation if needed (Guard Clause)
            if((error && goTo > model.state.slider.completed) || error && model.state.slider.curPage < model.state.slider.completed) return sliderView.errorAniamtion();

            sliderView.clearErrors(model.state.slider.curPage);

            data = sliderView.getData(model.state.slider.curPage);

        // }
        
        // 2) Update the model
        model.updateSliderData(model.state.slider.curPage, data);
        
        // 3) Display the goTo page with an animation
        sliderView.slideAnimation(goTo > model.state.slider.curPage ? 'right' : 'left');
        sliderView.displaySection(goTo);

        // 4) Update the current page in the model
        const prevPage = model.updateSliderCurPage(goTo);

        // 5) Update the navbar
        navbarView.updateNavBar(model.state.slider.completed, model.state.slider.curPage);

        // Check if goTo page should be completed or uncompleted
        if(goTo > model.state.slider.completed) {

            // 1) Update the completed pages in the model
            model.updateSliderCompleted(goTo);
            
            // 2) Update the navbar
            navbarView.updateNavBar(model.state.slider.completed, model.state.slider.curPage);

            // 3) Update landing if needed
            landingView.updateStartBtn(model.state.slider.completed);

        } else if(goTo < model.state.slider.completed && prevPage === model.state.slider.completed && error) {

            // 1) Update the completed pages in the model
            model.updateSliderCompleted(model.state.slider.completed - 1);

            // 2) Update the navbar
            navbarView.updateNavBar(model.state.slider.completed, model.state.slider.curPage);

            // 3) Update landing if needed
            if(model.state.slider.completed > 1) {
                landingView.updateStartBtn();
            }

        }

    } else {
        navbarView.displayError(model.state.slider.completed + 1);
    }

    // Check if goTo goes to the submit page
    if(goTo > 4 && model.state.slider.completed === 4) {
        window.location.hash = '#submit';
    }

    // Upload slider data to the localstorage
    // Check if goto page is first
    if(goTo > 1) {
        model.uploadSliderData();
    }
}

const controlSubmit = async function() {
    try {
        // 1) Submited the data to the API
        await model.submitData();
        
        // 2) Display success message
        submitView.displaySuccessMessage(); 
        
        // 3) Reset everything and return to the landing page after some time
        model.deleteSliderData();
        sliderView.resetForms();
        sliderView.displaySection();
        navbarView.updateNavBar();
        
        setTimeout(function() {
            if(window.location.hash === '#submit') {
                window.location.hash = '#landing';
                setTimeout(function() {
                    model.resetState();
                    landingView.updateStartBtn(model.state.slider.completed);
                    submitView.reset();
                },  SECTIONS_ANIMATION_TIME * 1000)
            } else {
                model.resetState();
                landingView.updateStartBtn(model.state.slider.completed);
                submitView.reset();
            }
        }, THANK_YOU_MESSAGE_TIME * 1000)
    } catch(err) {
        console.error(err);
    }
}

const initApplications = async function() {
    try {
        // 1) Render spinner
        applicationsView.renderSpinner();

        // 2) Get applications data from the model (API)
        const data = await model.getApplicationsData();
        const skills = await model.getSkillsData();

        // 3) Check data and either render it or render an alert
        if(data.length > 0) {
            applicationsView.renderApplications(data, skills);
        } else {
            applicationsView.renderAlert();
        }
    } catch(err) {
        console.error(err);
    }
}

const initSlider = async function() {

    // 1) Display the first section 
    sliderView.displaySection();

    // 2) Add handler to the navbar
    navbarView.addHandlerDisplaySection(controlSlider);

    try {

        // 3) Get skills data from the model (API)
        const data = await model.getSkillsData();
        
        // 4) Render the data in the technical view
        technicalView.renderSkills(data);

    } catch(err) {
        console.error(err);
    }

}

const init = async function() {
    sectionView.addHandlerDisplaySection(controlSection);
    model.downloadSliderData();
    initSlider();
    controlSlider(model.state.slider.curPage, true);
    sliderView.updateData(model.state.slider.data, model.getSkillsData());
    landingView.updateStartBtn(model.state.slider.completed);
    submitView.addHandlerSubmit(controlSubmit);
}
init();