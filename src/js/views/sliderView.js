// Section views
import personalView from "./sliderSections/personalView";
import technicalView from "./sliderSections/technicalView";
import covidView from "./sliderSections/covidView";
import insightsView from "./sliderSections/insightsView";

class sliderView {
    _allSections = [personalView, technicalView, covidView, insightsView];
    
    displaySection(section = 1) {
        if(section >= 1 && section <= 4) {
            this._allSections.forEach(section => section.hide());
        }

        if(section === 1) {
            personalView.display();
        } else if(section === 2) {
            technicalView.display();
        } else if(section === 3) {
            covidView.display();
        } else if(section === 4) {
            insightsView.display();
        }
    }

    getData(section) {
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
}

export default new sliderView();