
const api = location.hostname === "localhost" || location.hostname === "127.0.0.1" ?
    "https://localhost:7011/api/Vacations" :
    `https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/Vacations`;

$(document).ready(function () {
    let storedDataString = sessionStorage.getItem("loggedInUser");
    // Convert the JSON string back to a JavaScript object
    let UserInSessionStorage = JSON.parse(storedDataString);
    console.log(UserInSessionStorage.email);
    $('#FlatIdTB').val(GetFlatIdFromURL);
    $('#UserIdTB').val(UserInSessionStorage.email);
    console.log("hey");
    //Validation for the Dates:
    const startDate = $('#StartDateTB');
    const endDate = $('#EndDateTB');
    const Today = new Date;
    var year = Today.getFullYear();
    var month = Today.getMonth() + 1; // Months are zero-indexed, so add 1
    var day = Today.getDate() +1; //to get today date
    // Create a variable with today's date
    const todayDate = new Date(year, month - 1, day);
    startDate.on('focus', function () {
        startDate.attr('min', todayDate.toISOString().split('T')[0]);//set the min start date to be today
    });
    // Event listener that sets the minimum of the End Date to be bigger than the Start Date
    startDate.on('input', function () {
        // Set the End Date Min
        endDate.attr('min', startDate.val());
    });

    $("#EndDateTB").on("change", CheckDates);
    // bind the submit event to a function called ValidForm
    $("#vForm").submit(ValidForm);
    $("#RenderVacation").on("click", RenderVacationBTN);

});

let Vacation = {};

//a callback function for the Get success
function getSCB(Vacations) {
    console.log(Vacations);
    $("#AllVacation").html("");
    let VacationString = "";
    let flatId = $("#FlatIdTB").val();
    for (let i = 0; i < Vacations.length; i++) {
        if (Vacations[i].flatId == flatId) {
            VacationString += `<div class='col-md-3'>`;
            VacationString += `<div class='card mt-3'>`;
            VacationString += `<div class='card-body'>`;
            VacationString += `<h3 class='card-header bg-white'>Vacation ID: ${Vacations[i].id}</h3>`;
            VacationString += `<p class='card-text'><strong>User ID:</strong> ${Vacations[i].userEmail}</p>`;
            VacationString += `<p class='card-text'><strong>Flat ID:</strong> ${Vacations[i].flatId}</p>`;
            VacationString += `<p class='card-text'><strong>Start date:</strong> ${new Date(Vacations[i].startDate).toLocaleDateString()}</p>`;
            VacationString += `<p class='card-text'><strong>End date:</strong> ${new Date(Vacations[i].endDate).toLocaleDateString()}</p>`;
            VacationString += `</div>`
            VacationString += `</div>`
            VacationString += `</div>`
        }
    }
    if (VacationString == "") {
        VacationString = "<h3>No vacations found for the selected Flat.</h3>";
    }
    $("#AllVacation").append(VacationString);
}

//a callback function for the Get Error
function getECB(errorFromServer) {
    console.log("this is error");
}

function GetFlatIdFromURL() {
    // get the url string frist
    const UrlString = new URLSearchParams(window.location.search);
    //cut just the flat id from the url
    return flatID = UrlString.get('flatID');
}
function submit() {
    Vacation = {
        //id: $("#OrderIdTB").val(),
        userEmail: $("#UserIdTB").val(),
        flatId: $("#FlatIdTB").val(),
        startDate: $("#StartDateTB").val(),
        endDate: $("#EndDateTB").val(),
    }
    //Make an ajax call to post the Vacations
    ajaxCall("POST", api, JSON.stringify(Vacation), postSCB, postECB);
}

function postSCB(objectFromServer) {
    if (objectFromServer) {
        swal("Submitted to the server!", "Great Job", "success");
    }
    else {
        swal("Error!", "The Vacation Dates are already booked", "error");
    }
}

//a callback function for the submit failure
function postECB(errorFromServer) {
    console.log("erorrrrr");
}

function ValidForm() {
    submit();
    return false; // the return false will prevent the form from being submitted
}

function CheckDates() {
    let StartD_Val = new Date($("#StartDateTB").val());
    let EndD_Val = new Date($("#EndDateTB").val());
    let TotalTime = EndD_Val.getTime() - StartD_Val.getTime(); //set the total time between the startDate to the EndDate
    let TotalDays = TotalTime / (3600 * 1000 * 24); //Number of second in 1 day
    if (TotalDays > 20) {
        //alert('The Vacation cannot exceed 20 days');
        swal("Error!", "The Vacation cannot exceed 20 days", "error");
        $("#EndDateTB").val("");
        return;
    }
}

function RenderVacationBTN() {
    ajaxCall("GET", api, "", getSCB, getECB);
}

function backToUserPage() {
    // Clear session storage
    sessionStorage.clear();

    // Navigate to UserPage.html
    window.location.href = 'UserPage.html';
}