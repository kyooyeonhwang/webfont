const $$ = (el) => document.querySelector(el);

const jsFontEditor = $$('#jsFontEditor');
const jsFontPreview = $$('#jsFontPreview');
const listItems = jsFontPreview.querySelectorAll('.list-item');

const jsFontSizeRange = $$('#jsFontSizeRange');
const jsFontWeightRange = $$('#jsFontWeightRange');
const jsLineHeightRange = $$('#jsLineHeightRange');
const jsColor = $$('#jsColor');
const jsBackgroundColor = $$('#jsBackgroundColor');

function init() {
  setRangeValue()
  getTextareaValue()
}
init()

function setRangeValue() {
  const fontSizeRangeValue = Number( (jsFontSizeRange.value - jsFontSizeRange.min) * 100 / (jsFontWeightRange.max - jsFontWeightRange.min) );
  jsFontWeightRange.style.setProperty("--range-progress", `calc(${fontSizeRangeValue}%)`);
  const fontWeightRangeValue = Number( (jsFontWeightRange.value - jsFontWeightRange.min) * 100 / (jsFontWeightRange.max - jsFontWeightRange.min) );
  jsFontWeightRange.style.setProperty("--range-progress", `calc(${fontWeightRangeValue}%)`);
  const lineHeightRangeValue = Number( (jsLineHeightRange.value - jsLineHeightRange.min) * 100 / (jsLineHeightRange.max - jsLineHeightRange.min) );
  jsLineHeightRange.style.setProperty("--range-progress", `calc(${lineHeightRangeValue}%)`);
  jsFontPreview.style.setProperty('--preview-font-size', jsFontSizeRange.value + 'px')
  jsFontPreview.style.setProperty('--preview-font-weight', jsFontWeightRange.value);
  jsFontPreview.style.setProperty('--preview-line-height', jsLineHeightRange.value);
  jsFontPreview.style.setProperty('--preview-color-base', jsColor.value);
  jsFontPreview.style.setProperty('--preview-background-color', jsBackgroundColor.value);
}

function getTextareaValue() {
  listItems.forEach(listItem => {
    listItem.querySelector('.ui-font-preview').innerHTML = jsFontEditor.value.replace(/\r?\n/g, '<br />');;
  })
}

jsFontEditor.addEventListener('input', function(e) {
  listItems.forEach(listItem => {
    listItem.querySelector('.ui-font-preview').innerHTML = e.currentTarget.value.replace(/\r?\n/g, '<br />');;
  })
})

jsFontSizeRange.addEventListener('input', function(e) {
  const newValue = Number( (e.target.value - e.target.min) * 100 / (e.target.max - e.target.min) );
  e.target.style.setProperty("--range-progress", `calc(${newValue}%)`);
  jsFontPreview.style.setProperty('--preview-font-size', e.currentTarget.value + 'px')
})

jsFontWeightRange.addEventListener('input', function(e) {
  console.log(e.target.value)
  const newValue = Number( (e.target.value - e.target.min) * 100 / (e.target.max - e.target.min) );
  e.target.style.setProperty("--range-progress", `calc(${newValue}%)`);
  jsFontPreview.style.setProperty('--preview-font-weight', e.currentTarget.value)
})

jsLineHeightRange.addEventListener('input', function(e) {
  const newValue = Number( (e.target.value - e.target.min) * 100 / (e.target.max - e.target.min) );
  e.target.style.setProperty("--range-progress", `calc(${newValue}%)`);
  jsFontPreview.style.setProperty('--preview-line-height', e.currentTarget.value)
})

jsColor.addEventListener('input', function(e) {
  jsFontPreview.style.setProperty('--preview-color-base', e.currentTarget.value)
})

jsBackgroundColor.addEventListener('input', function(e) {
  jsFontPreview.style.setProperty('--preview-background-color', e.currentTarget.value)
})
