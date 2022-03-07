// Config
import { AMOUNT_OF_SLIDER_PAGES } from "./config"

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

export const updateCurPage = function(curPage) {
    state.curPage = curPage;
}

export const updateSliderCurPage = function(curPage) {
    // Check if curpage is valid
    if(curPage <= AMOUNT_OF_SLIDER_PAGES) {
        state.slider.curPage = curPage
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