;(function () {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      'submit',
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      },
      false
    )
  })
})()

const button = document.getElementById('btn-submit')
const addSchoolForm = document.getElementById('addSchool')

let apiUrl = 'https://sch-finder-api.herokuapp.com'

const name = document.getElementById('name').value
const country = document.getElementById('country').value
const city = document.getElementById('city').value
const address = document.getElementById('address').value
const type = document.getElementById('type').value
const ownership = document.getElementById('ownership').value
const tuition_fee_range = document.getElementById('tuition_fee_range').value
const founded = document.getElementById('founded').value
const total_enrollment = document.getElementById('total_enrollment').value
const short_desc = document.getElementById('short_desc').value

addSchoolForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let data = {
    name: document.getElementById('name').value,
    country: document.getElementById('country').value,
    city: document.getElementById('city').value,
    address: document.getElementById('address').value,
    type: document.getElementById('type').value,
    ownership: document.getElementById('ownership').value,
    tuition_fee_range: document.getElementById('tuition_fee_range').value,
    founded: document.getElementById('founded').value,
    total_enrollment: document.getElementById('total_enrollment').value,
    short_desc: document.getElementById('short_desc').value,
  }

  addSchool(data)
})

function addSchool(data) {
  const token = window.localStorage.getItem('token')
  console.log(token)
  fetch(`${apiUrl}/api/schools/add`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('something went wrong')
    })
    .then((responseJson) => {
      redirectHome()
    })
    .catch((error) => {
      console.log(error)
    })
}

function saveToken(token) {
  console.log(token)
  window.localStorage.setItem('token', token)
}

function getToken() {
  return window.localStorage.getItem('token')
}

function redirectSignIn() {
  location.replace('/signIn/index.html')
}

function redirectSignUp() {
  location.replace('/signUp/index.html')
}

function redirectHome() {
  location.replace('/index.html')
}
