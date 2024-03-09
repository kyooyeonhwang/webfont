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
  listItems.forEach(fontPreview => {
    fontPreview.style.setProperty('--font-size-22', jsFontSizeRange.value + 'px')
    fontPreview.style.setProperty('--font-weight', jsFontWeightRange.value);
    fontPreview.style.setProperty('--line-height', jsLineHeightRange.value);
    fontPreview.style.setProperty('--color', jsColor.value);
    fontPreview.style.setProperty('--background-color', jsBackgroundColor.value);
  })
}

function getTextareaValue() {
  listItems.forEach(fontPreview => {
    fontPreview.querySelector('.ui-font-preview').innerHTML = jsFontEditor.value.replace(/\r?\n/g, '<br />');;
  })
}

jsFontEditor.addEventListener('input', function(e) {
  listItems.forEach(fontPreview => {
    fontPreview.innerHTML = e.currentTarget.value.replace(/\r?\n/g, '<br />');;
  })
})

jsFontSizeRange.addEventListener('input', function(e) {
  listItems.forEach(fontPreview => {
    fontPreview.style.setProperty('--font-size-22', e.currentTarget.value + 'px')
  })
})

jsFontWeightRange.addEventListener('input', function(e) {
  listItems.forEach(fontPreview => {
    fontPreview.style.setProperty('--font-weight', e.currentTarget.value);
  })
})

jsLineHeightRange.addEventListener('input', function(e) {
  console.log(e.currentTarget.value)
  listItems.forEach(fontPreview => {
    fontPreview.style.setProperty('--line-height', e.currentTarget.value);
  })
})

jsColor.addEventListener('input', function(e) {
  listItems.forEach(fontPreview => {
    fontPreview.style.setProperty('--color', e.currentTarget.value);
  })
})

jsBackgroundColor.addEventListener('input', function(e) {
  listItems.forEach(fontPreview => {
    fontPreview.style.setProperty('--background-color', e.currentTarget.value);
  })
})
