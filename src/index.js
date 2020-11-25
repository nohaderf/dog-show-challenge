document.addEventListener('DOMContentLoaded', () => {

//DOM ELEMENTS
const form = document.querySelector("#dog-form")
const dogTable = document.querySelector("#dog-table")
const tableBody = document.querySelector("#table-body")

// DELIVERABLE 1
// When page loads,
// fetch all dogs and put it on the table as a row

function fetchDogs(){
    tableBody.innerHTML = ""
    fetch(`http://localhost:3000/dogs`)
    .then(r => r.json())
    .then(dogArray => dogArray.forEach(renderDogs))
}

function renderDogs(dog){
    // console.log(tableBody)
    const row = document.createElement("tr")
    
    const name = document.createElement("td")
    name.textContent = dog.name

    const breed = document.createElement("td")
    breed.textContent = dog.breed

    const sex = document.createElement("td")
    sex.textContent = dog.sex

    const edit = document.createElement("td")
    const editBtn = document.createElement("button")
    editBtn.dataset.id = dog.id
    editBtn.textContent = "Edit Dog"

    editBtn.addEventListener("click", function(event){
        const id = event.target.dataset.id
        // console.log(id)
        fetchOneDog(id) 
    })
    
    edit.append(editBtn)
    row.append(name, breed, sex, edit)
    dogTable.append(row)
}

// DELIVERABLE 2
// clicking on edit button
// populate top form with dog's info


function fetchOneDog(id){
    fetch(`http://localhost:3000/dogs/${id}`)
    .then(r => r.json())
    .then(dogObj => fillForm(dogObj))
}

function fillForm(dogObj){
    // console.log("works?")
    form.name.value = dogObj.name
    form.breed.value = dogObj.breed
    form.sex.value = dogObj.sex 
    form.dataset.id = dogObj.id

    // console.log(dogObj.id)

    // DELIVERABLE 3
    // When form SUBMITS
    // Make a patch request to persist info


    form.addEventListener("submit", function(event){
        event.preventDefault()
        // console.log("submitted!")

        const updateDogObj = {
            id: form.dataset.id,
            name: event.target.name.value,
            breed: event.target.breed.value,
            sex: event.target.sex.value
        }

        // updateDog(updateDogObj)
        // console.log(updateDogObj)

        fetch(`http://localhost:3000/dogs/${updateDogObj.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateDogObj)
        })
        .then(r => r.json())
        .then(newDogObj => fetchDogs(newDogObj))
        // fetchDogs()

    })
}



// function updateDog(updateDogObj){
//     fetch(`http://localhost:3000/dogs/${updateDogObj.id}`,{
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(updateDogObj)
//     })
//     .then(r => r.json())
//     .then(console.log)
//     fetchDogs()
    
// }

//INITIALIZE
fetchDogs()

})

