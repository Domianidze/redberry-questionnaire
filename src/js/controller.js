import * as model from "./model"
import sectionView from "./views/sectionView";
import submittedView from "./views/submittedView";
import sliderView from "./views/sliderView";
import navbarView from "./views/navbarView";
import submitView from "./views/submitView";

const controlSection = function(e) {
    let section = window.location.hash.slice(1);

    // Guard Clause
    if((section !== 'landing' && section !== 'submitted' && section !== 'slider' && (section === '' && e.type === 'load')) || section === model.state.curPage) return;

    if(section === '') section = 'landing';
 
    // 1) Hide current section
    sectionView.hideSection(model.state.curPage);

    // 2) Display new section
    sectionView.displaySection(section);

    // 3) Change current page in the state
    model.updateCurPage(section);
}

const controlSlider = function(goTo) {
    // 1) Format the goTo number
    if(goTo === 'previous') {
        goTo = model.state.slider.curPage - 1;
    } else if(goTo === 'next') {
        goTo = model.state.slider.curPage + 1;
    }

    // Check if goTo goes to the landing page
    if(goTo < 1) {
        window.location.hash = '#landing';
    }
    
    // Check if goTo page is accessible
    if(goTo - model.state.slider.completed <= 1) {
        let data;

        // 1) Get data from the correct page and update the model
        data = sliderView.getData(model.state.slider.curPage);
        model.updateSliderData(model.state.slider.curPage, data);

        // 2) Display the goTo page
        sliderView.displaySection(goTo);

        // 3) Update the current page in the model
        model.updateSliderCurPage(goTo);

        // 4) Update the navbar
        navbarView.updateNavBar(model.state.slider.completed, model.state.slider.curPage);

        // Check if goTo page hasn't yet been completed
        if(goTo > model.state.slider.completed) {
            
            // 1) Update the completed pages in the model
            model.updateSliderCompleted(goTo);
            
            // 2) Update the navbar
            navbarView.updateNavBar(model.state.slider.completed, model.state.slider.curPage);
        }
    }

    // Check if goTo goes to the submit page
    if(goTo > 4) {
        window.location.hash = '#submit';
    }
}

const controlSubmit = function() {

    // Alert data (Test)
    alert(JSON.stringify(model.state.slider.data));

    // 2) Display success message
    submitView.displaySuccessMessage();
    
}

const init = function() {
    sectionView.addHandlerDisplaySection(controlSection);
    submittedView.addHandlerToggle();
    sliderView.displaySection();
    navbarView.addHandlerDisplaySection(controlSlider);
    submitView.addHandlerSubmit(controlSubmit);
}
init();