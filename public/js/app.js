const jsFontEditor = document.getElementById('jsFontEditor');
const jsFontPreview = document.getElementById('jsFontPreview');
const fontPreviews = jsFontPreview.querySelectorAll('.font-preview');

const jsFontSizeRange = document.getElementById('jsFontSizeRange');
const jsFontWeightRange = document.getElementById('jsFontWeightRange');
const jsLineHeightRange = document.getElementById('jsLineHeightRange');

function init() {
  setRangeValue()
  getTextareaValue()
}
init()

function setRangeValue() {
  fontPreviews.forEach(fontPreview => {
    fontPreview.style.setProperty('--font-size-22', jsFontSizeRange.value + 'px')
    fontPreview.style.setProperty('--font-weight', jsFontWeightRange.value);
    fontPreview.style.setProperty('--line-height', jsLineHeightRange.value);
  })
}

function getTextareaValue() {
  fontPreviews.forEach(fontPreview => {
    fontPreview.innerHTML = jsFontEditor.value.replace(/\r?\n/g, '<br />');;
  })
}

jsFontEditor.addEventListener('input', function(e) {
  fontPreviews.forEach(fontPreview => {
    fontPreview.innerHTML = e.currentTarget.value.replace(/\r?\n/g, '<br />');;
  })
})

jsFontSizeRange.addEventListener('input', function(e) {
  fontPreviews.forEach(fontPreview => {
    fontPreview.style.setProperty('--font-size-22', e.currentTarget.value + 'px')
  })
})

jsFontWeightRange.addEventListener('input', function(e) {
  fontPreviews.forEach(fontPreview => {
    fontPreview.style.setProperty('--font-weight', e.currentTarget.value);
  })
})

jsLineHeightRange.addEventListener('input', function(e) {
  console.log(e.currentTarget.value)
  fontPreviews.forEach(fontPreview => {
    fontPreview.style.setProperty('--line-height', e.currentTarget.value);
  })
})
