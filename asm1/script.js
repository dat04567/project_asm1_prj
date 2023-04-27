'use strict';


const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
let petArr = [];
let data;
let checkClickCal = false;



// show data in table
const renderTableData = function (data) {
    const row = document.createElement('tr');
    row.innerHTML = `<th class = "text-center" scope="row">${data.id}</th>
    <td class = "text-center">${data.name}</td>
    <td class = "text-center">${data.age}</td>
    <td class = "text-center">${data.type}</td>
    <td class = "text-center">${data.weight}kg</td>
    <td class = "text-center">${data.length}cm</td>
    <td class = "text-center">${data.breed}</td>
    <td class = "text-center">
        <i class="bi bi-square-fill" style="color: ${data.color};"></i>
    </td>
    <td class = "text-center"><i class="bi bi-${data.vaccinated ? "check" : "x"}-circle-fill"></i></td>
    <td class = "text-center"><i class="bi bi-${data.dewormed ? "check" : "x"}-circle-fill"></i></td>
    <td class = "text-center"><i class="bi bi-${data.sterilized ? "check" : "x"}-circle-fill"></i></td>
    <td class = "text-center">${data.BMI}</td>
    <td class = "text-center">${data.date}</td>
    <td class = "text-center">
        <button type="button" class="btn btn-danger"  onclick="deletePet(this)" >Delete</button>
    </td>`;
    tableBodyEl.append(row);
};

const clearInput = function () {
    idInput.value = '';
    nameInput.value = '';
    ageInput.value = '';
    typeInput.value = 'Select Type';
    weightInput.value = '';
    lengthInput.value = '';
    breedInput.value = 'Select Breed';
    colorInput.value = '#000000'
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
};
// check ID
const checkID = function (id) {
    for (const i of petArr) {
        if (i.id === id) return true;
    }
    return false;
}

// Check in validate  and save data
const validateData = function () {
    // remove whitespace and check is empty pet name
    let petName = nameInput.value.replace(/^\s+|\s+$/g, '');
    // check is number pet name
    let checkPetName = /\d/.test(petName);
    let check = true;
    if (!idInput.value) {
        alert("Please input ID");
        check = false;
    } else if (!petName || checkPetName) {
        alert("Please input name or you input is not valid");
        check = false;
    } else if (parseInt(ageInput.value) < 1 || parseInt(ageInput.value) > 15 || !ageInput.value) {
        alert("Age must be between 1 and 15!");
        check = false;
    } else if (typeInput.value === "Select Type") {
        alert("Please select Type!");
        check = false;
    } else if (parseInt(weightInput.value) < 1 || parseInt(weightInput.value) > 15 || !weightInput.value) {
        alert("Length must be between 1 and 100!");
        check = false;
    } else if (parseInt(lengthInput.value) < 1 || parseInt(lengthInput.value) > 100 || !lengthInput.value) {
        alert("Length must be between 1 and 100!");
        check = false;
    }
    else if (breedInput.value === "Select Breed") {
        alert("Please select Breed!");
        check = false;
    }
    // save pet array show data
    if (check) {
        data = {
            // check user input multiple white space 
            id: idInput.value.replace(/\s+/gm,''),
            name: nameInput.value,
            age: parseInt(ageInput.value),
            type: typeInput.value,
            weight: weightInput.value,
            length: lengthInput.value,
            breed: breedInput.value,
            color: colorInput.value,
            vaccinated: vaccinatedInput.checked,
            dewormed: dewormedInput.checked,
            sterilized: sterilizedInput.checked,
            date: new Date().toLocaleDateString(),
            BMI : '?'
        };
        let ktID = checkID(data.id);
        if (!ktID) {
            petArr.push(data);
            clearInput();
            // check if user did click else calluate Pet
            if(checkClickCal)
                calculatePet();
            renderTableData(data);
        } else {
            alert("ID must be unique!");
        }
    }
};
// check healthy if you want show all else remove hidden and if you want show healthy pet 
// else add hidden
const checkHealthy = function()
{
    const pets = document.querySelectorAll("#tbody tr");
    for(let i = 0 ; i < petArr.length;i++)
    {
        if(!(petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized))
        {
            pets[i].classList.toggle("hidden");
        }
    }
}
// Show pet 
const showPetHealthy = function(changeName){
    if(changeName.innerHTML === "Show Healthy Pet")
    {
        checkHealthy();
        changeName.innerHTML = "Show All Pet";
    }
    else if(changeName.innerHTML === "Show All Pet")
    {
        checkHealthy();
        changeName.innerHTML = "Show Healthy Pet";
    }
}

// delete postion row 
const deletePet = function (r) {
    const cf = confirm('Are you sure?');
    if (cf) {
        let i = r.parentNode.parentNode.parentNode.rowIndex;
        const del = document.getElementById("tbody");
        // take first id in tag th
        const id = del.children[0].children[0].innerHTML;
        // remove id in array object
        petArr = petArr.filter(item => item === id);
        del.deleteRow(i);
    }
}




// calculate BMI 
const calculatePet = function()
{
    petArr.forEach(item => {
        if(item.type === "Dog")
            item.BMI =  ((parseFloat(item.weight)*703)/ parseFloat(item.length) ** 2).toFixed(2);
        else
            item.BMI =  ((parseFloat(item.weight)*886)/ parseFloat(item.length) ** 2).toFixed(2);
    });
}


// show BMI
const showBMI = function()
{
    const calBMI = document.querySelectorAll("#tbody tr");
    calculatePet();
    for (let i = 0; i < petArr.length; i++) {
        calBMI[i].childNodes[22].innerHTML = petArr[i].BMI; 
    }
    checkClickCal = true;
}


submitBtn.addEventListener('click', validateData);










