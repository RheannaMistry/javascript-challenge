/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";

function choosingState() {
    var stateSelect = document.getElementById('state-select').elements['usState'];
    var idx;
    var stateOption;
    var usState;

    for (idx = 0; idx < usStates.length; idx++) {
        var stateOption = document.createElement('option');
        usState = usStates[idx];
        stateOption.value = usStates.code;
        stateOption.innerHTML = usStates.name;
        stateSelect.appendChild(stateOption);
    }
}

//function

document.addEventListener('DOMContentLoaded', function() {
    choosingState();
    //document.addEventListener()

});