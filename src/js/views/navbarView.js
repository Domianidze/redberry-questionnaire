// GSAP
import gsap from "gsap";

class navbarView {
    _parentElement = document.querySelector('.slider-nav');
    _slideBtns = this._parentElement.querySelectorAll('.slide');
    
    addHandlerDisplaySection(handler) {
        this._parentElement.addEventListener('click', function(e) {
            // Run handler with the correct direction
            if(e.target.closest('.previous')) {
                handler('previous')
            } else if(e.target.closest('.next'))  {
                handler('next')
            } else if(e.target.closest('.slide')) {
                const { goto } = e.target.closest('.slide').dataset;

                handler(+goto);
            }
        })
    }

    displayError() {
        gsap.fromTo(this._parentElement, 0.1,{
            x: -1,
        }, 
        {
            x: 1,
            repeat: 5,
            yoyo: true,
        });
    }

    updateNavBar(completed = 1, curPage = 1) {
        this._slideBtns.forEach(slide => {
            const { goto } = slide.dataset

            // Check if the goto page isn't yet completed and if it should now be completed
            if(completed >= goto && !slide.classList.contains('completed')) {
                slide.classList.add('completed');
            } else if(completed < goto && slide.classList.contains('completed')) {
                slide.classList.remove('completed');
            }

            // Check if goto page should be set to active
            if(+goto === curPage) {
                this._slideBtns.forEach(slide => {
                    if(slide.classList.contains('active')) {
                        slide.classList.remove('active')
                    }
                })
                slide.classList.add('active');
            }
        })
    }
}

export default new navbarView();