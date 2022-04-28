const label = document.querySelectorAll('.form-control label')
const firstName = document.getElementById('firstName').value
const lastName = document.getElementById('lastName').value
const email = document.getElementById('email').value
const password = document.getElementById('password').value
const confirmPassword = document.getElementById('confirmPassword').value

let apiUrl = 'https://sch-finder-api.herokuapp.com'

const button = document.getElementById('btn-submit')
const form = document.getElementById('form')

label.forEach((label) => {
  label.innerHTML = label.innerText
    .split('')
    .map(
      (letter, idx) =>
        `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
    )
    .join('')
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let data = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value,
  }

  signUp(data)
})

function signUp(data) {
  fetch(`${apiUrl}/api/users/signup`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json().then((json) => saveToken(json.token))
      }
      throw new Error('Something went wrong')
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

function redirectHome() {
  location.replace('/index.html')
}
