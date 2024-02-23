//DOM Elements
const leaveRestForm=document.getElementById("LeaveRequestForm"),
    firstName = document.getElementById("FirstName"),
    lastName = document.getElementById("LastName"),
    employeeID = document.getElementById("EmployeeID"),
    initialRemainingDays = document.getElementById("RemainingDays"),
    startDate = document.getElementById("StartDate"),
    endDate = document.getElementById("EndDate");

leaveRestForm.onsubmit = (e) => {
    e.preventDefault();
if (firstName.value === "" || 
    lastName.value === "" || 
    employeeID.value === "" ||
    initialRemainingDays.value === "") {
    alert("Complete all fields!!!");
} else {
    createLeaveRequest();
}



    function createLeaveRequest(){
        let leaveRequest = document.createElement("div");

        leaveRequest.innerHTML = `
        <header class="text-center mb-5">
            <i class="bi bi-person-fill display-1 text-primary" style="font-size: 10rem"></i>
                <h1 class="display-1 h1">Leave Request Form</h1>
        </header>
        <main class="container">
            <section class="row mb-3">
                <div class="col font-medium">
                    <label for="">First Name : </label>
                    <span class="text-primary">${firstName.value}</span>
                </div>
                <div class="col font-medium">
                    <label for="">Last Name : </label>
                    <span class="text-primary">${lastName.value}</span>
            </section>
            <section class="row mb-3">
                <div class="col font-medium">
                    <label for="">Employee ID : </label>
                    <span class="text-primary">${employeeID.value}</span>
                </div>
                <div class="col font-medium">
                    <label for="">Initial Leave Days : </label>
                    <span class="text-primary">${initialRemainingDays.value}</span>
                </div>
            </section>
            <section class="row mb-3">
                <div class="col font-medium">
                    <label for="">Start Date : </label>
                    <span class="text-primary">${startDate.value}</span>
                </div>
                <div class="col font-medium">
                    <label for="">End Date : </label>
                    <span class="text-primary">${endDate.value}</span>
                </div>
            </section>
            <section class="row mb-3">
                <div class="col font-medium">
                    <label for="">Employee Requesting to Leave : </label>
                    <span class="text-primary">${employeeID.value}</span>
                </div>
                <div class="col font-medium">
                    <label for="">Remaining Leave Day/s : </label>
                    <span class="text-primary">${initialRemainingDays.value}</span>
                </div>
            </section>
            <section class="row mb-3">
                <div class="col font-medium">
                    <label for="">Requesting Leave</label>
                    <span class="text-primary">${calculateLeaveDays(startDate.value, endDate.value)}</span>
                </div>
                <div class="col font-medium">
                    <label for="">Remaining Leave Day/s : </label>
                    <span class="text-primary">${calculateRemainingLeaveDays(initialRemainingDays.value)}</span>
                </div>
            </section>
            <section class="row mb-3">
                <div class="col">
                    <label>Submitted : </label>
                    <span class="text-primary">${getSubmissionTimeStamp()}</span>
                </div>
            </section>
            <!-- todo buttons-->
            <section class="d-flex justify-content-between mt-3">
                <button type="submit" class="btn btn-success btn-lg" onclick="onLeaveApprove()">
                    <i class="bi bi-emoji-smile-fill me-2"></i>Approve
                </button>
                <button type="submit" class="btn btn-danger btn-lg" onclick="onLeaveReject()">
                    <i class="bi bi-emoji-frown-fill me-2"></i>Decline
                </button>
        </main>
        `;
        document.querySelector(".leave-request").remove();
        document.querySelector(".container").appendChild(leaveRequest);
    }
};

function getSubmissionTimeStamp(){
    this.today = new Date();

    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const dateTime = `${date} / ${time}`;
    return dateTime;
}

//Calculate the exact leave days

function calculateLeaveDays(start, end){
    const startDate = new Date(start);
    const endDate = new Date(end);

    let leaveDays = endDate.workingDaysFrom(startDate);
    return leaveDays;
}

//Calculate the remaining leave days

function calculateRemainingLeaveDays(initialRemainingDays){
    return (initialRemainingDays - calculateLeaveDays(startDate.value, endDate.value));
}

Date.prototype.workingDaysFrom = function (fromDate){
    if(!fromDate || isNaN(fromDate) || this < fromDate){
        return -1;
    }

    let frDay = new Date(fromDate.getTime());
    let toDay = new Date(this.getTime());
    let numOfWorkingDays = 1;

    frDay.setHours(0, 0, 0, 0);
    toDay.setHours(0, 0, 0, 0);


    while (frDay.getTime() <= toDay.getTime()){
        let day = frDay.getDay();
        if(day != 0 && day != 6){
            numOfWorkingDays++;
        }
        frDay.setDate(frDay.getDate() + 1);
    }
    console.log(numOfWorkingDays);
    return numOfWorkingDays;
};

//On Approve

function onLeaveApprove(){
    document.querySelector(".container").innerHTML = `
    <header class="text-center mb-5">
        <i class="bi bi-emoji-smile-fill h1 display-1 text-success m-auto" style="font-size: 10rem"></i>

        <h1 class="display-1 h1">Your Leave Was Approved</h1>
        <button class="btn btn-dark btn-lg mt-5" onclick="location.reload()">Back</button>
    </header>
    `;
}

//On Reject

function onLeaveReject(){
    document.querySelector(".container").innerHTML = `
    <header class="text-center mb-5">
        <i class="bi bi-emoji-frown-fill h1 display-1 text-danger m-auto" style="font-size: 10rem"></i>

        <h1 class="display-1 h1">Your Leave Was Rejected</h1>
        <button class="btn btn-dark btn-lg mt-5" onclick="location.reload()">Back</button>
    </header>
    `;
}