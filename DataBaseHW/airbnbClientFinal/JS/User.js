//Fix Ruppin Server
const api = location.hostname === "localhost" || location.hostname === "127.0.0.1" ?
    `https://localhost:7011/api/Users` :
    `https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/Users`;
const apiLogin = location.hostname === "localhost" || location.hostname === "127.0.0.1" ?
    `https://localhost:7011/api/Users/login` :
    `https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/Users/login`;
const apiUpdate = location.hostname === "localhost" || location.hostname === "127.0.0.1" ?
    `https://localhost:7011/api/Users/login` :
    `https://proj.ruppin.ac.il/cgroup61/test2/tar1/api/Users/login`;

//Code:
$(document).ready(function () {
    ajaxCall("GET", api, "", getSCB, getECB);

    // bind the submit event to a function called ValidForm
    $("#uForm").submit(ValidForm);
    $("#UpdateForm").submit(ValidUpdate);
});

//a callback function for the submit success
function getSCB(Users) {
    console.log(Users);
}

//a callback function for the submit Error
function getECB(errorFromServer) {
    console.log("Get Error");
}

function submit() {
    let user = {
        email: $("#emailInput").val(),
        firstName: $("#FNInput").val(),
        familyName: $("#LNInput").val(),
        password: $("#PassInput").val(),
    }
    //Make an ajax call to post the Flats
    ajaxCall("POST", api, JSON.stringify(user), postSCB, postECB);
}

function UpdateSubmit() {
    let UpdatedUser = {
        email: $("#emailUpdate").val(),
        firstName: $("#NameUpdate").val(),
        familyName: $("#FamilyNameUpdate").val(),
        password: $("#PasswordUpdate").val(),
    }
    //Make an ajax call to post the Flats
    ajaxCall("PUT", apiUpdate, JSON.stringify(UpdatedUser), putEditUserSCB, putEditUserECB);
}

//a callback function for the submit success
function putEditUserSCB(objectFromServer) {
    if (objectFromServer) {
        console.log(objectFromServer);
        swal("User Updated!", "Great Job", "success");
        UpdateSessionStorage();
        document.getElementById('UpdateContainer').style.display = 'none';
        document.getElementById('vFormContainer').style.display = 'block';
        document.getElementById('vForm').removeAttribute('disabled');
    }
}
//a callback function for the submit failure
function putEditUserECB(errorFromServer) {
    console.log("Update Error!");
}

function UpdateSessionStorage() {
    let SS_user = {
        email: $("#emailUpdate").val(),
        firstName: $("#NameUpdate").val(),
        familyName: $("#FamilyNameUpdate").val(),
        password: $("#PasswordUpdate").val(),
    }
    sessionStorage.setItem('loggedInUser', JSON.stringify(SS_user));
}
function ValidForm() {
    submit();
    return false; // the return false will prevent the form from being submitted
}

function ValidUpdate() {
    UpdateSubmit();
    return false; // the return false will prevent the form from being submitted
}

//a callback function for the submit success
function postSCB(objectFromServer) {
    if (objectFromServer!=-1) {
        swal("Registration successful!", "Great Job", "success");
        ajaxCall("GET", api, "", getSCB, getECB);
    }
    else {
        swal("Error!", "the Email is already in use", "error");
        console.log(objectFromServer);
    }
}
//a callback function for the submit failure
function postECB(errorFromServer) {
    console.log("Error!");
}


function handleLogin() {
    //let api2 = `https://localhost:7011/api/Users/login`;
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPswd').value;
    let user = {
        FirstName: "string",
        FamilyName: "string",
        Email: email,
        Password: password,
        isActive: true,
        IsAdmin:false
    }
    ajaxCall("POST", apiLogin, JSON.stringify(user), postLoginSCB, postLoginECB);
    return false;
}

//a callback function for the submit success
function postLoginSCB(objectFromServer) {
    if (objectFromServer != null) {
        //swal("Logged in!", "Welcome back, " + objectFromServer.firstName, "success");
        if (objectFromServer.isAdmin == true && objectFromServer.isActive==true) {
            swal({
                title: "Admin Logged in!",
                text: "Welcome back, " + objectFromServer.firstName,
                icon: "success",
                button: "Sign In",
            });
            sessionStorage.setItem('loggedInUser', JSON.stringify(objectFromServer));
            window.location.href = 'admin.html';
        }
        else {
            if (objectFromServer.isActive == false) {
                swal({
                    title: "Access Denied",
                    text: objectFromServer.email + " Is not active",
                    icon: "error",
                    button: "Close"
                });
            }
            else {
                swal({
                    title: "Logged in!",
                    text: "Welcome back, " + objectFromServer.firstName,
                    icon: "success",
                    button: "Sign In",
                });
                sessionStorage.setItem('loggedInUser', JSON.stringify(objectFromServer));
                document.querySelector('.main').style.display = 'none';
                document.getElementById('vFormContainer').style.display = 'block';
                document.getElementById('vForm').removeAttribute('disabled');
                ajaxCall("GET", api, "", getSCB, getECB);
            }
        }
    }
    else
    {
       swal("Error!", "Email or password is incorrect.", "error");
    }
}
//a callback function for the submit failure
function postLoginECB(errorFromServer) {
   
    console.log(errorFromServer);
}

function handleLogout() {
    sessionStorage.clear();
    document.querySelector('.main').style.display = 'block';
    document.getElementById('UpdateContainer').style.display = 'none';
    document.getElementById('vFormContainer').style.display = 'none';

    // Reset the checkbox state to show the signup section
    document.getElementById('chk').checked = false;

    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPswd').value = '';
}

function handleUpdate(){
    document.querySelector('.main').style.display = 'none';
    document.getElementById('UpdateContainer').style.display = 'block';
    let storedDataString = sessionStorage.getItem("loggedInUser");
    // Convert the JSON string back to a JavaScript object
    let UserInSessionStorage = JSON.parse(storedDataString);

    document.getElementById('emailUpdate').value = UserInSessionStorage.email;
    document.getElementById('NameUpdate').value = UserInSessionStorage.firstName;
    document.getElementById('FamilyNameUpdate').value = UserInSessionStorage.familyName;
    document.getElementById('PasswordUpdate').value = UserInSessionStorage.password;
}