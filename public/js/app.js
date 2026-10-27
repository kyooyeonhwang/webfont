const $$ = (el) => document.querySelector(el);

const jsFontEditor = $$('#jsFontEditor');
const jsFontPreview = $$('#jsFontPreview');
const listItems = jsFontPreview.querySelectorAll('.list-item');

const jsFontSizeRange = $$('#jsFontSizeRange');
const jsFontWeightRange = $$('#jsFontWeightRange');
const jsLineHeightRange = $$('#jsLineHeightRange');
const jsColor = $$('#jsColor');
const jsBackgroundColor = $$('#jsBackgroundColor');

const setRangeProgress = (target) => {
  const newValue = Math.floor(((target.value - target.min) / (target.max - target.min)) * 100);
  target.style.setProperty("--range-progress", `${newValue}%`);
}

const setCustomProperty = (element, propertyName, value, unit) => {
  element.style.setProperty(`--${propertyName}`, `${value}${unit ? unit : ''}`);
}

function setRangeValue() {
  [jsFontSizeRange, jsFontWeightRange, jsLineHeightRange].forEach(setRangeProgress);
  setCustomProperty(jsFontPreview, 'preview-font-size', jsFontSizeRange.value, 'px');
  setCustomProperty(jsFontPreview, 'preview-font-weight', jsFontWeightRange.value);
  setCustomProperty(jsFontPreview, 'preview-line-height', jsLineHeightRange.value);
  setCustomProperty(jsFontPreview, 'preview-color-base', jsColor.value);
  setCustomProperty(jsFontPreview, 'preview-background-color', jsBackgroundColor.value);
}

function getTextareaValue() {
  listItems.forEach(listItem => {
    listItem.querySelector('.ui-font-preview').innerHTML = jsFontEditor.value.replace(/\r?\n/g, '<br />');
  })
}

setRangeValue()
getTextareaValue()

jsFontEditor.addEventListener('input', getTextareaValue)

jsFontSizeRange.addEventListener('input', function(e) {
  setRangeProgress(e.target)
  setCustomProperty(jsFontPreview, "preview-font-size", e.currentTarget.value, 'px')
})

jsFontWeightRange.addEventListener('input', function(e) {
  setRangeProgress(e.target)
  setCustomProperty(jsFontPreview, "preview-font-weight", e.currentTarget.value)
})

jsLineHeightRange.addEventListener('input', function(e) {
  setRangeProgress(e.target)
  setCustomProperty(jsFontPreview, "preview-line-height", e.currentTarget.value);
})

jsColor.addEventListener('input', function(e) {
  setCustomProperty(jsFontPreview, "preview-color-base", e.currentTarget.value);
})

jsBackgroundColor.addEventListener('input', function(e) {
  setCustomProperty(jsFontPreview, "preview-background-color", e.currentTarget.value);
})

if(document.querySelector('#jsToggleVisibility')) {
  const jsToggleVisibility = $$('#jsToggleVisibility');
  const inputItems = jsToggleVisibility.querySelectorAll('.input-item');
  
  inputItems.forEach((inputItem, index) => {
    inputItem.addEventListener('change', (event) => {
      if (event.target.checked) {
        listItems[index].classList.add('active');
      } else {
        listItems[index].classList.remove('active');
      }
    });
  });
}
