class SliderSectionView {
    _parentElement = document.querySelector('#slider');

    display() {
        this._leftDiv.style.display = 'block';
        this._rightDiv.style.display = 'block';
    }

    hide() {
        this._leftDiv.style.display = 'none';
        this._rightDiv.style.display = 'none';
    }

    resetForm() {
        this._leftDiv.querySelector('form').reset();
    }
}

export default SliderSectionView;