class personalView {
    _parentElement = document.querySelector('#slider');
    _leftDiv = this._parentElement.querySelector('.left .wrapper');
    _rightDiv = this._parentElement.querySelector('.right .wrapper');

    display() {
        const leftDivMarkup = `
            <section class="personal-information">
                <div class="header">
                    <h4>Hey, Rocketeer, what are your coordinates?</h4>
                </div>
                <div class="info">
                    <form>
                        <div class="input-div error">
                            <input type="text" id="first-name" name="first-name" placeholder="First Name">
                            <p class="error-message">* first name is required</p>
                        </div>
                        <div class="input-div error">
                            <input type="text" id="last-name" name="last-name" placeholder="Last Name">
                            <p class="error-message">* last name should include 3 or more characters</p>
                        </div>
                        <div class="input-div">
                            <input type="email" id="e-mail" name="e-mail" placeholder="E Mail">
                            <p class="error-message"></p>
                        </div>
                        <div class="input-div">
                            <input type="tel" id="phone-number" name="phone-number" placeholder="+955 5_ _ _ _">
                            <p class="error-message"></p>
                        </div>
                    </form>
                </div>
            </section>
        `

        const rightDivMarkup = `
            <section class="personal-information">
                <div class="header">
                    <h4>Redberry Origins</h4>
                </div>
                <div class="info">
                    <p>You watch “What? Where? When?” Yeah. Our founders used to play it. That’s where they got a question about a famous American author and screenwriter Ray Bradbury. Albeit, our CEO Gaga Darsalia forgot the exact name and he answered Ray Redberry. And at that moment, a name for a yet to be born company was inspired - Redberry 😇</p>
                </div>
            </section>
        `

        this._leftDiv.innerHTML = leftDivMarkup;
        this._rightDiv.innerHTML = rightDivMarkup;
    }

    getData() {
        const section = this._leftDiv.querySelector('.personal-information');
        const inputs = section.querySelectorAll('input');
        const data = Array.from(inputs).map(input => {
            return input.value;
        });

        return {
            firstName: data[0],
            lastName: data[1],
            eMail: data[2],
            tel: data[3]
        }
    }
}

export default new personalView();