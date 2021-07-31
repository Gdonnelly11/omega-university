/*  
      Omega University
      Cost Calculator Functions
      Author: Garrison Donnelly
      Date:   6/12/2021

      Filename: calculator.js
*/
 
//global variables
var inStateTuition = [9000 , 750];
var outStateTuition = [15000 , 1250];
var internationalTuition = [18000 , 1500];
var inStateFees = [2400, 200];
var outStateFees = [3000, 250];
var internationalFees = [3600, 300];
var formValidity = true;

//remove deault value and formatting from the Residency select box
function removeSelectDefaults() {
	var emptyBoxes = document.getElementsByTagName("select");
	for (var i = 0; i < emptyBoxes.length; i++) {
		emptyBoxes[i].selectedIndex = -1;
	}	
}

//validates the radio buttons for CreditLoad that the user selected full-time or part-time. One of the buttons must be selected.
function validateAttendanceStatus() {
	var attendanceStatus = document.getElementsByName("CreditLoad");
	var errorDiv = document.querySelector("#attendanceType .errorMessage");
	var fieldsetValidity = true;
	
	try{
		//If neither full-time or part-time radio selected, validation will fail
		if (!attendanceStatus[0].checked && !attendanceStatus[1].checked) {
			for (var i = 0; i < 2; i++) {
				attendanceStatus[i].style.outline = "1px solid red";
			}	
			fieldsetValidity = false;
		}	
		else {
			for (var i = 0; i < 2; i++){
				attendanceStatus[i].style.outline = "";
			}
		}

		//throws error message if fieldset is blank
		if (!fieldsetValidity) {
			throw "Please select whether you will attend full-time or part-time.";
		}	
		else {
			errorDiv.style.display = "none";
		}
	}	
	
	catch(msg) {
		errorDiv.style.display = "block";
		errorDiv.textContent = msg;
		formValidity = false;
	}	
}

//validates the residency drop down selection. This selectedIndex property should not equal -1 (or blank).
function validateResidency() {
	var residencySelect = document.getElementById("residencySelect");
	var errorDiv = document.querySelector("#residency .errorMessage");
	var fieldsetValidity = true;
	
	try {
		//checks that select input has been changed from blank (-1)
		if (residencySelect.selectedIndex === -1) {
			residencySelect.style.border = "1px solid red";
			fieldsetValidity = false;
		}	
		else {
			residencySelect.style.border = "";
		}	
		
		//throws error message if select input is blank
		if (fieldsetValidity === false) {
			throw "Please specify your current residency.";
		}	
		else {
			errorDiv.style.display = "none";
			errorDiv.textContent = "";
		}	
	}
	catch(msg) {
		errorDiv.style.display = "block";
		errorDiv.textContent = msg;
		formValidity = false;
	}			
}	

//validates the credit number input is a number between 0 and 22. Also, validates that credit input matches the attendance status chosen earlier in the form.
function validateCreditInput() {
	var creditInput = document.getElementById("credits");
	var attendanceStatus = document.getElementsByName("CreditLoad");
	var errorDiv = document.querySelector("#creditInput .errorMessage");
	var fieldsetValidity = true;
	
	try {
		//same check as validateAttendanceStatus. If it fails this validation, we won't have the ability to properly validate whether input matches attendance type.  
		if (!(attendanceStatus[0].checked || attendanceStatus[1].checked)) {
			creditInput.style.background = "rgb(255, 233, 233)";
			fieldsetValidity = false;
			throw "You must select whether you are attending full-time or part-time."			
		}
        //validates that credit input is between 0 and 22. If it fails this check, we know that it will surely fail the next step in validation.		
		else if (creditInput.value < 0 || creditInput.value > 22) {
			creditInput.style.background = "rgb(255, 233, 233)";
			fieldsetValidity = false;
			throw "You have entered an incorrect value. The entry must be between 0 and 22."
		}
		//Next two statements validate whether input matches attendance status. Due to validation in first two statements, we know there are two possibilities left: attendanceStatus[0].checked or attendanceStatus[1].checked
		//Statement checks if Full-Time is checked. If true, credit input must be >= 12.
		else if (attendanceStatus[0].checked) {
			if (creditInput.value < 12) {
				creditInput.style.background = "rgb(255, 233, 233)";
				fieldsetValidity = false;
				throw "You have entered an incorrect credit load. Full-time is 12 or more credits.";
			}	
			else {
				creditInput.style.background = "white";
				errorDiv.style.display = "none";
			}	
		}
		//Due to previous checks, we know that Part-Time must be checked. 
		else {
			//Since student is part-time, we check to make sure input is between 1 and 11. 
			if (creditInput.value > 12 || creditInput.value < 1) {
				creditInput.style.background = "rgb(255, 233, 233)";
				fieldsetValidity = false;
				throw "You have entered an incorrect credit load. Part-time students take between 1 and 11 credits.";
			}	
			else {
				creditInput.style.background = "white";
				errorDiv.style.display = "none";
			}	
		}	
	}	
	
	catch(msg) {
		errorDiv.style.display = "block";
		errorDiv.textContent = msg;
		formValidity = false;
	}	
}

//validates the form by calling validation functions. 
function validateForm() {
	//resets formValidity in order to run the following validation tests. 
	formValidity = true;
	//Validation tests. Sets formValidity to false if it fails a test. Runs through all tests so we have all applicable error messages.
	validateAttendanceStatus();
	validateResidency();
	validateCreditInput();
	//Successful validation removes errorText message and calls updateCosts(tuition, fees) function. This function will call the calcTuition() and calcFees() functions to get both costs.
	if (formValidity === true) {
		document.getElementById("errorText").textContent = "";
		document.getElementById("errorText").style.display = "none";
		updateCosts(calcTuition(), calcFees());
	}
	//Unsuccessful validation adds errorText message at top of application and scrolls to message. updateCosts(tuition, fees) called on empty inputs to remove previous amounts.
	else {
		document.getElementById("errorText").textContent = "Please fix the indicated problems and then resubmit your order.";
		document.getElementById("errorText").style.display = "block";
		document.getElementById("errorText").scrollIntoView();
		updateCosts("", "");
	}	
}	

//Populates the tables containing the tuition and fee costs. Uses two separate for loops, one to populate the head and the other to populate the td elements.
function populateTable() {
	//local variables
	var head = document.getElementsByClassName("head");
	var table = document.getElementsByClassName("table");
	var arrayCount = 0;
	var tableHeaders = ["", "Full Time", "Part Time - Per Credit"];
	//Loop to populate headings of each table.
	for(var i = 0; i < head.length; i++){		
		head[i].textContent = tableHeaders[arrayCount];
		//arrayCount is a separate iterator used to specifically count through the array three times and reset back to zero.
		if(arrayCount === 2){
			arrayCount -= arrayCount;
		}	
		else {
			arrayCount++;
		}	
	}
    //Loop to populate the td elements in the table.
	for(var i = 0; i < table.length; i++){
		//Checks if divisible by 3. If so, we know this is an index (first) column that details whether the row is for tuition or fees.
		//This is the initial conditional to avoid this specific condition getting overlooked in favor of the less specific conditions to follow.
		if(i % 3 === 0){
			//Checks if divisible by 2. If so, we have a tuition row. Otherwise, it is a row for fees. 
			if(i % 2 === 0){
				table[i].textContent = "Tuition";
			}
			else {
				table[i].textContent = "Fees (Applies only to students on campus)";
			}	
		}
		//These conditionals fill in the rest of the td elements based on which row they belong to.
		//Columns are calculated based on an alternating pattern whether the index is even or odd. 
		else if (i < 3){
			table[i].textContent = inStateTuition[(i-1) % 2];
		}	
		else if (i < 6){
			table[i].textContent = inStateFees[i % 2];
		}	
		else if (i < 9){
			table[i].textContent = outStateTuition[(i-1) % 2];
		}
		else if (i < 12){
			table[i].textContent = outStateFees[i % 2];
		}	
		else if (i < 15){
			table[i].textContent = internationalTuition[(i-1) % 2];
		}
		else if (i < 18){
			table[i].textContent = internationalFees[i % 2];
		}		
	}	
}
	
//Calculates tuition. Returns number tuitionCost.
function calcTuition() {
	var creditHours = document.getElementById("credits").value;
	var fullTime = document.getElementById("fullTime").checked;
	var partTime = document.getElementById("partTime").checked;//Could have done this with one variable. After validation, partTime === !fullTime. Chose to use both here for readability
	var residency = document.getElementById("residencySelect").selectedIndex; //0===In-state, 1===out-state, 2===international	
	var tuitionCost = 0;

	//Else if conditional to check which residency box is selected and whether full or part time. Tuition cost is based off credit hours and tuition arrays.
	if(residency === 0 && fullTime){
		tuitionCost = inStateTuition[0];
		//Nested if to check for credits over 18. Student will be charged hourly for each credit over this amount.
		if (creditHours > 18) {
			tuitionCost += inStateTuition[1] * (creditHours - 18);
		}	
	}	
	else if(residency === 0 && partTime) {
		tuitionCost = inStateTuition[1] * creditHours;
	}
	else if(residency === 1 && fullTime) {
		tuitionCost = outStateTuition[0];
		//Nested if to check for credits over 18. Student will be charged hourly for each credit over this amount.
		if (creditHours > 18) {
			tuitionCost += outStateTuition[1] * (creditHours - 18);
		}	
	}	
	else if(residency === 1 && partTime) {
		tuitionCost = outStateTuition[1] * creditHours;
	}
	else if(residency === 2 && fullTime) {
		tuitionCost = internationalTuition[0];
		//Nested if to check for credits over 18. Student will be charged hourly for each credit over this amount.
		if (creditHours > 18) {
			tuitionCost += internationalTuition[1] * (creditHours - 18);
		}	
	}	
	else if(residency === 2 && partTime) {
		tuitionCost = internationalTuition[1] * creditHours;
	}				

	return tuitionCost;
}	

//Calculates fees for attending on campus. Returns number feesCost.
function calcFees() {
	var creditHours = document.getElementById("credits").value;
	var feesCost = 0;
	var fullTime = document.getElementById("fullTime").checked;
	var partTime = document.getElementById("partTime").checked;//Could have done this with one variable. After validation, partTime === !fullTime. Chose to use both here for readability
	var residency = document.getElementById("residencySelect").selectedIndex; //0===In-state, 1===out-state, 2===international	
	
	//Checks first if online student. Fees are automatically 0 for online students. Uses else if to check which residency box is checked.  
	if(!(document.getElementById("oncampus").checked)){
		feesCost = 0;
	}	
	else if(residency === 0 && fullTime){
		feesCost = inStateFees[0];
	}	
	else if(residency === 0 ** partTime) {
		feesCost = inStateFees[1] * creditHours;
	}
	else if(residency === 1 && fullTime) {
		feesCost = outStateFees[0];
	}	
	else if(residency === 1 && partTime) {
		feesCost = outStateFees[1] * creditHours;
	}
	else if(residency === 2 && fullTime) {
		feesCost = internationalFees[0];
	}	
	else if(residency === 2 && partTime) {
		feesCost = internationalFees[1] * creditHours;
	}
	
	return feesCost;
}

//Calculates total cost of attendance. Has two number parameters that it adds tigether to calculate total cost. Returns number totalCost.
function calcTotal(tuition, fees) {
	var totalCost = tuition + fees;
    return totalCost;	
}

//Writes the costs for the tuition, fees and total sections of the page. Takes two numbers as parameters. Calls calcTotal(tuition, fees).
function updateCosts(tuition, fees){
	document.getElementById("tuition").textContent = "$" + tuition;	
    document.getElementById("fees").textContent = "$" + fees;
    document.getElementById("cost").textContent = "$" + calcTotal(tuition, fees);
}

//Creates event listeners for the form inputs. Uses for loops to add event listeners to the residency and location fields.
function createEventListener() {  
   //If validation is successful, validateForm() calls the updateCosts(tuition, fees) function to calculate total and write to the page.
   document.getElementById("calcButton").addEventListener("click", validateForm, false);
}	

//sets all form field values to defaults
function resetForm() {
   var radios = document.getElementsByName("CreditLoad");
   var checkboxes = document.getElementById("oncampus");
   var creditInput = document.getElementById("credits");
   //resets all checkboxes and radios to unchecked. Sets number input to 0. 
   for (var i = 0; i < radios.length; i++) {
       radios[i].checked = false;	   
   }	
   checkboxes.checked = false;
   creditInput.value = 0;      

   createEventListener();
   populateTable();
   removeSelectDefaults();
}

//resets form when page is reloaded
window.addEventListener("load", resetForm, false);
