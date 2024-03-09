//Fix Ruppin Server
const api = location.hostname === "localhost" || location.hostname === "127.0.0.1" ?
    `https://localhost:7011/api/Flats` :
    `https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/Flats`;


//Code:
$(document).ready(function () {
    ajaxCall("GET", api, "", getSCB, getECB);

    // bind the submit event to a function called ValidForm
    $("#pForm").submit(ValidForm)
});

//a callback function for the submit success
function getSCB(Flats) {
    RenderFlats(Flats);
    console.log(Flats);
}

//a callback function for the submit Error
function getECB(errorFromServer) {
    console.log("this is error");
}

function submit() {
    let Flat = {
        //id: $("#IdTB").val(),
        city: $("#CityTB").val(),
        address: $("#AddressTB").val(),
        price: $("#PriceTB").val(),
        numbers_of_rooms: $("#NumberOfRoomsTB").val(),
    }
    //Make an ajax call to post the Flats
    ajaxCall("POST", api, JSON.stringify(Flat), postSCB, postECB);
}

function ValidForm() {
    submit();
    return false; // the return false will prevent the form from being submitted
}

//a callback function for the submit success
function postSCB(objectFromServer) {
    if (objectFromServer) {
        swal("Submitted to the server!", "Great Job", "success");
        ajaxCall("GET", api, "", getSCB, getECB);
    }
    else {
        swal("Error!", "the id is already in use", "error");
        console.log(objectFromServer);
    }
}
//a callback function for the submit failure
function postECB(errorFromServer) {
    console.log("erorrrrr");
}

function RenderFlats(Flats) {
    $("#RenderFlats").html("");
    let FlatsString = "";
    for (let i = 0; i < Flats.length; i++) {
        FlatsString += `<div class='col-md-3'>`;
        FlatsString += `<div class='card mt-3 '>`;
        FlatsString += `<div class='card-body'>`;
        FlatsString += `<h3 class='card-header bg-white'>Flat ID: ${Flats[i].id}</h5>`;
        FlatsString += `<p class='card-text'><strong>City:</strong> ${Flats[i].city}</p>`;
        FlatsString += `<p class='card-text'><strong>Address:</strong> ${Flats[i].address}</p>`;
        FlatsString += `<p class='card-text'><strong>Number of rooms:</strong> ${Flats[i].numbers_of_rooms}</p>`;
        FlatsString += `<p class='card-text'><strong>Price:</strong> ${Flats[i].price} $</p>`;
        FlatsString += `<button type="button" class="BtnVacations" onclick="window.location.href = 'Vacations.html?flatID=${Flats[i].id}'" >Order</button>`
        FlatsString += `</div>`
        FlatsString += `</div>`
        FlatsString += `</div>`
    }
    $("#RenderFlats").append(FlatsString);
}