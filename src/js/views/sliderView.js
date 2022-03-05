// Section views
import personalView from "./sliderSections/personalView";
import skillsetView from "./sliderSections/skillsetView";
import covidView from "./sliderSections/covidView";
import inisghtsView from "./sliderSections/insightsView";

class sliderView {
    displaySection(section = 1) {
        if(section === 1) {
            personalView.display();
        } else if(section === 2) {
            skillsetView.display();
        } else if(section === 3) {
            covidView.display();
        } else if(section === 4) {
            inisghtsView.display();
        }

    }

    getData(section) {
        if(section === 1) {
            return personalView.getData();
        } else if(section === 2) {
            return skillsetView.getData();
        } else if(section === 3) {
            return covidView.getData();
        } else if(section === 4) {
            return  inisghtsView.getData();
        }
    }                        
}

export default new sliderView();