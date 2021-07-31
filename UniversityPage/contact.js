/*  
      Omega University
      Contact Us - functions
      Author: Garrison Donnelly
      Date:   6/12/2021

      Filename: contact.js
*/
 
//Global variables for contacts page
var contactsDisplay = document.getElementsByClassName("contact");
var undergrad = document.getElementById("undergrad");
var grad = document.getElementById("grad");
var bursar = document.getElementById("bursar");
var registrar = document.getElementById("registrar");
var studentAffairs = document.getElementById("studentaffairs");
var ugButton = document.getElementById("ugbutton");
var gradButton = document.getElementById("gradbutton");
var bursarButton = document.getElementById("bursarbutton");
var registrarButton = document.getElementById("registrarbutton");
var saButton = document.getElementById("sabutton");

//takes HTML element as a parameter and changes the display property of the element to none. This hides the element.
function turnOffDisplay(contact){
    contact.style.display = "none";
}	 
 
 //takes HTML element as a parameter and changes the display property of the element to block. This shows the element. 
 //Also calls turnOffDisplay(contact) on a loop to hide all other elements.
function showContact(visibleContact){
    for(contact of contactsDisplay){
		turnOffDisplay(contact);
    }
	
    visibleContact.style.display = "block";	
}

