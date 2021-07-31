/*  
      Omega University
      Majors Offered - functions
      Author: Garrison Donnelly
      Date:   6/12/2021

      Filename: majors.js
*/

//Global variables used in multiple functions
var gradDegrees = document.getElementById("grad");
var undergradDegrees = document.getElementById("undergrad");

//Function called by the undergrad degree button. This makes sure the graduate degree buttons are hidden and makes sure the undergrad degrees are shown.
function showUndergradDegree() {
	//local variables
	//var philosophyDrop = document.getElementById("phildrop");
    //var literatureDrop = document.getElementById("litdrop");
    //var linguisticsDrop = document.getElementById("lingdrop");
    
	//Checks if the HTML element containing the undergrad ID does NOT contain the show class. If it does NOT, undergrad ID adds the class show. 
	if(!undergradDegrees.classList.contains("show")){
		undergradDegrees.classList.add("show");
    }
	//Checks if HTML element containing grad ID DOES contain show. If it DOES, it removes the class thus making the grad degrees invisible. 
	if(gradDegrees.classList.contains("show")){
		gradDegrees.classList.remove("show");		
	}	
}	

//Function called by the graduate degree button. This displays the graduate degrees and makes sure the undergrad degrees are hidden. 
function showGradDegree() {
	//Local variables
	//var maPhilosophyDrop = document.getElementById("maphildrop");
    //var maHistoryDrop = document.getElementById("mahistorydrop");
	
	//Checks if the HTML element containing the grad ID does NOT contain the show class. If it does NOT, grad ID adds the class show. 
	if(!gradDegrees.classList.contains("show")){	
		gradDegrees.classList.add("show");
	}
	//Checks if HTML element containing undergrad ID DOES contain show. If it DOES, it removes the class thus making the undergrad degrees invisible. 
	if(undergradDegrees.classList.contains("show")){
		undergradDegrees.classList.remove("show");		
	}	
}

//Function called to drop down the major information. This function is called by all of the drop boxes. Ensures all drop content is hidden and the information is displayed for the major selected.
function showDropContent(){
	//Local variables. This function will be added as an event listener on the dropButtons. this.nextElementSibling refers to the next element after the dropButons which in all cases would be the drop-content divs. 
	var dropContent = this.nextElementSibling;
	var majorsList = document.getElementsByClassName("drop-content"); //Collection of drop-content 
	
	//Uses for...of loop to go through the majorsList collection. If a major strictly equals dropContent, we will make the underlying content visible UNLESS it already is visible. Otherwise, we make sure all other major content has display set to none. 
	for(major of majorsList){
		if(major === dropContent){
			//closes already open content window
			if(dropContent.style.display === "block"){
					dropContent.style.display = "none";
		    }
			//otherwise we open the content
			else{
				dropContent.style.display = "block";
			}
		}
        //Major does not equal the content associated with the button. Therefore, we make sure its content is not displayed. 		
		else{
			major.style.display = "none";
		}	
	}    
}	

//Creates event listeners for the navigation buttons
function createEventListeners() {
	//Local variable 
	var dropButtons = document.getElementsByClassName("dropbtn");
	
    document.getElementById("ugbutton").addEventListener("click", showUndergradDegree, false);
    document.getElementById("gradbutton").addEventListener("click", showGradDegree, false);
	for(var i = 0; i < dropButtons.length; i++){
	   dropButtons[i].addEventListener("click", showDropContent, false);
	}   
}	

//Calls the createEventListeners() function when the window loads. 
window.addEventListener("load", createEventListeners, false);