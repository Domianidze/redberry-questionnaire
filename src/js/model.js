// Config
import { API_URL } from "./config";
import { API_TOKEN } from "./config";
import { AMOUNT_OF_SLIDER_PAGES } from "./config"

// Helpers
import { AJAX } from "./helpers";

export const state = {
    curPage: 'landing',
    slider: {
        curPage: 1,
        completed: 1,
        data: {
            personalInformation: {},
            skills: [],
            covidQuestions: {},
            insightQuestions: {}
        }
    }
}

export const resetState = function() {
    state.curPage = 'landing',
    state.slider = {
        curPage: 1,
        completed: 1,
        data: {
            personalInformation: {},
            skills: [],
            covidQuestions: {},
            insightQuestions: {}
        }
    }
}

export const updateCurPage = function(curPage) {
    state.curPage = curPage;
}

// Slider functions
export const updateSliderCurPage = function(curPage) {
    // Check if curpage is valid
    if(curPage <= AMOUNT_OF_SLIDER_PAGES) {
        const prevPage = state.slider.curPage;
        state.slider.curPage = curPage
        return prevPage;
    }
}

export const updateSliderCompleted = function(completed) {
    // Check if slide should be completed
    if(completed <= AMOUNT_OF_SLIDER_PAGES && completed > 0) {
        state.slider.completed = completed;
    }
}

export const updateSliderData = function(curPage, data) {
    // Update the correct section data
    if(curPage === 1) {
        state.slider.data.personalInformation = data;
    } else if(curPage === 2) {
        state.slider.data.skills = data
    } else if(curPage === 3) {
        state.slider.data.covidQuestions = data;
    } else if(curPage === 4) {
        state.slider.data.insightQuestions = data;
    }
}


export const uploadSliderData = function() {
    localStorage.setItem('sliderData', JSON.stringify(state.slider));
}

export const downloadSliderData = function() {
    if(localStorage.getItem('sliderData')) {
        state.slider = JSON.parse(localStorage.getItem('sliderData'));
    }
}

export const deleteSliderData = function() {
    localStorage.removeItem('sliderData');
}

// Async
export const getApplicationsData = async function() {
    try {
        const data = await AJAX(`${API_URL}applications?token=${API_TOKEN}`);
        return data;
    } catch(err) {
        throw err;
    }
}

export const getSkillsData = async function() {
    try {
        const data = await AJAX(`${API_URL}skills`);
        return data;
    } catch(err) {
        throw err;
    }
}

export const submitData = async function() {
    try {
        const personalInformation = state.slider.data.personalInformation;
        const covidQuestions = state.slider.data.covidQuestions;
        const insightQuestions = state.slider.data.insightQuestions;

        const data = {
            token: API_TOKEN,
            first_name: personalInformation.firstName,
            last_name: personalInformation.lastName,
            email: personalInformation.eMail,
            // phone: personalInformation.tel.length > 5 ? personalInformation.tel : '',
            ...(personalInformation.tel.length > 5 && {phone: personalInformation.tel}),
            skills: state.slider.data.skills,
            work_preference: `${covidQuestions.workSpace === 'hybrid' ? covidQuestions.workSpace : `from_${covidQuestions.workSpace}`}`,
            had_covid: covidQuestions.covidContact === 'yes' ? true : false,
            // had_covid_at: this.had_covid ? covidQuestions.covidContactDate : '',
            ...(covidQuestions.covidContact === 'yes' && {had_covid_at: covidQuestions.covidContactDate}),
            vaccinated: covidQuestions.vaccinate === 'yes' ? true : false,
            // vaccinated_at: this.vaccinated ? covidQuestions.vaccinateDate : '',
            ...(covidQuestions.vaccinate === 'yes' && {vaccinated_at: covidQuestions.vaccinateDate}),
            will_organize_devtalk: insightQuestions.attendOrganizeDevtalks === 'yes' ? true : false,
            // devtalk_topic: this.will_organize_devtalk ? insightQuestions.speakDevtalks : '',
            ...(insightQuestions.attendOrganizeDevtalks === 'yes' && {devtalk_topic: insightQuestions.speakDevtalks}),
            something_special: insightQuestions.special
        }

        const res = await AJAX(`${API_URL}application`, data);
        // console.log(res);
    } catch(err) {
        throw err;
    }
}