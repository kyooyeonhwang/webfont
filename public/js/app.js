const jsFontEditor = document.getElementById('jsFontEditor');
const jsFontPreview = document.getElementById('jsFontPreview');
const listItems = jsFontPreview.querySelectorAll('.list-item');

const jsFontSizeRange = document.getElementById('jsFontSizeRange');
const jsFontWeightRange = document.getElementById('jsFontWeightRange');
const jsLineHeightRange = document.getElementById('jsLineHeightRange');
const jsColor = document.getElementById('jsColor');
const jsBackgroundColor = document.getElementById('jsBackgroundColor');

function init() {
  setRangeValue()
  getTextareaValue()
}
init()

function setRangeValue() {
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
  jsFontPreview.style.setProperty('--preview-font-size', e.currentTarget.value + 'px')
})

jsFontWeightRange.addEventListener('input', function(e) {
  jsFontPreview.style.setProperty('--preview-font-weight', e.currentTarget.value)
})

jsLineHeightRange.addEventListener('input', function(e) {
  jsFontPreview.style.setProperty('--preview-line-height', e.currentTarget.value)
})

jsColor.addEventListener('input', function(e) {
  jsFontPreview.style.setProperty('--preview-color-base', e.currentTarget.value)
})

jsBackgroundColor.addEventListener('input', function(e) {
  jsFontPreview.style.setProperty('--preview-background-color', e.currentTarget.value)
})
