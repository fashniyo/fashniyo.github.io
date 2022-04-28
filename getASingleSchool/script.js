var schoolsList = document.querySelector('.getASingleSchool')

let apiUrl = 'https://sch-finder-api.herokuapp.com'

function redirectSignIn() {
  location.replace('/signIn/index.html')
}

function redirectSignUp() {
  location.replace('/signUp/index.html')
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
  let list = `<div class="getASingleSchool">

    <h1>${school.name}</h1>
    <p class="fs-5 col-md-8">${school.short_desc}</p>


    <div class="mb-5">
        <a href="#" class="btn btn-primary btn-lg px-4">Apply Now</a>
    </div>

    <hr class="col-3 col-md-2 mb-5">

    <div class="row g-5">
        <div class="col-md-6">

            <ul class="icon-list">
                <li>${school.country}</li>
                <li>${school.city}</li>
                <li>${school.address}</li>
                <li>${school.type}</li>

            </ul>
        </div>

        <div class="col-md-6">
            <ul class="icon-list">
                <li>${school.tuition_fee_range}</li>
                <li>${school.ownership}</li>
                <li>${school.founded}</li>
                <li>${school.total_enrollment}</li>

            </ul>
        </div>
    </div>
</div>
<div class="btn-group">
                <a href="/updateSchool/upadateSchool.html?id=${school.id}" class="btn btn-sm btn-outline-secondary">Update</a>
                <button type="button" onclick = "deleteASchool(${school.id})" class="btn btn-sm btn-outline-secondary">Delete</button>
                </div>
`
  schoolsList.innerHTML = list
}

const deleteASchool = (id) => {
  const token = window.localStorage.getItem('token')
  console.log(id)
  console.log(token)
  fetch(`${apiUrl}/api/schools/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
  }).then((responseJson) => {
    console.log('School Deleted Successfully')
    reDirect()
  })
}

function reDirect() {
  window.location.href = 'schools.html'
}
