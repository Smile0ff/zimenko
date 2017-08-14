const maskText = document.querySelector('#mask-text');
const titleText = document.querySelector('#loader-holder .title-text');

const DELTA = -90;

const heroMaskDelta = () => {
    maskText.setAttribute('dy', DELTA);
    titleText.setAttribute('dy', DELTA);
}

export default heroMaskDelta;