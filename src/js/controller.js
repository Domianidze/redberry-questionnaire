import * as model from "./model"
import sectionView from "./views/sectionView";
import submittedView from "./views/submittedView";

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

const init = function() {
    sectionView.addHandlerDisplaySection(controlSection);
    submittedView.addHandlerToggle();
}
init();