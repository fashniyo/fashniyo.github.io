const container = document.querySelector('.school-display')

let apiUrl = 'https://sch-finder-api.herokuapp.com'

function fetchAllSchools() {
  fetch(`${apiUrl}/api/schools`)
    .then((res) => res.json())
    .then((data) => renderData(data))
}

fetchAllSchools()

function renderData(schools) {
  console.log(schools)
  let list = schools
    .map(
      (schools) =>
        `
        <div class="col">
        <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225"
                xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: صورة مصغرة"
                preserveAspectRatio="xMidYMid slice" focusable="false">
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef"
                    dy=".3em">Image</text>
            </svg>

            <div class="card-body">
                <h3>${schools.name}</h3>
                <p class="card-text"> ${schools.short_desc} </p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <a href="/getASingleSchool/getASchools.html?id=${schools.id}" class="btn btn-sm btn-outline-secondary">More info</a>
                      <button type="button" onclick = "deleteASchool(${schools.id})" class="btn btn-sm btn-outline-secondary">Delete</button>
                    </div>
                    <small class="text-muted">${schools.tuition_fee_range}</small>
                </div>
            </div>
        </div>
    </div>
        `
    )
    .join(' ')

  container.innerHTML = list
}

function redirectSignIn() {
  location.replace('/signIn/index.html')
}

function redirectSignUp() {
  location.replace('/signUp/index.html')
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
    fetchAllSchools()
  })
}
