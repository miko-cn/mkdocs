var feedback = document.forms.feedback

var consent = __md_get("__consent")
console.log(consent)
if (consent && consent.analytics) {
  /* The user accepted the cookie */
  feedback.hidden = false
} else {
  /* The user rejected the cookie */
  feedback.hidden = true
}

feedback.addEventListener("submit", function(ev) {
  ev.preventDefault()

  var page = document.location.pathname 
  var data = ev.submitter.getAttribute("data-md-value")

  console.log(page, data) 

  feedback.firstElementChild.disabled = true 

  var note = feedback.querySelector(
    ".md-feedback__note [data-md-value='" + data + "']"
  )
  if (note)
    note.hidden = false 
})