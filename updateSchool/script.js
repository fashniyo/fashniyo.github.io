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

let apiUrl = 'https://sch-finder-api.herokuapp.com'
var form = document.getElementById('updateSchool')
const button = document.getElementById('btn-submit')
var schoolsList = document.getElementById('updateSchool')

function updateASchool(newData) {
  const token = window.localStorage.getItem('token')
  console.log(token)
  const id = getUrlParameter('id')
  console.log(id)
  fetch(`${apiUrl}/api/schools/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Something went wrong')
    })
    .then((responseJson) => {
      reDirect()
      console.log(newData)
    })
    .catch((error) => {
      console.log(error)
    })
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  let newData = {
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
  updateASchool(newData)
})

function reDirect() {
  window.location.href = '/index.html'
  console.log('school updated successfully')
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  var results = regex.exec(location.search)
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

function getASchool() {
  const id = getUrlParameter('id')
  console.log(id)
  fetch(`${apiUrl}/api/schools/${id}`)
    .then((response) => response.json())
    .then((data) => bringData(data))
}

getASchool()

function bringData(school) {
  console.log(school)
  let list = `<h4 class="mb-3">Update School</h4>
  <form class="needs-validation" novalidate>
  <form class="needs-validation" id="updateSchool" novalidate>
  <div class="row g-3">
  <div class="col-12">
      <label for="firstName" class="form-label">School Name</label>
      <input type="text" class="form-control" id="name" placeholder = "${school.name}" value="" required>
      <div class="invalid-feedback">
          Name is required.
      </div>
  </div>
  <div class="col-12">
      <label for="address" class="form-label">Address</label>
      <input type="text" class="form-control" id="address" placeholder = "${school.address}"
          required>
      <div class="invalid-feedback">
          Please enter a valid address.
      </div>
  </div>
  <div class="col-md-3">
      <label for="country" class="form-label">Country</label>
      <select class="form-select" id="country" required>
          <option value="">Choose...</option>
          <option>United States</option>
      </select>
      <div class="invalid-feedback">
          Please select a valid country.
      </div>
  </div>

  <div class="col-md-3">
      <label for="state" class="form-label">City</label>
      <select class="form-select" id="city" required>
          <option value="">Choose...</option>
          <option>California</option>
      </select>
      <div class="invalid-feedback">
          Please provide a valid state.
      </div>
  </div>

  <div class="col-md-3">
      <label for="state" class="form-label">Schooling Type</label>
      <select class="form-select" id="type" required>
          <option value="">Choose...</option>
          <option>University</option>
      </select>
      <div class="invalid-feedback">
          Please provide a valid schooling type
      </div>
  </div>

  <div class="col-md-3">
      <label for="state" class="form-label">Ownership</label>
      <select class="form-select" id="ownership" required>
          <option value="">Choose...</option>
          <option>Private</option>
      </select>
      <div class="invalid-feedback">
          Please provide a valid schooling type
      </div>
  </div>
</div>
<hr class="my-4">
<div class="row gy-3">
  <div class="col-md-6">
      <label for="cc-name" class="form-label">Tuition Fee Range ($)</label>
      <input type="text" class="form-control" id="tuition_fee_range" placeholder = "${school.tuition_fee_range}" required>
      <div class="invalid-feedback">
          Please enter a range
      </div>
  </div>

  <div class="col-md-6">
      <label for="cc-number" class="form-label">Year Founded</label>
      <input type="number" class="form-control" id="founded" placeholder = "${school.founded}" required>
      <div class="invalid-feedback">
          Enter Year Founded
      </div>
  </div>

  <div class="col-md-3">
      <label for="cc-expiration" class="form-label">Total Enrollment</label>
      <input type="number" class="form-control" id="total_enrollment" placeholder = "${school.total_enrollment}" required>
      <div class="invalid-feedback">
          Enter Estimated number of present students
      </div>
  </div>

  <div class="col-12">
      <label for="firstName" class="form-label">Short Desc</label>
      <input type="text" class="form-control" id="short_desc" placeholder="${school.short_desc}" value="" required>
      <div class="invalid-feedback">
          Short desc is required.
      </div>
  </div>
</div>

<hr class="my-4">

<button id = "btn_submit" class="w-100 btn btn-primary btn-lg" type="submit">Update School</button>
  </form>`

  schoolsList.innerHTML = list
}
